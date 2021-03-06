import React from 'react';
import { Form, Icon, Input, Button, Row, Col } from 'antd';
import { graphql, compose } from 'react-apollo';

import normalizeErrors from '../helpers/normalizeErrors';
import { RegisterMutation } from '../graphql/mutations';

const FormItem = Form.Item;

class SignUp extends React.Component {
  state = {
    loading: false,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) {
        this.setState({ loading: false });
      } else if (!err) {
        const { data: { register: { isOk, errors } } } = await this.props.mutate({
          variables: values,
        });
        if (isOk) {
          this.props.history.push('/');
        } else if (errors) {
          this.setState({ loading: false });
          const errorsObj = normalizeErrors(errors);

          Object.entries(errorsObj).forEach(([key, value]) => {
            let newValue;
            if (value.indexOf('already taken') > -1) {
              newValue = `${key} is ${value}`;
            } else {
              newValue = value;
            }
            this.props.form.setFields({
              [key]: {
                value: '',
                errors: [new Error(newValue)],
              },
            });
          });
        }
      }
    });
  };
  render() {
    const { loading } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <Row type="flex" justify="center" style={{ textAlign: 'center' }}>
          <Col xs={16} sm={14} md={12} lg={10} xl={8}>
            <h1 style={{ color: '#fff' }}> Sign Up </h1>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col xs={16} sm={14} md={12} lg={10} xl={8}>
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
                  ],
                })(<Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Password"
                  type="password"
                />)}
              </FormItem>
              <FormItem>
                <Button
                  loading={!!loading}
                  style={{ width: '100%' }}
                  type="primary"
                  htmlType="submit"
                >
                  Sign Up
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default compose(graphql(RegisterMutation), Form.create())(SignUp);
