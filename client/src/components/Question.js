import React from 'react';
import { Input, Row, Col, Form, Select, Button, Icon } from 'antd';
import { graphql, compose } from 'react-apollo';

import { GetUsersQuery } from '../graphql/queries';
import { SendQuestiondMutation } from '../graphql/mutations';

const { TextArea } = Input;
const { Item: FormItem } = Form;
const { Option } = Select;

class Question extends React.Component {
  state = {
    loading: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) {
        this.setState({ loading: false });
      }
      if (!err) {
        const response = await this.props.mutate({
          variables: {
            text: values.question,
            theResponder: values.person,
          },
        });
        console.log(response, 'SEND QUESTION'); // eslint-disable-line
        this.props.form.resetFields('question');
        this.props.form.resetFields('person');
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { form: { getFieldDecorator }, data: { getUsers = [] } } = this.props;
    if (this.props.data.loading) {
      return null;
    }

    const { loading } = this.state;
    return (
      <Form
        onSubmit={this.handleSubmit}
        style={{ background: 'rgba(0, 0, 0, 0.2)', padding: 18, borderRadius: 8 }}
      >
        <FormItem>
          {getFieldDecorator('question', {
            rules: [
              {
                required: true,
                message: 'Please Write a Question',
              },
            ],
          })(<TextArea
            autosize={{ minRows: 2, maxRows: 4 }}
            placeholder="What, When, Where ... ask"
          />)}
        </FormItem>
        <Row type="flex" justify="space-between">
          <Col>
            <FormItem>
              {getFieldDecorator('person', {
                rules: [
                  {
                    required: true,
                    message: 'Please Choose person to ask',
                  },
                ],
              })(<Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
              >
                {getUsers.map(u => (
                  <Option key={u._id} value={u._id}>
                    {u.username}
                  </Option>
                  ))}
              </Select>)}
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <Button loading={!!loading} type="primary" htmlType="submit">
                Send {loading || <Icon type="caret-right" />}
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default compose(graphql(SendQuestiondMutation), graphql(GetUsersQuery), Form.create())(Question);
