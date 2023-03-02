import React, { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Card from "../../shared/components/uiElements/card/Card";
import { apiInstance } from "../../shared/utils/api";
import avatar from "../../shared/assets/images/avatar.jpg";
import "./Profile.css";

const SCHEMA = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
});

const EditProfile = () => {
    const [profile, setProfile] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [imgUrl, setImgUrl] = useState(null);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(SCHEMA),
    });

    useEffect(() => {
        apiInstance
            .get("/user/user-info")
            .then((res) => {
                setProfile(res.data);
                setValue("name", res.data.name);
                setValue("email", res.data.email);
            })
            .catch((error) => console.log(error));
    }, [setValue]);

    const imgChangeHandler = (event) => {
        const profileImg = event.target.files[0];
        setImgFile(profileImg);
        setImgUrl(URL.createObjectURL(profileImg));
    };

    const submitHandler = (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("profileImg", imgFile);

        apiInstance
            .put("/user/update-user", formData)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => console.log(error));
    };

    return (
        <Card style={{ marginTop: "50px", maxWidth: "500px" }}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="profile-page__wrapper">
                    <div
                        className="img-wrap"
                        style={{
                            position: "relative",
                        }}
                    >
                        <img
                            src={
                                imgUrl
                                    ? imgUrl
                                    : profile?.profileImg
                                    ? profile.profileImg
                                    : avatar
                            }
                            alt={
                                imgUrl
                                    ? imgUrl
                                    : profile?.profileImg
                                    ? profile.profileImg
                                    : avatar
                            }
                        />
                        <input
                            type="file"
                            name="profileImg"
                            className="profileImg"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                opacity: 0,
                            }}
                            onChange={imgChangeHandler}
                        />
                    </div>
                    <h2 style={{ marginBottom: "10px" }}>
                        <strong>Name:</strong>{" "}
                        <input {...register("name")} type="text" />
                        {errors.name && (
                            <span className="error">{errors.name.message}</span>
                        )}
                    </h2>
                    <h2>
                        <strong>Email:</strong>{" "}
                        <input {...register("email")} type="email" />
                        {errors.email && (
                            <span className="error">
                                {errors.email.message}
                            </span>
                        )}
                    </h2>
                </div>
                <div className="btn-wrap">
                    <button type="submit" className="btn">
                        Update
                    </button>
                </div>
            </form>
        </Card>
    );
};

export default EditProfile;
