import React from 'react';
import { Row, Col, Card, Divider, Button, Spin } from 'antd';


export const IncidentSidebar = ({loading, insidentsCount, onVisible}) => {
    return (
        <Card>
            <Row>
                <Col>
                    <Button type="primary" block onClick={() => onVisible(true)}>Новый инцидент</Button>
                </Col>
                <Divider />
                {
                    loading ?
                        <Row type="flex" justify="center">
                            <Col>
                                <Spin size="large" />
                            </Col>
                        </Row>
                        :
                        <Row>
                            <Col>
                                <div className="incidents__active-count">Активных инцидентов (10)</div>
                            </Col>
                            <Col>
                                <div className="incidents__count">Всего инцидентов ({insidentsCount})</div>
                            </Col>
                        </Row>
                }
            </Row>
        </Card>
    );
};