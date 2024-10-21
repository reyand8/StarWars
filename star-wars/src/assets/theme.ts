import { ThemeOptions } from '@mui/material/styles';
import {createTheme} from '@mui/material';

const themeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#1c1c25',
        },
        secondary: {
            main: '#FFFFFF7F',
            dark: '#a9a8a8',
        },
        text: {
            primary: 'rgba(0,0,0,0.87)',
        },
        error: {
            main: '#d32f2f',
            light: '#db5858',
            dark: '#932020',
            contrastText: '#ffffff',
        },
        success: {
            main: '#2b792f',
            light: '#559358',
            dark: '#1e5420',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#ed6c02',
            light: '#f08934',
            dark: '#a54b01',
        },
        background: {
            default: '#4a4a54',
        },
    },
    typography: {
        fontSize: 16,
        fontWeightLight: 300,
        h6: {
            fontSize: 15,
            fontWeight: 700,
        },
        h5: {
            fontSize: 18,
            fontWeight: 600,
        },
        h4: {
            fontSize: 21,
            fontWeight: 700,
        },
        h2: {
            fontSize: 28,
            fontWeight: 500,
        },
        h1: {
            fontSize: 32,
            fontFamily: 'Star Wars, sans-serif',
        },
        subtitle2: {
            fontWeight: 400,
            lineHeight: 1.21,
            fontSize: 18,
        },
        body1: {
            fontSize: 12,
        },
        body2: {
            fontSize: 12,
            fontWeight: 'bold',
            fontStyle: 'italic',
        },
    },
};

const theme = createTheme(themeOptions);

export default theme;