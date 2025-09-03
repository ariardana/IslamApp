export const apiDocs = {
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
};