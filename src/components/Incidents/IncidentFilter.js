import React from 'react';
import { Row, Col, Radio } from 'antd';

import { inject, observer } from 'mobx-react';

export const IncidentFilter = inject('incidentStore')(observer(({incidentStore}) => {
    return (
        <Row type="flex" justify="space-between">
            <Col>
                <Radio.Group value={incidentStore.filters.status}>
                    <Radio.Button value="open" onClick={() => incidentStore.setFilter('status', 'open')}>Open</Radio.Button>
                    <Radio.Button value="closed" onClick={() => incidentStore.setFilter('status', 'closed')}>Closed</Radio.Button>
                </Radio.Group>
            </Col>
            <Col>
                <Radio.Group value={incidentStore.filters.priority}>
                    <Radio.Button value="minor" onClick={() => incidentStore.setFilter('priority', 'minor')}>Minor</Radio.Button>
                    <Radio.Button value="low" onClick={() => incidentStore.setFilter('priority', 'low')}>Low</Radio.Button>
                    <Radio.Button value="medium" onClick={() => incidentStore.setFilter('priority', 'medium')}>Medium</Radio.Button>
                    <Radio.Button value="high" onClick={() => incidentStore.setFilter('priority', 'high')}>High</Radio.Button>
                </Radio.Group>
            </Col>
        </Row>
    );
}));