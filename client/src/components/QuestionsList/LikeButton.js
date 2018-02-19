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

class LikeButton extends React.Component {
  state = {};
  handleOnClick = async (id) => {
    const response = await this.props.mutate({
      variables: { questionID: id },
    });
    console.log(response);
  };

  render() {
    const { likesCount, isLiked, id } = this.props;
    console.log(likesCount, 'Likes Count');
    console.log(isLiked, 'isLikes');
    return (
      <div style={styles.flex}>
        <Icon
          onClick={() => this.handleOnClick(id)}
          type="heart"
          style={{
            paddingRight: 5,
            fontSize: 24,
            color: !isLiked ? 'rgb(205, 205, 217)' : '#FF643C',
          }}
        />
        <p> {likesCount} </p>
      </div>
    );
  }
}

export default graphql(LikeQuestionToggleMutation)(LikeButton);
