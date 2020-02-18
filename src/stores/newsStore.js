import { observable, action } from 'mobx';

import http from '../http';
const news_url = `${process.env.REACT_APP_API_URL}/api/news/`;
const newsStore = observable(
    {
        news: [],
        loading: true,

        async fetchNews() {
            try {
                const response = await http.get(news_url);
                this.news = response.data;
            } catch(err) {
                console.log('News fetch error:', err);
            }  finally {
                this.loading = false;
            }
        }
    },
    {
        fetchNews: action,
        news: observable,
        loading: observable
    }
);

export default newsStore;