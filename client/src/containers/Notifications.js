import React from 'react';
import { graphql } from 'react-apollo';
import { Spin } from 'antd';

import Container from '../components/Container';
import NotificationCard from '../components/NotificationsList/NotificationCard';
import { GetMyNotAnswerdQuestionsQuery } from '../graphql/queries';

class Notifications extends React.Component {
  componentWillMount() {
    // this.props.subscribeToQuestionSended();
  }
  render() {
    const { data: { loading, getMyNotAnswerdQuestions = [] } } = this.props;
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

export default graphql(GetMyNotAnswerdQuestionsQuery)(Notifications);
