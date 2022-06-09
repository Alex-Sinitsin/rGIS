import React from 'react';
import {Avatar, Button, Modal, Popconfirm, Tag, Typography} from "antd";

import "./eventInfoModal.css";
import moment from "moment";
import "moment/locale/ru"
import {ArrowRightOutlined, DeleteOutlined, EditOutlined, UserOutlined} from "@ant-design/icons";

const {Text, Title} = Typography;

const EventInfoModal = ({modalVisible, setModalVisible, eventInfo, deleteEvent}) => {
    return (
        <Modal
            title="Информация о событии"
            className="eventInfoModal"
            centered
            visible={modalVisible}
            onOk={() => setModalVisible(false)}
            onCancel={() => setModalVisible(false)}
            footer={null}
            cancelButtonProps={{ hidden: true }}
        >
            <Title level={3}>{eventInfo?.event?.title}</Title>
            <div className="modalButtonGroup">
                <Button style={{marginRight: '8px'}} title="Редактирвоать событие"><EditOutlined /></Button>
                <Popconfirm
                    placement="bottomRight"
                    title="Вы уверены, что хотите удалить событие?"
                    onConfirm={() => {}}
                    okText="Да"
                    cancelText="Нет"
                >
                    <Button type="ghost" danger title="Удалить событие"><DeleteOutlined /></Button>
                </Popconfirm>
            </div>
            <Text strong>Место встречи: </Text>
            <div className="companyInfo">
                <Title level={4} className="companyName">{eventInfo?.item?.name}</Title>
                {
                    eventInfo?.item?.rubric === 'Рестораны' ?
                        <Tag className="companyRubric" color="magenta"><Text style={{color: 'inherit'}} strong>{eventInfo?.item?.rubric}</Text></Tag> :
                    eventInfo?.item?.rubric === 'Бизнес-центры' ?
                        <Tag className="companyRubric" color="geekblue"><Text style={{color: 'inherit'}} strong>{eventInfo?.item?.rubric}</Text></Tag> :
                        <Tag className="companyRubric" color="green"><Text style={{color: 'inherit'}} strong>{eventInfo?.item?.rubric}</Text></Tag>
                }
                <Text className="companyAddress" strong italic>{eventInfo?.item?.address}</Text>
            </div>
            <Text strong>Время проведения: </Text>
            <Text className="eventDateTime">
                {moment(eventInfo?.event?.startDateTime).locale('ru').format("LL LT")}
                <ArrowRightOutlined style={{fontSize: 12, margin: '0 7px'}}/>
                {moment(eventInfo?.event?.endDateTime).minutes().toString() === "59" ?
                    moment(eventInfo?.event?.endDateTime).add(1, 'minutes').locale('ru').format("LL LT") :
                    moment(eventInfo?.event?.endDateTime).locale('ru').format("LL LT")}
            </Text>
            <Text strong style={{display: 'block', marginBottom: '5px'}}>Организатор: </Text>
            <div className="orgUserInfo">
                <Avatar style={{backgroundColor: '#00796B'}} size={35} icon={<UserOutlined/>}/>
                <div className="userInfo">
                    <Text strong
                          className="orgUserName">{eventInfo?.orgUser?.name + " " + eventInfo?.orgUser?.lastName}</Text>
                    <Text className="orgUsermemberPosition">{eventInfo?.orgUser?.position}</Text>
                </div>
            </div>
            {eventInfo?.members?.length > 0 &&
                <>
                    <Text strong style={{display: 'block', marginTop: '5px'}}>Участники: </Text>
                    <div className="eventMembers">
                        {eventInfo?.members?.map(member => {
                            return (
                                <div className="member" key={member.id}>
                                    <Avatar style={{backgroundColor: '#87d068'}} size={33} icon={<UserOutlined/>}/>
                                    <div className="memberInfo">
                                        <Text strong className="memberName">{member.name + " " + member.lastName}</Text>
                                        <Text className="memberPosition">{member.position}</Text>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </>
            }
            {eventInfo?.event?.description && <Text strong style={{display: 'block', marginTop: '5px'}}>Описание: </Text>}
            <div className="description">{eventInfo?.event?.description}</div>
        </Modal>
    );
};

export default EventInfoModal;
