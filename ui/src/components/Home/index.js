import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

import "./home.css";
import {EventCalendar} from "../index";

const Home = ({ user, auth }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/login');
    }, [navigate, user]);

    return (
        <EventCalendar user={user} auth={auth} />
    );
};

export default connect(
    ({auth}) => ({auth}),
    null
)(Home);
