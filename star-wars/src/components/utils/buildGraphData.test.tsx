import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { buildGraphData } from './buildGraphData';
import { FormattedHero } from '../../types/hero.interface';
import { FormattedFilm } from '../../types/film.interface';
import { FormattedStarship } from '../../types/starship.interface';
import { GraphHero } from '../Graph/GraphHero/GraphHero';
import { GraphFilm } from '../Graph/GraphFilm/GraphFilm';
import { GraphStarship } from '../Graph/GraphStarship/GraphStarship';


describe('HeroContent', () => {
    it('renders hero label and info', () => {
        const { getByText } = render(<GraphHero label="Palpatine" currHero={1} info="Birth Year: 82BBY" />);
        expect(getByText('Palpatine')).toBeInTheDocument();
        expect(getByText('Birth Year: 82BBY')).toBeInTheDocument();
    });
});

describe('FilmContent', () => {
    it('renders film label, release date, and director', () => {
        const { getByText } = render(
            <GraphFilm label="The Empire Strikes Back"
                         heroFilm={1}
                         releaseDate="1980-05-17"
                         director="Irvin Kershner" />,
        );
        expect(getByText('The Empire Strikes Back')).toBeInTheDocument();
        expect(getByText('Release Date:')).toBeInTheDocument();
        expect(getByText('1980-05-17')).toBeInTheDocument();
        expect(getByText('Director:')).toBeInTheDocument();
        expect(getByText('Irvin Kershner')).toBeInTheDocument();
    });
});

describe('StarshipContent', () => {
    it('renders starship label, model, and manufacturer', () => {
        const { getByText } = render(
            <GraphStarship label="Millennium Falcon"
                             heroStarship={1}
                             model="YT-1300 light freighter"
                             manufacturer="Corellian Engineering Corporation" />,
        );
        expect(getByText('Millennium Falcon')).toBeInTheDocument();
        expect(getByText('Model:')).toBeInTheDocument();
        expect(getByText('YT-1300 light freighter')).toBeInTheDocument();
        expect(getByText('Manufacturer:')).toBeInTheDocument();
        expect(getByText('Corellian Engineering Corporation')).toBeInTheDocument();
    });
});

describe('buildGraphData', () => {
    it('builds graph data correctly', () => {
        const hero: FormattedHero = {
            id: 21,
            name: 'Palpatine',
            height: '170',
            mass: '75',
            hairColor: 'grey',
            skinColor: 'pale',
            eyeColor: 'yellow',
            birthYear: '82BBY',
            gender: 'male',
            homeworld: 8,
            films: [2, 3],
            species: [1],
            vehicles: [],
            starships: [],
            created: '2014-12-15T12:48:05.971000Z',
            edited: '2014-12-20T21:17:50.347000Z',
            url: 'https://sw-api.starnavi.io/people/21/',
        };
        const films: FormattedFilm[] = [
            {
                id: 2,
                title: 'The Empire Strikes Back',
                episodeId: 5,
                openingCrawl: 'It is a dark time',
                director: 'Irvin Kershner',
                producer: 'Gary Kurtz, Rick McCallum',
                releaseDate: '1980-05-17',
                starships: [10, 11],
            },
            {
                id: 3,
                title: 'The Empire Strikes Back2',
                episodeId: 5,
                openingCrawl: 'It is a dark time2',
                director: 'Irvin Kershner2',
                producer: 'Gary Kurtz, Rick McCallum2',
                releaseDate: '1980-05-12',
                starships: [10, 11],
            },
        ];
        const starships: FormattedStarship[] = [
            {
                id: 10,
                name: 'Millennium Falcon',
                model: 'YT-1300 light freighter',
                manufacturer: 'Corellian Engineering Corporation',
                length: '34.37',
                maxAtmospheringSpeed: '1050',
                passengers: '6',
                starshipClass: 'Light freighter',
            },
            {
                id: 11,
                name: 'Millennium Falcon 1',
                model: 'YT-1300 light freighter 1',
                manufacturer: 'Corellian Engineering Corporation 1',
                length: '34.371',
                maxAtmospheringSpeed: '10501',
                passengers: '61',
                starshipClass: 'Light freighter1',
            },
        ];

        const { nodes, edges } = buildGraphData(hero, films, starships);

        expect(nodes).toHaveLength(5);
        expect(nodes[0].data.label.props.label).toBe('Palpatine');
        expect(nodes[1].data.label.props.label).toBe('The Empire Strikes Back');
        expect(nodes[2].data.label.props.label).toBe('The Empire Strikes Back2');

        expect(edges).toHaveLength(2);
        expect(edges[0].source).toBe('hero');
        expect(edges[0].target).toBe('film-2');
        expect(edges[1].source).toBe('hero');
        expect(edges[1].target).toBe('film-3');
    });
});