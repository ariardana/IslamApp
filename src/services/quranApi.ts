import axios from 'axios';
import { Surah, Ayah } from '../types';

const QURAN_API_BASE = 'https://quran-api.santrikoding.com/api';

// Interface for the new API response structure
interface SantriSurah {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
}

interface SantriAyah {
  id: number;
  surah: number;
  nomor: number;
  ar: string;
  tr: string;
  idn: string;
}

interface SantriSurahDetail extends SantriSurah {
  ayat: SantriAyah[];
}

export const quranApi = {
  // Get all surahs
  getSurahs: async (): Promise<Surah[]> => {
    const response = await axios.get<SantriSurah[]>(`${QURAN_API_BASE}/surah`);
    return response.data.map(surah => ({
      number: surah.nomor,
      name: surah.nama,
      englishName: surah.nama_latin,
      englishNameTranslation: surah.arti,
      numberOfAyahs: surah.jumlah_ayat,
      revelationType: surah.tempat_turun,
      description: surah.deskripsi,
      audio: surah.audio,
    }));
  },

  // Get specific surah with ayahs
  getSurah: async (surahNumber: number): Promise<any> => {
    const response = await axios.get<SantriSurahDetail>(`${QURAN_API_BASE}/surah/${surahNumber}`);
    
    // Map the response to match expected structure
    return {
      number: response.data.nomor,
      name: response.data.nama,
      englishName: response.data.nama_latin,
      englishNameTranslation: response.data.arti,
      numberOfAyahs: response.data.jumlah_ayat,
      revelationType: response.data.tempat_turun,
      description: response.data.deskripsi,
      audio: response.data.audio,
      ayahs: response.data.ayat.map(ayah => ({
        number: ayah.id,
        text: ayah.ar,
        numberInSurah: ayah.nomor,
        translation: ayah.idn,
        juz: 0,
        manzil: 0,
        page: 0,
        ruku: 0,
        hizbQuarter: 0,
        sajda: false,
      })),
    };
  },

  // Get surah with Indonesian translation (same as getSurah now since new API includes translation)
  getSurahWithTranslation: async (surahNumber: number): Promise<any> => {
    return await quranApi.getSurah(surahNumber);
  },

  // Search ayahs (not available in new API, so we'll implement a simple search in the frontend)
  searchAyahs: async (query: string): Promise<any> => {
    // For now, we'll return an empty result since search is not available in the new API
    // We'll need to implement search functionality in the frontend by fetching all surahs
    // and searching through them
    return [];
  },

  // Get Juz (not available in new API)
  getJuz: async (juzNumber: number): Promise<any> => {
    // Not available in the new API, so we return an empty result
    return {};
  },

  // Get audio for ayah (using the surah audio as fallback since ayah-level audio is not available)
  getAyahAudio: (surahNumber: number, ayahNumber: number): string => {
    // Return surah-level audio since ayah-level audio is not available in the API response
    return `https://santrikoding.com/storage/audio/${surahNumber.toString().padStart(3, '0')}.mp3`;
  }
};