import React from 'react';

import { Select, Modal, Form, Input } from 'antd';

import { inject, observer } from 'mobx-react';


export const IncidentFormCreate = Form.create()(inject('incidentStore')(observer(({incidentStore, form }) => {
    
    const visibleForm = incidentStore.showCreateForm;

    const { Option } = Select;
    const { TextArea } = Input;

    const handleCancel = () => {
        incidentStore.hideForm();
    };

    const { getFieldDecorator } = form;
    
    const handleCreate = () => {
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            incidentStore.addIncident(values);
            form.resetFields();
            incidentStore.hideForm();
        });
    };

    return (
        <Modal
            visible={visibleForm}
            title="Новый инцидент"
            okText="Создать"
            cancelText="Отмена"
            onCancel={handleCancel}
            onOk={handleCreate}
        >
            <Form layout="vertical">
                <Form.Item label="Название инцидента">
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please input the title!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Описание инцидента">
                    {getFieldDecorator('description', {
                        rules: [{ required: true, message: 'Please input the description!' }],

                    })(<TextArea rows={4} type="textarea" />)}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('priority', {
                        initialValue: 'minor'
                    })(
                        <Select style={{ width: 240 }}>
                            <Option value="minor">Незначительный</Option>
                            <Option value="low">Низкий</Option>
                            <Option value="medium">Средний</Option>
                            <Option value="high">Высокий</Option>
                        </Select>,
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
}
)));

export default IncidentFormCreate;