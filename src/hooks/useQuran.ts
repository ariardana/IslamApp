import { useQuery } from '@tanstack/react-query';
import { quranApi } from '../services/quranApi';

export const useSurahs = () => {
  return useQuery({
    queryKey: ['surahs'],
    queryFn: async () => {
      console.log('Fetching surahs...');
      const result = await quranApi.getSurahs();
      console.log('Surahs fetched successfully:', result?.length || 0);
      return result;
    },
    staleTime: Infinity, // Surahs list never changes
    retry: 2, // Retry failed requests up to 2 times
    onError: (error) => {
      console.error('Error in useSurahs hook:', error);
    },
    onSuccess: (data) => {
      console.log('Success in useSurahs hook, data length:', data?.length || 0);
    }
  });
};

export const useSurah = (surahNumber: number) => {
  return useQuery({
    queryKey: ['surah', surahNumber],
    queryFn: () => quranApi.getSurahWithTranslation(surahNumber),
    enabled: surahNumber > 0 && surahNumber <= 114,
    staleTime: Infinity,
    retry: 2, // Retry failed requests up to 2 times
    onError: (error) => {
      console.error(`Error in useSurah hook for surah ${surahNumber}:`, error);
    },
    onSuccess: (data) => {
      console.log(`Success in useSurah hook for surah ${surahNumber}`);
    }
  });
};

export const useSearchAyahs = (query: string) => {
  return useQuery({
    queryKey: ['searchAyahs', query],
    queryFn: () => quranApi.searchAyahs(query),
    enabled: query.length > 2,
    staleTime: 300000, // 5 minutes
    retry: 2, // Retry failed requests up to 2 times
  });
};

export const useJuz = (juzNumber: number) => {
  return useQuery({
    queryKey: ['juz', juzNumber],
    queryFn: () => quranApi.getJuz(juzNumber),
    enabled: juzNumber > 0 && juzNumber <= 30,
    staleTime: Infinity,
    retry: 2, // Retry failed requests up to 2 times
  });
};