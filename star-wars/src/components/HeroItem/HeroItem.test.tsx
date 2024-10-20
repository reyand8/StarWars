import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import HeroItem from './HeroItem';
import store from '../../features/store';


jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

describe('HeroItem Component', () => {
    const mockHero = {
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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const renderWithProvider = (re: React.ReactElement) => {
        return render(<Provider store={store}>{re}</Provider>);
    };

    it('renders hero information correctly', () => {
        renderWithProvider(<HeroItem hero={mockHero} />);

        expect(screen.getByText(mockHero.name)).toBeInTheDocument();
        expect(screen.getByText(`Birth year: ${mockHero.birth_year}`)).toBeInTheDocument();
        expect(screen.getByText(`Gender: ${mockHero.gender}`)).toBeInTheDocument();
    });

    it('navigates to hero details on button click', () => {
        const mockNavigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

        renderWithProvider(<HeroItem hero={mockHero} />);

        const button = screen.getByRole('button', { name: /Details/i });
        fireEvent.click(button);

        expect(mockNavigate).toHaveBeenCalledWith(`/hero/${mockHero.id}`);
    });
});