import Box from "@mui/material/Box";

import { Paper, Grid } from "@mui/material";

import Footer from "../components/navbar/Footer";

import Logo from "../components/navbar/Logo";
import Tabs from "../components/auth/Tabs";

export default function Auth() {
  return (
    <>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        style={{ minHeight: "15vh" }}
      >
        <Logo />
      </Grid>

      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        style={{ minHeight: "75vh" }}
      >
        <Grid item xs={12} sm={9} md={7}>
          <Paper elevation={24} sx={{ width: "100%" }}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <Tabs />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Footer />
    </>
  );
}
