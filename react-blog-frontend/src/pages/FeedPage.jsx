import { Box, Typography } from "@mui/material";
import { useFeedQuery } from "../app/services/restApi";
import PostList from "../components/post/PostList";

const Browse = () => {
  const { isSuccess, data } = useFeedQuery({ forceRefetch: true });

  return (
    <Box component="div">
      <Typography variant="h4" textAlign={"center"} margin={3}>
        Catch up on bloggers you follow
      </Typography>
      {isSuccess && <PostList posts={data} />}
    </Box>
  );
};

export default Browse;
