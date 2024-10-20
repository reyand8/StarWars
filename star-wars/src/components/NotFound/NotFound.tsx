import React from 'react';
import { Box, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import ErrorIcon from '@mui/icons-material/Error';
import { Theme } from '@mui/material/styles/createTheme';


const PaperError = styled(Paper)(({ theme }: { theme: Theme }) => ({
    maxWidth: '800px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 'auto',
    backgroundColor: theme.palette.secondary.main,
}));

const ErrorText = styled(Typography)(({ theme }: { theme: Theme }) => ({
    fontWeight: 'bold',
    margin: '12px 0',
    textAlign: 'center',
}));

const StyledErrorIcon = styled(ErrorIcon)(({ theme }: { theme: Theme }) => ({
    fontSize: 60,
    marginTop: '18px',
    fill: theme.palette.error.main,
}));

const NotFound: React.FC = () => {
    return (
        <Box sx={{marginTop: 2}}>
            <PaperError>
                <StyledErrorIcon />
                <ErrorText>Not Found</ErrorText>
            </PaperError>
        </Box>
    );
};

export default NotFound;