import axios from 'axios';

const PRAYER_API_BASE = 'https://api.aladhan.com/v1';

export const prayerTimesApi = {
  getPrayerTimesByCoordinates: async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(`${PRAYER_API_BASE}/timings`, {
        params: {
          latitude,
          longitude,
          method: 20, // Kementerian Agama Indonesia
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching prayer times by coordinates:', error);
      throw new Error('Gagal memuat jadwal sholat. Silakan coba lagi.');
    }
  },

  getPrayerTimesByCity: async (city: string) => {
    try {
      const response = await axios.get(`${PRAYER_API_BASE}/timingsByCity`, {
        params: {
          city,
          country: 'Indonesia',
          method: 20, // Kementerian Agama Indonesia
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching prayer times by city:', error);
      throw new Error('Gagal memuat jadwal sholat. Periksa nama kota dan coba lagi.');
    }
  },
};
