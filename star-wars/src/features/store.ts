import { configureStore } from '@reduxjs/toolkit';

import heroesReducer from './allHeroesSlice/allHeroesSlice';
import heroDetailsReducer from './heroDetailsSlice/heroDetailsSlice';

/**
* Creates and configures the global Redux store.
*
* @property {object} reducer - This object contains the reducers that manage different slices of the app's state.
* @property {function} heroesReducer - This reducer responsible for managing the state of all heroes.
* @property {function} heroDetailsReducer - This reducer responsible for managing the state of the selected hero's details.
*/
const store = configureStore({
    reducer: {
        allHeroes: heroesReducer,
        heroDetails: heroDetailsReducer,
    },
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