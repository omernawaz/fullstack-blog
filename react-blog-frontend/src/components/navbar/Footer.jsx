import { Box, Typography, Container } from "@mui/material";
import reactLogo from "../../assets/react.svg"; // Replace with the correct path to your logo

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
          <img src={reactLogo} alt="logo" style={{ marginRight: 8 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            THOUGHTS
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Thoughts. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
