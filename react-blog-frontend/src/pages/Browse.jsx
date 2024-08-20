import { Box, Typography } from "@mui/material";
import { useGetAllPostsQuery } from "../app/services/restApi";
import PostList from "../components/post/PostList";

const Browse = () => {
  const { isSuccess, data } = useGetAllPostsQuery({ forceRefetch: true });

  return (
    <Box component="div">
      <Typography variant="h4" textAlign={"center"} margin={3}>
        Browse Some Posts
      </Typography>
      {isSuccess && <PostList posts={data} />}
    </Box>
  );
};

export default Browse;
