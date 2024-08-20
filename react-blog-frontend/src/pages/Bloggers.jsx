import { useGetAllUsersQuery } from "../app/services/restApi";
import UserList from "../components/user/UserList";
import { Box, Typography } from "@mui/material";

const Bloggers = () => {
  const { isSuccess, data } = useGetAllUsersQuery();

  return (
    <Box component="div">
      <Typography variant="h4" textAlign={"center"} margin={3}>
        Get To Know Some Bloggers
      </Typography>
      {isSuccess && <UserList users={data} />}
    </Box>
  );
};

export default Bloggers;
