import React, { useEffect, useState } from "react";
import Card from "../../shared/components/uiElements/card/Card";

import { apiInstance } from "../../shared/utils/api";
import avatar from "../../shared/assets/images/avatar.jpg";
import "./Profile.css";
import { Link } from "react-router-dom";

const Profile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        apiInstance
            .get("/user/user-info")
            .then((res) => {
                setProfile(res.data);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <Card style={{ marginTop: "50px", maxWidth: "500px" }}>
            <div className="profile-page__wrapper">
                {profile && (
                    <>
                        <div className="img-wrap">
                            <img
                                src={profile?.img ? profile.img : avatar}
                                alt={profile?.img ? profile.img : avatar}
                            />
                        </div>
                        <h2 style={{ marginBottom: "10px" }}>
                            <strong>Name:</strong> {profile.name}
                        </h2>
                        <h2>
                            <strong>Email:</strong> {profile.email}
                        </h2>
                    </>
                )}
            </div>
            <div className="btn-wrap">
                <Link to="/profile/edit" className="btn">
                    Update
                </Link>
            </div>
        </Card>
    );
};

export default Profile;
