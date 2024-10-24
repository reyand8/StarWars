import React from 'react';
import { Node, Edge } from 'react-flow-renderer';


import { FormattedHero } from '../../types/hero.interface';
import { FormattedFilm } from '../../types/film.interface';
import { FormattedStarship } from '../../types/starship.interface';
import { GraphHero } from '../Graph/GraphHero/GraphHero';
import { GraphFilm } from '../Graph/GraphFilm/GraphFilm';
import { GraphStarship } from '../Graph/GraphStarship/GraphStarship';


/**
 * Builds graph data for the hero, their films, and starships.
 * @param hero - The hero object containing details about the hero.
 * @param films - An array of films associated with the hero.
 * @param starships - An array of starships associated with the hero.
 * @returns An object containing nodes and edges for the graph.
 */
export const buildGraphData = (hero: FormattedHero | null, films: FormattedFilm[] | null,
                               starships: FormattedStarship[] | null) => {
    const { id = 0, name = 'Unknown', birthYear = 'N/A' } = hero || {};

    const newNodes: Node[] = [
        {
            id: `hero`,
            data: {
                label: <GraphHero label={name} currHero={id} info={`Birth Year: ${birthYear}`} />,
            },
            position: { x: 250, y: 10 },
        },
        ...films!.map((film, index) => {
            const { id, title, releaseDate, director } = film;
            return {
                id: `film-${id}`,
                data: {
                    label: <GraphFilm label={title} heroFilm={id} releaseDate={releaseDate} director={director} />,
                },
                position: { x: 180 * (index + 1), y: 320 },
            };
        }),
        ...starships!.map((starship, index) => {
            const { id, name, model, manufacturer } = starship;
            return {
                id: `starship-${id}`,
                data: {
                    label: <GraphStarship label={name} heroStarship={id} model={model} manufacturer={manufacturer} />,
                },
                position: { x: 180 * (index + 1), y: 800 },
            };
        }),
    ];

    const newEdges: Edge[] = [
        ...films!.map(({id}) => ({
            id: `hero-film-${id}`,
            source: 'hero',
            target: `film-${id}`,
        })),
        ...films!.flatMap(({id, starships}) =>
            starships.map((starshipId: number) => {
                if (hero?.starships.includes(starshipId)) {
                    return {
                        id: `film-starship-${id}-${starshipId}`,
                        source: `film-${id}`,
                        target: `starship-${starshipId}`,
                    };
                }
                return null;
            }),
        ),
    ].filter((edge): edge is Edge => edge !== null);

    return { nodes: newNodes, edges: newEdges };
};