import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

import { useParams } from "react-router-dom";
import { useState } from "react";

const actions = { login: "1", signup: "2" };

const Tabs = () => {
  const { action } = useParams();
  const [value, setValue] = useState(actions[action]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={handleChange}
          textColor="inherit"
          aria-label="lab API tabs example"
          centered
        >
          <Tab label="Login" value="1" />
          <Tab label="Sign Up" value="2" />
        </TabList>
      </Box>
      <TabPanel value="1">
        <LoginForm />
      </TabPanel>

      <TabPanel value="2">
        <SignupForm />
      </TabPanel>
    </TabContext>
  );
};

export default Tabs;
