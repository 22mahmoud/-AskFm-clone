import React from 'react';
import { Row, Col, Form, Input, Icon, Button, Divider } from 'antd';
import { connect } from 'react-redux';

import Container from '../components/Container';

const FormItem = Form.Item;

class Settings extends React.Component {
  state = {};
  componentDidMount() {
    const { form: { setFieldsValue }, user } = this.props;
    setFieldsValue({
      username: 'FWOWO',
    });
  }
  render() {
    const { form: { getFieldDecorator }, user } = this.props;
    console.log(user, 'USer');
    return (
      <Container>
        <Row type="flex" justify="center">
          <Col xs={16} sm={14} md={12} lg={10} xl={8}>
            <h1 style={{ color: '#fff' }}> Settings </h1>
            <h3 style={{ color: '#fff' }}> General </h3>
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
              <Divider>
                <h3 style={{ color: '#fff' }}> Password </h3>
              </Divider>
              <FormItem>
                {getFieldDecorator('currentPassword', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ],
                })(<Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Current Password"
                  type="password"
                />)}
              </FormItem>
              <FormItem>
                {getFieldDecorator('newPassword')(<Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="New Password"
                  type="password"
                />)}
              </FormItem>
              <FormItem>
                <Button style={{ width: '40%' }} type="primary" htmlType="submit">
                  Save
                </Button>
              </FormItem>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default connect(({ user: { user } }) => ({ user }))(Form.create()(Settings));
