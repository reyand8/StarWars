export interface Hero {
    id: number;
    name: string;
    gender: string;
    films: number[];
    starships: number[];
    birth_year: string;
    created: string;
    edited: string;
    eye_color: string;
    hair_color: string;
    height: string;
    homeworld: number;
    mass: string;
    skin_color: string;
    species: number[];
    url: string;
    vehicles: number[];
}

export interface AllHeroes {
    heroes: Hero[];
    loading: boolean;
    error: string | null;
    next: string | null;
    previous: string | null;
}

export interface RootHeroesState {
    allHeroes: AllHeroes;
}

export interface HeroItemProps {
    hero: Hero;
}