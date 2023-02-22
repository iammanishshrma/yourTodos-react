import React from "react";

import { Outlet } from "react-router-dom";

import Header from "../components/header/Header";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </>
    );
};

export default MainLayout;
