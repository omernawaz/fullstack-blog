import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import reactLogo from "../../assets/react.svg";

const Logo = () => {
  return (
    <>
      <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
        <img src={reactLogo} />
      </Box>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        THOUGHTS
      </Typography>
    </>
  );
};

export default Logo;
