import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { Starship } from '../../types/starship.interface';
import { Film } from '../../types/film.interface';
import { BASE_URL } from '../../common/urls';

/**
 * Asynchronously fetches film details from the API by film ID.
 * @param filmId - The ID of the film.
 * @returns A promise that resolves to the film's details.
 */
export const fetchFilmDetails = createAsyncThunk('heroDetails/fetchFilmDetails',
    async (filmId: number) => {
    const response = await axios.get(`${BASE_URL}/films/${filmId}/`);
    return response.data;
});

/**
 * Asynchronously fetches starship details from the API by starship ID.
 * @param starshipId - The ID of the starship.
 * @returns A promise that resolves to the starship's details.
 */
export const fetchStarshipDetails = createAsyncThunk('heroDetails/fetchStarshipDetails',
    async (starshipId: number) => {
    const response = await axios.get(`${BASE_URL}/starships/${starshipId}/`);
    return response.data;
});



/**
 * State interface for the hero details.
 */
interface HeroDetailsState {
    films: Film[];
    starships: Starship[];
    loading: boolean;
    error: string | null;
}

/**
 * Initial state.
 */
const initialState: HeroDetailsState = {
    films: [],
    starships: [],
    loading: false,
    error: null,
};

/**
 * Handles the start of an asynchronous action by setting loading to true and clearing any errors.
 * @param state - The current state of the hero details.
 */
const handleAsyncAction = (state: HeroDetailsState): void => {
    state.loading = true;
    state.error = null;
};

/**
 * Handles a rejected action.
 * @param state - The current state of the hero details.
 * @param action - This action contains the error message.
 */
const handleRejected = (state: HeroDetailsState,
                        action: { error: { message?: string } }): void => {
    state.loading = false;
    state.error = action.error.message || 'Failed to fetch data';
};

/**
 * Slice for managing hero details.
 */
const heroDetailsSlice = createSlice({
    name: 'heroDetails',
    initialState,
    reducers: {
        /**
         * Clears the hero details from the state.
         * @param state - The current state of the hero details.
         */
        clearHeroDetails: (state) => {
            state.films = [];
            state.starships = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilmDetails.pending, handleAsyncAction)
            .addCase(fetchFilmDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.films.push(action.payload);
            })
            .addCase(fetchFilmDetails.rejected, handleRejected)


            .addCase(fetchStarshipDetails.pending, handleAsyncAction)
            .addCase(fetchStarshipDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.starships.push(action.payload);
            })
            .addCase(fetchStarshipDetails.rejected, handleRejected);
    },
});

export const { clearHeroDetails } = heroDetailsSlice.actions;
export default heroDetailsSlice.reducer;