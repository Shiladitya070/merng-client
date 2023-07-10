import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { gql } from "graphql-tag";

function LikeButton({ user, post: { id, likes, like_count } }) {
  const [like, setLike] = useState(false);
  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
  });
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLike(true);
    } else setLike(false);
  }, [user, likes]);

  const likedBUtton = user ? (
    like ? (
      <Button color="orange" onClick={likePost}>
        <Icon name="heart" />
        {like_count}
      </Button>
    ) : (
      <Button color="orange" basic onClick={likePost}>
        <Icon name="heart" />
        {like_count}
      </Button>
    )
  ) : (
    <Button color="grey" basic as={Link} to="/login">
      <Icon name="heart" />
      {like_count}
    </Button>
  );

  return (
    <Button as="div" labelPosition="right">
      {likedBUtton}
    </Button>
  );
}

const LIKE_POST = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      like_count
    }
  }
`;

export default LikeButton;
