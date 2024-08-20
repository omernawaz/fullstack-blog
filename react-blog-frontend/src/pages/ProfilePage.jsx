import { Box, Button, Grid, Paper } from "@mui/material";
import UserEditForm from "../components/user/UserEditForm";
import { useSelector } from "react-redux";
import { useState } from "react";
import UserProfile from "../components/user/UserProfile";

const ProfilePage = () => {
  const [doEdit, setDoEdit] = useState(false);
  const loggedInUser = useSelector((state) => state.auth.user);

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      style={{ minHeight: "75vh" }}
    >
      <Grid item xs={15} sm={12} md={9}>
        <Paper elevation={24} sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            {doEdit && <UserEditForm user={loggedInUser} />}
            {!doEdit && (
              <>
                <UserProfile user={loggedInUser} />{" "}
                <Button
                  sx={{
                    display: "block",
                    ml: "auto",
                    mr: "auto",
                    mt: 2,
                    mb: 5,
                  }}
                  color={"warning"}
                  onClick={() => setDoEdit(true)}
                >
                  Edit
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
