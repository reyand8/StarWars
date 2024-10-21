import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import fetch from 'cross-fetch';

import { BASE_URL } from '../../common/urls';
import { Hero } from '../../types/hero.interface';
import { ApiResponse } from '../../types/apiResponse.interface';


/**
 * The searchHeroSlice is a Redux slice that uses RTK Query
 * to manage the API interactions for searching heroes.
 *
 * @typedef {Object} searchHeroSlice
 * @property {string} reducerPath - The key used to register the slice in the Redux store.
 * @property {Function} baseQuery - The base query function for fetching data from the API.
 * @property {Array<string>} tagTypes - An array of tag types for invalidating and refetching data.
 * @property {Object} endpoints - An object defining the endpoints available in this slice.
 * @property {Function} getHeroes - A query endpoint for fetching heroes based on search parameters.
 *
 * @returns {Object} The slice containing hooks to call the API.
 */
export const searchHeroSlice = createApi({
    reducerPath: 'searchHeroSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        fetchFn: fetch,
    }),
    tagTypes: ['Hero'],
    endpoints: (builder) => ({
        getHeroes: builder.query<ApiResponse<Hero>, string>({
            query: (searchValue) => `/people/?search=${searchValue}`,
        }),
    }),
});

export const { useGetHeroesQuery } = searchHeroSlice;