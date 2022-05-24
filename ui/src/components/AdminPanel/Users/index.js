import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getUsers as getUsersAction} from "../../../redux/modules/users";
import "./users.css";
import {Table, Tag, Typography} from 'antd';
const { Column, ColumnGroup } = Table;
const { Title, Text } = Typography;

const Users = ({ users, getUsers }) => {

    useEffect(() => {
        getUsers();
    }, [getUsers]);


    return (
        <Table dataSource={users} title={() => <Title level={2}>Список пользователей</Title>}>
            <ColumnGroup title="ФИО">
                <Column title="Имя" dataIndex="name" key="name" />
                <Column title="Фамилия" dataIndex="lastName" key="lastName" />
            </ColumnGroup>
            <Column
                title="Должность"
                dataIndex="position"
                key="position"
                render={(_, record) => (
                    <Tag color={record.position.match(/Разработчик/) ? "purple" : "magenta"}>{record.position}</Tag>
                )}
            />
            <Column title="Эл. почта" dataIndex="email" key="email" />
            <Column
                title="Роль"
                dataIndex="role"
                key="role"
                render={(_, record) => (
                    <Text>{record.role === "Admin" ? "Администратор" : "Пользователь"}</Text>
                )}
            />
        </Table>
    );
};

export default connect(
    ({users}) => ({users: users.users}),
    ({getUsers: getUsersAction})
)(Users);
