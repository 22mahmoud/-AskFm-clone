import React from 'react';
import { Redirect, Route as R } from 'react-router-dom';
import { connect } from 'react-redux';

// const R = Route;

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

export default connect(({ user: { isAuth } }) => ({ isAuth }))(Route);
