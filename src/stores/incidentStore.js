import { observable, action, computed } from 'mobx';

import http from '../http';

const incidents_url = 'http://127.0.0.1:8000/api/incidents/';

const incidentStore = observable(
    {
        incidents: [],
        count: 0,
        limit: 4,
        offset: 0,
        loading: true,
        showCreateForm: false,
        filters: {status: '', priority: ''},
        
        get getlimitOffset() {
            return `?limit=${this.limit}&offset=${this.offset}`;
        },

        get getStatus() {
            return `&status=${this.filters.status}`;
        },

        get getPriority() {
            return `&priority=${this.filters.priority}`;
        },

        async fetchIncidents() {
            try {
                const response = await http.get(incidents_url + this.getlimitOffset + this.getStatus + this.getPriority);
                this.incidents = response.data.results;
                this.count = response.data.count;
            } catch(err) {
                console.log('Incidents fetch error:', err);
            }  finally {
                this.loading = false;
            }
        },

        async addIncident(payload) {
            try {
                this.loading = true;
                const response = await http.post(incidents_url, payload);
                this.incidents.unshift(response.data);
                this.count +=1;
            } catch(err) {
                console.log('Incidents put error:', err);
            }  finally {
                this.loading = false;
            }
        },

        async more() {
            /*
            if (this.offset) {
                this.offset = this.limit * this.offset;

            } else {
                this.offset = this.limit;

            }*/

            this.limit *=2;
        },

        async setStatus(status) {
            if (status) {
                this.filters.status = status;
            }            
        },

        async setPriority(priority) {
            if (priority) {
                this.filters.priority = priority;
            }            
        },

        showForm() {
            this.showCreateForm = true;
        },

        hideForm() {
            this.showCreateForm = false;
        },

        get moreIncidentsActive() {
            return (this.incidents && this.incidents.length === this.count);
        }
    },
    {
        fetchIncidents: action,
        incidents: observable,
        count: observable,
        limit: observable,
        offset: observable,
        moreIncidentsActive: computed,
        loading: observable,
        showCreateForm: observable,
        filters: observable
    }
);



export default incidentStore;