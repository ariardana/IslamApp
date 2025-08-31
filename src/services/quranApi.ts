import axios from 'axios';
import { Surah, Ayah, AyahTranslation } from '../types';

const QURAN_API_BASE = 'https://api.alquran.cloud/v1';

export const quranApi = {
  // Get all surahs
  getSurahs: async (): Promise<Surah[]> => {
    const response = await axios.get(`${QURAN_API_BASE}/surah`);
    return response.data.data;
  },

  // Get specific surah with ayahs
  getSurah: async (surahNumber: number): Promise<{ ayahs: Ayah[] }> => {
    const response = await axios.get(`${QURAN_API_BASE}/surah/${surahNumber}`);
    return response.data.data;
  },

  // Get surah with Indonesian translation
  getSurahWithTranslation: async (surahNumber: number): Promise<any> => {
    const [arabicResponse, translationResponse] = await Promise.all([
      axios.get(`${QURAN_API_BASE}/surah/${surahNumber}`),
      axios.get(`${QURAN_API_BASE}/surah/${surahNumber}/id.indonesian`)
    ]);

    const arabicAyahs = arabicResponse.data.data.ayahs;
    const translationAyahs = translationResponse.data.data.ayahs;

    const combinedAyahs = arabicAyahs.map((ayah: Ayah, index: number) => ({
      ...ayah,
      translation: translationAyahs[index]?.text || '',
    }));

    return {
      ...arabicResponse.data.data,
      ayahs: combinedAyahs,
    };
  },

  // Search ayahs
  searchAyahs: async (query: string): Promise<any> => {
    const response = await axios.get(`${QURAN_API_BASE}/search/${query}/all/id.indonesian`);
    return response.data.data;
  },

  // Get Juz
  getJuz: async (juzNumber: number): Promise<any> => {
    const response = await axios.get(`${QURAN_API_BASE}/juz/${juzNumber}`);
    return response.data.data;
  },

  // Get audio for ayah
  getAyahAudio: (surahNumber: number, ayahNumber: number): string => {
    return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surahNumber}${ayahNumber.toString().padStart(3, '0')}.mp3`;
  }
};