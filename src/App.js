import React from "react";
import "./App.css";
import LoginWithPhone from "./components/Login/Login";
import { Redirect, Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";
import PrivateRoute from "./routes/PrivateRoute";
import { useAuth } from "./hooks/useAuth";
import Welcome from "./pages/Welcome";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

function App() {
  const auth = useAuth();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: light)");
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/login"
            render={() =>
              auth.user ? (
                <Redirect to="/seller" />
              ) : (
                <LoginWithPhone role="admin" />
              )
            }
          ></Route>
          <Route
            exact
            path="/newuser"
            render={() => <h1> New User </h1>}
          ></Route>
          <PrivateRoute path="/profile">
            <Profile />
          </PrivateRoute>
          <Route exact path="/">
            <Redirect to="/seller" />
          </Route>
          <PrivateRoute path="/seller">
            <Welcome />
          </PrivateRoute>
          <Route path="*" render={() => <h1> Not Found </h1>} />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
