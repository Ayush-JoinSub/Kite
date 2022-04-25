import React from "react";
import { useSelector } from "react-redux";
import { Switch, Redirect, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import FormScreen from '../../components/Form';
import LoginScreen from "../../components/LoginPage";
import StocksScreen from "../src/components/Stocks";

const protectedRoutes = [
    { path: "/stocks", component: StocksScreen },
    
];

const Navigator = () => {
    const location = useLocation();

    let routes = (
        <Switch>
            <Route path="/login" exact component={LoginScreen} />
            <Redirect to="/login" />
        </Switch>
    );
}