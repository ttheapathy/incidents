import { observable, action, computed } from 'mobx';

import http from '../http';

const incidents_url = `${process.env.REACT_APP_API_URL}/api/incidents/`;

const incidentStore = observable(
    {
        incidents: [],
        count: 0,
        limit: 4,
        offset: 0,
        loading: true,
        showCreateForm: false,
        filters: {status: null, priority: null},
        errors: {},

        // bullshit. needs method for making this shit. param & value. get limit and offset as default
        // and other filters optional.
        
        get getlimitOffset() {
            return `?limit=${this.limit}&offset=${this.offset}`;
        },

        get getStatus() {
            return (this.filters.status) ? `&status=${this.filters.status}` : '';
        },

        get getPriority() {

            return (this.filters.priority) ? `&priority=${this.filters.priority}` : '';
        },
        
        get errorTitle(){
            return this.errors.title;
        },
        get errorDescription() {
            return this.errors.description;
        },
        get errorPriority() {
            return this.errors.priority;
        },

        async fetchIncidents() {
            try {
                this.loading = true;
                const response = await http.get(incidents_url + this.getlimitOffset + this.getStatus + this.getPriority);
                this.incidents = response.data.results;
                this.count = response.data.count;
            } catch(err) {
                console.error('Incidents fetch error:', err);
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
                return response;
            } catch(error) {
                console.error('Incidents put error:', error.response);
                this.errors = error.response.data;
                return error.response;
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
            this.filters.status = status;
        },

        async setPriority(priority) {
            this.filters.priority = priority;
        },

        async setFilter(filter, value) {

            if (filter in this.filters && this.filters[filter] === value) {
                this.filters[filter] = null;
            } else {
                this.filters[filter] = value;
            }
        },

        get moreIncidentsActive() {
            return (this.incidents && this.incidents.length === this.count);
        },
        
    },
    {
        fetchIncidents: action,
        incidents: observable,
        count: observable,
        limit: observable,
        offset: observable,
        moreIncidentsActive: computed,
        errorTitle: computed,
        loading: observable,
        showCreateForm: observable,
        filters: observable,
        errors: observable
    }
);

export default incidentStore;