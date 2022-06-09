import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {getItems as getItemsAction} from "../../../redux/modules/items";
import "./items.css";
import {Table, Tag, Typography} from 'antd';
import {EnvironmentOutlined} from "@ant-design/icons";
const { Column } = Table;
const { Title, Text } = Typography;

const Index = ({ items, getItems }) => {

    useEffect(() => {
        getItems();
    }, [getItems]);

    useEffect(() => {
        document.title = "Список помещений - Сатурн ГИС";
    }, [])


    return (
        <Table dataSource={items} rowKey={record => record.id} title={() => <Title level={2}>Список помещений / объектов</Title>}>
            <Column
                title="Название"
                dataIndex="name"
                key="name"
            />
            <Column
                title="Адрес"
                dataIndex="address"
                key="address"
                render={(_, record) => (
                    <Text><EnvironmentOutlined style={{color: 'red', fontSize: 16, marginRight: '5px'}} />{record.address}</Text>
                )}
            />
            <Column
                title="Категория"
                dataIndex="rubric"
                key="rubric"
                render={(_, record) => (
                    <Tag color={record.rubric === "Рестораны" ?  "red" : record.rubric === "Бизнес-центры" ? "geekblue" : "green"}>{record.rubric}</Tag>
                )}
            />
        </Table>
    );
};

export default connect(
    ({items}) => ({items: items.items}),
    ({getItems: getItemsAction})
)(Index);
