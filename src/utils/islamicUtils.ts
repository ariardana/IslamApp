

export const islamicUtils = {
  // Convert Gregorian to Hijri (simplified calculation)
  gregorianToHijri: (date: Date): string => {
    const hijriEpoch = new Date(622, 6, 16); // July 16, 622 CE
    const daysDiff = Math.floor((date.getTime() - hijriEpoch.getTime()) / (1000 * 60 * 60 * 24));
    const hijriYear = Math.floor(daysDiff / 354.37) + 1;
    const hijriDay = Math.floor(daysDiff % 354.37);
    const hijriMonth = Math.floor(hijriDay / 29.53) + 1;
    const hijriDate = Math.floor(hijriDay % 29.53) + 1;
    
    return `${hijriDate} ${islamicUtils.getHijriMonthName(hijriMonth)} ${hijriYear} H`;
  },

  getHijriMonthName: (month: number): string => {
    const months = [
      'Muharram', 'Safar', 'Rabi\'ul Awwal', 'Rabi\'ul Akhir',
      'Jumadal Awwal', 'Jumadal Akhir', 'Rajab', 'Sya\'ban',
      'Ramadan', 'Syawwal', 'Dzulqidah', 'Dzulhijjah'
    ];
    return months[month - 1] || '';
  },

  // Get prayer name in Indonesian
  getPrayerNameInIndonesian: (prayerName: string): string => {
    const prayerNames: Record<string, string> = {
      'Fajr': 'Subuh',
      'Dhuhr': 'Dzuhur',
      'Asr': 'Ashar',
      'Maghrib': 'Maghrib',
      'Isha': 'Isya',
      'Sunrise': 'Terbit',
      'Sunset': 'Terbenam'
    };
    return prayerNames[prayerName] || prayerName;
  },

  // Calculate time until next prayer
  getTimeUntilNextPrayer: (prayerTimes: Record<string, string>): { nextPrayer: string; timeLeft: string } => {
    const now = new Date();
    const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
    
    for (const prayer of prayers) {
      const prayerTime = new Date();
      const [hours, minutes] = prayerTimes[prayer].split(':');
      prayerTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      
      if (prayerTime > now) {
        const timeDiff = prayerTime.getTime() - now.getTime();
        const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        return {
          nextPrayer: islamicUtils.getPrayerNameInIndonesian(prayer),
          timeLeft: `${hoursLeft}j ${minutesLeft}m`
        };
      }
    }
    
    // If no prayer left today, show Fajr tomorrow
    const fajrTomorrow = new Date();
    fajrTomorrow.setDate(fajrTomorrow.getDate() + 1);
    const [hours, minutes] = prayerTimes.Fajr.split(':');
    fajrTomorrow.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    const timeDiff = fajrTomorrow.getTime() - now.getTime();
    const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
    return {
      nextPrayer: 'Subuh (Besok)',
      timeLeft: `${hoursLeft}j ${minutesLeft}m`
    };
  },

  // Get Islamic important dates
  getIslamicImportantDates: (): Array<{ date: string; event: string; description: string }> => {
    return [
      {
        date: '1 Muharram',
        event: 'Tahun Baru Hijriah',
        description: 'Awal tahun baru dalam kalender Islam'
      },
      {
        date: '10 Muharram',
        event: 'Hari Asyura',
        description: 'Hari puasa sunnah yang sangat dianjurkan'
      },
      {
        date: '12 Rabi\'ul Awwal',
        event: 'Maulid Nabi Muhammad SAW',
        description: 'Memperingati kelahiran Rasulullah SAW'
      },
      {
        date: '27 Rajab',
        event: 'Isra Mi\'raj',
        description: 'Memperingati perjalanan malam Rasulullah SAW'
      },
      {
        date: '15 Sya\'ban',
        event: 'Nisfu Sya\'ban',
        description: 'Malam yang penuh berkah dan ampunan'
      },
      {
        date: '1-30 Ramadan',
        event: 'Bulan Ramadan',
        description: 'Bulan suci puasa bagi umat Islam'
      },
      {
        date: '1 Syawwal',
        event: 'Idul Fitri',
        description: 'Hari raya setelah bulan Ramadan'
      },
      {
        date: '10 Dzulhijjah',
        event: 'Idul Adha',
        description: 'Hari raya kurban'
      }
    ];
  },

  // Format time for display
  formatPrayerTime: (time: string): string => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  },

  // Get current Islamic date info
  getCurrentIslamicDateInfo: (): string => {
    const today = new Date();
    return islamicUtils.gregorianToHijri(today);
  }
};