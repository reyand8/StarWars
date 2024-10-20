import reducer, { fetchAllHeroes, fetchHeroById, clearSelectedHero } from './allHeroesSlice';
import axios from 'axios';

jest.mock('axios');

describe('allHeroesSlice', () => {
    const initialState = {
        heroes: [],
        selectedHero: null,
        next: null,
        previous: null,
        loading: false,
        error: null,
    };

    const newSelectedHero = {
        id: 21,
        name: 'Palpatine',
        height: '170',
        mass: '75',
        hair_color: 'grey',
        skin_color: 'pale',
        eye_color: 'yellow',
        birth_year: '82BBY',
        gender: 'male',
        homeworld: 8,
        films: [2, 3, 4, 5, 6],
        species: [1],
        vehicles: [],
        starships: [],
        created: '2014-12-15T12:48:05.971000Z',
        edited: '2014-12-20T21:17:50.347000Z',
        url: 'https://sw-api.starnavi.io/people/21/',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: 'undefined' })).toEqual(initialState);
    });

    it('should handle clearSelectedHero', () => {
        const prevState = {
            ...initialState,
            selectedHero: newSelectedHero,
        };
        const state = reducer(prevState, clearSelectedHero());
        expect(state.selectedHero).toBeNull();
    });

    it('should handle fetchAllHeroes.pending', () => {
        const action = { type: fetchAllHeroes.pending.type };
        const state = reducer(initialState, action);
        expect(state.loading).toBe(true);
    });

    it('should handle fetchAllHeroes.fulfilled', async () => {
        const heroesData = { results: [newSelectedHero] };
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: heroesData });

        const action = await fetchAllHeroes.fulfilled(heroesData, '', 1);
        const state = reducer(initialState, action);

        expect(state.heroes).toEqual(heroesData.results);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
    });

    it('should handle fetchHeroById.fulfilled', async () => {
        const heroData = newSelectedHero;
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: heroData });

        const action = await fetchHeroById.fulfilled(heroData, '', '21');
        const state = reducer(initialState, action);

        expect(state.selectedHero).toEqual(heroData);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
    });

    it('should handle rejected cases', async () => {
        const error = new Error('Failed to fetch');
        (axios.get as jest.Mock).mockRejectedValueOnce(error);

        const actionAllHeroes = await fetchAllHeroes.rejected(error, '', 21);
        const actionHeroById = await fetchHeroById.rejected(error, '', '21');

        const stateAllHeroes = reducer(initialState, actionAllHeroes);
        const stateHeroById = reducer(initialState, actionHeroById);

        expect(stateAllHeroes.error).toBe('Failed to fetch');
        expect(stateHeroById.error).toBe('Failed to fetch');
        expect(stateAllHeroes.loading).toBe(false);
        expect(stateHeroById.loading).toBe(false);
    });
});