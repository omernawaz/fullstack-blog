import Grid from "@mui/material/Grid";
import PostCard from "./PostCard";

const PostList = ({ posts }) => {
  return (
    <Grid container direction="column" gap={1} margin={2}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Grid>
  );
};

export default PostList;
