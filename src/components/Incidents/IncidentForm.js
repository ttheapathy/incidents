import React, {useEffect } from 'react';

import { Form, Select, Input} from 'antd';
import { inject } from 'mobx-react';

export const IncidentForm = Form.create()(inject('incidentStore')(({form, incidentStore, handleForm}) => {

    const { Option } = Select;
    const { TextArea } = Input;

    const { getFieldDecorator } = form;

    useEffect(() => {
        handleForm(form);
    }, []);

    return (
        <Form layout="vertical">
            <Form.Item 
                label="Название инцидента"
                validateStatus={incidentStore.errorTitle || form.getFieldError('title') ? 'error' : 'success'}
                help={incidentStore.errorTitle}
            
            >
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Пожалуйста, введите название инцидента' }],
                })(<Input />)}
            </Form.Item>
            <Form.Item 
                label="Описание инцидента"
                validateStatus={incidentStore.errorDescription || form.getFieldError('description') ? 'error' : 'success'}
                help={incidentStore.errorDescription}
            >
                {getFieldDecorator('description', {
                    rules: [{ required: true, message: 'Пожалуйста, введите описание инцидента' }],

                })(<TextArea rows={4} type="textarea" />)}
            </Form.Item>
            <Form.Item
                validateStatus={incidentStore.errorPriority || form.getFieldError('priority') ? 'error' : 'success'}
                help={incidentStore.errorPriority}
            >
                {getFieldDecorator('priority', {
                    rules: [{ required: true, message: 'Пожалуйста, укажите приоритет' }],
                })(
                    <Select
                        style={{ width: 240 }}
                        placeholder="Приоритет инцидента"
                    >
                        
                        <Option value="minor">Незначительный</Option>
                        <Option value="low">Низкий</Option>
                        <Option value="medium">Средний</Option>
                        <Option value="high">Высокий</Option>
                    </Select>,
                )}
            </Form.Item>
        </Form>
    );
}));