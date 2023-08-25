import axios from 'axios';

export async function uploadImage(base64Image: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await axios.post('/backend/upload', { image: base64Image });
    return response.data;
  } catch (error) {
    throw error;
  }
}
