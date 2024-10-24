import { Film, FormattedFilm } from '../types/film.interface';
import { Hero, FormattedHero } from '../types/hero.interface';
import { Starship, FormattedStarship } from '../types/starship.interface';

export const heroToCamelCase = (hero: Hero): FormattedHero => {
    return {
        id: hero.id,
        name: hero.name,
        gender: hero.gender,
        films: hero.films,
        starships: hero.starships,
        birthYear: hero.birth_year,
        created: hero.created,
        edited: hero.edited,
        eyeColor: hero.eye_color,
        hairColor: hero.hair_color,
        height: hero.height,
        homeworld: hero.homeworld,
        mass: hero.mass,
        skinColor: hero.skin_color,
        species: hero.species,
        url: hero.url,
        vehicles: hero.vehicles,
    };
};

export const filmToCamelCase = (film: Film): FormattedFilm => {
    return {
        id: film.id,
        title: film.title,
        openingCrawl: film.opening_crawl,
        starships: film.starships,
        episodeId: film.episode_id,
        releaseDate: film.release_date,
        director: film.director,
        producer: film.producer,
    };
};

export const starshipToCamelCase = (starship: Starship): FormattedStarship => {
    return {
        id: starship.id,
        name: starship.name,
        model: starship.model,
        manufacturer: starship.manufacturer,
        length: starship.length,
        maxAtmospheringSpeed: starship.max_atmosphering_speed,
        passengers: starship.passengers,
        starshipClass: starship.starship_class,
    };
};