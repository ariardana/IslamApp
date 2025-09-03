import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyPrayersToPublic() {
  try {
    // Buat direktori public/data jika belum ada
    const publicDataDir = path.join(__dirname, 'public', 'data');
    await fs.mkdir(publicDataDir, { recursive: true });
    
    // Salin file doa.json ke public/data
    const source = path.join(__dirname, 'src', 'data', 'doa.json');
    const destination = path.join(publicDataDir, 'doa.json');
    
    await fs.copyFile(source, destination);
    console.log('Successfully copied doa.json to public/data/');
  } catch (error) {
    console.error('Error copying prayers data:', error);
    process.exit(1);
  }
}

copyPrayersToPublic();