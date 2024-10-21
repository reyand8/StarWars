import React from 'react';
import { Node, Edge } from 'react-flow-renderer';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

import { Hero } from '../../types/hero.interface';
import { Film } from '../../types/film.interface';
import { Starship } from '../../types/starship.interface';
import { IMAGE_URL } from '../../common/urls';


export const ContentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
}));

/**
 * Displays hero content with a label and additional info.
 * @param label - The name of the hero.
 * @param info - Additional info about the hero.
 * @returns JSX that represents the hero content.
 */
export const HeroContent = ({ label, currHero, info }: { label: string, currHero: number, info: string }) => (
    <ContentContainer>
        <Typography variant="h4">
            {label}
        </Typography>
        <Box component="img"
            sx={{
                width: '100%', height: 'auto',
                borderRadius: 1, boxShadow: 3,
            }}
            src={`${IMAGE_URL}/characters/${currHero}.jpg`}
            onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        {info && <Typography variant="body1">{info}</Typography>}
    </ContentContainer>
);

/**
 * Displays film content with a label and additional info.
 * @param label - The title of the film.
 * @param releaseDate - The release date of the film.
 * @param director - The director of the film.
 * @returns JSX represents the film content.
 */
export const FilmContent = ({ label, heroFilm, releaseDate, director }: { label: string, heroFilm: number,
    releaseDate: string, director: string }) => (
    <ContentContainer>
        <Typography variant="h5">{label}</Typography>
        <Box component="img"
             sx={{
                 width: '100%', height: 'auto',
                 borderRadius: 1, boxShadow: 3,
             }}
             src={`${IMAGE_URL}/films/${heroFilm}.jpg`}
             onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', margin: 1 }}>
            <Typography variant="body2">Release Date:</Typography>
            <Typography variant="body1">{releaseDate}</Typography>
            <Typography variant="body2">Director:</Typography>
            <Typography variant="body1">{director}</Typography>
        </Box>
    </ContentContainer>
);

/**
 * Displays starship content with a label and additional info.
 * @param label - The name of the starship.
 * @param model - The model of the starship.
 * @param manufacturer - The manufacturer of the starship.
 * @returns JSX represents the starship content.
 */
export const StarshipContent = ({ label, heroStarship, model, manufacturer }: { label: string, heroStarship: number,
    model: string, manufacturer: string }) => (
    <ContentContainer>
        <Typography variant="h5">{label}</Typography>
        <Box component="img"
             sx={{
                 width: '100%', height: 'auto',
                 borderRadius: 1, boxShadow: 3,
             }}
             src={`${IMAGE_URL}/starships/${heroStarship}.jpg`}
             onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', margin: 1 }}>
            <Typography variant="body2">Model:</Typography>
            <Typography variant="body1">{model}</Typography>
            <Typography variant="body2">Manufacturer:</Typography>
            <Typography variant="body1">{manufacturer}</Typography>
        </Box>
    </ContentContainer>
);

/**
 * Builds graph data for the hero, their films, and starships.
 * @param hero - The hero object containing details about the hero.
 * @param films - An array of films associated with the hero.
 * @param starships - An array of starships associated with the hero.
 * @returns An object containing nodes and edges for the graph.
 */
export const buildGraphData = (hero: Hero | null, films: Film[] | null, starships: Starship[] | null) => {
    const { id = 0, name = 'Unknown', birth_year = 'N/A' } = hero || {};

    const newNodes: Node[] = [
        {
            id: `hero`,
            data: {
                label: <HeroContent label={name} currHero={id} info={`Birth Year: ${birth_year}`} />,
            },
            position: { x: 250, y: 10 },
        },
        ...films!.map((film, index) => {
            const { id, title, release_date, director } = film;
            return {
                id: `film-${id}`,
                data: {
                    label: <FilmContent label={title} heroFilm={id} releaseDate={release_date} director={director} />,
                },
                position: { x: 180 * (index + 1), y: 320 },
            };
        }),
        ...starships!.map((starship, index) => {
            const { id, name, model, manufacturer } = starship;
            return {
                id: `starship-${id}`,
                data: {
                    label: <StarshipContent label={name} heroStarship={id} model={model} manufacturer={manufacturer} />,
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