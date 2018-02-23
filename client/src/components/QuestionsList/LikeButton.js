import React from 'react';
import { Icon } from 'antd';
import { graphql } from 'react-apollo';

import { LikeQuestionToggleMutation } from '../../graphql/mutations';

const styles = {
  flex: {
    display: 'flex',
    flexDirection: 'row',
  },
};

const LikeButton = ({ likesCount, isLiked, like }) => (
  <div style={styles.flex}>
    <Icon
      onClick={like}
      type="heart"
      style={{
        paddingRight: 5,
        cursor: 'pointer',
        fontSize: 24,
        color: !isLiked ? 'rgb(205, 205, 217)' : '#FF643C',
      }}
    />
    <p style={{ color: '#000' }}> {likesCount} </p>
  </div>
);

export default graphql(LikeQuestionToggleMutation, {
  props: ({ ownProps, mutate }) => ({
    like() {
      return mutate({
        variables: { questionID: ownProps.id },
        optimisticResponse: {
          __typename: 'Mutation',
          likeQuestionToggle: {
            __typename: 'QuestionResponse',
            question: {
              __typename: 'Question',
              _id: ownProps.id,
              likesCount: ownProps.isLiked ? ownProps.likesCount - 1 : ownProps.likesCount + 1,
              isLiked: !ownProps.isLiked,
            },
          },
        },
      });
    },
  }),
})(LikeButton);
