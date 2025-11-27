import { openDB } from 'idb';

export const initDB = async () => {
  return openDB('worker-images-db', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'id' });
      }
    },
  });
};
