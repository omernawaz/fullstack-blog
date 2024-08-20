import { useParams } from "react-router-dom";
import { useGetUserPostsQuery, useGetUserQuery } from "../app/services/restApi";
import { Grid } from "@mui/material";
import UserCard from "../components/user/UserCard";
import PostList from "../components/post/PostList";

const ViewUser = () => {
  const { userId } = useParams();
  const {
    data: posts,
    isLoading: postsLoading,
    isSuccess: postsSuccess,
  } = useGetUserPostsQuery(userId, { forceRefect: true });
  const {
    data: user,
    isLoading: userLoading,
    isSuccess: userSuccess,
  } = useGetUserQuery(userId, { forceRefetch: true });

  console.log(posts, user);

  return (
    <Grid container direction="column" sx={{ m: 2, p: 1 }} gap={3}>
      {!userLoading && userSuccess && (
        <UserCard user={user} profilePage={true} />
      )}
      {!postsLoading && postsSuccess && <PostList posts={posts} />}
    </Grid>
  );
};

export default ViewUser;
