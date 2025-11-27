import axios from './axios';
import { saveImageToDB, getImageFromDB } from '../utils/imageStore';

export const syncImages = async () => {
  const { data } = await axios.get('/image/list');

  for (const img of data) {
    const exists = await getImageFromDB(img.id);

    if (!exists) {
      // download image from backend
      const res = await axios.get(`/image/${img.id}`, { responseType: 'blob' });

      // save locally
      await saveImageToDB(img.id, res.data);
    }
  }
};
