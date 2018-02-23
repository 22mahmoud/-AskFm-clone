import React from 'react';
import { Redirect, Route as R } from 'react-router-dom';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { MeQuery } from '../graphql/queries';
// const R = Route;

import { logOut, setUser } from '../actions';

class Route extends React.Component {
  state = {};
  componentWillMount() {
    this.fetchUser();
  }

  fetchUser = async () => {
    const { data: { me: { isOk, user } } } = await this.props.client.query({
      query: MeQuery,
    });
    if (!isOk) {
      this.props.logOut();
    }
    this.props.setUser(user);
  };

  render() {
    const {
      component: C, privateRoute, isAuth, ...rest
    } = this.props;
    console.log(this.props, 'PROPS');
    if (privateRoute) {
      return (
        <R
          {...rest}
          render={props =>
            (isAuth ? (
              <C {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/',
                  state: { from: rest.location },
                }}
              />
            ))
          }
        />
      );
    }
    return (
      <R
        {...rest}
        render={props =>
          (!isAuth ? (
            <C {...props} />
          ) : (
            <Redirect to={{ pathname: '/feed', state: { from: rest.location } }} />
          ))
        }
      />
    );
  }
}

export default withApollo(connect(({ user: { isAuth } }) => ({ isAuth }), { logOut, setUser })(Route));
