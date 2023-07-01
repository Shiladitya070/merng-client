import { useQuery } from "@apollo/client";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import { useContext } from "react";
import PostFrom from "../components/PostFrom";
import { FETCH_POST_QUERY } from "../utils/graphql";

function Home() {
  const { loading, data } = useQuery(FETCH_POST_QUERY);
  const { user } = useContext(AuthContext);

  const posts = data ? data.getPosts : {};
  // console.log("🥲", posts);
  return (
    <div>
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostFrom />
            </Grid.Column>
          )}
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

export default Home;
