import React from 'react';
import { withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import { logOut } from '../actions';
import { MeQuery } from '../graphql/queries';
import Question from '../components/Question';

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
      <Row type="flex" justify="start">
        <Col
          xs={16}
          sm={14}
          md={12}
          lg={10}
          xl={8}
          style={{ background: 'rgba(0, 0, 0, 0.2)', padding: 18, borderRadius: 8 }}
        >
          <Question />
        </Col>
      </Row>
    );
  }
}

export default withApollo(connect(undefined, {
  logOut,
})(Feed));
