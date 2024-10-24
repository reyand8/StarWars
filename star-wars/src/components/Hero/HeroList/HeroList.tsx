import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import {Box, Button, Paper, Stack, styled, Typography} from '@mui/material';

import { fetchAllHeroes } from '../../../features/allHeroesSlice/allHeroesSlice';
import { AppDispatch } from '../../../features/store';
import HeroItem from '../HeroItem/HeroItem';
import { FormattedHero, RootHeroesState} from '../../../types/hero.interface';
import HeroSearch from '../HeroSearch/HeroSearch';


const StyledList = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '640px',
    width: '420px',
    top: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.text.secondary,
    ...theme.typography.body2,
    [theme.breakpoints.down('sm')]: {
        height: '540px',
    },
}));

const HeroItems = styled(Stack)(({theme}) => ({
    height: '100%',
    overflowY: 'scroll',
}));


const HeroList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { heroes, loading, error, next, previous } =
        useSelector((state: RootHeroesState) => state.allHeroes);

    /**
     * Loads heroes for a specific page.
     * @param {number} page - The page number to fetch heroes for.
     */
    const loadHeroes = (page: number): void => {
        if (page > 0) {
            dispatch(fetchAllHeroes(page));
        }
    };

    useEffect(() => {
        loadHeroes(currentPage);
    }, [dispatch, currentPage]);

    /**
     * Changes the page (next page).
     */
    const handleNext = (): void => {
        if (next) {
            setCurrentPage((prevPage: number) => prevPage + 1);
        }
    };

    /**
     * Changes the page (previous page).
     */
    const handlePrevious = (): void => {
        if (previous) {
            setCurrentPage((prevPage: number) => prevPage - 1);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
            <StyledList>
                <Typography>
                    Page: {currentPage}
                </Typography>
                <HeroSearch/>
                {loading ? (
                    <Typography>
                        Loading...
                    </Typography>
                ) : error ? (
                    <Typography>
                        Error
                    </Typography>
                ) : (
                    <HeroItems>
                        {heroes.map((hero: FormattedHero) => (
                            <HeroItem key={hero.id} hero={hero} />
                        ))}
                    </HeroItems>
                )}
                <Box sx={{ my: 1 }}>
                    <Button onClick={handlePrevious} disabled={!previous}>
                        Previous
                    </Button>
                    <Button onClick={handleNext} disabled={!next}>
                        Next
                    </Button>
                </Box>
            </StyledList>
        </Box>
    );
};

export default HeroList;