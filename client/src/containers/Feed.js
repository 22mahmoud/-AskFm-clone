import React from 'react';
import { graphql } from 'react-apollo';
import { Spin } from 'antd';

import Container from '../components/Container';
import Question from '../components/Question';
import QuestionCard from '../components/QuestionsList/QuestionCard';
import { GetQestionsQuery } from '../graphql/queries';
import { QuestionLikedSubscriptions } from '../graphql/subscriptions';

class Feed extends React.Component {
  componentWillMount() {
    this.props.subscribeToQuestionliked();
  }

  render() {
    const { questions: { loading, getQuestions = [] } } = this.props;
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

    return (
      <Container>
        <Question />
        <div
          style={{
            background: 'rgb(205, 205, 217)',
            marginTop: 15,
            color: '#000',
            padding: '5 0',
            borderRadius: 2,
          }}
        />
        {getQuestions.map(q => <QuestionCard key={q._id} question={q} />)}
      </Container>
    );
  }
}

export default graphql(GetQestionsQuery, {
  name: 'questions',
  props: props => ({
    ...props,
    subscribeToQuestionliked: () =>
      props.questions.subscribeToMore({
        document: QuestionLikedSubscriptions,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
          const newQuestion = subscriptionData.data.questionLiked;

          return {
            ...prev,
            getQuestions: prev.getQuestions.map(q =>
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
})(Feed);
