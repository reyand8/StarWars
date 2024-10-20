import React from 'react';
import {Box, ThemeProvider} from '@mui/material';

import theme  from './assets/theme';
import AppRoutes from './routes/AppRoutes';
import Navigation from './components/Navigation/Navigation';


const App: React.FC = () => {
  return (
      <ThemeProvider theme={theme}>
          <Box>
              <Navigation/>
              <AppRoutes/>
          </Box>
      </ThemeProvider>
  );
};

export default App;