import { useQuery } from '@tanstack/react-query';
import { quranApi } from '../services/quranApi';

export const useSurahs = () => {
  return useQuery({
    queryKey: ['surahs'],
    queryFn: quranApi.getSurahs,
    staleTime: Infinity, // Surahs list never changes
  });
};

export const useSurah = (surahNumber: number) => {
  return useQuery({
    queryKey: ['surah', surahNumber],
    queryFn: () => quranApi.getSurahWithTranslation(surahNumber),
    enabled: surahNumber > 0 && surahNumber <= 114,
    staleTime: Infinity,
  });
};

export const useSearchAyahs = (query: string) => {
  return useQuery({
    queryKey: ['searchAyahs', query],
    queryFn: () => quranApi.searchAyahs(query),
    enabled: query.length > 2,
    staleTime: 300000, // 5 minutes
  });
};

export const useJuz = (juzNumber: number) => {
  return useQuery({
    queryKey: ['juz', juzNumber],
    queryFn: () => quranApi.getJuz(juzNumber),
    enabled: juzNumber > 0 && juzNumber <= 30,
    staleTime: Infinity,
  });
};