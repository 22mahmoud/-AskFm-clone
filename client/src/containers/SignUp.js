import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

import normalizeErrors from '../normalizeErrors';

// import {} from "react-router-dom";

const FormItem = Form.Item;

class SignUp extends React.Component {
  state = {};
  checkPassword = (rule, value, callback) => {
    const { form } = this.props;

    if (value.length !== 0 && (value.length < 5 || value.length > 100)) {
      callback('The password needs to be between 5 and 100 characters long.');
    } else {
      callback();
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const { data: { register: { isOk, errors } } } = await this.props.mutate({
          variables: values,
        });
        if (isOk) {
          this.props.history.push('/');
        } else if (errors) {
          const errorsObj = normalizeErrors(errors);

          Object.entries(errorsObj).forEach(([key, value]) => {
            this.props.form.setFields({
              [key]: {
                value: '',
                errors: [new Error(value)],
              },
            });
          });
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: 'Please input your username',
                },
              ],
            })(<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your username',
                },
              ],
            })(<Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Email"
            />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: this.checkPassword,
                },
              ],
            })(<Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password"
              type="password"
            />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Sign Up
            </Button>
            Or <a href="">Login now!</a>
          </FormItem>
        </Form>
      </div>
    );
  }
}
// const { data: { register: { isOk, errors } } } = await props.mutate({
//   variables: values,
// });

// if (isOk) {
//   setSubmitting(false);
//   setErrors(false);
//   props.history.push('/login');
// }
// if (errors) {
//   console.log(errors);
//   setErrors(normalizeErrors(errors));
//   setSubmitting(false);
// }

const RegisterMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      isOk
      errors {
        path
        message
      }
    }
  }
`;

export default compose(graphql(RegisterMutation), Form.create())(SignUp);
