import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getUsers as getUsersAction, createUser as createUserAction, changeUserRole as changeUserRoleAction} from "../../../redux/modules/users";
import "./users.css";
import {Button, Col, message, Row, Table, Tag, Typography} from 'antd';
import {PlusOutlined} from "@ant-design/icons";
import AddUserModal from "./Modals/AddUser";
import {EditableRow, EditableCell} from "./Elements";

const {Title, Text} = Typography;



const Users = ({users, getUsers, createUser, changeUserRole}) => {

    const [userModalVisible, setUserModalVisible] = useState(false);

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        document.title = "Список пользователей - Сатурн ГИС";
    }, [])

    const showUserModal = () => {
        setUserModalVisible(true);
    };

    const hideUserModal = () => {
        setUserModalVisible(false);
    };

    const tableHeader = () => {
        return (
            <>
                <Row style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Col span={12}>
                        <Title level={2}>Список пользователей</Title>
                    </Col>
                    <Col span={12} style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button onClick={showUserModal} type="primary" icon={<PlusOutlined/>}>
                            Добавить пользователя
                        </Button>
                    </Col>
                </Row>
            </>
        );
    }

    const onCreate = (values) => {
        createUser(values)
            .then(res => {
                if (res.status === "success") {
                    message.success(res.message, 5);
                    setUserModalVisible(false);
                }
            })
            .catch(error => {
                message.error(error.message, 5)
            });
    };

    const defaultColumns = [
        {
            title: 'ФИО',
            children: [
                {
                    title: "Имя",
                    dataIndex: "name",
                    key: "name"
                },
                {
                    title: "Фамилия",
                    dataIndex: "lastName",
                    key: "lastName"
                },
            ],
        },
        {
            title: "Должность",
            dataIndex: "position",
            key: "position",
            render: (_, record) => (
                <Tag
                    color={record.position.match(/Разработчик/) ? "purple" : record.position.match(/Разработчик/) ? "volcano" : "green"}>{record.position}</Tag>
            )
        },
        {
            title: "E-mail",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Роль",
            editable: true,
            dataIndex: "role",
            key: "role",
            render: (_, record) => (
                <Text>{record.role === "Admin" ? "Администратор" : "Пользователь"}</Text>
            ),
        },
    ];

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave
            }),
        };
    });

    const handleSave = (row) => {
        const newData = [...users];
        const index = newData.findIndex((item) => row.id === item.id);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        changeUserRole(newData[index].id, newData[index].role === "Admin" ? 2 : 1)
            .then(res => {
                if (res.status === "success") {
                    message.success(res.message, 5);
                    setUserModalVisible(false);
                }
            })
            .catch(error => {
                message.error(error.message, 5)
            });
    };

    return (
        <>
            <Table
                dataSource={users}
                rowKey={record => record.id}
                title={tableHeader}
                pagination={{
                    hideOnSinglePage: true
                }}
                components={components}
                columns={columns}
            />
            <AddUserModal visible={userModalVisible} hideModal={hideUserModal} onCreate={onCreate}
                          onCancel={hideUserModal}/>
        </>
    );
};

export default connect(
    ({users}) => ({users: users.users}),
    ({getUsers: getUsersAction, createUser: createUserAction, changeUserRole: changeUserRoleAction})
)(Users);
