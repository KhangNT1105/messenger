import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const Auth = ({ path, Component }) => {
    console.log("Asd");
    return (
        <Route path={path} render={(routeProps) => {
            if (localStorage.getItem("accessToken")) {
                return <Component {...routeProps} />;
            }
            return <Redirect to="/login" />
        }} />
    )
}
export default Auth