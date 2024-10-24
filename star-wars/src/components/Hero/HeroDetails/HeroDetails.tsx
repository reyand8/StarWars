import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, { MiniMap, Controls, Node, Edge } from 'react-flow-renderer';
import {Box, CircularProgress, styled, Typography} from '@mui/material';

import { RootState, AppDispatch } from '../../../features/store';
import { clearHeroDetails, fetchFilmDetails, fetchStarshipDetails } from '../../../features/heroDetailsSlice/heroDetailsSlice';
import { fetchHeroById } from '../../../features/allHeroesSlice/allHeroesSlice';
import { buildGraphData } from '../../utils/buildGraphData';
import {Hero} from '../../../types/hero.interface';
import {Film} from '../../../types/film.interface';
import {Starship} from '../../../types/starship.interface';


const BoxContent = styled(Box)(({ theme }) => ({
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height: '640px',
    maxWidth: '890px',
    width: '100%',
    margin: '30px auto',
    backgroundColor: theme.palette.secondary.main,
    [theme.breakpoints.down('sm')]: {
        height: '570px',
    },
}));

const HeroDetails: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams<{ id: string }>();

    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const hero = useSelector((state: RootState) => state.allHeroes.selectedHero);
    const { error } = useSelector((state: RootState) => state.heroDetails);

    useEffect(() => {
        if (id) {
            dispatch(fetchHeroById(id));
        } else {
            dispatch(clearHeroDetails());
        }
        return () => {
            dispatch(clearHeroDetails());
        };
    }, [dispatch, id]);

    /**
     * Fetches film details for the hero.
     * @param {Hero | null} hero - The hero object for which to fetch film details.
     * @returns {Promise<Film[]>} - A promise that resolves to an array of Film objects.
     */
    const fetchHeroFilmDetails = async (hero: Hero | null): Promise<Film[]> => {
        if (!hero || !hero.films.length) return [];
        const filmPromises = hero.films.map((filmId: number, index: number) =>
            new Promise<Film>((resolve) => {
                setTimeout(async () => {
                    const filmDetails = await dispatch(fetchFilmDetails(filmId)).unwrap();
                    resolve(filmDetails);
                }, index * 100);
            }),
        );
        return Promise.all(filmPromises);
    };

    /**
     * Return the common starship IDs between the hero and the film details.
     * @param {Hero | null} hero - The hero object for which to find common starship IDs.
     * @param {Film[]} filmDetails - An array of Films to compare the hero's starships.
     * @returns {number[]} - An array of IDS of common starship.
     */
    const getCommonStarshipIds = (hero: Hero | null, filmDetails: Film[]): number[] => {
        if (!hero || !hero.starships) return [];
        const starshipIdsFromFilms = new Set(filmDetails.flatMap(film => film.starships));
        const starshipIdsFromHero = new Set(hero.starships);
        return [...starshipIdsFromFilms].filter(id => starshipIdsFromHero.has(id));
    };

    /**
     * Fetches starship details based on the provided starship IDs.
     * @param {number[]} starshipIds - An array of common starship IDs to fetch details for.
     * @returns {Promise<Starship[]>} - A promise that resolves to an array of Starship objects.
     */
    const fetchHeroStarshipDetails = async (starshipIds: number[]): Promise<Starship[]> => {
        const starshipPromises = starshipIds.map((starshipId: number, index: number) =>
            new Promise<Starship>((resolve) => {
                setTimeout(async () => {
                    const starshipDetails = await dispatch(fetchStarshipDetails(starshipId)).unwrap();
                    resolve(starshipDetails);
                }, index * 100);
            }),
        );
        return Promise.all(starshipPromises);
    };

    /**
     * Fetches details for the hero, including films and starships, and builds graph data.
     * Sets the nodes and edges state based on the fetched details.
     */
    const fetchHeroDetails = async () => {
        setLoading(true);
        try {
            const filmDetails = await fetchHeroFilmDetails(hero);
            const commonStarshipIds = getCommonStarshipIds(hero, filmDetails);
            const starshipDetails = await fetchHeroStarshipDetails(commonStarshipIds);

            const { nodes: newNodes, edges: newEdges } =
                buildGraphData(hero, filmDetails, starshipDetails);

            setNodes(newNodes);
            setEdges(newEdges);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (hero) {
            fetchHeroDetails();
        } else {
            setNodes([]);
            setEdges([]);
        }
    }, [dispatch, hero]);


    if (error) {
        return (
            <BoxContent>
                <Typography variant="h4" style={{ marginLeft: '16px' }}>
                    Error...
                </Typography>
            </BoxContent>
        );
    }

    if (loading) {
        return (
            <BoxContent>
                <CircularProgress size={60}/>
                <Typography variant="h4" style={{ marginLeft: '16px' }}>
                    Loading...
                </Typography>
            </BoxContent>
        );
    }

    return (
        <BoxContent>
            <ReactFlow nodes={nodes} edges={edges} fitView>
                <MiniMap />
                <Controls />
            </ReactFlow>
        </BoxContent>
    );
};

export default HeroDetails;