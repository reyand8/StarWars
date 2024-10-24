export interface Film {
    id: number,
    title: string;
    opening_crawl: string;
    starships: number[];
    episode_id: number;
    release_date: string;
    director: string;
    producer: string;
}

export interface FormattedFilm {
    id: number,
    title: string;
    openingCrawl: string;
    starships: number[];
    episodeId: number;
    releaseDate: string;
    director: string;
    producer: string;
}