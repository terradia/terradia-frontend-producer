import React from "react";
import Layout from "./components/Layout/Layout";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Statistics from "./pages/Statistics";
import Staff from "./pages/Staff";
import Documents from "./pages/Documents";
import Login from './pages/Login';
import Company from './pages/Company';
import {useQuery} from "@apollo/react-hooks";
import {loader as graphqlLoader} from 'graphql.macro';
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import CompanySelection from "./pages/CompanySelection";
import BreakpointCatcher from "./components/Layout/BreakpointCatcher";
//import NotFound from "./pages/NotFound";

const queryGetUser = graphqlLoader('./graphql/query/getUser.graphql');

const App = () => {
    const {loading/*, error*/, data} = useQuery(queryGetUser, {
        variables: {language: 'english'},
    });

    // TODO add a loader in order to not display /Home (for 1 sec) when user isn't log
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={"/customer"} component={() => {
                    console.log("You don't have any company, redirecting to customer site");
                    window.location.href = "http://localhost:8000/graphql";
                    return null;
                }}/>
                <Route exact path={"/register"}>
                    <Register/>
                </Route>
                <Route exact path={"/login"}>
                    <Login/>
                </Route>
                <Route exact path={"/resetPassword"}>
                    <ResetPassword/>
                </Route>
                <Route exact path={"/companySelection"}>
                    <CompanySelection/>
                </Route>
                {(!data || !data.getUser) && !loading ? <Redirect to="/login"/> :
                    <BreakpointCatcher>
                        <Layout>
                            <Route exact path={"/home"}>
                                <Home/>
                            </Route>
                            <Route exact path={"/products"}>
                                <Products/>
                            </Route>
                            <Route exact path={"/categories"}>
                                <Categories/>
                            </Route>
                            <Route exact path={"/statistics"}>
                                <Statistics/>
                            </Route>
                            <Route exact path={"/staff"}>
                                <Staff/>
                            </Route>
                            <Route exact path={"/documents"}>
                                <Documents/>
                            </Route>
                            <Route exact path={"/company"}>
                                <Company/>
                            </Route>
                        </Layout>
                    </BreakpointCatcher>
                }
            </Switch>
        </BrowserRouter>
    )
};

export default App
