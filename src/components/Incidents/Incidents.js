import React, {useEffect, useState} from 'react';
import { inject, observer } from 'mobx-react';
import { reaction } from 'mobx';

import { Row, Col, Modal, message } from 'antd';
import { useHistory} from 'react-router-dom';

import { IncidentFilter } from './IncidentFilter';
import { IncidentSidebar } from './IncidentSidebar';
import { IncidentList } from './IncidentList';
import { IncidentForm } from './IncidentForm';

import './Incidents.scss';

export const Incidents = inject('incidentStore')(observer(({incidentStore}) => {

    const [visible, setVisible] = useState(false);

    const [form, setForm] = useState(null);

    const setFilter = (history, filter, value) => {

        const query = new URLSearchParams(history.location.search);

        !value ? query.delete(filter) : query.set(filter, value);

        return history.replace({ ...history.location, search: query.toString()});
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleForm = (form) => {
        if (form) {
            setForm(form);
        }
    };

    const handleCreate = () => {
        console.log('errs', form.getFieldError('title'));
        form.validateFields((err, values) => {
            if (err) {

                return;
            }
            incidentStore.addIncident(values).then(
                (res) => {
                    if (res.status === 201) {
                        message.success('Инцидент успешно создан');
                        form.resetFields();
                        setVisible(false);
                    } else {
                        message.error('Ошибка при создании инцидента');
                    }
                }
            );
        });
    };

    const history = useHistory();

    const query = new URLSearchParams(history.location.search);

    const qStatus = query.get('status');
    const qPriority = query.get('priority');


    useEffect(() => {
        incidentStore.setFilter('status', qStatus);
        incidentStore.setFilter('priority', qPriority);     
    }, []);

    useEffect(() => {

        reaction(
            () => incidentStore.filters.status,
            status => setFilter(history, 'status', status)
        );

        reaction(
            () => incidentStore.filters.priority,
            priority => setFilter(history, 'priority', priority)
        );
        
        incidentStore.fetchIncidents();
 
    }, [qStatus, qPriority, incidentStore.limit]);


    
    return (
        <div className="incidents">
            <Row gutter={[32, 16]} justify="end">
                <Col span={12} push={9}>
                    <Row gutter={[0, 16]}>
                        <IncidentFilter/>

                        <IncidentList loading={incidentStore.loading} incidents={incidentStore.incidents} />
                    </Row>
                </Col>
                <Col span={6} pull={9}>
                    <IncidentSidebar loading={incidentStore.loading} insidentsCount={incidentStore.count} onVisible={(visible) => setVisible(visible)}/>
                </Col>
            </Row>
            <Modal
                visible={visible}
                title="Новый инцидент"
                okText="Создать"
                cancelText="Отмена"
                onCancel={handleCancel}
                confirmLoading={incidentStore.loading}
                onOk={handleCreate}
                
            >
                <IncidentForm handleForm={handleForm}/>
            </Modal>
        </div>
    );
}));