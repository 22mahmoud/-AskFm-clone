import React from 'react';
import { graphql } from 'react-apollo';
import { Spin } from 'antd';

import Container from '../components/Container';
import NotificationCard from '../components/NotificationsList/NotificationCard';
import { GetMyNotAnswerdQuestionsQuery } from '../graphql/queries';
import { NewQuestionSendedSubscriptions } from '../graphql/subscriptions';

class Notifications extends React.Component {
  componentWillMount() {
    this.props.subscribeToQuestionSended();
  }
  render() {
    const { questions: { loading, getMyNotAnswerdQuestions = [] } } = this.props;
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
        <div style={{ background: '#fff', padding: 20, borderRadius: 5 }}>
          {getMyNotAnswerdQuestions.map(n => (
            <NotificationCard
              key={n._id}
              id={n._id}
              text={n.text}
              username={n.theAsker.username}
              userId={n.theAsker._id}
              createdAt={n.createdAt}
            />
          ))}
        </div>
      </Container>
    );
  }
}

export default graphql(GetMyNotAnswerdQuestionsQuery, {
  options: { fetchPolicy: 'cache-and-network' },
  name: 'questions',
  props: props => ({
    ...props,
    subscribeToQuestionSended: () =>
      props.questions.subscribeToMore({
        document: NewQuestionSendedSubscriptions,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) {
            return prev;
          }
          const newQuestion = subscriptionData.data.newQuestionSended;
          console.log(newQuestion, 'NEW QUESTION');
          if (!prev.getMyNotAnswerdQuestions.find(q => q._id === newQuestion._id)) {
            return {
              ...prev,
              getMyNotAnswerdQuestions: [{ ...newQuestion }, ...prev.getMyNotAnswerdQuestions],
            };
          }
          return prev;
        },
      }),
  }),
})(Notifications);
