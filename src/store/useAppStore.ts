import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, BookmarkedAyah, NewsArticle } from '../types';

interface AppStore extends AppState {
  toggleTheme: () => void;
  addBookmarkedAyah: (ayah: BookmarkedAyah) => void;
  removeBookmarkedAyah: (surahNumber: number, ayahNumber: number) => void;
  addBookmarkedNews: (article: NewsArticle) => void;
  removeBookmarkedNews: (articleId: string) => void;
  setLocation: (location: { city: string; latitude: number; longitude: number }) => void;
  togglePrayerNotifications: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      theme: { isDark: false },
      bookmarkedAyahs: [],
      bookmarkedNews: [],
      currentLocation: null,
      prayerNotifications: true,

      toggleTheme: () =>
        set((state) => ({
          theme: { isDark: !state.theme.isDark },
        })),

      addBookmarkedAyah: (ayah) =>
        set((state) => ({
          bookmarkedAyahs: [...state.bookmarkedAyahs, ayah],
        })),

      removeBookmarkedAyah: (surahNumber, ayahNumber) =>
        set((state) => ({
          bookmarkedAyahs: state.bookmarkedAyahs.filter(
            (ayah) => !(ayah.surahNumber === surahNumber && ayah.ayahNumber === ayahNumber)
          ),
        })),

      addBookmarkedNews: (article) =>
        set((state) => ({
          bookmarkedNews: [...state.bookmarkedNews, article],
        })),

      removeBookmarkedNews: (articleId) =>
        set((state) => ({
          bookmarkedNews: state.bookmarkedNews.filter((article) => article.id !== articleId),
        })),

      setLocation: (location) =>
        set(() => ({
          currentLocation: location,
        })),

      togglePrayerNotifications: () =>
        set((state) => ({
          prayerNotifications: !state.prayerNotifications,
        })),
    }),
    {
      name: 'islamic-app-storage',
    }
  )
);