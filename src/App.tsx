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
import {useQuery} from "@apollo/react-hooks";
import {loader as graphqlLoader} from 'graphql.macro';
import ResetPassword from "./pages/ResetPassword";
import Register from "./pages/Register";
import UserContext from "./components/Context/UserContext";
//import NotFound from "./pages/NotFound";

const queryGetUser = graphqlLoader('../graphql/query/getUser.graphql');

const App = () => {
    const {loading/*, error*/, data} = useQuery(queryGetUser, {
        variables: {language: 'english'},
    });

    if (data && data.getUser)
        console.log(data.getUser);
    // TODO add a loader in order to not display /Home (for 1 sec) when user isn't log
    return (
        <UserContext.Provider value={data && data.getUser ? data.getUser.id : ""}>
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/Register"}>
                        <Register/>
                    </Route>
                    <Route exact path={"/Login"}>
                        <Login/>
                    </Route>
                    <Route exact path={"/ResetPassword"}>
                        <ResetPassword/>
                    </Route>
                    {(!data || !data.getUser) && !loading ? <Redirect to="/Login"/> :
                        <Layout>
                            < Route exact path={"/Home"}>
                                <Home/>
                            </Route>
                            <Route exact path={"/Products"}>
                                <Products/>
                            </Route>
                            <Route exact path={"/Categories"}>
                                <Categories/>
                            </Route>
                            <Route exact path={"/Statistics"}>
                                <Statistics/>
                            </Route>
                            <Route exact path={"/Staff"}>
                                <Staff/>
                            </Route>
                            <Route exact path={"/Documents"}>
                                <Documents/>
                            </Route>
                        </Layout>
                    }
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    )
};

export default App;