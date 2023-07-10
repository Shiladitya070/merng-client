import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Confirm, Icon } from "semantic-ui-react";

function DeletePost({ post: { id } }) {
  const [confrinOpen, setConfrinOpen] = useState(false);
  const navigate = useNavigate();
  const [deletePost] = useMutation(DELETE_POST, {
    update() {
      setConfrinOpen(false);
      navigate("/");
      //   navigate(0);
      // TODO: remove post from cache
    },
    variables: { postId: id },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        basic
        onClick={() => setConfrinOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confrinOpen}
        onCancel={() => setConfrinOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
}

const DELETE_POST = gql`
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeletePost;
