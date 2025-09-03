import axios from 'axios';
import { Surah, Ayah } from '../types';

// Use local proxy in development to avoid CORS issues, direct API in production
const IS_DEVELOPMENT = import.meta.env.DEV;
const QURAN_API_BASE = IS_DEVELOPMENT ? '/api' : 'https://equran.id/api/v2';

// Interface for the equran.id API response structure
interface EquranSurah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  audioFull: {
    [key: string]: string;
  };
}

interface EquranAyah {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: {
    [key: string]: string;
  };
}

interface EquranSurahDetail {
  code: number;
  message: string;
  data: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: {
      [key: string]: string;
    };
    ayat: EquranAyah[];
  };
}

interface EquranSurahList {
  code: number;
  message: string;
  data: EquranSurah[];
}

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: QURAN_API_BASE,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Quran API Error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Request error:', error.request);
    } else {
      // Something else happened
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

export const quranApi = {
  // Get all surahs
  getSurahs: async (): Promise<Surah[]> => {
    try {
      console.log('Fetching surahs from:', `${QURAN_API_BASE}/surat`);
      
      // For development, use the proxy endpoint
      if (IS_DEVELOPMENT) {
        const response = await apiClient.get<EquranSurahList>('/quran/surahs');
        return response.data;
      }
      
      // For production, use the direct API endpoint
      const response = await apiClient.get<EquranSurahList>('/surat');
      console.log('Surahs response:', response.data);
      
      if (response.data.code !== 200) {
        throw new Error(`API returned error code: ${response.data.code}`);
      }
      
      return response.data.data.map(surah => ({
        number: surah.nomor,
        name: surah.nama,
        englishName: surah.namaLatin,
        englishNameTranslation: surah.arti,
        numberOfAyahs: surah.jumlahAyat,
        revelationType: surah.tempatTurun,
        description: surah.deskripsi,
        audio: surah.audioFull ? Object.values(surah.audioFull)[0] : undefined,
        namaLatin: surah.namaLatin,
        tempatTurun: surah.tempatTurun,
        arti: surah.arti,
        audioFull: surah.audioFull,
      }));
    } catch (error: any) {
      console.error('Error fetching surahs:', error);
      if (IS_DEVELOPMENT) {
        if (error.response?.status === 404) {
          throw new Error('API tidak ditemukan');
        } else if (error.response?.status === 500) {
          throw new Error('Server API sedang bermasalah');
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Waktu koneksi habis. Silakan coba lagi.');
        } else if (error.message?.includes('Network Error')) {
          throw new Error('Koneksi terputus. Periksa koneksi internet Anda.');
        }
        throw new Error('Gagal mengambil daftar surah. Silakan coba lagi.');
      } else {
        throw error;
      }
    }
  },

  // Get specific surah with ayahs (Arabic text)
  getSurah: async (surahNumber: number): Promise<any> => {
    try {
      console.log('Fetching surah:', surahNumber);
      
      // For development, use the proxy endpoint
      if (IS_DEVELOPMENT) {
        const response = await apiClient.get<EquranSurahDetail>(`/quran/surahs/${surahNumber}`);
        return response.data;
      }
      
      // For production, use the direct API endpoint
      const response = await apiClient.get<EquranSurahDetail>(`/surat/${surahNumber}`);
      
      if (response.data.code !== 200) {
        throw new Error(`API returned error code: ${response.data.code}`);
      }
      
      return {
        number: response.data.data.nomor,
        name: response.data.data.nama,
        englishName: response.data.data.namaLatin,
        englishNameTranslation: response.data.data.arti,
        numberOfAyahs: response.data.data.jumlahAyat,
        revelationType: response.data.data.tempatTurun,
        description: response.data.data.deskripsi,
        audio: response.data.data.audioFull ? Object.values(response.data.data.audioFull)[0] : undefined,
        namaLatin: response.data.data.namaLatin,
        tempatTurun: response.data.data.tempatTurun,
        arti: response.data.data.arti,
        audioFull: response.data.data.audioFull,
        ayahs: response.data.data.ayat.map(ayah => ({
          number: ayah.nomorAyat,
          text: ayah.teksArab,
          numberInSurah: ayah.nomorAyat,
          juz: 0, // Not provided in new API
          manzil: 0, // Not provided in new API
          page: 0, // Not provided in new API
          ruku: 0, // Not provided in new API
          hizbQuarter: 0, // Not provided in new API
          sajda: false, // Not provided in new API
          audio: ayah.audio ? Object.values(ayah.audio)[0] : undefined,
          nomorAyat: ayah.nomorAyat,
          teksArab: ayah.teksArab,
          teksLatin: ayah.teksLatin,
          teksIndonesia: ayah.teksIndonesia,
          audioSecondary: ayah.audio ? Object.values(ayah.audio) : [],
        })),
      };
    } catch (error: any) {
      console.error(`Error fetching surah ${surahNumber}:`, error);
      if (IS_DEVELOPMENT) {
        if (error.response?.status === 404) {
          throw new Error('Surah tidak ditemukan');
        } else if (error.response?.status === 500) {
          throw new Error('Server API sedang bermasalah');
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Waktu koneksi habis. Silakan coba lagi.');
        } else if (error.message?.includes('Network Error')) {
          throw new Error('Koneksi terputus. Periksa koneksi internet Anda.');
        }
        throw new Error('Gagal mengambil detail surah. Silakan coba lagi.');
      } else {
        throw error;
      }
    }
  },

  // Get surah with Indonesian translation and Latin transliteration
  getSurahWithTranslation: async (surahNumber: number): Promise<any> => {
    try {
      // The new API already includes translation and transliteration in the same endpoint
      console.log('Fetching surah with translation:', surahNumber);
      
      // For development, use the proxy endpoint
      if (IS_DEVELOPMENT) {
        const response = await apiClient.get<EquranSurahDetail>(`/quran/surahs/${surahNumber}`);
        return response.data;
      }
      
      // For production, use the direct API endpoint
      const response = await apiClient.get<EquranSurahDetail>(`/surat/${surahNumber}`);
      
      if (response.data.code !== 200) {
        throw new Error(`API returned error code: ${response.data.code}`);
      }
      
      return {
        number: response.data.data.nomor,
        name: response.data.data.nama,
        englishName: response.data.data.namaLatin,
        englishNameTranslation: response.data.data.arti,
        numberOfAyahs: response.data.data.jumlahAyat,
        revelationType: response.data.data.tempatTurun,
        description: response.data.data.deskripsi,
        audio: response.data.data.audioFull ? Object.values(response.data.data.audioFull)[0] : undefined,
        namaLatin: response.data.data.namaLatin,
        tempatTurun: response.data.data.tempatTurun,
        arti: response.data.data.arti,
        audioFull: response.data.data.audioFull,
        ayahs: response.data.data.ayat.map(ayah => ({
          number: ayah.nomorAyat,
          text: ayah.teksArab,
          numberInSurah: ayah.nomorAyat,
          juz: 0, // Not provided in new API
          manzil: 0, // Not provided in new API
          page: 0, // Not provided in new API
          ruku: 0, // Not provided in new API
          hizbQuarter: 0, // Not provided in new API
          sajda: false, // Not provided in new API
          audio: ayah.audio ? Object.values(ayah.audio)[0] : undefined,
          translation: ayah.teksIndonesia,
          transliteration: ayah.teksLatin,
          nomorAyat: ayah.nomorAyat,
          teksArab: ayah.teksArab,
          teksLatin: ayah.teksLatin,
          teksIndonesia: ayah.teksIndonesia,
          audioSecondary: ayah.audio ? Object.values(ayah.audio) : [],
        })),
      };
    } catch (error: any) {
      console.error(`Error fetching surah with translation ${surahNumber}:`, error);
      if (IS_DEVELOPMENT) {
        if (error.response?.status === 404) {
          throw new Error('Surah tidak ditemukan');
        } else if (error.response?.status === 500) {
          throw new Error('Server API sedang bermasalah');
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Waktu koneksi habis. Silakan coba lagi.');
        } else if (error.message?.includes('Network Error')) {
          throw new Error('Koneksi terputus. Periksa koneksi internet Anda.');
        }
        throw new Error('Gagal mengambil detail surah. Silakan coba lagi.');
      } else {
        throw error;
      }
    }
  },

  // Search ayahs (simple implementation - fetch surah and search within it)
  searchAyahs: async (query: string): Promise<any> => {
    // For now, we'll return an empty result since search is not available in the new API
    // We'll need to implement search functionality in the frontend by fetching all surahs
    // and searching through them
    return [];
  },

  // Get Juz (not directly available, so we'll implement by getting all surahs in a juz)
  getJuz: async (juzNumber: number): Promise<any> => {
    // Not directly available in the new API, so we return an empty result
    return {};
  },

  // Get audio for ayah
  getAyahAudio: (ayahAudio: { [key: string]: string } | undefined): string => {
    // Return the first audio URL from the audio object
    if (ayahAudio && Object.keys(ayahAudio).length > 0) {
      return Object.values(ayahAudio)[0];
    }
    return '';
  }
};