import React, { useState } from 'react';
import { Button, Container, Paper } from '@mui/material';
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
          console.log('base64', base64Image);
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
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <input
          accept='.jpg,.jpeg,.png'
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id='image-upload-input'
          type='file'
        />
        <label htmlFor='image-upload-input'>
          <Button variant='contained' component='span'>
            Buscar imagem
          </Button>
        </label>
        <Button variant='contained' onClick={handleUpload}>
          Enviar
        </Button>
      </Paper>
    </Container>
  );
};

export default ImageUpload;
