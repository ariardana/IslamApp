import axios from 'axios';
import { Surah, Ayah } from '../types';

const QURAN_API_BASE = 'http://api.alquran.cloud/v1';

// Interface for the alquran.cloud API response structure
interface AlQuranSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  description?: string;
  audio?: string;
}

interface AlQuranAyah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  audio?: string;
  audioSecondary?: string[];
}

interface AlQuranSurahDetail {
  code: number;
  status: string;
  data: {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    revelationType: string;
    numberOfAyahs: number;
    ayahs: AlQuranAyah[];
    edition: {
      identifier: string;
      language: string;
      name: string;
      englishName: string;
      format: string;
      type: string;
    };
  };
}

interface AlQuranSurahList {
  code: number;
  status: string;
  data: AlQuranSurah[];
}

export const quranApi = {
  // Get all surahs
  getSurahs: async (): Promise<Surah[]> => {
    const response = await axios.get<AlQuranSurahList>(`${QURAN_API_BASE}/surah`);
    return response.data.data.map(surah => ({
      number: surah.number,
      name: surah.name,
      englishName: surah.englishName,
      englishNameTranslation: surah.englishNameTranslation,
      numberOfAyahs: surah.numberOfAyahs,
      revelationType: surah.revelationType,
      description: surah.description,
      audio: surah.audio,
    }));
  },

  // Get specific surah with ayahs (Arabic text)
  getSurah: async (surahNumber: number): Promise<any> => {
    const response = await axios.get<AlQuranSurahDetail>(`${QURAN_API_BASE}/surah/${surahNumber}/quran-uthmani`);
    
    return {
      number: response.data.data.number,
      name: response.data.data.name,
      englishName: response.data.data.englishName,
      englishNameTranslation: response.data.data.englishNameTranslation,
      numberOfAyahs: response.data.data.numberOfAyahs,
      revelationType: response.data.data.revelationType,
      description: response.data.data.description,
      audio: response.data.data.ayahs[0]?.audio, // Surah audio from first ayah
      ayahs: response.data.data.ayahs.map(ayah => ({
        number: ayah.number,
        text: ayah.text,
        numberInSurah: ayah.numberInSurah,
        juz: ayah.juz,
        manzil: ayah.manzil,
        page: ayah.page,
        ruku: ayah.ruku,
        hizbQuarter: ayah.hizbQuarter,
        sajda: ayah.sajda,
        audio: ayah.audio,
      })),
    };
  },

  // Get surah with Indonesian translation and Latin transliteration
  getSurahWithTranslation: async (surahNumber: number): Promise<any> => {
    // First get the Arabic text
    const arabicResponse = await axios.get<AlQuranSurahDetail>(`${QURAN_API_BASE}/surah/${surahNumber}/quran-uthmani`);
    
    // Then get the Indonesian translation
    const translationResponse = await axios.get<AlQuranSurahDetail>(`${QURAN_API_BASE}/surah/${surahNumber}/id.indonesian`);
    
    // Then get the English transliteration
    const transliterationResponse = await axios.get<AlQuranSurahDetail>(`${QURAN_API_BASE}/surah/${surahNumber}/en.transliteration`);
    
    // Merge the data
    return {
      number: arabicResponse.data.data.number,
      name: arabicResponse.data.data.name,
      englishName: arabicResponse.data.data.englishName,
      englishNameTranslation: arabicResponse.data.data.englishNameTranslation,
      numberOfAyahs: arabicResponse.data.data.numberOfAyahs,
      revelationType: arabicResponse.data.data.revelationType,
      description: arabicResponse.data.data.description,
      audio: arabicResponse.data.data.ayahs[0]?.audio,
      ayahs: arabicResponse.data.data.ayahs.map((ayah, index) => ({
        number: ayah.number,
        text: ayah.text,
        numberInSurah: ayah.numberInSurah,
        juz: ayah.juz,
        manzil: ayah.manzil,
        page: ayah.page,
        ruku: ayah.ruku,
        hizbQuarter: ayah.hizbQuarter,
        sajda: ayah.sajda,
        audio: ayah.audio,
        translation: translationResponse.data.data.ayahs[index]?.text || '',
        transliteration: transliterationResponse.data.data.ayahs[index]?.text || '',
      })),
    };
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
  getAyahAudio: (ayahAudioUrl: string): string => {
    // Return the audio URL directly from the API
    return ayahAudioUrl || '';
  }
};