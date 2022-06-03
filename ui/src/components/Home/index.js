import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

import "./home.css";
import {EventCalendar} from "../index";

const Home = ({ user}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate("/login");
    }, [navigate]);

    useEffect(() => {
        document.title = "Список мероприятий - Сатурн ГИС";
        if (!user) navigate(0);
    }, []);


    return (
        <EventCalendar user={user} />
    );
};

export default connect(
    null,
    null
)(Home);
