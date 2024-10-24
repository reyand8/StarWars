import { Film, FormattedFilm } from '../types/film.interface';
import { Hero, FormattedHero } from '../types/hero.interface';
import { Starship, FormattedStarship } from '../types/starship.interface';

export const heroToCamelCase = ({   id, name, gender, films,
                                    starships, birth_year, created,
                                    edited, eye_color, hair_color, height,
                                    homeworld, mass, skin_color, species, url, vehicles }: Hero): FormattedHero => {
    return {
        id,
        name,
        gender,
        films,
        starships,
        birthYear: birth_year,
        created,
        edited,
        eyeColor: eye_color,
        hairColor: hair_color,
        height,
        homeworld,
        mass,
        skinColor: skin_color,
        species,
        url,
        vehicles,
    };
};

export const filmToCamelCase = ({   id, title, opening_crawl, starships,
                                    episode_id, release_date, director, producer }: Film): FormattedFilm => {
    return {
        id,
        title,
        openingCrawl: opening_crawl,
        starships,
        episodeId: episode_id,
        releaseDate: release_date,
        director,
        producer,
    };
};

export const starshipToCamelCase = ({   id, name, model, manufacturer,
                                        length, max_atmosphering_speed,
                                        passengers, starship_class }: Starship): FormattedStarship => {
    return {
        id,
        name,
        model,
        manufacturer,
        length,
        maxAtmospheringSpeed: max_atmosphering_speed,
        passengers,
        starshipClass: starship_class,
    };
};