import React from 'react';
import { graphql } from 'react-apollo';
import { Spin } from 'antd';

import QuestionCard from './QuestionCard';
import { GetQestionsQuery } from '../../graphql/queries';
import { QuestionLikedSubscriptions } from '../../graphql/subscriptions';

class QuestionsList extends React.Component {
  state = {};
  componentWillMount() {
    this.props.subscribeToQuestionliked();
  }
  componentWillUnmount() {}

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

    return getQuestions.map(q => <QuestionCard key={q._id} question={q} />);
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
})(QuestionsList);
