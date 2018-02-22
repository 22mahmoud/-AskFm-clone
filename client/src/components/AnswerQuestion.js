import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Spin, Form, Input, Icon, Button } from 'antd';
import { Redirect } from 'react-router-dom';

import { GetMyNotAnsweredQuestionQuery, GetQestionsQuery } from '../graphql/queries';
import { AnswerQuestionMutation } from '../graphql/mutations';
import Container from './Container';

const FormItem = Form.Item;
const { TextArea } = Input;

class AnswerQuestion extends React.Component {
  state = {
    loading: false,
  };
  handleSubmit = (e, id) => {
    e.preventDefault();
    this.setState({ loading: true });
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (err) {
        this.setState({ loading: false });
      }
      if (!err) {
        const response = await this.props.mutate({
          variables: {
            answer: values.answer,
            id,
          },
          update: (store, { data: { AnswerQuestion: AQ } }) => {
            const data = store.readQuery({ query: GetQestionsQuery });
            data.getQuestions.unshift(AQ.question);
            store.writeQuery({ query: GetQestionsQuery, data });
          },
        });
        if (response) {
          this.props.history.push('/feed');
        }
        if (!response) {
          this.props.form.resetFields('answer');
          this.setState({ loading: false });
        }
      }
    });
  };

  render() {
    const {
      data: { loading, getMyNotAnsweredQuestion = {} },
      form: { getFieldDecorator },
    } = this.props;

    const { loading: L } = this.state;

    if (loading) {
      return (
        <Spin
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 15,
          }}
        />
      );
    }
    if (!getMyNotAnsweredQuestion.isOk) {
      return <Redirect to={{ pathname: '/feed' }} />;
    }

    const { question: { _id: id, text, theAsker: { username } } } = getMyNotAnsweredQuestion;

    return (
      <Container>
        <div style={{ background: '#fff', padding: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <h2 style={{ paddingRight: 8 }}> {text} </h2>
            <h5> {username} </h5>
          </div>
          <Form onSubmit={e => this.handleSubmit(e, id)} style={{ borderRadius: 8 }}>
            <FormItem>
              {getFieldDecorator('answer')(<TextArea autosize={{ minRows: 4 }} placeholder="What is your answer ?" />)}
            </FormItem>
            <FormItem>
              <Button loading={!!L} type="primary" htmlType="submit">
                Send {loading || <Icon type="caret-right" />}
              </Button>
            </FormItem>
          </Form>
        </div>
      </Container>
    );
  }
}

export default compose(
  graphql(GetMyNotAnsweredQuestionQuery, {
    options: ({ match: { params: { id } } }) => ({
      variables: { questionID: id },
    }),
  }),
  graphql(AnswerQuestionMutation),
  Form.create(),
)(AnswerQuestion);
