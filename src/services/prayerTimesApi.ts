import axios from 'axios';
import { PrayerTimesData } from '../types';

const PRAYER_API_BASE = 'https://api.aladhan.com/v1';

export const prayerTimesApi = {
  // Get prayer times by city
    getPrayerTimesByCity: async (city: string, country: string): Promise<PrayerTimesData> => {
    const response = await axios.get(
      `${PRAYER_API_BASE}/timingsByCity`,
      {
        params: {
          city,
          country,
          method: 20, // Kementerian Agama Indonesia method
        }
      }
    );
    return response.data.data;
  },

  // Get prayer times by coordinates
  getPrayerTimesByCoordinates: async (latitude: number, longitude: number): Promise<PrayerTimesData> => {
    const response = await axios.get(
      `${PRAYER_API_BASE}/timings`,
      {
        params: {
          latitude,
          longitude,
          method: 20, // Kementerian Agama Indonesia method
        }
      }
    );
    return response.data.data;
  },

  // Get prayer times for specific date
  getPrayerTimesForDate: async (
    latitude: number, 
    longitude: number, 
    date: string
  ): Promise<PrayerTimesData> => {
    const response = await axios.get(
      `${PRAYER_API_BASE}/timings/${date}`,
      {
        params: {
          latitude,
          longitude,
          method: 20,
        }
      }
    );
    return response.data.data;
  },

  // Get Hijri calendar for month
  getHijriCalendar: async (month: number, year: number): Promise<any> => { // The API response for Hijri Calendar is complex, so we keep `any` for now
    const response = await axios.get(
      `${PRAYER_API_BASE}/calendar/${year}/${month}`,
      {
        params: {
          latitude: -6.2088,
          longitude: 106.8456, // Jakarta coordinates as default
          method: 20,
        }
      }
    );
    return response.data.data;
  }
};