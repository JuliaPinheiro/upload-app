import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const base64Image = e.target.result.toString();  
          console.log(base64Image);
          try {
            await axios.post('/backend/upload', { image: base64Image });
            console.log('Image uploaded successfully.');
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <div>
      <input
        type='file'
        accept='.jpg,.jpeg,.png'
        onChange={handleImageChange}
      />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUpload;
