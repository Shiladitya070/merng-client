import moment from "moment";
import React, { useState } from "react";
import { Button, Card, Confirm, Icon, Image } from "semantic-ui-react";
import { DELETE_COMMENT } from "../utils/graphql";
import { useMutation } from "@apollo/client";

function Comments({ comment, user, postId }) {
  const [confrinOpen, setConfrinOpen] = useState(false);
  const [deleteCommnet] = useMutation(DELETE_COMMENT, {
    variables: {
      postId,
      commentId: comment.id,
    },
    update() {
      setConfrinOpen(false);
    },
  });
  return (
    <Card
      color={user && user.username === comment.username ? "orange" : "black"}
      key={comment.id}
      fluid
    >
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${comment.username}`}
        />
        <Card.Header>{comment.username}</Card.Header>
        <Card.Meta>{moment(comment.create_at).fromNow(true)}</Card.Meta>
        <Card.Description>{comment.body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        {user && user.username === comment.username && (
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
              onConfirm={deleteCommnet}
            />
          </>
        )}
      </Card.Content>
    </Card>
  );
}

export default Comments;
