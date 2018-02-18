import React from 'react';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';

import { logOut } from '../actions';
import { MeQuery } from '../graphql/queries';

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
      <h1
        style={{
          color: '#fff',
        }}
      >
        {user.username}
      </h1>
    );
  }
}

export default withApollo(connect(undefined, {
  logOut,
})(Feed));
