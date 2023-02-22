import React, { useRef } from "react";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Input from "../../shared/components/uiElements/input/Input";
import Card from "../../shared/components/uiElements/card/Card";
import { apiInstance } from "../../shared/utils/api";
import "./Auth.css";

const SCHEMA = yup.object({
    name: yup.string().required("Please enter your name."),
    email: yup
        .string()
        .email("Please enter a valid email.")
        .required("Email is required."),
    password: yup.string().required("Please enter password.").min(8),
    cPassword: yup
        .string()
        .oneOf(
            [yup.ref("password")],
            "Password and confirm password must be same."
        ),
});

const SignUp = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const cPasswordRef = useRef();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SCHEMA),
    });

    const signUpHandler = (data) => {
        delete data.cPassword;
        apiInstance
            .post("/user/signup", data)
            .then((res) => console.log(res))
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Card style={{ marginTop: "50px", maxWidth: "500px" }}>
            <h1 className="auth-heading">Create Account</h1>
            <div className="signup-form">
                <form onSubmit={handleSubmit(signUpHandler)}>
                    <Input
                        ref={nameRef}
                        id="name"
                        title="Name"
                        type="text"
                        register={register}
                        inputName="name"
                        isError={errors.name}
                        errorMessage={errors.name?.message}
                    />
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
                    <Input
                        ref={cPasswordRef}
                        id="cPassword"
                        title="Confirm password"
                        type="password"
                        register={register}
                        inputName="cPassword"
                        isError={errors.cPassword}
                        errorMessage={errors.cPassword?.message}
                    />
                    <div className="btn-wrap">
                        <button type="submit" className="btn">
                            Create account
                        </button>
                    </div>
                </form>
                <p className="auth__bottom-text">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </Card>
    );
};

export default SignUp;
