import React from "react";
import { Meteor } from "meteor/meteor";
import { Form, Input, Button, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { Messages, getError } from "../../../../api/helpers";

export const Login = ()=>{
  const navigate = useNavigate();

  const onFinish = (values)=>{
    Meteor.loginWithPassword(values.email, values.password,(err)=>{
      if(err){
        notification.error({
          duration: Messages.DURATION,
          message: Messages.AUTH.MESSAGE.ERROR,
          description: Messages.AUTH.DESCRIPTION.ERROR.LOGIN
        });
        return;
      }
      navigate('/home');
      notification.success({
        duration: Messages.DURATION,
        message: Messages.AUTH.MESSAGE.SUCCESS,
        description: Messages.AUTH.DESCRIPTION.SUCCESS.LOGIN,
      });
    });
  };

  return(
    <div className="auth_form_container">
      <Form className="auth_form login_form"
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="auth_form_title">
          <h2>Login</h2>
        </div>
        <Form.Item 
          label='Email'
          name={'email'}>
          <Input type="email" />
        </Form.Item>
        <Form.Item 
          label='Password'
          name={'password'}>
          <Input type="password" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>

        <Form.Item
        wrapperCol={{
          span: 24
        }}
        >
          <p>Forget Password? <NavLink to={'/auth/login'}>Reset Password</NavLink></p>
        </Form.Item>

      </Form>
      <div className="action">
        <p>D`ont Have Account <NavLink to={'/auth/register'}>Sing-Up</NavLink></p>
      </div>
    </div>
  );
};