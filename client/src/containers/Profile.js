import React from 'react';
import { graphql, compose } from 'react-apollo';
import { Row, Col, Spin } from 'antd';
import { Redirect } from 'react-router-dom';

import {
  ProfileAbout as About,
  ProfileStats as Stats,
  ProfileHeader as Header,
} from '../components/Profile';
import Question from '../components/Question';
import QuestionCard from '../components/QuestionsList/QuestionCard';

import { GetUserByUsernameQuery, GetUserAnsweredQuestionsQuery } from '../graphql/queries';
import { QuestionLikedSubscriptions } from '../graphql/subscriptions';

class Profile extends React.Component {
  componentWillMount() {
    this.props.subscribeToQuestionliked();
  }
  render() {
    const {
      data: { loading, getUserByUsername = {} },
      answerdQuestions: { loading: L, getUserAnsweredQuestions = [] },
    } = this.props;
    if (loading && L) {
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

    if (!getUserByUsername) {
      return <Redirect to={{ pathname: '/feed' }} />;
    }

    return (
      <div>
        <Row type="flex" justify="center" align="middle" style={{ textAlign: 'center' }}>
          <Col span={18}>
            <Header username={getUserByUsername.username} />
          </Col>
        </Row>
        <Row type="flex" justify="center" style={{ textAlign: 'center' }}>
          <Col xs={22} sm={22} md={20} lg={10} xl={{ order: 2, span: 8 }}>
            <Stats />
            <About />
          </Col>
          <Col xs={22} sm={22} md={20} lg={10} xl={{ order: 1, span: 8 }}>
            <Question userToAsk={getUserByUsername._id} />
            <div
              style={{
                textAlign: 'left',
                background: 'rgb(205, 205, 217)',
                marginTop: 15,
                color: '#000',
                padding: '5 0',
                borderRadius: 2,
              }}
            />
            {getUserAnsweredQuestions.map(q => <QuestionCard key={q._id} question={q} />)}
          </Col>
        </Row>
      </div>
    );
  }
}

export default compose(
  graphql(GetUserByUsernameQuery, {
    options: ({ match: { params: { username } } }) => ({ variables: { username } }),
  }),
  graphql(GetUserAnsweredQuestionsQuery, {
    name: 'answerdQuestions',
    options: ({ match: { params: { username } } }) => ({ variables: { username } }),
    props: props => ({
      ...props,
      subscribeToQuestionliked: () =>
        props.answerdQuestions.subscribeToMore({
          document: QuestionLikedSubscriptions,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev;
            }
            const newQuestion = subscriptionData.data.questionLiked;

            return {
              ...prev,
              getUserAnsweredQuestions: prev.getUserAnsweredQuestions.map(q =>
                (q._id === newQuestion._id
                  ? {
                    ...q,
                    favoriteCount: newQuestion.likesCount,
                  }
                  : q)),
            };
          },
        }),
    }),
  }),
)(Profile);
