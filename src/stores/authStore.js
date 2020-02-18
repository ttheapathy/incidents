import { observable, action } from 'mobx';

const authStore = observable(
    {
        // error and errorlist
        tokens: null,

        setTokens(tokens) {
            try {
                this.tokens = tokens;
                localStorage.setItem('tokens', JSON.stringify(tokens));
            } catch(err) {
                console.log('Set tokens error:', err);
            }
        },
        getTokens() {
            try {
                this.tokens = JSON.parse(localStorage.getItem('tokens')) || null;
                if (this.tokens) {
                    return this.tokens;
                }
            } catch(err) {
                console.log('Set tokens error:', err);
            }

        }
    },
    {
        setTokens: action,
        getTokens: action,
        tokens: observable
    }
);

export default authStore;
