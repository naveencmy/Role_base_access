import { initDB } from './db';

export const saveImageToDB = async (id, blob) => {
  const db = await initDB();
  await db.put('images', { id, blob });
};

export const getImageFromDB = async (id) => {
  const db = await initDB();
  return await db.get('images', id);
};

export const getAllImagesFromDB = async () => {
  const db = await initDB();
  return await db.getAll('images');
};
