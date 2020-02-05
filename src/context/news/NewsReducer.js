import {SHOW_LOADER, FETCH_NEWS} from '../types';

const handlers = {
    [SHOW_LOADER]: state => ({...state, loading: true}),
    [FETCH_NEWS]: (state, {payload}) => ({...state, news: payload, loading: false}),
    DEFAULT: state => state
};

export const NewsReducer = (state, action) => {
    const handle = handlers[action.type] || handlers.DEFAULT;
    return handle(state, action);
};
