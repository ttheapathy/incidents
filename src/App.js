import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";


import { ProtectedRoute } from "./ProtectedRoute";

import Login from './components/Login';

import {News} from './components/News';
import {Incidents} from './components/Incidents';

import {NewsState} from "./context/news/NewsState";

import "antd/dist/antd.css";
import "./index.scss";

import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

function App() {
  return (
      <NewsState>
          <Layout className="layout">
              <Router>
                  <Switch>
                      <Route exact path="/login" component={Login}>
                      </Route>
                      <Route>
                          <Head />
                          <Content className="container">
                              <Switch>
                                  <Route exact path={"/"}>
                                      <News/>
                                  </Route>
                                  <ProtectedRoute exact path={"/incidents"}>
                                      <Incidents/>
                                  </ProtectedRoute>
                              </Switch>
                          </Content>
                          <Footer style={{ textAlign: "center" }}>incidents app by ttheapathy</Footer>
                      </Route>
                  </Switch>
              </Router>
          </Layout>
      </NewsState>

  );
}

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
