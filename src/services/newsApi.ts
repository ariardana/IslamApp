import { NewsArticle } from '../types';

// Mock news service since we don't have a real API key
export const newsApi = {
  getIslamicNews: async (category: string = 'islam'): Promise<NewsArticle[]> => {
    // Using mock data for demonstration
    const mockNews: NewsArticle[] = [
      {
        id: '1',
        title: 'Keutamaan Membaca Al-Qur\'an di Bulan Ramadan',
        description: 'Al-Qur\'an memiliki kedudukan istimewa dalam Islam, terutama di bulan suci Ramadan...',
        content: 'Al-Qur\'an adalah kitab suci yang diturunkan Allah SWT kepada Nabi Muhammad SAW...',
        author: 'Dr. Ahmad Rahman',
        publishedAt: new Date().toISOString(),
        urlToImage: 'https://images.pexels.com/photos/8164742/pexels-photo-8164742.jpeg',
        url: '#',
        category: 'dakwah'
      },
      {
        id: '2',
        title: 'Persiapan Spiritual Menuju Haji 2025',
        description: 'Tips dan panduan mempersiapkan diri secara spiritual untuk menunaikan ibadah haji...',
        content: 'Ibadah haji merupakan rukun Islam kelima yang wajib dilaksanakan...',
        author: 'Ustadz Muhammad Hidayat',
        publishedAt: new Date(Date.now() - 86400000).toISOString(),
        urlToImage: 'https://images.pexels.com/photos/16230515/pexels-photo-16230515.jpeg',
        url: '#',
        category: 'haji-umrah'
      },
      {
        id: '3',
        title: 'Metode Pembelajaran Islam untuk Anak di Era Digital',
        description: 'Strategi efektif mengajarkan nilai-nilai Islam kepada anak-anak di zaman teknologi...',
        content: 'Pendidikan Islam untuk anak-anak memerlukan pendekatan yang sesuai dengan perkembangan zaman...',
        author: 'Prof. Dr. Siti Aminah',
        publishedAt: new Date(Date.now() - 172800000).toISOString(),
        urlToImage: 'https://images.pexels.com/photos/8613313/pexels-photo-8613313.jpeg',
        url: '#',
        category: 'pendidikan'
      }
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (category === 'all') {
      return mockNews;
    }
    
    return mockNews.filter(article => article.category === category);
  },

  getNewsCategories: (): string[] => {
    return ['all', 'dakwah', 'haji-umrah', 'pendidikan'];
  }
};