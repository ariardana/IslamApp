# IslamApp - Platform Islam Digital Lengkap

![IslamApp](https://images.pexels.com/photos/8164742/pexels-photo-8164742.jpeg?auto=compress&cs=tinysrgb&w=1200)

Platform Islam digital modern yang menyediakan layanan keislaman lengkap dalam satu aplikasi. Dirancang khusus untuk komunitas Muslim Indonesia dengan antarmuka yang intuitif dan fitur-fitur komprehensif.

## 🌟 Fitur Utama

### 📖 Al-Qur'an Digital
- **30 Juz Lengkap**: Akses seluruh Al-Qur'an dengan teks Arab asli
- **Terjemahan Indonesia**: Terjemahan resmi Kementerian Agama RI
- **Audio Recitation**: Pembacaan oleh qari terkenal dengan kualitas tinggi
- **Pencarian Ayat**: Cari ayat berdasarkan kata kunci dalam Arab dan terjemahan
- **Bookmark**: Simpan ayat favorit untuk dibaca kembali
- **Mode Baca**: Antarmuka yang nyaman untuk mata dengan tema terang/gelap

### 🕌 Jadwal Sholat
- **5 Waktu Sholat**: Subuh, Dzuhur, Ashar, Maghrib, Isya
- **Deteksi Lokasi Otomatis**: Menggunakan GPS untuk akurasi maksimal
- **Input Manual Kota**: Pilihan untuk memasukkan kota secara manual
- **Countdown Timer**: Hitung mundur ke waktu sholat berikutnya
- **Notifikasi**: Pengingat waktu sholat (dapat diaktifkan/nonaktifkan)
- **Akurasi Tinggi**: Menggunakan metode perhitungan Kementerian Agama Indonesia

### 📅 Kalender Hijriah
- **Konversi Otomatis**: Tampilkan tanggal Hijriah dan Masehi
- **Hari Penting Islam**: Ramadan, Idul Fitri, Idul Adha, Maulid, dan lainnya
- **Informasi Puasa**: Jadwal puasa wajib dan sunnah
- **Navigasi Mudah**: Jelajahi bulan dan tahun dengan mudah
- **Reminder**: Pengingat untuk hari-hari istimewa

### 📰 Berita Islam
- **Berita Terkini**: Update terbaru dari dunia Islam
- **Kategori Lengkap**: Dakwah, Haji/Umrah, Pendidikan Islam
- **Bookmark Artikel**: Simpan artikel untuk dibaca nanti
- **Share ke Media Sosial**: Bagikan artikel bermanfaat
- **Offline Reading**: Baca artikel yang tersimpan tanpa internet

## 🚀 Demo Aplikasi

![Dashboard](https://images.pexels.com/photos/6208088/pexels-photo-6208088.jpeg?auto=compress&cs=tinysrgb&w=800)
*Dashboard utama dengan akses cepat ke semua fitur*

![Al-Quran Reader](https://images.pexels.com/photos/8613313/pexels-photo-8613313.jpeg?auto=compress&cs=tinysrgb&w=800)
*Pembaca Al-Qur'an dengan teks Arab, terjemahan, dan audio*

![Prayer Times](https://images.pexels.com/photos/16230515/pexels-photo-16230515.jpeg?auto=compress&cs=tinysrgb&w=800)
*Jadwal sholat dengan countdown dan deteksi lokasi*

## 📋 Prerequisites

Pastikan Anda telah menginstall:
- **Node.js** (versi 18.0.0 atau lebih baru)
- **npm** (versi 8.0.0 atau lebih baru)
- Browser modern (Chrome, Firefox, Safari, Edge)

## ⚡ Instalasi Cepat

### 1. Clone Repository
```bash
git clone https://github.com/username/islamapp.git
cd islamapp
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
  "@tanstack/react-query": "^5.0.0",    // State management untuk API calls
  "zustand": "^4.4.0",                  // Global state management
  "react-router-dom": "^6.8.0",         // Routing
  "axios": "^1.6.0",                    // HTTP client
  "date-fns": "^2.30.0",                // Date manipulation
  "react-hot-toast": "^2.4.0",          // Toast notifications
  "lucide-react": "^0.344.0"            // Icon library
}
```

### Development Dependencies
```json
{
  "@vitejs/plugin-react": "^4.3.1",     // React plugin untuk Vite
  "tailwindcss": "^3.4.1",              // CSS framework
  "typescript": "^5.5.3",               // TypeScript support
  "autoprefixer": "^10.4.18",           // CSS autoprefixer
  "postcss": "^8.4.35"                  // CSS processing
}
```

## 📁 Struktur Folder

```
src/
├── components/           # Komponen React
│   ├── common/          # Komponen umum (LoadingSpinner, dll)
│   ├── layout/          # Layout components (Header, Navigation)
│   ├── quran/           # Komponen Al-Qur'an
│   ├── prayer/          # Komponen jadwal sholat
│   ├── calendar/        # Komponen kalender
│   ├── news/            # Komponen berita
│   └── bookmarks/       # Komponen bookmark
├── hooks/               # Custom React hooks
│   ├── useQuran.ts      # Hooks untuk Al-Qur'an
│   ├── usePrayerTimes.ts# Hooks untuk jadwal sholat
│   └── useGeolocation.ts# Hook untuk lokasi
├── services/            # API services
│   ├── quranApi.ts      # API Al-Qur'an
│   ├── prayerTimesApi.ts# API jadwal sholat
│   └── newsApi.ts       # API berita
├── store/               # State management
│   └── useAppStore.ts   # Zustand store
├── types/               # TypeScript type definitions
│   └── index.ts         # Type definitions
├── utils/               # Utility functions
│   └── islamicUtils.ts  # Helper functions Islam
├── App.tsx              # Main App component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

## 🔧 Konfigurasi API

### API Al-Qur'an (AlQuran.cloud)
```typescript
const QURAN_API_BASE = 'https://api.alquran.cloud/v1';
```
- **Gratis**: Ya
- **Rate Limit**: Tidak ada
- **Authentication**: Tidak diperlukan

### API Jadwal Sholat (Aladhan)
```typescript
const PRAYER_API_BASE = 'http://api.aladhan.com/v1';
```
- **Gratis**: Ya
- **Rate Limit**: Tidak ada
- **Method**: Kementerian Agama Indonesia (ID: 20)

### Konfigurasi Lokasi Default
```typescript
// Jakarta sebagai lokasi default
latitude: -6.2088
longitude: 106.8456
```

## 📱 Fitur PWA (Progressive Web App)

Aplikasi mendukung PWA dengan fitur:
- **Offline Access**: Bekerja tanpa koneksi internet
- **Install ke Home Screen**: Install seperti aplikasi native
- **Fast Loading**: Caching untuk performa optimal
- **Responsive**: Bekerja di semua perangkat

## 🎨 Panduan Desain

### Color Palette
- **Primary**: Emerald (#10B981) - Warna utama Islam
- **Secondary**: Gold (#F59E0B) - Aksen emas
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)
- **Neutral**: Gray scale untuk teks dan background

### Typography
- **Heading**: Inter font family, weights 600-700
- **Body**: Inter font family, weight 400-500
- **Arabic**: Amiri font family untuk teks Arab

### Spacing System
- Menggunakan sistem 8px grid
- Konsisten untuk padding, margin, dan spacing

## 🎯 Panduan Penggunaan

### Membaca Al-Qur'an
1. Pilih surah dari daftar di halaman utama
2. Navigasi antar ayat dengan scroll
3. Klik tombol play untuk mendengar audio
4. Klik bookmark untuk menyimpan ayat favorit
5. Gunakan fitur pencarian untuk mencari ayat spesifik

### Mengatur Jadwal Sholat
1. Izinkan akses lokasi untuk deteksi otomatis
2. Atau masukkan nama kota secara manual
3. Aktifkan notifikasi untuk reminder
4. Lihat countdown ke sholat berikutnya

### Menggunakan Kalender
1. Navigasi antar bulan dengan tombol panah
2. Lihat tanggal Hijriah di setiap tanggal Masehi
3. Tanggal penting ditandai dengan bintang
4. Klik tanggal untuk detail informasi

### Membaca Berita
1. Pilih kategori berita yang diminati
2. Baca artikel lengkap
3. Bookmark artikel untuk dibaca nanti
4. Share artikel ke media sosial

## 🏗️ Arsitektur Aplikasi

### State Management
- **Zustand**: Global state untuk theme, bookmarks, dan preferences
- **React Query**: Caching dan fetching data API
- **Local Storage**: Persist user preferences

### Component Architecture
- **Atomic Design**: Komponen terorganisir dari atomic ke pages
- **Separation of Concerns**: Logic, UI, dan data terpisah
- **Reusable Components**: Komponen dapat digunakan kembali

### Performance Optimizations
- **Lazy Loading**: Load komponen saat diperlukan
- **Memoization**: Prevent unnecessary re-renders
- **Virtualization**: Untuk list panjang (surah, ayat)
- **Image Optimization**: Optimasi gambar untuk loading cepat

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
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod --dir=dist`
- **GitHub Pages**: Push ke branch gh-pages

### Environment Variables
Buat file `.env` untuk konfigurasi:
```env
VITE_APP_TITLE=IslamApp
VITE_PRAYER_API_KEY=your_api_key_here
VITE_NEWS_API_KEY=your_news_api_key_here
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Performance Testing
```bash
npm run lighthouse
```

## 📊 Best Practices yang Diterapkan

### Code Quality
- **TypeScript**: Type safety untuk mengurangi bugs
- **ESLint**: Linting untuk konsistensi kode
- **Prettier**: Code formatting otomatis
- **Husky**: Pre-commit hooks untuk quality control

### Accessibility (WCAG 2.1)
- **Keyboard Navigation**: Navigasi penuh dengan keyboard
- **Screen Reader Support**: ARIA labels dan semantic HTML
- **Color Contrast**: Rasio kontras minimum 4.5:1
- **Focus Management**: Focus yang jelas dan logis

### SEO Optimization
- **Meta Tags**: Lengkap untuk semua pages
- **Semantic HTML**: Struktur HTML yang bermakna
- **Open Graph**: Preview yang menarik di media sosial
- **Structured Data**: Schema markup untuk search engines

### Performance
- **Bundle Optimization**: Code splitting dan tree shaking
- **Image Optimization**: Lazy loading dan responsive images
- **Caching Strategy**: Service worker untuk offline capability
- **Core Web Vitals**: Optimasi untuk LCP, FID, dan CLS

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
- API menggunakan metode Kementerian Agama Indonesia

#### 4. Tema tidak tersimpan
**Masalah**: Preference tema tidak persist
**Solusi**:
- Clear browser cache dan cookies
- Pastikan localStorage tidak diblokir
- Coba di mode incognito untuk testing

#### 5. Build error
**Masalah**: Error saat build production
**Solusi**:
```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install

# Jalankan type checking
npm run type-check

# Build ulang
npm run build
```

### Performance Issues

#### Aplikasi lambat loading
- Periksa koneksi internet
- Clear browser cache
- Disable extensions yang mengganggu
- Gunakan browser versi terbaru

#### Memory usage tinggi
- Tutup tab browser lain yang tidak diperlukan
- Restart browser
- Update browser ke versi terbaru

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

### Reporting Issues
Gunakan GitHub Issues dengan template:
- **Bug Report**: Untuk melaporkan bug
- **Feature Request**: Untuk request fitur baru
- **Documentation**: Untuk perbaikan dokumentasi

## 📄 Lisensi

Aplikasi ini dilisensikan under MIT License. Lihat file [LICENSE](LICENSE) untuk detail lengkap.

## 👥 Tim Pengembang

- **Frontend Developer**: React.js, TypeScript, Tailwind CSS
- **UI/UX Designer**: Figma, Adobe XD
- **Islamic Content Advisor**: Validasi konten dan referensi

## 🙏 Acknowledgments

- **AlQuran.cloud**: API Al-Qur'an gratis dan berkualitas
- **Aladhan.com**: API jadwal sholat yang akurat
- **Kementerian Agama RI**: Metode perhitungan jadwal sholat
- **Komunitas Open Source**: Libraries dan tools yang digunakan

## 📞 Support

Butuh bantuan? Hubungi kami:
- **Email**: support@islamapp.id
- **GitHub Issues**: [Create New Issue](https://github.com/username/islamapp/issues)
- **Documentation**: [docs.islamapp.id](https://docs.islamapp.id)

## 🔄 Changelog

### v1.0.0 (2025-01-01)
- ✅ Initial release
- ✅ Al-Qur'an digital lengkap
- ✅ Jadwal sholat dengan geolocation
- ✅ Kalender Hijriah
- ✅ Berita Islam
- ✅ PWA support
- ✅ Dark/Light theme

### Upcoming Features
- 🔄 Tasbih digital
- 🔄 Doa harian
- 🔄 Qibla direction
- 🔄 Islamic quiz
- 🔄 Community forum

---

**Built with ❤️ for the Muslim community in Indonesia**

*"Dan Kami turunkan dari Al-Qur'an suatu yang menjadi penawar dan rahmat bagi orang-orang yang beriman"* - QS. Al-Isra: 82