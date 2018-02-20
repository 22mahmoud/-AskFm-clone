import React from 'react';
import { withApollo } from 'react-apollo';

import Container from '../components/Container';
import { MeQuery } from '../graphql/queries';
import Question from '../components/Question';
import QuestionList from '../components/QuestionsList/QuestionsList';

class Feed extends React.Component {
  state = {
    loading: true,
    user: null,
  };

  componentWillMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({
      loading: true,
    });
    const { data: { me: { isOk, user } } } = await this.props.client.query({
      query: MeQuery,
    });

    if (!isOk) {
      return;
    }

    this.setState({
      loading: false,
      user,
    });
  };

  render() {
    const { loading, user } = this.state;
    if (loading) {
      return null;
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
        >
          <QuestionList />
        </div>
      </Container>
    );
  }
}

export default withApollo(Feed);
