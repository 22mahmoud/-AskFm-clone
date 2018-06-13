import React from 'react';
import { Redirect, Route as R } from 'react-router-dom';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { MeQuery } from '../graphql/queries';
// const R = Route;

import { logOut, setUser } from '../actions';

const Route = ({
  component: C, privateRoute, isAuth, ...rest
}) => {
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
};

export default withApollo(connect(({ user: { isAuth } }) => ({ isAuth }))(Route));
