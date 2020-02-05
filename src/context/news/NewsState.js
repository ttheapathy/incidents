import React, {useReducer} from 'react'
import axios from 'axios';
import {NewsContext} from './NewsContext';
import {NewsReducer} from './NewsReducer';
import {SHOW_LOADER, FETCH_NEWS} from '../types';

//const url = process.env.REACT_APP_DB_URL

const url = 'http://127.0.0.1:8000/api/news/';

export const NewsState = ({children}) => {
    const initialState = {
        news: [],
        loading: false
    };
    const [state, dispatch] = useReducer(NewsReducer, initialState);

    const showLoader = () => dispatch({type: SHOW_LOADER});

    const fetchNews = async () => {
        showLoader();
        try {
            const res = await axios.get(url);
            const payload = res.data;
            dispatch({type: FETCH_NEWS, payload});
        } catch (e) {
            throw new Error(e.message);
        }
    };

    return (
        <NewsContext.Provider value={{
            showLoader, fetchNews,
            loading: state.loading,
            news: state.news
        }}>
            {children}
        </NewsContext.Provider>
    )
}
