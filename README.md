# Penelove Pricelist

Aplikasi katalog pricelist interaktif dan responsif berbasis Next.js 14, Tailwind CSS, Prisma, dan SQLite.

## Fitur Utama

- 🛍️ Katalog produk dan pricelist terstruktur
- 🔍 Pencarian & filter kategori instan
- 💬 Integrasi WhatsApp Direct Order
- 🗄️ Database SQLite lokal dengan Prisma ORM
- 📱 Tampilan mobile-friendly & responsive

## Memulai Proyek (Getting Started)

### 1. Kloning Repository & Masuk ke Folder
```bash
git clone https://github.com/USERNAME/penelove-pricelist.git
cd penelove-pricelist
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Konfigurasi Environment Variable
Salin file `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```

### 4. Setup Database & Seeding
Inisialisasi database SQLite dan isi data awal:
```bash
npx prisma db push
npm run seed
```

### 5. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Skrip yang Tersedia

- `npm run dev` - Menjalankan server development Next.js
- `npm run build` - Generate Prisma client dan build aplikasi Next.js untuk production
- `npm run start` - Menjalankan server production Next.js
- `npm run prisma:push` - Sinkronisasi skema Prisma ke database SQLite
- `npm run seed` - Menjalankan seeding data awal produk
