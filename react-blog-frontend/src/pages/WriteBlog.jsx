import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/post/PostForm";
import { useGetPostQuery } from "../app/services/restApi";
import PostEditForm from "../components/post/PostEditForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Typography } from "@mui/material";

const WriteBlog = () => {
  const loggedInUser = useSelector((state) => state.auth.user);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      postId &&
      !loggedInUser.posts.includes(Number(postId)) &&
      !loggedInUser.is_staff
    ) {
      navigate("/");
    }
  }, []);

  const skip =
    !postId &&
    !(loggedInUser.is_staff && !loggedInUser.posts.includes(Number(postId)));

  const { data } = useGetPostQuery(postId, {
    skip,
  });

  if (postId && data) {
    return (
      <>
        <Typography variant="h4" textAlign={"center"} margin={3}>
          Edit Your Blog Post!
        </Typography>
        <PostEditForm post={data} />
      </>
    );
  }
  return (
    <>
      <Typography variant="h4" textAlign={"center"} margin={3}>
        Let them know your Thoughts!
      </Typography>
      <PostForm />
    </>
  );
};

export default WriteBlog;
