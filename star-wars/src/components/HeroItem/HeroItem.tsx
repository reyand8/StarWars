import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {Box, Button, Card, CardContent, styled, Typography} from '@mui/material';

import {HeroItemProps} from "../../types/hero.interface";
import {clearSelectedHero} from "../../features/allHeroesSlice/allHeroesSlice";
import { AppDispatch } from '../../features/store';

const MainCard = styled(Card)(({theme}) => ({
    display: 'flex',
    minHeight: '164px',
    backgroundColor: theme.palette.background.default,
    marginBottom: '16px',
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

    const {name, birth_year, gender} = hero;

    const handleClick = (): void => {
        dispatch(clearSelectedHero());
        navigate(`/hero/${hero.id}`);
    };

    return (
        <MainCard>
            <MainBox>
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography sx={{fontSize: '28px'}}>
                        {name}
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', mt:0.5}}>
                        <Typography variant='subtitle2'>
                            Birth year: {birth_year}
                        </Typography>
                        <Typography variant='subtitle2'>
                            Gender: {gender}
                        </Typography>
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