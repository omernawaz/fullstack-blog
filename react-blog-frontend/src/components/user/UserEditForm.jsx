import { Grid, TextField, Button, Typography, Avatar } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEditUserMutation } from "../../app/services/restApi";
import { useEffect, useState } from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL_NOSLASH } from "../../constants";

const VisuallyHiddenInput = styled("input")({
  display: "none",
});

const UserEditForm = ({ user }) => {
  const [updateUser, { isLoading, isError, error, isSuccess }] =
    useEditUserMutation();

  const navigate = useNavigate();

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    API_BASE_URL_NOSLASH + user.avatar || ""
  );

  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      password: "",
      password_confirm: "",
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("id", user.id);
      for (let key in values) {
        if (values[key]) formData.append(key, values[key]);
      }

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      try {
        await updateUser(formData).unwrap();
        setTimeout(() => navigate(`/users/${user.id}`));
      } catch {
        // error handled by isError and error object
      }
    },
    validationSchema: Yup.object({
      password: Yup.string(),
      password_confirm: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords do not match"
      ),
    }),
  });

  useEffect(() => {
    if (isError && error) {
      const keys = Object.keys(error.data);
      for (const key of keys) {
        formik.setErrors({ [key]: error.data[key] });
      }
    }
  }, [isError, error, formik]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form
      method="POST"
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
    >
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
        direction={"column"}
        padding={2}
      >
        <Typography variant="h5" marginBottom={3}>
          Edit Your Profile
        </Typography>
        <Typography color={"inherit"} hidden={!isSuccess}>
          Profile updated successfully!
        </Typography>

        <Avatar
          alt="Profile Picture"
          src={avatarPreview}
          sx={{ width: 100, height: 100 }}
        />

        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          sx={{ mt: 3, mb: 3 }}
        >
          Upload file
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>

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
          sx={{ width: "100%" }}
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={2}
          direction="row"
          sx={{ width: "100%" }}
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
            sx={{ width: "48%" }}
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
            sx={{ width: "48%" }}
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
          sx={{ width: "100%" }}
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
          sx={{ width: "100%" }}
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
          sx={{ width: "100%" }}
          value={formik.values.password_confirm}
          onChange={formik.handleChange}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ width: "100%", mt: 3, mb: 3 }}
        >
          {isLoading ? "Updating..." : "Update Profile"}
        </Button>
      </Grid>
    </form>
  );
};

export default UserEditForm;
