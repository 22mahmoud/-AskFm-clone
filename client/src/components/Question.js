import React from 'react';
import { Input, Row, Col, Form, Button, Icon } from 'antd';
import { graphql, compose } from 'react-apollo';

import { SendQuestiondMutation } from '../graphql/mutations';

const { TextArea } = Input;
const FormItem = Form.Item;
class Question extends React.Component {
  state = {
    loading: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        const response = await this.props.mutate({
          variables: {
            text: values.question,
            theResponder: '5a84963f348d6e254c3f3750',
          },
        });
        // console.log(response);
        this.props.form.resetFields('question');
        this.setState({ loading: false });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading } = this.state;
    return (
      <Form
        onSubmit={this.handleSubmit}
        style={{ background: 'rgba(0, 0, 0, 0.2)', padding: 18, borderRadius: 8 }}
      >
        <FormItem>{getFieldDecorator('question')(<TextArea placeholder="Question" />)}</FormItem>
        <Row type="flex" justify="end">
          <Col>
            <FormItem>
              <Button loading={!!loading} type="primary" htmlType="submit">
                Send <Icon type="caret-right" />
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default compose(graphql(SendQuestiondMutation), Form.create())(Question);
