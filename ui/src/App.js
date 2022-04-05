import React from 'react';
import './App.css';

import {Button, Divider, Layout, PageHeader} from 'antd';
import {LoginOutlined, LogoutOutlined} from "@ant-design/icons";
import Text from "antd/es/typography/Text";

const {Content, Footer} = Layout;

function App() {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <PageHeader
                className="pageHeader"
                avatar={{ src: './assets/images/logo.png' }}
                title="ГИС"
                extra={[
                    <Button key="1" type="primary">
                        <LoginOutlined />
                        <Text className="loginButtonText" strong>Войти</Text>
                    </Button>,
                    <Button key="2" type="danger">
                        <LogoutOutlined />
                        <Text className="logoutButtonText" strong>Выйти</Text>
                    </Button>,
                ]}/>
            <Divider style={{margin: 0}}/>
            <Content className="mainContent">
                Content
            </Content>
            <Footer style={{textAlign: 'center'}}></Footer>
        </Layout>
    );
}

export default App;
