import {Button, Col, Form, Icon, Input, Row} from "antd";
import React from "react";

import mordor from '../mordor.jpg';

import './Login.scss';
function Login({ form }) {
    const { getFieldDecorator, validateFields } = form;

    const handleSubmit = e => {

        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };
    const stl = {
        backgroundImage: `url(${mordor})`,
        backgroundSize: 'cover'
    };
    return (
        <div className="signin" style={stl}>
            <Row>
                <Col span={6} offset={9}>
                    <h1>Вход в систему</h1>
                    <Form onSubmit={handleSubmit} className="login-form">
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
                                rules: [{ required: true, message: 'Please input your Password!' }]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button block type="primary" htmlType="submit" className="login-form-button">
                                Вход
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );

}
const onFieldsChange = (_, changedFiels) => {
    console.log(changedFiels);

    const { username } = changedFiels;
    if (username) {
        console.log(`Now changing ${username.name}`);
    }
};
export default Form.create({ onFieldsChange })(Login);
