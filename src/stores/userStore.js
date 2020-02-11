
import { observable, action } from 'mobx';

import http from '../http';

import authStore from '../stores/authStore';



const auth_url = 'http://127.0.0.1:8000/api/auth/jwt/create/';

const me = 'http://127.0.0.1:8000/api/auth/users/me/';


const userStore = observable(
    {
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