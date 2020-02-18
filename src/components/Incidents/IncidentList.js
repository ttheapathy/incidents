import React from 'react';
import { Row, Col, Card } from 'antd';
import { Spinner } from '../../Spinner';

import { IncidentTitle } from './IncidentTitle';
import { IncidentExtra } from './IncidentExtra';

export const IncidentList = ({loading, incidents}) => {
    if (loading) {
        return (<Spinner/>);
    }

    if (!loading && !incidents.length) {
        return (
            <Row type="flex" justify="center">
                <Col>
                    <h1>По заданному критерию инцидентов нет.</h1>
                </Col>
            </Row>
        );
    }
    
    return (
        incidents.map(incident => (
            <Col key={incident.id}>
                <Card  size="small" title={<IncidentTitle title={{title: incident.title, priority: incident.priority, status: incident.status}} />} extra={<IncidentExtra extra={{date_created: incident.date_created}} />}>
                    <div className="incident__content" dangerouslySetInnerHTML={{__html: incident.description}} />
                </Card>
            </Col>
        )));
};