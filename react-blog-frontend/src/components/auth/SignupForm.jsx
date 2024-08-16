import { Grid, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignupForm = () => {


    
  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
    onSubmit: (values) => {
      console.log("onSubmit", values);
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email address"),
      password: Yup.string().required("You need to enter a password"),
      password_confirm: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords donot match"
      ),
    }),
  });

  return (
    <form method="POST" onSubmit={formik.handleSubmit}>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}
        direction={"column"}
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
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          gap={0}
          direction="row"
        >
          <TextField
            error={formik.errors.first_name && formik.touched.first_name}
            helperText={
              formik.errors.first_Name &&
              formik.touched.first_name &&
              formik.errors.first_name
            }
            id="first_name"
            name="first_name"
            label="First Name"
            variant="outlined"
            sx={{ width: "37.5%" }}
            value={formik.values.first_name}
            onChange={formik.handleChange}
          />
          <TextField
            error={formik.errors.last_name && formik.touched.last_name}
            helperText={
              formik.errors.last_name &&
              formik.touched.last_name &&
              formik.errors.last_name
            }
            id="last_name"
            name="last_name"
            label="Last Name"
            variant="outlined"
            sx={{ width: "37.5%" }}
            value={formik.values.last_name}
            onChange={formik.handleChange}
          />
        </Grid>
        <TextField
          error={formik.errors.email && formik.touched.email}
          helperText={
            formik.errors.email && formik.touched.email && formik.errors.email
          }
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          sx={{ width: "75%" }}
          value={formik.values.email}
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
        <TextField
          error={
            formik.errors.password_confirm && formik.touched.password_confirm
          }
          helperText={
            formik.errors.password_confirm &&
            formik.touched.password_confirm &&
            formik.errors.password_confirm
          }
          id="password_confirm"
          name="password_confirm"
          label="Confirm Password"
          type="password"
          variant="outlined"
          sx={{ width: "75%" }}
          value={formik.values.password_confirm}
          onChange={formik.handleChange}
        />
        <Button type="submit" color="primary" variant="contained">
          Sign Up
        </Button>
      </Grid>
    </form>
  );
};

export default SignupForm;
