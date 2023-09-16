/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import { Button, Form, Input } from 'antd';
import { loginAction } from './action/LoginAction';
import { ILoginForm } from './interface/LoginTypes';
import { useAppDispatch } from '../../redux/Hook';
import React from 'react';
import './LoginStyle.less';
import { useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: ILoginForm) => {
    form.resetFields();
    const res = await dispatch(loginAction({
      username: values.username,
      password: values.password,
      isRemember: true
    }));
    if (res.payload !== undefined) {
      navigate('/home');
    }
  };

  return (
    <div className='login-page-container'>
      <div>
        <h1> Timesheet </h1>
        <div className='form-container'>
          <h2> Log in </h2>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: false }}
            onFinish={onFinish}
            preserve={false}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input
                placeholder="username"
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                placeholder="password"
              />
            </Form.Item>

            <Form.Item className='submit-btn' wrapperCol={{ offset: 8, span: 16 }}>
              <Button role="button" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className='copyright'>
          <span>© 2022 Timesheet. Version 4.3.0.0 [20221606]</span>
        </div>
      </div>
    </div>
  );
};
