import React, {useEffect} from 'react';
import { inject, observer } from 'mobx-react';
import { Row, Col, Card, Spin, Button, Divider, Radio } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import IncidentFormCreate from './IncidentFormCreate';

import './Incidents.scss';




const Title = ({ title }) => {
    const priority_color = {
        'minor': '#A9A9A9',
        'low': '#DAA520',
        'medium': '#FF00FF',
        'high': '#f5222d'
    };
    return (
        <div className="incidents__priority">
            {title.title}
            <Divider type="vertical" />
            <Button 
                type="primary" 
                size="small" 
                style={{ backgroundColor: priority_color[title.priority], borderColor: priority_color[title.priority]}}
            >
                <Link 
                    to={(location) => queryHanlder(location, 'priority', title.priority)}
                >
                    {title.priority}
                </Link>
            </Button>
            <Divider type="vertical" />
            <Button 
                type="primary" 
                size="small">
                <Link 
                    to={(location) => queryHanlder(location, 'status', title.status)}
                >
                    {title.status}
                </Link>
            </Button>
        </div>
    );
};

const Extra = ({ extra }) => {
    return (
        <div className="incidents__extra">
            <Divider type="vertical" />
            {extra.date_created}
        </div>
    );
};

const queryHanlder = (location, param, value) => {
    const query = new URLSearchParams(location.search);
    query.has(param) ? query.set(param, value) : query.append(param, value);
    return { ...location, search: query.toString() };
};

export const Incidents = inject('incidentStore')(observer(({incidentStore}) => {
    
    const visible = incidentStore.showCreateForm;
    
    let query = new URLSearchParams(useLocation().search);

    const qStatus = query.get('status');
    const qPriority = query.get('priority');

    incidentStore.setStatus(qStatus);
    incidentStore.setPriority(qPriority);

    useEffect(() => {
        incidentStore.fetchIncidents();
    }, [qStatus, qPriority, incidentStore.limit]);

    return(
        <div className="incidents">
            <Row gutter={[32, 16]} justify="end">
                <Col span={12} push={9}>
                    { incidentStore.loading ?
                        <Row type="flex" justify="center">
                            <Col>
                                <Spin size="large" />
                            </Col>
                        </Row>
                        :
                        <Row gutter={[0, 16]}>
                            <Row type="flex" justify="space-between">
                                <Col>
                                    <Radio.Group value={qStatus}>
                                        <Radio.Button value="open"><Link to={(location) => queryHanlder(location, 'status', 'open')}>Open</Link></Radio.Button>
                                        <Radio.Button value="closed"><Link to={(location) => queryHanlder(location, 'status', 'closed')}>Closed</Link></Radio.Button>
                                    </Radio.Group>
                                </Col>
                                <Col>
                                    <Radio.Group value={qPriority}>
                                        <Radio.Button value="minor"><Link to={(location) => queryHanlder(location, 'priority', 'minor')}>Minor</Link></Radio.Button>
                                        <Radio.Button value="low"><Link to={(location) => queryHanlder(location, 'priority', 'low')}>Low</Link></Radio.Button>
                                        <Radio.Button value="medium"><Link to={(location) => queryHanlder(location, 'priority', 'medium')}>Medium</Link></Radio.Button>
                                        <Radio.Button value="high"><Link to={(location) => queryHanlder(location, 'priority', 'high')}>High</Link></Radio.Button>
                                    </Radio.Group>
                                </Col>
                            </Row>
                            { !incidentStore.loading && !incidentStore.incidents.length ?
                                <div>No content</div>
                                :
                                incidentStore.incidents.map(incident => (
                                    <Col key={incident.id}>
                                        <Card size="small" title={<Title title={{title: incident.title, priority: incident.priority, status: incident.status}} />} extra={<Extra extra={{date_created: incident.date_created}} />}>
                                            <div className="incident__content" dangerouslySetInnerHTML={{__html: incident.description}} />
                                        </Card>
                                    </Col>
                                ))
                            }
                            <div className="more">
                                <Button type="primary" loading={incidentStore.loading} disabled={incidentStore.moreIncidentsActive} block onClick={()=>incidentStore.more()}>
                                    Загрузить еще
                                </Button>
                            </div>
                        </Row>
                    }    
                </Col>
                
                <Col span={6} pull={9}>
                    <Card>
                        <Row>
                            <Col>
                                <Button type="primary" loading={incidentStore.loading} block onClick={()=> incidentStore.showForm()}>Новый инцидент</Button>
                            </Col>
                            <Divider />
                            {
                                incidentStore.loading ?
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
                                            <div className="incidents__count">Всего инцидентов ({incidentStore.count})</div>
                                        </Col>
                                    </Row>
                            }
                        </Row>
                    </Card>
                </Col>
            </Row>

            <IncidentFormCreate visible={visible}/>
        </div>
    );
}));