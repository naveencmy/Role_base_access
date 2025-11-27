import { useEffect, useState } from 'react';
import { getAllImagesFromDB } from '../utils/imageStore';
import { syncImages } from '../services/sync';

export default function WorkerDashboard() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        if (navigator.onLine) {
          await syncImages(); // fetch + save new images
        }
        const localImages = await getAllImagesFromDB();
        setImages(localImages);
      } catch (err) {
        console.error(err);
      }
    };

    loadImages();
  }, []);

  return (
    <div>
      <h2>Your Images</h2>

      {images.map(img => {
        const url = URL.createObjectURL(img.blob);
        return <img key={img.id} src={url} width="200" />;
      })}
    </div>
  );
}
