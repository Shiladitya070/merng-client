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

export { FETCH_POST_QUERY };
