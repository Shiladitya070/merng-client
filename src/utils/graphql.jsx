import gql from "graphql-tag";

const FETCH_POST_QUERY = gql`
  {
    getPosts {
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
const CREATE_COMMNET = gql`
  mutation CreateComment($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
      }
      comment_count
    }
  }
`;
const DELETE_COMMENT = gql`
  mutation DeletePostComment($postId: ID!, $commentId: ID!) {
    deletePostComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      comment_count
    }
  }
`;
export { FETCH_POST_QUERY, DELETE_COMMENT, CREATE_COMMNET };
