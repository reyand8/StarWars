import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';

import HeroList from './HeroList';
import { fetchAllHeroes } from '../../../features/allHeroesSlice/allHeroesSlice';
import { searchHeroSlice } from '../../../features/searchHeroSlice/searchHeroSlice';

const mockStore = (initialState: { allHeroes: any; }) => {
    return configureStore({
        reducer: {
            allHeroes: (state = initialState.allHeroes) => state,
            [searchHeroSlice.reducerPath]: searchHeroSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(searchHeroSlice.middleware),
    });
};

jest.mock('../../features/allHeroesSlice/allHeroesSlice', () => ({
    fetchAllHeroes: jest.fn(() => ({
        type: 'allHeroes/fetchAllHeroes',
    })),
}));

describe('HeroList', () => {
    const initialState = {
        allHeroes: {
            heroes: [{ id: 1, name: 'Superman' }, { id: 2, name: 'Batman' }],
            loading: false,
            error: null,
            next: true,
            previous: false,
        },
    };

    test('renders loading state', () => {
        const store = mockStore({
            allHeroes: {
                ...initialState.allHeroes,
                loading: true,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <HeroList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Loading.../)).toBeInTheDocument();
    });

    test('renders error state', () => {
        const store = mockStore({
            allHeroes: {
                ...initialState.allHeroes,
                error: 'Some error occurred',
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <HeroList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Error/)).toBeInTheDocument();
    });

    test('renders hero list', () => {
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <HeroList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Page: 1/)).toBeInTheDocument();
        expect(screen.getByText('Superman')).toBeInTheDocument();
        expect(screen.getByText('Batman')).toBeInTheDocument();
    });

    test('handles pagination buttons', () => {
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <HeroList />
                </MemoryRouter>
            </Provider>
        );

        const nextButton = screen.getByText(/Next/);
        const previousButton = screen.getByText(/Previous/);

        expect(previousButton).toBeDisabled();
        fireEvent.click(nextButton);
        expect(fetchAllHeroes).toHaveBeenCalledWith(2);
    });
});
