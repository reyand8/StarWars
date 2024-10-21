import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { buildGraphData, HeroContent, FilmContent, StarshipContent } from './buildGraphData';
import { Hero } from '../../types/hero.interface';
import { Film } from '../../types/film.interface';
import { Starship } from '../../types/starship.interface';


describe('HeroContent', () => {
    it('renders hero label and info', () => {
        const { getByText } = render(<HeroContent label="Palpatine" currHero={1} info="Birth Year: 82BBY" />);
        expect(getByText('Palpatine')).toBeInTheDocument();
        expect(getByText('Birth Year: 82BBY')).toBeInTheDocument();
    });
});

describe('FilmContent', () => {
    it('renders film label, release date, and director', () => {
        const { getByText } = render(
            <FilmContent label="The Empire Strikes Back"
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
            <StarshipContent label="Millennium Falcon"
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
        const hero: Hero = {
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
            films: [2, 3],
            species: [1],
            vehicles: [],
            starships: [],
            created: '2014-12-15T12:48:05.971000Z',
            edited: '2014-12-20T21:17:50.347000Z',
            url: 'https://sw-api.starnavi.io/people/21/',
        };
        const films: Film[] = [
            {
                id: 2,
                title: 'The Empire Strikes Back',
                episode_id: 5,
                opening_crawl: 'It is a dark time',
                director: 'Irvin Kershner',
                producer: 'Gary Kurtz, Rick McCallum',
                release_date: '1980-05-17',
                starships: [10, 11],
            },
            {
                id: 3,
                title: 'The Empire Strikes Back2',
                episode_id: 5,
                opening_crawl: 'It is a dark time2',
                director: 'Irvin Kershner2',
                producer: 'Gary Kurtz, Rick McCallum2',
                release_date: '1980-05-12',
                starships: [10, 11],
            },
        ];
        const starships: Starship[] = [
            {
                id: 10,
                name: 'Millennium Falcon',
                model: 'YT-1300 light freighter',
                manufacturer: 'Corellian Engineering Corporation',
                length: '34.37',
                max_atmosphering_speed: '1050',
                passengers: '6',
                starship_class: 'Light freighter',
            },
            {
                id: 11,
                name: 'Millennium Falcon 1',
                model: 'YT-1300 light freighter 1',
                manufacturer: 'Corellian Engineering Corporation 1',
                length: '34.371',
                max_atmosphering_speed: '10501',
                passengers: '61',
                starship_class: 'Light freighter1',
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