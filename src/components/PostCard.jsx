import React, { useContext } from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeletePost from "./DeletePost";
function PostCard({
  post: { body, create_at, id, username, like_count, comment_count, likes },
}) {
  //   console.log({ username, body, create_at });
  const { user } = useContext(AuthContext);
  const commentPost = () => {
    console.log("comment post");
  };
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
        <LikeButton user={user} post={{ id, likes, like_count }} />
        <Button color="black" basic as={Link} to={`/posts/${id}`}>
          <Icon name="comment" />
          {comment_count}
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
