import React from 'react';
import { Row, Col, Spin } from 'antd';

export const Spinner = () => {
    return (
        <Row type="flex" justify="center">
            <Col>
                <Spin size="large" />
            </Col>
        </Row>
    );
};