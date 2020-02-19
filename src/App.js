import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import {Login} from './components/Login/Login';
import {News} from './components/News/News';
import {Incidents} from './components/Incidents/Incidents';
import {NoMatch} from './components/NoMatch';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';


import 'antd/dist/antd.css';
import './index.scss';



const { Header, Content, Footer } = Layout;

const App = inject('userStore')(observer(({userStore}) => {

    useEffect(() => {
        userStore.fetch();
    }, []);


    return (
        <Layout className="layout">
            <Router>
                <Switch>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                    <Route>
                        <Head />
                        <Content className="container">
                            <Switch>
                                <Route exact path={'/'}>
                                    <News/>
                                </Route>
                                <ProtectedRoute exact path={'/incidents'}>
                                    <Incidents/>
                                </ProtectedRoute>
                                <Route path="*">
                                    <NoMatch />
                                </Route>
                            </Switch>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>incidents app by ttheapathy</Footer>
                    </Route>
                </Switch>

            </Router>
        </Layout>
    );
}));

const Head = () => {
    return (
        <Header>
            <div className="nav">
                <NavLink exact to="/" activeClassName="nav-link-active" className="nav-link">Новости</NavLink>
                <NavLink exact to="/incidents" activeClassName="nav-link-active" className="nav-link">Инциденты</NavLink>
            </div>
        </Header>
    );
};

export default App;
