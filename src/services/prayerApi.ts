import axios from 'axios';
import { Prayer } from '../types';

// Use local proxy to avoid CORS issues in development
const PRAYER_API_BASE = import.meta.env.DEV ? '/api' : '';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: PRAYER_API_BASE,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // Server responded with error status
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Request error:', error.request);
    } else {
      // Something else happened
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

// Function to get static prayer data
const getStaticPrayers = async (): Promise<Prayer[]> => {
  const { prayers } = await import('../data/prayers');
  return prayers;
};

// Function to search static prayer data
const searchStaticPrayers = async (query: string): Promise<Prayer[]> => {
  const { prayers } = await import('../data/prayers');
  return prayers.filter(prayer => 
    prayer.doa.toLowerCase().includes(query.toLowerCase()) ||
    prayer.artinya.toLowerCase().includes(query.toLowerCase())
  );
};

// Function to get a specific static prayer by ID
const getStaticPrayerById = async (id: string): Promise<Prayer> => {
  const { prayers } = await import('../data/prayers');
  const prayer = prayers.find(p => p.id === id);
  if (!prayer) {
    throw new Error('Prayer not found');
  }
  return prayer;
};

export const prayerApi = {
  // Get all prayers
  getAllPrayers: async (): Promise<Prayer[]> => {
    try {
      // In development, use the API proxy
      if (import.meta.env.DEV) {
        const response = await apiClient.get('/prayers');
        return response.data;
      } else {
        // In production, use static data
        return getStaticPrayers();
      }
    } catch (error: any) {
      console.error('Error fetching prayers:', error);
      if (import.meta.env.DEV) {
        if (error.response?.status === 404) {
          throw new Error('API tidak ditemukan');
        } else if (error.response?.status === 500) {
          throw new Error('Server API sedang bermasalah');
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Waktu koneksi habis. Silakan coba lagi.');
        } else if (error.message?.includes('Network Error')) {
          throw new Error('Koneksi terputus. Periksa koneksi internet Anda.');
        }
        throw new Error('Gagal mengambil kumpulan doa. Silakan coba lagi.');
      } else {
        // In production, fallback to static data
        return getStaticPrayers();
      }
    }
  },

  // Get prayer by ID
  getPrayerById: async (id: string): Promise<Prayer> => {
    try {
      // In development, use the API proxy
      if (import.meta.env.DEV) {
        const response = await apiClient.get(`/prayers/${id}`);
        return response.data;
      } else {
        // In production, use static data
        return getStaticPrayerById(id);
      }
    } catch (error: any) {
      console.error(`Error fetching prayer with ID ${id}:`, error);
      if (import.meta.env.DEV) {
        if (error.response?.status === 404) {
          throw new Error('Doa tidak ditemukan');
        } else if (error.response?.status === 500) {
          throw new Error('Server API sedang bermasalah');
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Waktu koneksi habis. Silakan coba lagi.');
        } else if (error.message?.includes('Network Error')) {
          throw new Error('Koneksi terputus. Periksa koneksi internet Anda.');
        }
        throw new Error('Gagal mengambil detail doa. Silakan coba lagi.');
      } else {
        // In production, fallback to static data
        return getStaticPrayerById(id);
      }
    }
  },

  // Search prayers by title
  searchPrayers: async (query: string): Promise<Prayer[]> => {
    try {
      // In development, use the API proxy
      if (import.meta.env.DEV) {
        const response = await apiClient.get(`/prayers/search?q=${encodeURIComponent(query)}`);
        return response.data;
      } else {
        // In production, use static data
        return searchStaticPrayers(query);
      }
    } catch (error: any) {
      console.error(`Error searching prayers with query "${query}":`, error);
      if (import.meta.env.DEV) {
        if (error.response?.status === 404) {
          throw new Error('API tidak ditemukan');
        } else if (error.response?.status === 500) {
          throw new Error('Server API sedang bermasalah');
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Waktu koneksi habis. Silakan coba lagi.');
        } else if (error.message?.includes('Network Error')) {
          throw new Error('Koneksi terputus. Periksa koneksi internet Anda.');
        }
        throw new Error('Gagal mencari doa. Silakan coba lagi.');
      } else {
        // In production, fallback to static data
        return searchStaticPrayers(query);
      }
    }
  }
};