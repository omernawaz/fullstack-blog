import { Grid, Typography, Avatar } from "@mui/material";
import { API_BASE_URL_NOSLASH } from "../../constants";

const UserProfile = ({ user }) => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      gap={5}
      padding={5}
      textAlign={"center"}
    >
      <Grid item>
        <Avatar
          alt={user.username}
          src={API_BASE_URL_NOSLASH + user.avatar}
          sx={{ width: 100, height: 100 }}
        />
      </Grid>

      <Grid item>
        <Typography variant="h5">{user.username}</Typography>
        <Typography variant="body1">{`${user.first_name} ${user.last_name}`}</Typography>
        <Typography variant="body2" color="textSecondary">
          {user.email}
        </Typography>
      </Grid>

      <Grid item>
        <Grid container justifyContent="space-around" gap={2}>
          <Grid item>
            <Typography variant="h6">Followers</Typography>
            <Typography variant="body1">{user.followers.length}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Following</Typography>
            <Typography variant="body1">{user.following.length}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">Posts</Typography>
            <Typography variant="body1">{user.posts.length}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;
