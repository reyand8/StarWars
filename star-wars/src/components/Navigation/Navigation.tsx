import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Link, Toolbar, Typography} from '@mui/material';

import theme from '../../assets/theme';

const Navigation = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Link component={RouterLink} to="/StarWars">
                    <Typography variant="h1" component="div" sx={{
                        color: theme.palette.primary.contrastText,
                        pt: 3, pb:2}}>
                        Star Wars Heroes
                    </Typography>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;