import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";

// useQuery;

function Home() {
  const { loading, data } = useQuery(FETCH_POST_QUERY);
  const posts = data ? data.getPosts : {};
  console.log("🥲", posts);
  // console.log(posts);
  return (
    <div>
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h2>Loding posts...</h2>
          ) : (
            posts &&
            posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}

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

export default Home;
