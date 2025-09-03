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

### Deployment ke Vercel
1. **Import Project**: Masuk ke [Vercel Dashboard](https://vercel.com/dashboard) dan impor repository ini
2. **Konfigurasi Environment Variables** (jika diperlukan):
   - Tidak ada environment variables khusus yang diperlukan
3. **Deploy**: Vercel akan secara otomatis mendeteksi konfigurasi dan membuild aplikasi
4. **Domain**: Setelah deploy selesai, Vercel akan memberikan URL untuk aplikasi Anda

### Deployment ke Platform Lain
- **Netlify**: `netlify deploy --prod --dir=dist`
- **GitHub Pages**: Push ke branch gh-pages

### Environment Variables
Untuk lingkungan production, aplikasi menggunakan konfigurasi berikut:
- API Quran: `https://equran.id/api/v2` (langsung)
- API Doa: `https://doa-doa-api-ahmadramadhan.fly.dev/api` (langsung)
- API Jadwal Sholat: `https://api.aladhan.com/v1` (langsung)

Untuk lingkungan development, semua API di-proxy melalui server lokal untuk menghindari masalah CORS.

### API Data
- **Prayers**: Static data included in the build for production
- **Quran**: Fetched from external API (equran.id)
- **Prayer Times**: Fetched from external API (api.aladhan.com)
- **Calendar**: Fetched from external API (api.aladhan.com)

## 📊 API Documentation

IslamApp menyediakan API endpoints yang dapat digunakan untuk mengakses data keislaman. API ini dibagi menjadi beberapa kategori:

### 1. API Al-Qur'an

#### Mendapatkan Daftar Surah
- **Endpoint**: `/api/quran/surahs`
- **Method**: `GET`
- **Deskripsi**: Mengambil daftar semua surah dalam Al-Qur'an
- **Response**:
  ```json
  [
    {
      "number": 1,
      "name": "سُورَةُ ٱلْفَاتِحَةِ",
      "englishName": "Al-Fatihah",
      "englishNameTranslation": "The Opening",
      "numberOfAyahs": 7,
      "revelationType": "Meccan",
      "description": "Surah Al-Fatihah memiliki tujuh ayat dan termasuk dalam surah-surah Makkiyah.",
      "audio": "https://equran.id/audio-full/010001.mp3",
      "namaLatin": "Al-Fatihah",
      "tempatTurun": "Mekah",
      "arti": "Pembukaan",
      "audioFull": {
        "01": "https://equran.id/audio-full/010001.mp3",
        "02": "https://equran.id/audio-full/010002.mp3"
      }
    }
  ]
  ```

#### Mendapatkan Detail Surah dengan Ayat
- **Endpoint**: `/api/quran/surahs/{number}`
- **Method**: `GET`
- **Deskripsi**: Mengambil detail surah beserta semua ayatnya
- **Parameter**: 
  - `number` (integer) - Nomor surah (1-114)
- **Response**:
  ```json
  {
    "number": 112,
    "name": "سُورَةُ ٱلْإِخْلَاصِ",
    "englishName": "Al-Ikhlas",
    "englishNameTranslation": "The Sincerity",
    "numberOfAyahs": 4,
    "revelationType": "Meccan",
    "description": "Surah Al-Ikhlas terdiri atas 4 ayat, termasuk golongan surah-surah Makkiyah, diturunkan sesudah surah Al-Falaq.",
    "audio": "https://equran.id/audio-full/112001.mp3",
    "namaLatin": "Al-Ikhlas",
    "tempatTurun": "Mekah",
    "arti": "Ikhlas",
    "audioFull": {
      "01": "https://equran.id/audio-full/112001.mp3"
    },
    "ayahs": [
      {
        "number": 1,
        "text": "قُلْ هُوَ اللَّهُ أَحَدٌ",
        "numberInSurah": 1,
        "juz": 0,
        "manzil": 0,
        "page": 0,
        "ruku": 0,
        "hizbQuarter": 0,
        "sajda": false,
        "audio": "https://equran.id/audio-full/112001.mp3",
        "translation": "Katakanlah (Muhammad), \"Dialah Allah, Yang Maha Esa.",
        "transliteration": "Qul huwallāhu 'aḥad(un).",
        "nomorAyat": 1,
        "teksArab": "قُلْ هُوَ اللَّهُ أَحَدٌ",
        "teksLatin": "Qul huwallāhu 'aḥad(un).",
        "teksIndonesia": "Katakanlah (Muhammad), \"Dialah Allah, Yang Maha Esa.",
        "audioSecondary": [
          "https://equran.id/audio-full/112001.mp3"
        ]
      }
    ]
  }
  ```

### 2. API Doa

#### Mendapatkan Semua Doa
- **Endpoint**: `/api/prayers`
- **Method**: `GET`
- **Deskripsi**: Mengambil semua doa yang tersedia
- **Response**:
  ```json
  [
    {
      "id": "1",
      "title": "Doa Sebelum Makan",
      "arabic": "اَللّٰهُمَّ بَارِكْ لَنَا فِيْمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ",
      "latin": "Alloohumma barik lanaa fiimaa razatanaa waqinaa 'adzaa bannaar",
      "translation": "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka"
    }
  ]
  ```

#### Mencari Doa
- **Endpoint**: `/api/prayers/search`
- **Method**: `GET`
- **Deskripsi**: Mencari doa berdasarkan judul
- **Parameters**:
  - `q` (string) - Kata kunci pencarian
- **Response**: Sama dengan format di atas

#### Mendapatkan Doa Spesifik
- **Endpoint**: `/api/prayers/{id}`
- **Method**: `GET`
- **Deskripsi**: Mengambil detail doa berdasarkan ID
- **Parameter**: 
  - `id` (string) - ID doa
- **Response**: Sama dengan format di atas

### 3. API Jadwal Sholat

#### Mendapatkan Jadwal Sholat Berdasarkan Kota
- **Endpoint**: `/api/prayer-times/city`
- **Method**: `GET`
- **Deskripsi**: Mengambil jadwal sholat berdasarkan nama kota
- **Parameters**:
  - `city` (string) - Nama kota (required)
  - `country` (string) - Nama negara (optional, default: Indonesia)
- **Response**:
  ```json
  {
    "timings": {
      "Fajr": "04:34",
      "Sunrise": "05:51",
      "Dhuhr": "11:57",
      "Asr": "15:24",
      "Sunset": "17:59",
      "Maghrib": "17:59",
      "Isha": "19:14",
      "Imsak": "04:24",
      "Midnight": "23:54"
    },
    "date": {
      "readable": "24 May 2024",
      "timestamp": "1716508800",
      "hijri": {
        "date": "15-11-1445",
        "format": "DD-MM-YYYY",
        "day": "15",
        "holiday": null,
        "month": {
          "number": 11,
          "en": "Dhu al-Qi'dah"
        },
        "year": "1445",
        "designation": {
          "abbreviated": "AH",
          "expanded": "Anno Hegirae"
        }
      },
      "gregorian": {
        "date": "24-05-2024",
        "format": "DD-MM-YYYY",
        "day": "24",
        "weekday": {
          "en": "Friday"
        },
        "month": {
          "number": 5,
          "en": "May"
        },
        "year": "2024",
        "designation": {
          "abbreviated": "AD",
          "expanded": "Anno Domini"
        }
      }
    }
  }
  ```

#### Mendapatkan Jadwal Sholat Berdasarkan Koordinat
- **Endpoint**: `/api/prayer-times/coordinates`
- **Method**: `GET`
- **Deskripsi**: Mengambil jadwal sholat berdasarkan koordinat geografis
- **Parameters**:
  - `latitude` (float) - Garis lintang (required)
  - `longitude` (float) - Garis bujur (required)
- **Response**: Sama dengan format di atas

### 4. API Kalender Hijriah

#### Mendapatkan Kalender Hijriah
- **Endpoint**: `/api/calendar/hijri/{year}/{month}`
- **Method**: `GET`
- **Deskripsi**: Mengambil data kalender Hijriah untuk bulan dan tahun tertentu
- **Parameters**:
  - `year` (integer) - Tahun Hijriah (contoh: 1445)
  - `month` (integer) - Bulan Hijriah (1-12)
  - `latitude` (float) - Garis lintang (optional, default: -6.2088)
  - `longitude` (float) - Garis bujur (optional, default: 106.8456)
- **Response**:
  ```json
  [
    {
      "timings": {
        "Fajr": "04:34",
        "Sunrise": "05:51",
        "Dhuhr": "11:57",
        "Asr": "15:24",
        "Sunset": "17:59",
        "Maghrib": "17:59",
        "Isha": "19:14",
        "Imsak": "04:24",
        "Midnight": "23:54"
      },
      "date": {
        "readable": "24 May 2024",
        "timestamp": "1716508800",
        "hijri": {
          "date": "15-11-1445",
          "format": "DD-MM-YYYY",
          "day": "15",
          "holiday": null,
          "month": {
            "number": 11,
            "en": "Dhu al-Qi'dah"
          },
          "year": "1445",
          "designation": {
            "abbreviated": "AH",
            "expanded": "Anno Hegirae"
          }
        },
        "gregorian": {
          "date": "24-05-2024",
          "format": "DD-MM-YYYY",
          "day": "24",
          "weekday": {
            "en": "Friday"
          },
          "month": {
            "number": 5,
            "en": "May"
          },
          "year": "2024",
          "designation": {
            "abbreviated": "AD",
            "expanded": "Anno Domini"
          }
        }
      }
    }
  ]
  ```

### 5. API Bookmark

#### Mendapatkan Bookmark
- **Endpoint**: `/api/bookmarks`
- **Method**: `GET`
- **Deskripsi**: Mengambil daftar bookmark pengguna (untuk penggunaan di production akan terhubung dengan database)
- **Response**:
  ```json
  {
    "ayahs": [],
    "prayers": [],
    "news": []
  }
  ```

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

#### 4. Gagal memuat daftar surah di Vercel
**Masalah**: Error saat memuat daftar surah di lingkungan production
**Solusi**:
- Pastikan server proxy berjalan dengan baik
- Periksa logs Vercel untuk error spesifik
- Coba refresh halaman beberapa kali
- Jika masalah persisten, laporkan sebagai issue di GitHub

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