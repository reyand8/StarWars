import axios from 'axios';

import reducer, { fetchFilmDetails, fetchStarshipDetails, clearHeroDetails } from './heroDetailsSlice';
import { Film } from '../../types/film.interface';
import { Starship } from '../../types/starship.interface';

jest.mock('axios');


describe('heroDetailsSlice', () => {
    const initialState = {
        films: [],
        starships: [],
        loading: false,
        error: null,
    };

    const newFilm: Film = {
        id: 2,
        title: 'The Empire Strikes Back',
        episode_id: 5,
        opening_crawl: 'It is a dark time',
        director: 'Irvin Kershner',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1980-05-17',
        starships: [3, 10, 11, 12, 15, 17, 21, 22, 23],
    };

    const newStarship: Starship = {
        id: 10,
        name: 'Millennium Falcon',
        model: 'YT-1300 light freighter',
        manufacturer: 'Corellian Engineering Corporation',
        length: '34.37',
        max_atmosphering_speed: '1050',
        passengers: '6',
        starship_class: 'Light freighter',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: 'undefined' })).toEqual(initialState);
    });

    it('should handle clearHeroDetails', () => {
        const prevState = {
            ...initialState,
            films: [newFilm],
            starships: [newStarship],
            loading: true,
            error: 'Error',
        };
        const state = reducer(prevState, clearHeroDetails());

        expect(state.films).toEqual([]);
        expect(state.starships).toEqual([]);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
    });

    it('should handle fetchFilmDetails.pending', () => {
        const action = { type: fetchFilmDetails.pending.type };
        const state = reducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('should handle fetchFilmDetails.fulfilled', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: newFilm });

        const action = await fetchFilmDetails.fulfilled(newFilm, '', 2);
        const state = reducer(initialState, action);

        expect(state.films).toEqual([newFilm]);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
    });

    it('should handle fetchStarshipDetails.pending', () => {
        const action = { type: fetchStarshipDetails.pending.type };
        const state = reducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBe(null);
    });

    it('should handle fetchStarshipDetails.fulfilled', async () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: newStarship });

        const action = await fetchStarshipDetails.fulfilled(newStarship, '', 10);
        const state = reducer(initialState, action);

        expect(state.starships).toEqual([newStarship]);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
    });

    it('should handle rejected cases', async () => {
        const error = new Error('Failed to fetch');
        (axios.get as jest.Mock).mockRejectedValueOnce(error);

        const actionFilm = await fetchFilmDetails.rejected(error, '', 10);
        const actionStarship = await fetchStarshipDetails.rejected(error, '', 10);

        const stateFilm = reducer(initialState, actionFilm);
        const stateStarship = reducer(initialState, actionStarship);

        expect(stateFilm.error).toBe('Failed to fetch');
        expect(stateStarship.error).toBe('Failed to fetch');
        expect(stateFilm.loading).toBe(false);
        expect(stateStarship.loading).toBe(false);
    });
});