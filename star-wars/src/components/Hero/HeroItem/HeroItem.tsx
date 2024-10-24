import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, Card, CardContent, styled, Typography } from '@mui/material';

import { HeroItemProps } from '../../../types/hero.interface';
import { clearSelectedHero } from '../../../features/allHeroesSlice/allHeroesSlice';
import { AppDispatch } from '../../../features/store';

const MainCard = styled(Card)(({theme}) => ({
    display: 'flex',
    minHeight: '160px',
    backgroundColor: theme.palette.background.default,
    marginBottom: '14px',
    [theme.breakpoints.down('sm')]: {
        minHeight: '140px',
    },
}));

const MainTitle = styled(Typography)(({theme}) => ({
    ...theme.typography.h2,
    [theme.breakpoints.down('sm')]: {
        fontSize: '24px',
    },
}));

const MainSubtitle = styled(Typography)(({theme}) => ({
    ...theme.typography.subtitle2,
    [theme.breakpoints.down('sm')]: {
        fontSize: '16px',
    },
}));

const MainBox = styled(Box)(({theme}) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
}));


const HeroItem: React.FC<HeroItemProps> = ({ hero }) => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const {name, birthYear, gender} = hero;

    const handleClick = (): void => {
        dispatch(clearSelectedHero());
        navigate(`/StarWars/hero/${hero.id}`);
    };

    return (
        <MainCard>
            <MainBox>
                <CardContent>
                    <MainTitle>
                        {name}
                    </MainTitle>
                    <Box sx={{display: 'flex', flexDirection: 'column', mt:0.5}}>
                        <MainSubtitle>
                            Birth year: {birthYear}
                        </MainSubtitle>
                        <MainSubtitle>
                            Gender: {gender}
                        </MainSubtitle>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant="contained" onClick={handleClick}>
                            Details
                        </Button>
                    </Box>
                </CardContent>
            </MainBox>
        </MainCard>
    );
};

export default HeroItem;