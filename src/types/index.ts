export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  description?: string;
  audio?: string;
  // New fields for equran.id API
  namaLatin?: string;
  tempatTurun?: string;
  arti?: string;
  audioFull?: {
    [key: string]: string;
  };
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  translation?: string;
  transliteration?: string;
  // New fields for equran.id API
  nomorAyat?: number;
  teksArab?: string;
  teksLatin?: string;
  teksIndonesia?: string;
  audio?: {
    [key: string]: string;
  };
}

export interface AyahTranslation {
  text: string;
  language: string;
}

export interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
  Sunset: string;
}

export interface PrayerTimesData {
  timings: PrayerTimes;
  date: {
    readable: string;
    timestamp: string;
    hijri: {
      date: string;
      format: string;
      day: string;
      weekday: {
        en: string;
        ar: string;
      };
      month: {
        number: number;
        en: string;
        ar: string;
      };
      year: string;
      designation: {
        abbreviated: string;
        expanded: string;
      };
    };
    gregorian: {
      date: string;
      format: string;
      day: string;
      weekday: {
        en: string;
      };
      month: {
        number: number;
        en: string;
      };
      year: string;
      designation: {
        abbreviated: string;
        expanded: string;
      };
    };
  };
  meta: {
    latitude: number;
    longitude: number;
    timezone: string;
    method: {
      id: number;
      name: string;
    };
    latitudeAdjustmentMethod: string;
    midnightMode: string;
    school: string;
    offset: Record<string, number>;
  };
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  urlToImage: string;
  url: string;
  category: string;
}

export interface BookmarkedAyah {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  text: string;
  translation: string;
  addedAt: string;
}

export interface IslamicDate {
  hijri: string;
  gregorian: string;
  isImportant: boolean;
  event?: string;
  description?: string;
}

export interface Theme {
  isDark: boolean;
}

export interface Prayer {
  id: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
}

export interface AppState {
  theme: Theme;
  bookmarkedAyahs: BookmarkedAyah[];
  bookmarkedNews: NewsArticle[];
  bookmarkedPrayers: Prayer[];
  currentLocation: {
    city: string;
    latitude: number;
    longitude: number;
  } | null;
  prayerNotifications: boolean;
}