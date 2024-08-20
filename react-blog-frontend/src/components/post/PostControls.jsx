import { Button, Fab } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useDeletePostMutation,
  useFavouriteMutation,
} from "../../app/services/restApi";
import { useState } from "react";

const PostControls = ({ post }) => {
  const loggedInUser = useSelector((state) => state.auth.user);
  const [isLiked, setIsLiked] = useState(
    loggedInUser.favourites.includes(post.id)
  );
  const isOwner = loggedInUser.posts.includes(post.id);

  const [deletePost] = useDeletePostMutation();
  const [favourite] = useFavouriteMutation();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/posts/edit/" + post.id);
  };

  const handleDelete = () => {
    navigate("/");
    deletePost(post.id);
  };

  const handleFavourite = () => {
    favourite({ post_id: post.id, action: isLiked ? "remove" : "add" });
    setIsLiked((prev) => !prev);
  };

  return (
    <Grid container gap={3} sx={{ mt: 3 }}>
      {isOwner && (
        <Button variant="outlined" color="warning" onClick={handleEdit}>
          Edit
        </Button>
      )}
      {isOwner && (
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      )}

      {!isOwner && (
        <Fab size="small" aria-label="like" onClick={handleFavourite}>
          <FavoriteIcon color={isLiked ? "primary" : "inherit"} />
        </Fab>
      )}
    </Grid>
  );
};

export default PostControls;
