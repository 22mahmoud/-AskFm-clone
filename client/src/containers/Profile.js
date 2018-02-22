import React from 'react';
import { graphql } from 'react-apollo';
import { Row, Col } from 'antd';

import {
  ProfileAbout as About,
  ProfileStats as Stats,
  ProfileHeader as Header,
} from '../components/Profile';
import Question from '../components/Question';
import { GetUserByUsernameQuery } from '../graphql/queries';

const Profile = ({ data: { loading, getUserByUsername = {} } }) => {
  if (loading) {
    return null;
  }
  const { username, _id } = getUserByUsername;
  return (
    <div>
      <Row type="flex" justify="center" align="middle" style={{ textAlign: 'center' }}>
        <Col span={18}>
          <Header username={username} />
        </Col>
      </Row>
      <Row type="flex" justify="center" style={{ textAlign: 'center' }}>
        <Col span={8}>
          <h1 style={{ color: '#fff' }}>
            <Question userToAsk={_id} />
          </h1>
        </Col>
        <Col span={8}>
          <Stats />
          <About />
        </Col>
      </Row>
    </div>
  );
};

export default graphql(GetUserByUsernameQuery, {
  options: ({ match: { params: { username } } }) => ({
    variables: { username },
  }),
})(Profile);
