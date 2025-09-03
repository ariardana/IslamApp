import axios from 'axios';
import { Prayer } from '../types';

// Use local proxy to avoid CORS issues
const PRAYER_API_BASE = '/api';

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

export const prayerApi = {
  // Get all prayers
  getAllPrayers: async (): Promise<Prayer[]> => {
    try {
      const response = await apiClient.get('/prayers');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching prayers:', error);
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
    }
  },

  // Get prayer by ID
  getPrayerById: async (id: string): Promise<Prayer> => {
    try {
      const response = await apiClient.get(`/prayers/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error fetching prayer with ID ${id}:`, error);
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
    }
  },

  // Search prayers by title
  searchPrayers: async (query: string): Promise<Prayer[]> => {
    try {
      const response = await apiClient.get(`/prayers/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error: any) {
      console.error(`Error searching prayers with query "${query}":`, error);
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
    }
  }
};