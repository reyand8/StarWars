import { configureStore } from '@reduxjs/toolkit';

import heroesReducer from './allHeroesSlice/allHeroesSlice';
import heroDetailsReducer from './heroDetailsSlice/heroDetailsSlice';
import { searchHeroSlice } from './searchHeroSlice/searchHeroSlice';

/**
* Creates and configures the global Redux store.
*
* @property {object} reducer - This object contains the reducers that manage different slices of the app's state.
* @property {function} allHeroes - This reducer is responsible for managing the state of all heroes.
* @property {function} heroDetails - This reducer is responsible for managing the state of the selected hero's details.
* @property {function} searchHeroSlice - This reducer is responsible for managing the state associated with searching for heroes.
* @property {function} middleware - This function is used to apply middleware to the Redux store.
*/
const store = configureStore({
    reducer: {
        allHeroes: heroesReducer,
        heroDetails: heroDetailsReducer,
        [searchHeroSlice.reducerPath]: searchHeroSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(searchHeroSlice.middleware),
});

/**
 * A utility type that represents the overall shape of the Redux state.
 *
 * @returns {RootState} The entire state of the Redux store.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * A utility type that represents the dispatch function of the Redux store.
 *
 * @returns {AppDispatch} The dispatch function from the Redux store.
 */
export type AppDispatch = typeof store.dispatch;

export default store;