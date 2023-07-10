import React, { useContext } from "react";
import { Button, Card, Icon, Image, Popup } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
function PostCard({
  post: { body, create_at, id, username, like_count, comment_count, likes },
}) {
  //   console.log({ username, body, create_at });
  const { user } = useContext(AuthContext);

  return (
    <Card color={user && user.username === username ? "orange" : "black"} fluid>
      <Card.Content as={Link} to={`/posts/${id}`}>
        <Image
          floated="right"
          size="mini"
          src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${username}`}
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(create_at).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Popup
          content="Click to like it"
          trigger={<LikeButton user={user} post={{ id, likes, like_count }} />}
        />

        <Popup
          content="Comments"
          trigger={
            <Button color="black" basic as={Link} to={`/posts/${id}`}>
              <Icon name="comment" />
              {comment_count}
            </Button>
          }
        />
      </Card.Content>
    </Card>
  );
}

export default PostCard;
