# IslamApp - Platform Islam Digital Lengkap

![IslamApp](https://images.pexels.com/photos/8164742/pexels-photo-8164742.jpeg?auto=compress&cs=tinysrgb&w=1200)

Platform Islam digital modern yang menyediakan layanan keislaman lengkap dalam satu aplikasi. Dirancang dengan antarmuka yang intuitif dan responsif untuk berbagai perangkat.

## 🌟 Fitur Utama

### 📖 Al-Qur'an Digital
- **30 Juz Lengkap**: Akses seluruh Al-Qur'an dengan teks Arab asli
- **Terjemahan Indonesia**: Terjemahan resmi Bahasa Indonesia
- **Audio Recitation**: Pembacaan oleh qari terkenal
- **Bookmark**: Simpan ayat favorit untuk dibaca kembali
- **Mode Baca**: Antarmuka yang nyaman dengan tema terang/gelap

### 🕌 Jadwal Sholat
- **5 Waktu Sholat**: Subuh, Dzuhur, Ashar, Maghrib, Isya
- **Deteksi Lokasi Otomatis**: Menggunakan GPS untuk akurasi maksimal
- **Input Manual Kota**: Pilihan untuk memasukkan kota secara manual
- **Countdown Timer**: Hitung mundur ke waktu sholat berikutnya
- **Notifikasi**: Pengingat waktu sholat (dapat diaktifkan/nonaktifkan)

### 📅 Kalender Hijriah
- **Konversi Otomatis**: Tampilkan tanggal Hijriah dan Masehi
- **Hari Penting Islam**: Ramadan, Idul Fitri, Idul Adha, Maulid, dan lainnya
- **Navigasi Mudah**: Jelajahi bulan dan tahun dengan mudah

### 📖 Kumpulan Doa
- **Doa Harian**: Kumpulan doa untuk berbagai aktivitas
- **Doa Khusus**: Doa untuk situasi tertentu
- **Bookmark Doa**: Simpan doa favorit untuk dibaca kembali

### 🔖 Bookmark
- **Simpan Ayat**: Simpan ayat Al-Qur'an favorit
- **Simpan Doa**: Simpan doa yang sering digunakan
- **Akses Mudah**: Temukan kembali konten yang disimpan

### 📄 API Documentation
- **Dokumentasi API**: Dokumentasi lengkap untuk integrasi
- **Contoh Penggunaan**: Contoh kode untuk menggunakan API
- **Responsif Mobile**: Tampilan yang ramah perangkat mobile

## 📋 Prerequisites

Pastikan Anda telah menginstall:
- **Node.js** (versi 18.0.0 atau lebih baru)
- **npm** (versi 8.0.0 atau lebih baru)
- Browser modern (Chrome, Firefox, Safari, Edge)

## ⚡ Instalasi Cepat

### 1. Clone Repository
```bash
git clone https://github.com/ariardana/IslamApp.git
cd IslamApp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Jalankan Development Server
```bash
npm run dev
```

### 4. Buka di Browser
Aplikasi akan berjalan di `http://localhost:5173`

## 🛠️ Dependencies Utama

### Production Dependencies
```json
{
  "@tanstack/react-query": "^5.85.6",  // State management untuk API calls
  "zustand": "^5.0.8",                 // Global state management
  "react-router-dom": "^7.8.2",        // Routing
  "axios": "^1.11.0",                  // HTTP client
  "date-fns": "^4.1.0",                // Date manipulation
  "date-fns-jalali": "^4.1.0-0",       // Jalali date manipulation
  "react-hot-toast": "^2.6.0",          // Toast notifications
  "lucide-react": "^0.344.0",          // Icon library
  "express": "^5.1.0",                 // Web server
  "cors": "^2.8.5"                     // CORS middleware
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^4.3.1",    // React plugin untuk Vite
  "tailwindcss": "^3.4.1",             // CSS framework
  "typescript": "^5.5.3",              // TypeScript support
  "autoprefixer": "^10.4.18",          // CSS autoprefixer
  "postcss": "^8.4.35",                // CSS processing
  "concurrently": "^8.2.2"             // Run multiple commands
}
```

## 📁 Struktur Folder

```
src/
├── components/           # Komponen React
│   ├── api-docs/        # Komponen dokumentasi API
│   ├── bookmarks/       # Komponen bookmark
│   ├── calendar/        # Komponen kalender Hijriah
│   ├── common/          # Komponen umum
│   ├── dashboard/       # Komponen dashboard
│   ├── layout/          # Layout components
│   ├── prayer/          # Komponen jadwal sholat
│   ├── prayer-collection/ # Komponen kumpulan doa
│   └── quran/           # Komponen Al-Qur'an
├── store/               # State management
│   └── useAppStore.ts   # Zustand store
├── App.tsx              # Main App component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## 🎯 Panduan Penggunaan

### Membaca Al-Qur'an
1. Pilih surah dari daftar di halaman utama
2. Navigasi antar ayat dengan scroll
3. Klik tombol play untuk mendengar audio
4. Klik bookmark untuk menyimpan ayat favorit

### Mengatur Jadwal Sholat
1. Izinkan akses lokasi untuk deteksi otomatis
2. Atau masukkan nama kota secara manual
3. Aktifkan notifikasi untuk reminder
4. Lihat countdown ke sholat berikutnya

### Menggunakan Kalender
1. Navigasi antar bulan dengan tombol panah
2. Lihat tanggal Hijriah di setiap tanggal Masehi
3. Tanggal penting ditandai dengan bintang

### Menggunakan Kumpulan Doa
1. Telusuri doa berdasarkan kategori
2. Baca doa lengkap
3. Bookmark doa untuk digunakan nanti

### Menggunakan Bookmark
1. Temukan konten yang telah disimpan
2. Akses kembali ayat atau doa favorit
3. Hapus bookmark yang tidak diperlukan

## 🏗️ Arsitektur Aplikasi

### State Management
- **Zustand**: Global state untuk theme dan preferences
- **React Query**: Caching dan fetching data API

### Component Architecture
- **Separation of Concerns**: Logic, UI, dan data terpisah
- **Reusable Components**: Komponen dapat digunakan kembali

### Performance Optimizations
- **Lazy Loading**: Load komponen saat diperlukan
- **Memoization**: Prevent unnecessary re-renders

## 🌐 Deployment

### Build untuk Production
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Deployment Options
- **Vercel**: Works out of the box with static deployment
- **Netlify**: `netlify deploy --prod --dir=dist`
- **GitHub Pages**: Push to branch gh-pages

### Environment Variables
No environment variables are required for production deployment.

### API Data
- **Prayers**: Static data included in the build for production
- **Quran**: Fetched from external API (quran-api.santrikoding.com)
- **Prayer Times**: Fetched from external API (api.aladhan.com)
- **Calendar**: Fetched from external API (api.aladhan.com)

## 📱 Responsif Mobile

Aplikasi ini dirancang dengan pendekatan mobile-first:
- **Navigasi Bawah**: Menu navigasi di bagian bawah untuk akses mudah di mobile
- **Scroll Horizontal**: Menu dapat di-scroll horizontal pada layar kecil
- **Layout Adaptif**: Menyesuaikan dengan ukuran layar perangkat
- **Touch Friendly**: Elemen interaktif dioptimalkan untuk layar sentuh

## 🧪 Testing

### Development Server
```bash
npm run dev
```

### Build untuk Production
```bash
npm run build
```

## 🔧 Troubleshooting

### Masalah Umum dan Solusi

#### 1. Audio tidak bisa diputar
**Masalah**: Error saat memutar audio ayat
**Solusi**: 
- Pastikan koneksi internet stabil
- Beberapa browser memerlukan interaksi user terlebih dahulu
- Coba refresh halaman dan klik tombol play lagi

#### 2. Lokasi tidak terdeteksi
**Masalah**: Geolocation tidak bekerja
**Solusi**:
- Pastikan browser mengizinkan akses lokasi
- Gunakan HTTPS (required untuk geolocation)
- Masukkan nama kota secara manual sebagai alternatif

#### 3. Jadwal sholat tidak akurat
**Masalah**: Waktu sholat tidak sesuai dengan lokasi
**Solusi**:
- Periksa pengaturan lokasi
- Pastikan koordinat atau nama kota sudah benar

## 🤝 Kontribusi

Kami menyambut kontribusi dari komunitas! Untuk berkontribusi:

### Development Setup
1. Fork repository ini
2. Buat branch baru: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push ke branch: `git push origin feature/amazing-feature`
5. Buat Pull Request

### Contribution Guidelines
- Ikuti code style yang ada
- Tulis tests untuk fitur baru
- Update dokumentasi jika diperlukan
- Pastikan semua tests pass

## 📄 Lisensi

Aplikasi ini dilisensikan under MIT License. Lihat file [LICENSE](LICENSE) untuk detail lengkap.

## 👥 Tim Pengembang

- **Frontend Developer**: React.js, TypeScript, Tailwind CSS

## 📞 Support

Butuh bantuan? Hubungi kami:
- **GitHub Issues**: [Create New Issue](https://github.com/ariardana/IslamApp/issues)

---

**Built with ❤️ for the Muslim community**