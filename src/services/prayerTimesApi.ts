import axios from 'axios';
import { PrayerTimesData } from '../types';

const PRAYER_API_BASE = 'https://api.aladhan.com/v1';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: PRAYER_API_BASE,
  timeout: 10000, // 10 seconds timeout
});

// Add response interceptor to handle redirects
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If it's a redirect, follow it
    if (error.response?.status === 302 && error.response.headers.location) {
      try {
        const redirectUrl = error.response.headers.location;
        const response = await apiClient.get(redirectUrl);
        return response;
      } catch (redirectError) {
        throw new Error('Gagal mengakses API jadwal sholat');
      }
    }
    
    return Promise.reject(error);
  }
);

export const prayerTimesApi = {
  // Get prayer times by city
    getPrayerTimesByCity: async (city: string, country: string = 'Indonesia'): Promise<PrayerTimesData> => {
    try {
      // Encode city and country to handle special characters
      const encodedCity = encodeURIComponent(city);
      const encodedCountry = encodeURIComponent(country);
      
      const response = await apiClient.get('/timingsByCity', {
        params: {
          city: encodedCity,
          country: encodedCountry,
          method: 20, // Kementerian Agama Indonesia method
        }
      });
      
      if (response.data.code !== 200) {
        throw new Error(response.data.data || 'Gagal mengambil jadwal sholat berdasarkan kota');
      }
      
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching prayer times by city:', error);
      if (error.response?.data?.data) {
        throw new Error(error.response.data.data);
      }
      throw new Error('Gagal mengambil jadwal sholat berdasarkan kota');
    }
  },

  // Get prayer times by coordinates
  getPrayerTimesByCoordinates: async (latitude: number, longitude: number): Promise<PrayerTimesData> => {
    try {
      const response = await apiClient.get('/timings', {
        params: {
          latitude,
          longitude,
          method: 20, // Kementerian Agama Indonesia method
        }
      });
      
      if (response.data.code !== 200) {
        throw new Error(response.data.data || 'Gagal mengambil jadwal sholat berdasarkan koordinat');
      }
      
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching prayer times by coordinates:', error);
      if (error.response?.data?.data) {
        throw new Error(error.response.data.data);
      }
      throw new Error('Gagal mengambil jadwal sholat berdasarkan koordinat');
    }
  },

  // Get prayer times for specific date
  getPrayerTimesForDate: async (
    latitude: number, 
    longitude: number, 
    date: string
  ): Promise<PrayerTimesData> => {
    try {
      const response = await apiClient.get(`/timings/${date}`, {
        params: {
          latitude,
          longitude,
          method: 20,
        }
      });
      
      if (response.data.code !== 200) {
        throw new Error(response.data.data || 'Gagal mengambil jadwal sholat untuk tanggal tertentu');
      }
      
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching prayer times for date:', error);
      if (error.response?.data?.data) {
        throw new Error(error.response.data.data);
      }
      throw new Error('Gagal mengambil jadwal sholat untuk tanggal tertentu');
    }
  },

  // Get Hijri calendar for month
  getHijriCalendar: async (month: number, year: number): Promise<any> => { // The API response for Hijri Calendar is complex, so we keep `any` for now
    try {
      const response = await apiClient.get(`/calendar/${year}/${month}`, {
        params: {
          latitude: -6.2088,
          longitude: 106.8456, // Jakarta coordinates as default
          method: 20,
        }
      });
      
      if (response.data.code !== 200) {
        throw new Error(response.data.data || 'Gagal mengambil kalender Hijriah');
      }
      
      return response.data.data;
    } catch (error: any) {
      console.error('Error fetching Hijri calendar:', error);
      if (error.response?.data?.data) {
        throw new Error(error.response.data.data);
      }
      throw new Error('Gagal mengambil kalender Hijriah');
    }
  }
};