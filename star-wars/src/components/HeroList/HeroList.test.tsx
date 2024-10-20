import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import '@testing-library/jest-dom';

import HeroList from "./HeroList";
import { fetchAllHeroes } from "../../features/allHeroesSlice/allHeroesSlice";

const mockStore = configureStore([]);

jest.mock("../../features/allHeroesSlice/allHeroesSlice", () => ({
    fetchAllHeroes: jest.fn((page) => ({ type: "FETCH_ALL_HEROES", page })),
}));

describe("HeroList Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            allHeroes: {
                heroes: [],
                loading: false,
                error: null,
                next: null,
                previous: null,
            },
        });

        jest.clearAllMocks();
    });

    test("renders loading state", () => {
        store = mockStore({
            allHeroes: {
                heroes: [],
                loading: true,
                error: null,
                next: null,
                previous: null,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <HeroList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test("renders error state", () => {
        store = mockStore({
            allHeroes: {
                heroes: [],
                loading: false,
                error: "Some error occurred",
                next: null,
                previous: null,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <HeroList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });

    test("renders heroes list", () => {
        const mockHeroes = [
            { id: 1, name: "Hero 1" },
            { id: 2, name: "Hero 2" },
        ];

        store = mockStore({
            allHeroes: {
                heroes: mockHeroes,
                loading: false,
                error: null,
                next: 2,
                previous: null,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <HeroList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Page: 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Hero 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Hero 2/i)).toBeInTheDocument();
    });

    test("handles next page button click", async () => {
        const mockHeroes = [
            { id: 1, name: "Hero 1" },
            { id: 2, name: "Hero 2" },
        ];

        store = mockStore({
            allHeroes: {
                heroes: mockHeroes,
                loading: false,
                error: null,
                next: 2,
                previous: null,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <HeroList />
                </MemoryRouter>
            </Provider>
        );

        const nextButton = screen.getByText(/Next/i);
        fireEvent.click(nextButton);

        await waitFor(() => {
            expect(fetchAllHeroes).toHaveBeenCalledWith(2);
        });
    });

    test("handles previous page button click", async () => {
        const mockHeroes = [
            { id: 1, name: "Hero 1" },
            { id: 2, name: "Hero 2" },
        ];

        store = mockStore({
            allHeroes: {
                heroes: mockHeroes,
                loading: false,
                error: null,
                next: null,
                previous: 1,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <HeroList />
                </MemoryRouter>
            </Provider>
        );

        const prevButton = screen.getByText(/Previous/i);
        fireEvent.click(prevButton);

        await waitFor(() => {
            expect(fetchAllHeroes).toHaveBeenCalledWith(1);
        });
    });

    test("renders empty state when no heroes are available", () => {
        store = mockStore({
            allHeroes: {
                heroes: [],
                loading: false,
                error: null,
                next: null,
                previous: null,
            },
        });

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <HeroList />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText(/Page: 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/Hero 1/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Hero 2/i)).not.toBeInTheDocument();
    });
});