import { useFormik } from "formik";
import * as Yup from "yup";

import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { useAddPostMutation } from "../../app/services/restApi";
import { useNavigate } from "react-router-dom";
import TinyMCEEditor from "./TinyMCEEditor";

const PostForm = () => {
  const [addPost, { isLoading, isError, error }] = useAddPostMutation();
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    content: "",
    is_private: false,
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      try {
        console.log(values);
        const response = await addPost(values).unwrap();
        navigate("/posts/" + response.id);
      } catch {
        //the error message is displayed on isError and error, so no need to handle it.
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter a title"),
      content: Yup.string().required("You need to write something in the blog"),
    }),
  });

  return (
    <form method="POST" onSubmit={formik.handleSubmit}>
      <Grid
        container
        justifyContent={"left"}
        direction={"column"}
        gap={3}
        margin={2}
      >
        <Typography color="red" hidden={!isError && !error}>
          Error Creating Post: {isError && error && error.data.detail}
        </Typography>
        <TextField
          error={formik.errors.title && formik.touched.title}
          helperText={
            formik.errors.title && formik.touched.title && formik.errors.title
          }
          id="title"
          name="title"
          label="Title"
          variant="outlined"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        {/* <TextField
          error={formik.errors.content && formik.touched.content}
          helperText={
            formik.errors.content &&
            formik.touched.content &&
            formik.errors.content
          }
          multiline
          id="content"
          name="content"
          label="Write Something"
          variant="outlined"
          sx={{ width: "75%" }}
          value={formik.values.content}
          onChange={formik.handleChange}
        /> */}

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.is_private}
              onChange={formik.handleChange}
              name="is_private"
            />
          }
          label="Make This Private"
        />

        <TinyMCEEditor
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{ width: "10%" }}
        >
          {isLoading ? "Publishing..." : "Publish"}
        </Button>
      </Grid>
    </form>
  );
};

export default PostForm;
