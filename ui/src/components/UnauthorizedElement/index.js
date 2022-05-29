import React from 'react';

import {Typography} from "antd";
import "./unauthorized.css"

const {Title, Text} = Typography;

const UnauthorizedElement = () => {
    return (
        <div className="unauthorizedContainer">
            <Title level={1} style={{fontWeight: 'bold', fontSize: '92px', marginBottom: '0.15em'}}>401</Title>
            <Text strong style={{fontSize: '20px'}}>Unauthorized</Text>
        </div>
    );
};

export default UnauthorizedElement;
