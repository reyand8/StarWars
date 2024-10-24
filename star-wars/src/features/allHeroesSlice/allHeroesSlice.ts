import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_URL } from '../../common/urls';
import { heroToCamelCase } from '../../common/camelCaseConverter';
import { FormattedHero, Hero } from '../../types/hero.interface';

/**
 * Asynchronously fetches all heroes.
 * @param page - The page number to fetch (default=1).
 * @returns A promise that resolves to the response data containing heroes.
 */
export const fetchAllHeroes = createAsyncThunk('allHeroes/fetchAllHeroes',
    async (page: number = 1) => {
        const response = await axios.get(`${BASE_URL}/people/?page=${page}`);
        return response.data;
    });

/**
 * Asynchronously fetches a single hero by the ID.
 * @param heroId - The ID of the hero.
 * @returns A promise that resolves to the response data containing the hero's details.
 */
export const fetchHeroById = createAsyncThunk('allHeroes/fetchHeroById',
    async (heroId: string) => {
    const response = await axios.get(`${BASE_URL}/people/${heroId}`);
    return response.data;
});

/**
 * Slice for managing the state of heroes.
 */
const allHeroesSlice = createSlice({
    name: 'allHeroes',
    initialState: {
        heroes: [],
        selectedHero: null as FormattedHero | null,
        next: null,
        previous: null,
        loading: false,
        error: null as string | null,
    },
    reducers: {
        /**
         * Clears the selected hero by setting selectedHero to null.
         * @param state - The current state.
         */
        clearSelectedHero: (state) => {
            state.selectedHero = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllHeroes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllHeroes.fulfilled, (state, action) => {
                const { results, next, previous } = action.payload;
                state.heroes = results.map((hero: Hero) => heroToCamelCase(hero));
                // state.heroes = results;
                state.next = next;
                state.previous = previous;
                state.loading = false;
            })
            .addCase(fetchAllHeroes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch all heroes';
            })

            .addCase(fetchHeroById.pending, (state) => {
                    state.loading = true;
                })
            .addCase(fetchHeroById.fulfilled, (state, action) => {
                state.selectedHero = heroToCamelCase(action.payload);
                state.loading = false;
            })
            .addCase(fetchHeroById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch hero';
            });
    },
});

export const { clearSelectedHero } = allHeroesSlice.actions;
export default allHeroesSlice.reducer;