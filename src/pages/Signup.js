import React, { useState } from 'react';
import { Button, Row, Col, Form, Input, Alert, ConfigProvider } from 'antd';

import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;
console.log(process.env.REACT_APP_API_URL);

const Signup = () => {
  const navigate = useNavigate();
  const [alert, setalert] = useState(null)

  const onFinish = (values) => {
    fetch(`${apiUrl}/register`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ email: values.email, username: values.username, password: values.password }),
    })

      .then((response) => { //if status is 409 means there is duplicate value in the columns (email) then error message
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.error || 'Registration failed');
          });
        }
        return response.json();
      })

      .then(() => {
        console.log('Success:', values);
        navigate('/login', { state: { email: values.email } });
      })
      .catch((error) => { //handle errors from fetch response
        setalert(
          <Alert
            description={error.message}
            type="error"
            showIcon
          />)
      })
  };

  return (
    <div className="signup-container" style={{ padding: "60px" }}>
      {alert}
      <div className="signup-card">
        <Row style={{ height: '65vh' }}>
          <Col span={1}></Col>
          <Col span={13}>
            <Row>
              <h1>Create An Account</h1>
            </Row>
            <br />
            <ConfigProvider
              theme={{
                components: {
                  Form: {
                    labelColor: '#ffffff', // This sets all form labels to white
                  },
                },
              }}
            >
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 18,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="on"
            >
              <Form.Item style={{ textAlign: "left" }}
                name="email"
                label="Email"
                labelAlign="left"
                rules={[
                  {
                    type: 'email',
                    message: 'Please enter a valid email!',
                  },
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
                hasFeedback
              >
                <Input placeholder='Enter your email' />
              </Form.Item>

              <Form.Item style={{ textAlign: "left" }}
                name="username"
                label="Username"
                labelAlign="left"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
                  },
                  {
                    min: 3,
                    message: 'Username must be at least 3 characters long.'
                  }
                ]}
                hasFeedback
              >
                <Input placeholder='Enter your username' />
              </Form.Item>

              <Form.Item style={{ textAlign: "left" }}
                label="Password"
                labelAlign="left"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                  {
                    //password minimum 8 characters
                    min: 8,
                    message: 'Passwords must be at least 8 characters long.'
                  }
                ]}
                hasFeedback
              >
                <Input.Password placeholder='Enter your password' />
              </Form.Item>

              <Form.Item style={{ textAlign: "left" }}
                name="confirm"
                label="Confirm Password"
                labelAlign="left"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value) {
                        return Promise.resolve();
                      }
                      if (value !== getFieldValue('password')) {
                        return Promise.reject(new Error('Confirm password entered do not match!'));
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input.Password placeholder='Enter your confirm password' />
              </Form.Item>

              <Form.Item label={null}>
                <Row>
                  <Col span={24}>
                    <Button className="register-btns" type="primary" style={{ width: "100%", marginTop: "10px", backgroundColor: "#29b6f6" }} htmlType="submit">
                      Register
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Button type="default" style={{ width: "100%", marginTop: "10px" }} onClick={() => navigate('/login')}>
                      Back to Login
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Form>
            </ConfigProvider>
          </Col>
          <Col span={9} className='signup-left'></Col>
        </Row>

      </div>
    </div>
  )
};

export default Signup;