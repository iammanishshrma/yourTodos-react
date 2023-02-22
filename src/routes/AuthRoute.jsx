import React from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = (props) => {
    const isLoggedIn = useSelector((state) => state.userData.isLoggedIn);

    if (isLoggedIn) {
        return <Navigate to={"/"} />;
    }
    return <>{props.children}</>;
};

export default AuthRoute;
