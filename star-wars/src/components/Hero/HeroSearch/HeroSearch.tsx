import React, {useEffect, useRef, useState } from 'react';
import {Box, CircularProgress, styled, TextField, Typography} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useGetHeroesQuery } from '../../../features/searchHeroSlice/searchHeroSlice';


const SearchResultsBox = styled(Box)(({ theme }) => ({
    maxHeight: '200px',
    overflowY: 'auto',
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[6],
    position: 'absolute',
    top: '100%',
    width: '100%',
    zIndex: 1,
}));


const HeroSearch: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const searchResultsRef = useRef<HTMLDivElement | null>(null);

    const { data, isLoading } = useGetHeroesQuery(searchValue);

    /**
     * Handles clicks outside the search results box.
     * If the click is outside, the search value will be cleared.
     * @param {MouseEvent} event - The mouse event triggered by the click.
     */
    const handleClickOutside = (event: MouseEvent): void => {
        if (searchResultsRef.current && !searchResultsRef.current.contains(event.target as Node)) {
            setSearchValue('');
        }
    };

    /**
     * Adds a listener for clicks outside the component when it mounts
     * and removes it when the component unmounts.
     */
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    /**
     * Updates the search value based on user input.
     * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
     */
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(event.target.value);
    };

    return (
        <Box sx={{ position: 'relative', my: 2 }}>
            <TextField
                fullWidth
                variant="outlined"
                label="Search..."
                value={searchValue}
                onChange={handleSearch}
            />
            {searchValue && (
                <SearchResultsBox ref={searchResultsRef}>
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                            <CircularProgress size={24} />
                        </Box>
                    ) : !data || data.count === 0  ? (
                        <Typography sx={{ p: 2 }}>No results</Typography>
                    ) : (
                        data.results.map(({id, name}) => (
                            <RouterLink
                                key={id}
                                onClick={() => setSearchValue('')}
                                to={`/StarWars/hero/${id}`}
                                style={{ color: 'inherit', cursor: 'default', textDecoration: 'none' }}
                            >
                                <Box sx={{ display: 'flex', p: 1 }}>
                                    <Typography sx={{ textDecoration: 'none' }}>{name}</Typography>
                                </Box>
                            </RouterLink>
                        ))
                    )}
                </SearchResultsBox>
            )}
        </Box>
    );
};

export default HeroSearch;