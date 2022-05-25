import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/dashboard/users");
    }, [navigate]);

    return (
        <></>
    );
};

export default Dashboard;
