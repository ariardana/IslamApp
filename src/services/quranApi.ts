import axios from 'axios';
import { Surah, Ayah } from '../types';

const QURAN_API_BASE = 'https://equran.id/api/v2';

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

export const quranApi = {
  // Get all surahs
  getSurahs: async (): Promise<Surah[]> => {
    const response = await axios.get<EquranSurahList>(`${QURAN_API_BASE}/surat`);
    return response.data.data.map(surah => ({
      number: surah.nomor,
      name: surah.nama,
      englishName: surah.namaLatin,
      englishNameTranslation: surah.arti,
      numberOfAyahs: surah.jumlahAyat,
      revelationType: surah.tempatTurun,
      description: surah.deskripsi,
      audio: surah.audioFull ? Object.values(surah.audioFull)[0] : undefined, // Get first audio URL
      namaLatin: surah.namaLatin,
      tempatTurun: surah.tempatTurun,
      arti: surah.arti,
      audioFull: surah.audioFull,
    }));
  },

  // Get specific surah with ayahs (Arabic text)
  getSurah: async (surahNumber: number): Promise<any> => {
    const response = await axios.get<EquranSurahDetail>(`${QURAN_API_BASE}/surat/${surahNumber}`);
    
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
  },

  // Get surah with Indonesian translation and Latin transliteration
  getSurahWithTranslation: async (surahNumber: number): Promise<any> => {
    // The new API already includes translation and transliteration in the same endpoint
    const response = await axios.get<EquranSurahDetail>(`${QURAN_API_BASE}/surat/${surahNumber}`);
    
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