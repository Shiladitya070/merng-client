import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

function PostCard({
  post: { body, create_at, id, username, like_count, comment_count, likes },
}) {
  //   console.log({ username, body, create_at });

  const likePost = () => {
    console.log("liked post");
  };
  const commentPost = () => {
    console.log("comment post");
  };
  return (
    <Card fluid>
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(create_at).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button color="orange" basic onClick={likePost}>
          <Icon name="heart" />
          {like_count}
        </Button>
        <Button color="black" basic onClick={commentPost}>
          <Icon name="comment" />
          {comment_count}
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
