import React, { useRef } from "react";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";

import Input from "../../shared/components/uiElements/input/Input";
import Card from "../../shared/components/uiElements/card/Card";
import { login } from "../../shared/store/slices/userSlice";
import "./Auth.css";

const SCHEMA = yup.object({
    email: yup
        .string()
        .email("Please enter a valid email.")
        .required("Email is required."),
    password: yup.string().required("Please enter password."),
});

const LogIn = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SCHEMA),
    });

    const loginHandler = (data) => {
        dispatch(login(data));
    };

    return (
        <Card style={{ marginTop: "50px", maxWidth: "500px" }}>
            <h1 className="auth-heading">Login</h1>
            <div className="login-form">
                <form onSubmit={handleSubmit(loginHandler)}>
                    <Input
                        ref={emailRef}
                        id="email"
                        title="Email"
                        type="email"
                        register={register}
                        inputName="email"
                        isError={errors.email}
                        errorMessage={errors.email?.message}
                    />
                    <div>
                        <Input
                            ref={passwordRef}
                            id="password"
                            title="Password"
                            type="password"
                            register={register}
                            inputName="password"
                            isError={errors.password}
                            errorMessage={errors.password?.message}
                        />
                        <span>{/* <Link to></Link> */}</span>
                    </div>
                    <div className="btn-wrap">
                        <button type="submit" className="btn">
                            Login
                        </button>
                    </div>
                </form>
                <p className="auth__bottom-text">
                    Don't have a account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </Card>
    );
};

export default LogIn;
