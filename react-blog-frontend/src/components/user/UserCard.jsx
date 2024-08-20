import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useFollowMutation } from "../../app/services/restApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL_NOSLASH } from "../../constants";

const UserCard = ({ user, profilePage = false }) => {
  const loggedInUser = useSelector((state) => state.auth.user);
  const [isFollowing, setIsFollowing] = useState(
    loggedInUser.following.includes(user.id)
  );
  const isSelf = loggedInUser.id == user.id;

  const navigate = useNavigate();

  const [follow] = useFollowMutation();

  const handleFollow = () => {
    follow({ user_id: user.id, action: isFollowing ? "unfollow" : "follow" });
    setIsFollowing((prev) => !prev);
  };

  return (
    <>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 200 }}
          image={API_BASE_URL_NOSLASH + user.avatar}
          alt={user.username + "'s avatar"}
        />

        <Box sx={{ display: "flex", flexDirection: "column", width: "350px" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {user.first_name + " " + user.last_name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {user.username}
            </Typography>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              Posts: {user.posts.length}
            </Typography>

            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              Followers: {user.followers.length} | Following:{" "}
              {user.following.length}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              size="small"
              color={isFollowing ? "secondary" : "primary"}
              onClick={handleFollow}
              disabled={isSelf}
            >
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>

            {!profilePage && (
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate("/users/" + user.id)}
              >
                Profile
              </Button>
            )}

            {isSelf && (
              <Button
                variant="outlined"
                color="warning"
                size="small"
                onClick={() => navigate("/users/edit")}
              >
                Edit Profile
              </Button>
            )}
          </CardActions>
        </Box>
      </Card>
    </>
  );
};

export default UserCard;
