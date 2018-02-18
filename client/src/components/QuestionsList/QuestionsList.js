import React from 'react';
import { graphql } from 'react-apollo';

import QuestionCard from './QuestionCard';
import { GetQestionsQuery } from '../../graphql/queries';

const QuestionsList = ({ data: { loading, getQuestions = [] } }) =>
  (loading ? null : getQuestions.map(q => <QuestionCard key={q._id} question={q} />));

export default graphql(GetQestionsQuery)(QuestionsList);
