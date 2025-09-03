import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import SurahList from './components/quran/SurahList';
import SurahReader from './components/quran/SurahReader';
import PrayerTimes from './components/prayer/PrayerTimes';
import IslamicCalendar from './components/calendar/IslamicCalendar';
import PrayerList from './components/prayer-collection/PrayerList';
import PrayerDetail from './components/prayer-collection/PrayerDetail';
import BookmarksList from './components/bookmarks/BookmarksList';
import ApiDocs from './components/api-docs/ApiDocs';
import DoaList from './components/prayer-collection/DoaList';
import DoaDetail from './components/prayer-collection/DoaDetail';
import { useAppStore } from './store/useAppStore';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { theme } = useAppStore();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={theme.isDark ? 'dark' : ''}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<SurahList />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="quran/surah/:surahNumber" element={<SurahReader />} />
              <Route path="prayer-times" element={<PrayerTimes />} />
              <Route path="calendar" element={<IslamicCalendar />} />
              <Route path="prayers" element={<PrayerList />} />
              <Route path="prayers/:id" element={<PrayerDetail />} />
              <Route path="doa" element={<DoaList />} />
              <Route path="doa/:id" element={<DoaDetail />} />
              <Route path="bookmarks" element={<BookmarksList />} />
              <Route path="api-docs" element={<ApiDocs />} />
            </Route>
          </Routes>
        </Router>
        
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: theme.isDark ? '#374151' : '#ffffff',
              color: theme.isDark ? '#ffffff' : '#000000',
              border: theme.isDark ? '1px solid #4B5563' : '1px solid #E5E7EB',
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
}

export default App;