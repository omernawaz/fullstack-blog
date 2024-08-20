import {
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Avatar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_BASE_URL_NOSLASH } from "../../constants";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.user);
  const isLiked = loggedInUser?.favourites?.includes(post.id);

  function handleClick() {
    navigate("/posts/" + post.id);
  }

  return (
    <Card variant="outlined">
      <CardContent sx={{ pt: 2 }}>
        <CardActionArea onClick={handleClick}>
          <Typography variant="h5" padding={2}>
            {post.title}
          </Typography>
        </CardActionArea>

        <Grid
          container
          direction="row"
          alignItems={"center"}
          gap={1}
          sx={{ mt: 1, mb: -5 }}
        >
          <CardActionArea
            onClick={() => navigate("/users/" + post.author.id)}
            sx={{ width: "25%" }}
          >
            <Grid
              container
              direction="row"
              alignItems={"center"}
              margin={1}
              gap={1}
            >
              <Avatar src={API_BASE_URL_NOSLASH + post.author.avatar}></Avatar>
              <Typography variant="subtitle1" color="grey">
                {post.author.username}
              </Typography>
            </Grid>
          </CardActionArea>

          <FavoriteIcon
            sx={{ ml: 3 }}
            color={isLiked ? "primary" : "inherit"}
          />
          <Typography color="white">{post.favourited_by.length}</Typography>

          <QueryBuilderIcon sx={{ ml: 3 }} />
          <Typography variant="subtitle2" color="grey">
            {new Date(post.modified_at).toDateString()}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PostCard;
