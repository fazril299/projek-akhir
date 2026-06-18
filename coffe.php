<?php
session_start(); // menyiapkan data sementara ke server

class User { // mewakali buat customer melakukan pemasanan
    private $nama; // ini cuma bisa di akses di dalam class
    private $poinMember = 1;

    public function __construct($nama) { // saat objek dibuat, langsung set nama
        $this->setNama($nama); // melainkan harus pake setter karena ada validasi di dalamnya
    }

    //setter fungsi nya untuk mengatur nama cus
    public function setNama($nama) { 
        $nama = trim($nama); // fungsi trim itu menghapus bagian spasi depan mau belakang

        if ($nama == "") { // karena nama kosong sistem akan mengisi nama customer
            $this->nama = "Customer";
        } else {
            $this->nama = $nama;
        }
    }

    public function getNama() { // getter nama di pakai buat mengambil nama cus
        return $this->nama;
    }

    public function getPoinMember() { //jadi setiap customer dapet point 1 setiap pada pesanan
        return $this->poinMember;
    }
}

class Menu { // menu atau parrent
    private $namaMenu; //karena private sekarang cuma bisa di akses di dalam class menu
    private $harga;

    public function __construct($namaMenu, $harga) { // untuk mengisi nama menu dan harga 
        $this->setNamaMenu($namaMenu);
        $this->setHarga($harga);
    }

    public function setNamaMenu($namaMenu) { // untuk mengatur namamenu
        $this->namaMenu = trim($namaMenu); //trim untuk menghapus spasi depan dan belakang
    }

    public function getNamaMenu() { //di pakai untuk mengambil nama menu
        return $this->namaMenu;
    }

    //ini validasi harga.
    public function setHarga($harga) {
        if ($harga < 0) {
            $this->harga = 0;
        } else {
            $this->harga = $harga;
        }
    }
    //Harga menu tidak boleh negatif. Kalau ada data aneh, sistem amankan jadi 0.

    public function getHarga() {
        return $this->harga;
    }
}

class Kopi extends Menu {
    private $ukuran;

    public function __construct($namaMenu, $harga, $ukuran) {
        parent::__construct($namaMenu, $harga); //constructor milik parent Menu untuk mengisi nama menu dan harga.
        $this->setUkuran($ukuran);
    }

    public function setUkuran($ukuran) { //untuk validasi agar tidak eror
        if ($ukuran == "Large") {
            $this->ukuran = "Large";
        } else {
            $this->ukuran = "Regular";
        }
    }

    public function getUkuran() { //fungsi nya untuk set ukuran kopi
        return $this->ukuran;
    }

    public function getDetail() { //ukuran
        return "Ukuran: " . $this->ukuran;
    }
}

class NonKopi extends Menu {
    private $rasa;

    public function __construct($namaMenu, $harga, $rasa) {
        parent::__construct($namaMenu, $harga);
        $this->setRasa($rasa);
    }

    public function setRasa($rasa) {
        $rasaValid = ["Original", "Manis", "Coklat"];

        if (in_array($rasa, $rasaValid)) {
            $this->rasa = $rasa;
        } else {
            $this->rasa = "Original";
        }
    }

    public function getRasa() {
        return $this->rasa;
    }

    public function getDetail() {
        return "Rasa: " . $this->rasa;
    }
}

class Voucher {
    private $kodeVoucher;
    private $diskon;

    public function __construct($kodeVoucher, $diskon) {
        $this->setKodeVoucher($kodeVoucher);
        $this->setDiskon($diskon);
    }

    public function setKodeVoucher($kodeVoucher) {
        $this->kodeVoucher = strtoupper(trim($kodeVoucher));
    }

    public function getKodeVoucher() {
        return $this->kodeVoucher;
    }

    public function setDiskon($diskon) {
        if ($diskon < 0) {
            $this->diskon = 0;
        } elseif ($diskon > 100) {
            $this->diskon = 100;
        } else {
            $this->diskon = $diskon;
        }
    }

    public function getDiskon() {
        return $this->diskon;
    }

    public static function validasiVoucher($kode) {
        $kode = strtoupper(trim($kode));

        if ($kode == "") {
            return null; // voucher kosong
        }

        if ($kode == "123456") {
            return new Voucher("123456", 10); // voucher valid
        }

        return false; // voucher salah
    }
}

class Pesanan {
    private $daftarMenu = [];
    private $totalHarga = 0;

    public function tambahPesanan($menu) {
        $this->daftarMenu[] = $menu;
    }

    public function hitungTotal() {
        $this->totalHarga = 0;

        foreach ($this->daftarMenu as $menu) {
            $this->totalHarga += $menu->getHarga();
        }

        return $this->totalHarga;
    }

    public function gunakanVoucher($voucher) {
        $potongan = $this->totalHarga * $voucher->getDiskon() / 100;
        $this->totalHarga -= $potongan;
    }

    public function getTotalHarga() {
        return $this->totalHarga;
    }
}

if (!isset($_SESSION["riwayat"])) {
    $_SESSION["riwayat"] = [];
}

