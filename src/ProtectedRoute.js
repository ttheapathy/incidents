import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

import { inject, observer } from 'mobx-react';

import { Spin, Row, Col } from 'antd';

/*
{something &&
    <div>fdsfdsf
}

{!something &&
}
*/


export const ProtectedRoute = inject('userStore')(observer(({userStore, children, rest}) => {
    const loading = userStore.loading;
    const currentUser = userStore.currentUser;

    if (loading) {
        return (
            <Row type="flex" justify="center">
                <Col>
                    <Spin size="large" />
                </Col>
            </Row>
        );
    }

    return (
        <Route
            {...rest} // why
            render={({ location }) => {

                if (currentUser) {
                    return children;
                }
                
                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: location }
                    }}
                />;
            

            }}
        />
    );
}));
