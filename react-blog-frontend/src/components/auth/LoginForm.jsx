import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useLoginMutation } from "../../app/services/authApi";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      await login(values).unwrap();
      navigate("/");
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please enter your username"),
      password: Yup.string().required("Please enter your password"),
    }),
  });

  return (
    <form method="POST" onSubmit={formik.handleSubmit}>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
        gap={3}
      >
        <TextField
          error={formik.errors.username && formik.touched.username}
          helperText={
            formik.errors.username &&
            formik.touched.username &&
            formik.errors.username
          }
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          sx={{ width: "75%" }}
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <TextField
          error={formik.errors.password && formik.touched.password}
          helperText={
            formik.errors.password &&
            formik.touched.password &&
            formik.errors.password
          }
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          sx={{ width: "75%" }}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Button type="submit" color="primary" variant="contained">
          {isLoading ? "Logging you in..." : "Login"}
        </Button>
      </Grid>
    </form>
  );
};

export default LoginForm;
