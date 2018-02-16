import React from 'react';
import { graphql } from 'react-apollo';

import { MeQuery } from '../graphql/queries';

const Feed = () => <h1 style={{ color: '#fff' }}> FEED </h1>;

export default graphql(MeQuery, { props: wow => console.log(wow, 'PROPS') })(Feed);
