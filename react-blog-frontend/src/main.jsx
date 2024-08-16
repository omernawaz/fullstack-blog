import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App.jsx";
import Navbar from "./pages/Navbar.jsx";
import Auth from "./pages/Auth.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#c950d9",
    },
    secondary: {
      main: "#50d9b2",
    },
    background: {
      default: "#111",
      paper: "#010101",
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
        element: <App />,
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
