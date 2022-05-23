import React from 'react';
import {Avatar, Modal, Typography} from "antd";

import "./eventInfoModal.css";
import moment from "moment";
import "moment/locale/ru"
import {ArrowRightOutlined, UserOutlined} from "@ant-design/icons";

const {Text, Title} = Typography;

const EventInfoModal = ({modalVisible, setModalVisible, eventInfo}) => {
    return (
        <Modal
            title="Информация о событии"
            centered
            visible={modalVisible}
            onOk={() => setModalVisible(false)}
            onCancel={() => setModalVisible(false)}
        >
            <Title level={3}>{eventInfo?.event?.title}</Title>
            <Text strong>Место встречи: </Text>
            <div className="companyInfo">
                <Title level={4} className="companyName">{eventInfo?.item?.name}</Title>
                <Text className="companyRubric" strong
                      style={{backgroundColor: eventInfo?.item?.rubric !== 'Рестораны' ? "#3949AB" : "#E64A19"}}>{eventInfo?.item?.rubric}</Text>
                <Text className="companyAddress" strong italic>{eventInfo?.item?.address}</Text>
            </div>
            <Text strong>Время проведения: </Text>
            <Text className="eventDateTime">
                {moment(eventInfo?.event?.startDateTime).locale('ru').format("LL LT")}
                <ArrowRightOutlined style={{fontSize: 12, margin: '0 7px'}}/>
                {moment(eventInfo?.event?.endDateTime).minutes().toString() === "59" ?
                    moment(eventInfo?.event?.endDateTime).add(1, 'minutes').locale('ru').format("LL LT") : moment(eventInfo?.event?.endDateTime).locale('ru').format("LL LT")}
            </Text>
            <Text strong style={{display: 'block', marginBottom: '5px'}}>Организатор: </Text>
            <div className="orgUserInfo">
                <Avatar style={{backgroundColor: '#00796B'}} size={35} icon={<UserOutlined/>}/>
                <div className="userInfo">
                    <Text strong className="orgUserName">{eventInfo?.orgUser?.name + " " + eventInfo?.orgUser?.lastName}</Text>
                    <Text className="orgUsermemberPosition">{eventInfo?.orgUser?.position}</Text>
                </div>
            </div>
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
            <Text strong style={{display: 'block', marginTop: '5px'}}>Описание: </Text>
            <div className="description">{eventInfo?.event?.description}</div>
        </Modal>
    );
};

export default EventInfoModal;
