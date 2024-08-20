import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import reactLogo from "../../assets/react.svg";

const Logo = ({ displayBreakPoints = { xs: "none", md: "flex" } }) => {
  return (
    <>
      <Box sx={{ display: displayBreakPoints, mr: 1 }}>
        <img src={reactLogo} />
      </Box>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: displayBreakPoints,
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
