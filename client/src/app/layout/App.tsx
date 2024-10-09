import CatalogPage from "../../features/catalog/CatalogPage";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import NavBar from "./NavBar";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const palleteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
      background: {
        default: (palleteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode 
            ? 'radial-gradient(circle, #1e3a8a, #111827)'
            : 'radial-gradient(circle, #baecf9, #f0f9ff)',
          py: 6
        }}
      >
        <Container maxWidth='xl' sx={{ mt: 8 }}>
          <CatalogPage />
        </Container>
      </Box>

    </ThemeProvider>

  )
}

export default App
