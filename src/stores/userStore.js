
import { observable, action } from 'mobx';

import http from '../http';

import authStore from '../stores/authStore';



const auth_url = `${process.env.REACT_APP_API_URL}/api/auth/jwt/create/`;

const me = `${process.env.REACT_APP_API_URL}/api/auth/users/me/`;


const userStore = observable(
    {
        //error and errorlist
        currentUser: null,
        loading: true,

        async auth(payload, history) {
            try {
                const response = await http.post(auth_url, payload);

                console.log('auth', response);
                const tokens = response.data;
                authStore.setTokens(tokens);
                this.fetch();
                if (history.location.state) {
                    history.push(history.location.state.from.pathname);
                }
            } catch(error) {
                console.log('Auth error:', error);
            } finally {
                this.loading = false;
            }
        },
        async fetch() {
            try {
                const response = await http.get(me);
                this.currentUser = response.data;
            } catch(error) {
                this.currentUser = null;

                console.log('user Fetch error:', error);
            } finally {
                this.loading = false;
            }
        }
    },
    {
        auth: action,
        fetch: action,
        currentUser: observable,
        loading: observable
    }
);


export default userStore;