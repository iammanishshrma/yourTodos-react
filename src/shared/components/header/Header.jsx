import React from "react";

import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../store/slices/userSlice";

import "./Header.css";

const Header = () => {
    const isLoggedIn = useSelector((state) => state.userData.isLoggedIn);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <header className="header">
            <div className="container">
                <div>
                    <Link className="header__logo" to="/">
                        YourTodos
                    </Link>
                </div>
                <nav className="header_nav-bar">
                    <ul className="header__nav-list">
                        <li className="header__nav-item">
                            <NavLink className="header__nav-link" to={"/"}>
                                Home
                            </NavLink>
                        </li>
                        <li className="header__nav-item">
                            <NavLink
                                className="header__nav-link"
                                to="/add-todo"
                            >
                                Add todo
                            </NavLink>
                        </li>
                        <li className="header__nav-item">
                            <NavLink className="header__nav-link" to="/profile">
                                Profile
                            </NavLink>
                        </li>
                        {!isLoggedIn && (
                            <li className="header__nav-item">
                                <NavLink
                                    className="header__nav-link"
                                    to="/login"
                                >
                                    Authenticate
                                </NavLink>
                            </li>
                        )}
                        {isLoggedIn && (
                            <button
                                className="btn inverse"
                                onClick={logoutHandler}
                            >
                                Logout
                            </button>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
