import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import ImageUpload from './components/ImageUpload';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className='App'>
        <ImageUpload />
      </div>
    </ThemeProvider>
  );
}

export default App;
