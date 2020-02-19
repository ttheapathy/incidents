import React from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col } from 'antd';


export const NoMatch = () => {

    return (
        <Row type="flex" justify="center">
            <Col>
                <h1>NotFound</h1>
            </Col>
        </Row>
    );
};