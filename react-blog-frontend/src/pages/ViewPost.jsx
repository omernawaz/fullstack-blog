import { useParams } from "react-router-dom";
import { useGetPostQuery } from "../app/services/restApi";
import { Grid } from "@mui/material";
import PostCard from "../components/post/PostCard";
import PostContent from "../components/post/PostContent";
import UserCard from "../components/user/UserCard";

const ViewPost = () => {
  const { postId } = useParams();
  const { data, isLoading, isSuccess } = useGetPostQuery(postId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess && data) {
    return (
      <Grid container direction="column" sx={{ m: 2, p: 1 }} gap={3}>
        <PostCard post={data} />
        <PostContent post={data} />
        <UserCard user={data.author} />
      </Grid>
    );
  }
};

export default ViewPost;
