import React from "react";
import {Meteor} from "meteor/meteor";
import { Form, Input, Button, notification } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { Messages } from "../../../../api/helpers";


export const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (user)=>{
    Meteor.call('register',user,(err) =>{
      if(err){
        notification.error({
          duration: Messages.DURATION,
          message: Messages.AUTH.MESSAGE.ERROR,
          description: err
        });
        return;
      };
      notification.success({
        duration: Messages.DURATION,
        message: Messages.AUTH.MESSAGE.SUCCESS,
        description: Messages.AUTH.DESCRIPTION.SUCCESS.REGISTER,
      });
      navigate('login');
    });
  };

  return(
    <div className="auth_form_container">
      <Form className="auth_form register_form"
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="auth_form_title">
          <h2>Register</h2>
        </div>
        <Form.Item 
          label='First name'
          name={'first_name'}>
          <Input type="text" />
        </Form.Item>
        <Form.Item 
          label='Last name'
          name={'last_name'}>
          <Input type="text" />
        </Form.Item>
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
          }}>
            <Button type="primary" htmlType="submit">
              Sing-Up
            </Button>
          </Form.Item>
      </Form>
      <div className="action">
        <p>Already Have Account <NavLink to={'/auth/login'}>Sing-In</NavLink></p>
      </div>
    </div>
  );
};