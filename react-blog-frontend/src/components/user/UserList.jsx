import Grid from "@mui/material/Grid";
import UserCard from "./UserCard";
const UserList = ({ users }) => {
  return (
    <Grid container direction="row" gap={3} margin={2}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </Grid>
  );
};

export default UserList;
