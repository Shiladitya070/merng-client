import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import moment from "moment";
import React, { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Popup,
} from "semantic-ui-react";
import LikeButton from "./LikeButton";
import { useContext } from "react";
import { AuthContext } from "../context/auth";
import DeletePost from "./DeletePost";
import Comments from "./Comments";
import { CREATE_COMMNET } from "../utils/graphql";

function SinglePost() {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const [commnet, setCommnet] = useState("");
  const commnetInputRef = useRef(null);

  const [submitComment] = useMutation(CREATE_COMMNET, {
    variables: {
      postId,
      body: commnet,
    },
    update() {
      setCommnet("");
      commnetInputRef.current.blur();
    },
  });
  const { loading, data } = useQuery(GET_SINGLE_POST, {
    variables: { postId },
  });

  if (loading) {
    return <h2>Loading post...</h2>;
  }
  const posts = data ? data.getAPost : {};

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            floated="right"
            size="tiny"
            rounded={true}
            src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${posts.username}`}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{posts.username}</Card.Header>
              <Card.Meta>{moment(posts.create_at).fromNow(false)}</Card.Meta>
              <Card.Description>{posts.body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Popup
                content="Click to like this"
                trigger={
                  <LikeButton
                    user={user}
                    post={{
                      id: posts.id,
                      like_count: posts.like_count,
                      likes: posts.likes,
                    }}
                  />
                }
              />

              <Popup
                content="Comments"
                inverted
                trigger={
                  <Button
                    color="black"
                    basic
                    as={Link}
                    to={`/posts/${posts.id}`}
                  >
                    <Icon name="comment" />
                    {posts.comment_count}
                  </Button>
                }
              />
              {user && user.username === posts.username && (
                <DeletePost post={posts} />
              )}
            </Card.Content>
          </Card>
          {/* Comment section */}
          {/* add comments */}
          {user && (
            <Card fluid>
              <Card.Content>
                <p>What is your Thought?</p>
                <Form>
                  <div className="ui action input fuild">
                    <input
                      type="text"
                      placeholder="commnet something..."
                      name="comment"
                      value={commnet}
                      onChange={(e) => setCommnet(e.target.value)}
                      ref={commnetInputRef}
                    />
                    <button
                      floated="right"
                      type="submit"
                      className="ui button orange"
                      disabled={commnet.trim() === ""}
                      onClick={submitComment}
                    >
                      Comment
                    </button>
                  </div>
                </Form>
              </Card.Content>
            </Card>
          )}
          {/* show all comments */}
          {posts.comments.map((comment) => (
            <Comments comment={comment} postId={postId} user={user} />
          ))}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

const GET_SINGLE_POST = gql`
  query GetAPost($postId: ID!) {
    getAPost(postId: $postId) {
      id
      body
      create_at
      comment_count
      username
      like_count
      comments {
        body
        username
        id
      }
      likes {
        # createdAt
        username
        # id
      }
    }
  }
`;

export default SinglePost;
