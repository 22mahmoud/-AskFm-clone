import React from 'react';
import { graphql } from 'react-apollo';
import { Spin } from 'antd';

import QuestionCard from './QuestionCard';
import { GetQestionsQuery } from '../../graphql/queries';

const QuestionsList = ({ data: { loading, getQuestions = [] } }) =>
  (loading ? (
    <Spin style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
  ) : (
    getQuestions.map(q => <QuestionCard key={q._id} question={q} />)
  ));

export default graphql(GetQestionsQuery)(QuestionsList);
