import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Link, Toolbar, Typography, styled} from '@mui/material';

const MainTitle = styled(Typography)(({theme}) => ({
    fontSize: theme.typography.h1.fontSize,
    fontFamily: theme.typography.h1.fontFamily,
    color: theme.palette.primary.contrastText,
    pt: 3,
    pb: 2,
    [theme.breakpoints.down('sm')]: {
        fontSize: 24,
    },
}));

const Navigation = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Link component={RouterLink} to="/StarWars">
                    <MainTitle>
                        Star Wars Heroes
                    </MainTitle>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;