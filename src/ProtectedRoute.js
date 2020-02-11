import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import { Spin, Row, Col } from 'antd';


export const ProtectedRoute = inject('userStore')(observer(({userStore, children, ...rest}) => {
    const loading = userStore.loading;
    const currentUser = userStore.currentUser;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                loading ? (
                    <Row type="flex" justify="center">
                        <Col>
                            <Spin size="large" />
                        </Col>
                    </Row>
                ) : (
                    currentUser ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: location }
                            }}
                        />
                    
                    )
                )
            }
        />
    );
}));
