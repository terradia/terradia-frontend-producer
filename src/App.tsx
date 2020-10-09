import React, { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Statistics from "./pages/Statistics";
import Staff from "./pages/Staff";
import Files from "./pages/Files";
import Login from "./pages/Login";
import CompanyPage from "./pages/CompanyPage";
import Orders from "./pages/Orders";
import Profile from "./pages/profile/Profile";
import { useLazyQuery } from "@apollo/react-hooks";
import { loader as graphqlLoader } from "graphql.macro";
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import CompanySelection from "./pages/CompanySelection";
import BreakpointCatcher from "./components/Layout/BreakpointCatcher";
import CompanyRegister from "./pages/CompanyRegister";
import UserContext from "./components/Context/UserContext";
import LoadingFullPage from "./components/LoadingFullPage";

import "./assets/body.less";

const queryGetUser = graphqlLoader("./graphql/query/getUser.graphql");

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [getUser, { loading, error, data, called }] = useLazyQuery(
    queryGetUser,
    {
      variables: { language: "english" },
    }
  );
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    if (error) {
      localStorage.clear();
      setToken(null);
    }
  }, [error]);

  useEffect(() => {
    window.onstorage = (e: StorageEvent) => {
      if (e.key === "token") {
        if (e.newValue === null) {
          localStorage.clear();
        }
        setToken(e.newValue);
      } else if (
        (e.key === "selectedCompany" || e.key === "rememberCompany") &&
        e.newValue === null
      ) {
        setRedirect("/companySelection");
      } else if (e.key === "selectedCompany" && e.key !== e.newValue) {
        setRedirect(e.url);
      }
    };
  }, []);

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [getUser, token]);

  const RedirectTo = () => {
    setRedirect("");
    return <Redirect to={redirect} />;
  };

  if (loading || (!!localStorage.getItem("token") && data === undefined))
    return <LoadingFullPage />;
  // TODO add a loader in order to not display /Home (for 1 sec) when user isn't log
  return (
    <UserContext.Provider value={data ? data.getUser : null}>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/companyRegister"}>
            <CompanyRegister />
          </Route>
          <Route exact path={"/register"}>
            <Register />
          </Route>
          <Route exact path={"/login"}>
            <Login />
          </Route>
          <Route exact path={"/resetPassword"}>
            <ResetPassword />
          </Route>
          <Route exact path={"/companySelection"}>
            <CompanySelection />
          </Route>
          {!!localStorage.getItem("token") === false ||
          (loading === false &&
            called === true &&
            (data === null || data.getUser === null)) ? (
            <Redirect to="/login" />
          ) : (
            <BreakpointCatcher>
              {redirect ? RedirectTo() : null}
              <Layout>
                <Route exact path={"/home"}>
                  <Home />
                </Route>
                <Route exact path={"/products"}>
                  <Products />
                </Route>
                <Route exact path={"/categories"}>
                  <Categories />
                </Route>
                <Route exact path={"/statistics"}>
                  <Statistics />
                </Route>
                <Route exact path={"/staff"}>
                  <Staff />
                </Route>
                <Route exact path={"/files"}>
                  <Files />
                </Route>
                <Route exact path={"/company"}>
                  <CompanyPage />
                </Route>
                <Profile />
                <Route exact path={"/orders"}>
                  <Orders />
                </Route>
              </Layout>
            </BreakpointCatcher>
          )}
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
