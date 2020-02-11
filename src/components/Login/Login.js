import {Button, Col, Form, Icon, Input, Row} from 'antd';
import React from 'react';
import { inject, observer } from 'mobx-react';

import {
    useHistory
} from 'react-router-dom';


import './Login.scss';

const onFieldsChange = (_, changedFiels) => {
    console.log(changedFiels);

    const { username } = changedFiels;
    if (username) {
        console.log(`Now changing ${username.name}`);
    }
};

export const Login = Form.create({onFieldsChange})(inject('userStore')(observer(({userStore, form }) => {

    const history = useHistory();
    const { getFieldDecorator, validateFields } = form;
    
    const handleSubmit = (event) => {
        event.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                userStore.auth(values, history);
            }
        });
    };

    return (
        <div className="signin">
            <Row>
                <Col span={6} offset={9}>
                    <h1>Вход в систему</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your email!' }]
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Почта"
                                    type="email"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your password!' }]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" htmlType="submit" loading={userStore.loading}>
                                Вход
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
})));


