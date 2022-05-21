import React, {useEffect} from 'react';
import { Typography } from 'antd';
import {useNavigate} from "react-router-dom";

const { Title } = Typography;

const Home = ({ user }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) navigate('/login');
    },[navigate, user]);

    return (
        <div>
            <Title>Домашняя страница</Title>
            <p>Екатеринбург id = 1267260165455895</p>
            <p>Лен. район id = 1267247280553988</p>
            <p>Верх-Исетский район id = 1267247280553987</p>
            <p>Рестораны id = 164</p>
            <p>Кафе id = 161</p>
            <p>Бизнес-центры id = 13796</p>
        </div>
    );
};

export default Home;
