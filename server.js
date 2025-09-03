import express from 'express';
import cors from 'cors';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// API Documentation endpoint
app.get('/api/docs', (req, res) => {
  res.json({
    name: "IslamApp API",
    version: "1.0.0",
    description: "API documentation for the IslamApp platform",
    endpoints: {
      "quran": {
        "/api/quran/surahs": {
          method: "GET",
          description: "Get list of all surahs in the Quran",
          response: "Array of surah objects with basic information"
        },
        "/api/quran/surahs/:number": {
          method: "GET",
          description: "Get detailed information about a specific surah including all ayahs",
          parameters: {
            number: "Surah number (1-114)"
          },
          response: "Surah object with ayahs array"
        }
      },
      "prayers": {
        "/api/prayers": {
          method: "GET",
          description: "Get all available prayers/duas",
          response: "Array of prayer objects"
        },
        "/api/prayers/search": {
          method: "GET",
          description: "Search prayers by title",
          parameters: {
            q: "Search query string"
          },
          response: "Array of matching prayer objects"
        },
        "/api/prayers/:id": {
          method: "GET",
          description: "Get a specific prayer by ID",
          parameters: {
            id: "Prayer ID"
          },
          response: "Prayer object"
        }
      },
      "prayer-times": {
        "/api/prayer-times/city": {
          method: "GET",
          description: "Get prayer times for a specific city",
          parameters: {
            city: "City name",
            country: "Country name (optional, defaults to Indonesia)"
          },
          response: "Prayer times data for the specified location"
        },
        "/api/prayer-times/coordinates": {
          method: "GET",
          description: "Get prayer times for specific coordinates",
          parameters: {
            latitude: "Latitude coordinate",
            longitude: "Longitude coordinate"
          },
          response: "Prayer times data for the specified coordinates"
        }
      },
      "calendar": {
        "/api/calendar/hijri/:year/:month": {
          method: "GET",
          description: "Get Hijri calendar for a specific month and year",
          parameters: {
            year: "Year (e.g., 1445)",
            month: "Month (1-12)"
          },
          response: "Hijri calendar data for the specified month"
        }
      },
      "bookmarks": {
        "/api/bookmarks": {
          method: "GET",
          description: "Get all bookmarked items (requires authentication)",
          response: "Array of bookmarked ayahs, prayers, and news articles"
        }
      }
    }
  });
});

// Proxy endpoint for prayer API
app.get('/api/prayers', async (req, res) => {
  try {
    const response = await axios.get('https://doa-doa-api-ahmadramadhan.fly.dev/api');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching prayers:', error);
    res.status(500).json({ error: 'Failed to fetch prayers' });
  }
});

// Proxy endpoint for searching prayers
app.get('/api/prayers/search', async (req, res) => {
  try {
    const { q } = req.query;
    const response = await axios.get(`https://doa-doa-api-ahmadramadhan.fly.dev/api?title=${encodeURIComponent(q)}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error searching prayers:', error);
    res.status(500).json({ error: 'Failed to search prayers' });
  }
});

// Proxy endpoint for getting a specific prayer
app.get('/api/prayers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`https://doa-doa-api-ahmadramadhan.fly.dev/api/${id}`);
    res.json(response.data[0]);
  } catch (error) {
    console.error(`Error fetching prayer ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch prayer' });
  }
});

// Endpoint for getting all Quran surahs
app.get('/api/quran/surahs', async (req, res) => {
  try {
    const response = await axios.get('https://quran-api.santrikoding.com/api/surah');
    // Transform the response to match our application's expected format
    const surahs = response.data.map(surah => ({
      number: surah.nomor,
      name: surah.nama,
      englishName: surah.nama_latin,
      englishNameTranslation: surah.arti,
      numberOfAyahs: surah.jumlah_ayat,
      revelationType: surah.tempat_turun,
      description: surah.deskripsi,
      audio: surah.audio,
    }));
    res.json(surahs);
  } catch (error) {
    console.error('Error fetching surahs:', error);
    res.status(500).json({ error: 'Failed to fetch surahs' });
  }
});

// Endpoint for getting a specific Quran surah with ayahs
app.get('/api/quran/surahs/:number', async (req, res) => {
  try {
    const { number } = req.params;
    const response = await axios.get(`https://quran-api.santrikoding.com/api/surah/${number}`);
    
    // Transform the response to match our application's expected format
    const surah = {
      number: response.data.nomor,
      name: response.data.nama,
      englishName: response.data.nama_latin,
      englishNameTranslation: response.data.arti,
      numberOfAyahs: response.data.jumlah_ayat,
      revelationType: response.data.tempat_turun,
      description: response.data.deskripsi,
      audio: response.data.audio,
      ayahs: response.data.ayat.map(ayah => ({
        number: ayah.id,
        text: ayah.ar,
        numberInSurah: ayah.nomor,
        translation: ayah.idn,
        juz: 0,
        manzil: 0,
        page: 0,
        ruku: 0,
        hizbQuarter: 0,
        sajda: false,
      })),
    };
    
    res.json(surah);
  } catch (error) {
    console.error(`Error fetching surah ${req.params.number}:`, error);
    res.status(500).json({ error: 'Failed to fetch surah' });
  }
});

// Endpoint for getting prayer times by city
app.get('/api/prayer-times/city', async (req, res) => {
  try {
    const { city, country = 'Indonesia' } = req.query;
    if (!city) {
      return res.status(400).json({ error: 'City parameter is required' });
    }
    
    const encodedCity = encodeURIComponent(city);
    const encodedCountry = encodeURIComponent(country);
    
    const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity`, {
      params: {
        city: encodedCity,
        country: encodedCountry,
        method: 20, // Kementerian Agama Indonesia method
      }
    });
    
    if (response.data.code !== 200) {
      throw new Error(response.data.data || 'Failed to fetch prayer times');
    }
    
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching prayer times by city:', error);
    res.status(500).json({ error: 'Failed to fetch prayer times' });
  }
});

// Endpoint for getting prayer times by coordinates
app.get('/api/prayer-times/coordinates', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude parameters are required' });
    }
    
    const response = await axios.get(`https://api.aladhan.com/v1/timings`, {
      params: {
        latitude,
        longitude,
        method: 20, // Kementerian Agama Indonesia method
      }
    });
    
    if (response.data.code !== 200) {
      throw new Error(response.data.data || 'Failed to fetch prayer times');
    }
    
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching prayer times by coordinates:', error);
    res.status(500).json({ error: 'Failed to fetch prayer times' });
  }
});

// Endpoint for getting Hijri calendar
app.get('/api/calendar/hijri/:year/:month', async (req, res) => {
  try {
    const { year, month } = req.params;
    const { latitude = -6.2088, longitude = 106.8456 } = req.query; // Default to Jakarta coordinates
    
    const response = await axios.get(`https://api.aladhan.com/v1/calendar/${year}/${month}`, {
      params: {
        latitude,
        longitude,
        method: 20,
      }
    });
    
    if (response.data.code !== 200) {
      throw new Error(response.data.data || 'Failed to fetch Hijri calendar');
    }
    
    res.json(response.data.data);
  } catch (error) {
    console.error('Error fetching Hijri calendar:', error);
    res.status(500).json({ error: 'Failed to fetch Hijri calendar' });
  }
});

// Endpoint for getting bookmarks (simplified version)
app.get('/api/bookmarks', (req, res) => {
  // In a real implementation, this would require authentication
  // and fetch bookmarks from a database
  res.json({
    ayahs: [],
    prayers: [],
    news: []
  });
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});