$hasil = null;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nama = $_POST["nama"] ?? "";
    $pilihan = $_POST["menu"] ?? "";
    $ukuran = $_POST["ukuran"] ?? "Regular";
    $rasa = $_POST["rasa"] ?? "Original";
    $kode = $_POST["voucher"] ?? "";

    $user = new User($nama);
    $pesanan = new Pesanan();

    if ($pilihan == "Americano") {
        $menu = new Kopi("Americano", 15000, $ukuran);
    } elseif ($pilihan == "Latte") {
        $menu = new Kopi("Latte", 18000, $ukuran);
    } elseif ($pilihan == "Matcha") {
        $menu = new NonKopi("Matcha", 16000, $rasa);
    } else {
        $menu = new NonKopi("Chocolate", 14000, $rasa);
    }

    $pesanan->tambahPesanan($menu);
    $hargaAwal = $pesanan->hitungTotal();

    $infoVoucher = "Tidak ada voucher";

    $voucher = Voucher::validasiVoucher($kode);

    if ($voucher === false) {
        $infoVoucher = "Voucher tidak valid";
    } elseif ($voucher !== null) {
        $pesanan->gunakanVoucher($voucher);
        $infoVoucher = "Diskon " . $voucher->getDiskon() . "%";
    }

    $hasil = [
        "nama" => $user->getNama(),
        "menu" => $menu->getNamaMenu(),
        "detail" => $menu->getDetail(),
        "hargaAwal" => $hargaAwal,
        "total" => $pesanan->getTotalHarga(),
        "voucher" => $infoVoucher,
        "poin" => $user->getPoinMember()
    ];

    $_SESSION["riwayat"][] =
        date("H:i:s") . " - " .
        $menu->getNamaMenu() . " - Rp " .
        number_format($pesanan->getTotalHarga(), 0, ',', '.');
}

$riwayat = array_reverse($_SESSION["riwayat"]);
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Coffee System</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 30px;
            background: #f7f7f7;
        }
        
        .container {
            max-width: 850px;
            margin: auto;
            background: white;
            padding: 25px;
            border: 1px solid #533232;
        }

        h2 {
            margin-top: 0;
        }

        .layout {
            display: flex;
            gap: 30px;
        }

        .left, .right {
            flex: 1;
        }

        label {
            display: block;
            margin-top: 12px;
            font-size: 14px;
        }

        input, select {
            width: 100%;
            padding: 9px;
            margin-top: 5px;
            border: 1px solid #a48953;
            border-radius: 6px;
            box-sizing: border-box;
        }

        button {
            width: 100%;
            margin-top: 18px;
            padding: 10px;
            background: black;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
        }

        button:hover {
            background: #333;
        }

        .summary {
            border: 2px solid black;
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 20px;
        }

        p {
            margin: 7px 0;
            font-size: 14px;
        }

        .history-item {
            font-size: 14px;
            padding: 6px 0;
            border-bottom: 1px solid #5e0000;
        }

        .info {
            margin-top: 8px;
            font-size: 13px;
            color: #555;
        }

        
    </style>
</head>
<body>

<div class="container">
    <h2>Coffee System Modern UI</h2>

    <div class="layout">
        <div class="left">
            <form method="POST">
                <label>Nama Customer</label>
                <input type="text" name="nama" required>

                <label>Menu</label>
                <select name="menu">
                    <option value="Americano">Americano - Rp 15.000</option>
                    <option value="Latte">Latte - Rp 18.000</option>
                    <option value="Matcha">Matcha - Rp 16.000</option>
                    <option value="Chocolate">Chocolate - Rp 14.000</option>
                </select>

                <label>Ukuran Kopi</label>
                <select name="ukuran">
                    <option value="Regular">Regular</option>
                    <option value="Large">Large</option>
                </select>

                <label>Rasa Non Kopi</label>
                <select name="rasa">
                    <option value="Original">Original</option>
                    <option value="Manis">Manis</option>
                    <option value="Coklat">Coklat</option>
                </select>

                <label>Voucher</label>
                <input type="text" name="voucher" placeholder="123456">
                <div class="info">Voucher valid: 123456</div>

                <button type="submit">Order Now</button>
            </form>
        </div>

        <div class="right">
            <div class="summary">
                <h3>Order Summary</h3>

                <?php if ($hasil) { ?>
                    <p><b>Nama:</b> <?= htmlspecialchars($hasil["nama"]); ?></p>
                    <p><b>Menu:</b> <?= htmlspecialchars($hasil["menu"]); ?></p>
                    <p><b>Detail:</b> <?= htmlspecialchars($hasil["detail"]); ?></p>
                    <p><b>Harga Awal:</b> Rp <?= number_format($hasil["hargaAwal"], 0, ',', '.'); ?></p>
                    <p><b>Total Bayar:</b> Rp <?= number_format($hasil["total"], 0, ',', '.'); ?></p>
                    <p><b>Voucher:</b> <?= htmlspecialchars($hasil["voucher"]); ?></p>
                    <p><b>Poin:</b> <?= htmlspecialchars($hasil["poin"]); ?></p>
                <?php } else { ?>
                    <p>Belum ada pesanan.</p>
                <?php } ?>
            </div>

            <h3>Riwayat Transaksi</h3>

            <?php if (count($riwayat) > 0) { ?>
                <?php foreach ($riwayat as $item) { ?>
                    <div class="history-item"><?= htmlspecialchars($item); ?></div>
                <?php } ?>
            <?php } else { ?>
                <p>Belum ada riwayat.</p>
            <?php } ?>
        </div>
    </div>
</div>

</body>
</html>