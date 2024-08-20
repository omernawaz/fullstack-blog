import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "./pages/Navbar.jsx";
import Auth from "./pages/Auth.jsx";
import Browse from "./pages/Browse.jsx";
import ViewPost from "./pages/ViewPost.jsx";
import Bloggers from "./pages/Bloggers.jsx";
import WriteBlog from "./pages/WriteBlog.jsx";
import ViewUser from "./pages/ViewUser.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import FeedPage from "./pages/FeedPage.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#61dbfb",
    },
    secondary: {
      main: "#e6cb22",
    },
    background: {
      default: "#111",
      paper: "#010101",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#0F0F0F",
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Browse />,
      },
      {
        path: "/users/",
        element: <Bloggers />,
      },
      {
        path: "/users/:userId",
        element: <ViewUser />,
      },
      {
        path: "/users/edit/",
        element: <ProfilePage />,
      },
      {
        path: "/posts/:postId",
        element: <ViewPost />,
      },
      {
        path: "/posts/add",
        element: <WriteBlog />,
      },
      {
        path: "/posts/edit/:postId",
        element: <WriteBlog />,
      },
      {
        path: "/posts/feed",
        element: <FeedPage />,
      },
    ],
  },
  {
    path: "/auth/:action",
    element: <Auth />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
