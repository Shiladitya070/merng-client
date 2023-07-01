import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { FETCH_POST_QUERY } from "../utils/graphql";

function PostFrom() {
  const [newPost, setNewPost] = useState({
    body: "",
  });
  const navigate = useNavigate();

  const [createPost, { error }] = useMutation(CREATE_NEW_POST, {
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POST_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_POST_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      // console.log(data.getPosts);
      if (result) {
        setNewPost({
          body: "",
        });
      }
      navigate("/");
    },
    variables: newPost,
  });
  const onSubmit = (event) => {
    event.preventDefault();
    createPost();
  };

  const onChange = (event) => {
    setNewPost({
      ...newPost,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Form onSubmit={onSubmit}>
      <h2>Create post</h2>
      <Form.Field>
        <Form.Input
          placeholder="what you would like to say..."
          value={newPost.body}
          name="body"
          onChange={onChange}
        />
        <Button type="submit" primary>
          Post
        </Button>
      </Form.Field>
    </Form>
  );
}

export default PostFrom;

const CREATE_NEW_POST = gql`
  mutation Mutation($body: String!) {
    createPost(body: $body) {
      id
      body
      create_at
      comment_count
      username
      like_count
      comments {
        body
        username
        # id
      }
      likes {
        # createdAt
        username
        # id
      }
    }
  }
`;
