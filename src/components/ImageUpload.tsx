import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  Paper,
  Grid,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { uploadImage } from '../integrations/api';
import './ImageUpload.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ImageUpload: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [typingEffect, setTypingEffect] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [signatureBase64, setSignatureBase64] = useState<string | null>(null);

  const textToType =
    'Apresentamos aqui a nossa proposta para remoção de assinaturas de RG ou CNH: ';

  useEffect(() => {
    if (currentIndex < textToType.length) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setTypingEffect(textToType.substring(0, currentIndex + 1));
      }, 100);
    } else {
      setTypingComplete(true);
    }
  }, [currentIndex]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    setSelectedImage(droppedFile);
  };

  const handleUpload = async () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const base64Image = e.target.result.toString();

          try {
            await uploadImage(base64Image);
            console.log('Image uploaded successfully.');

            const response = await axios.get('backend-url/assinatura');
            const data = response.data;
            setSignatureBase64(data);
          } catch (error) {
            console.error('Error uploading image:', error);
          }
        }
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '20rem',
        }}
      >
        <Typography
          variant='h1'
          sx={{
            marginBottom: '5rem',
            color: '#ffffff',
            fontSize: '3rem',
            fontFamily: 'sora',
            fontWeight: '600px',
          }}
        >
          {typingComplete ? typingEffect : `${typingEffect}|`}
        </Typography>
        <Paper
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          style={{
            border: '2px dashed #ccc',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <Typography variant='body1'>
            Arraste e solte um arquivo aqui ou clique para escolher um arquivo.
          </Typography>
          <input
            type='file'
            accept='.jpg,.jpeg,.png'
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id='fileInput'
          />
          <label htmlFor='fileInput'>
            <Button component='span' variant='contained'>
              Escolher Arquivo
            </Button>
          </label>
        </Paper>
        {selectedImage && (
          <Grid
            container
            direction='column'
            alignItems='center'
            spacing={2}
            style={{ marginTop: '20px' }}
          >
            <Grid item>
              <Typography variant='body2'>
                Imagem selecionada: {selectedImage.name}
              </Typography>
            </Grid>
            <Grid item>
              <Button variant='contained' onClick={handleUpload}>
                Enviar imagem
              </Button>
            </Grid>
          </Grid>
        )}
        {signatureBase64 && (
          <Container
            style={{
              backgroundColor: '#ffffff',
              padding: '20px',
              marginTop: '20px',
              maxWidth: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src={`data:image/png;base64,${signatureBase64}`}
              alt='Assinatura'
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          </Container>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default ImageUpload;
