import React, {useEffect} from 'react';
import {Avatar, Button, message, Modal, Popconfirm, Tag, Typography} from "antd";

import "./eventInfoModal.css";
import moment from "moment";
import "moment/locale/ru"
import {ArrowRightOutlined, DeleteOutlined, EditOutlined, UserOutlined} from "@ant-design/icons";
import {EditEventForm} from "../index";
import {connect} from "react-redux";
import {getUsers as getUsersAction} from "../../redux/modules/users";
import {updateEvent as updateEventAction, deleteEvent as deleteEventAction} from "../../redux/modules/events";
import {useForm} from "antd/es/form/Form";

const {Text, Title} = Typography;

const EventInfoModal = ({
                            users,
                            getUsers,
                            user,
                            modalVisible,
                            setModalVisible,
                            eventInfo,
                            deleteEvent,
                            updateEvent
                        }) => {

    const [selMapItem, setSelMapItem] = React.useState(null);
    const [isEventEditing, setIsEventEditing] = React.useState(false);
    const [eventFormData, setEventFormData] = React.useState({newEventData: null});
    const [form] = useForm();

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleEdit = () => {
      setIsEventEditing(true);
      setEventFormData(prevState => ({
          newEventData: {
              ...prevState.newEventData,
              title: eventInfo.event.title,
              orgUserID: eventInfo.orgUser.id,
              startDateTime: moment(eventInfo.event.startDateTime).format('YYYY-MM-DD HH:mm').toString(),
              endDateTime: moment(eventInfo.event.endDateTime).format('YYYY-MM-DD HH:mm').toString(),
              description: eventInfo.event.description,
              itemID: eventInfo.item.id,
              members: eventInfo.members.map(member => member.id)
          }
      }))
    }

    const onEventFormChange = (fields) => {
        setEventFormData(prevState => ({
            newEventData: {
                ...prevState.newEventData,
                title: fields[1].value,
                orgUserID: user.id === eventInfo.orgUser.id ? user.id : eventInfo.orgUser.id,
                startDateTime: fields[2].value.format('YYYY-MM-DD HH:mm').toString(),
                endDateTime: fields[3].value.format('YYYY-MM-DD HH:mm').toString(),
                description: fields[4].value
            }
        }));
    }

    const onSelectMapItem = (item) => {
        setSelMapItem(item);
        setEventFormData(prevState => ({
            newEventData: {
                ...prevState.newEventData,
                itemID: item.id
            }
        }));
    }

    const onMembersChange = (members) => {
        let userIds = [];
        members.map(member => {
            users.filter(user => user.name + " " + user.lastName === member.name + " " + member.lastName)
                .map(user => userIds.push(user.id))
        })
        setEventFormData(prevState => ({
            newEventData: {
                ...prevState.newEventData,
                members: userIds
            }
        }));
    }

    const handleCloseModal = () => {
        setModalVisible(false);
        setIsEventEditing(false);
        setEventFormData({
            newEventData: null,
        })
        setSelMapItem(null);
    }

    const handleUpdateEvent = () => {
        updateEvent(eventInfo.event?.id, eventFormData.newEventData)
            .then(res => {
                if (res.status === "success") {
                    message.success(res.message, 5);
                    handleCloseModal();
                }
            })
            .catch(error => {
                message.error(error.message, 5)
            });
    }

    const handleDeleteEvent = () => {
        deleteEvent(eventInfo?.event?.id)
            .then(res => {
                if (res.status === "success") {
                    message.success(res.message, 5);
                    handleCloseModal();
                }
            })
            .catch(error => {
                message.error(error.message, 5)
            });
    }

    return (
        <Modal
            title={!isEventEditing ? "Информация о событии" : `Редактирование события №${eventInfo?.event?.id}`}
            className={!isEventEditing ? "eventInfoModal" : "eventEditModal"}
            width={isEventEditing ? 750 : 520}
            centered
            visible={modalVisible}
            onOk={handleUpdateEvent}
            okText={isEventEditing && "Обновить"}
            onCancel={handleCloseModal}
            cancelButtonProps={{hidden: true}}
            okButtonProps={!isEventEditing && {hidden: true}}
        >
            {!isEventEditing ? (
                    <>
                        <Title level={3} className="eventTitle">{eventInfo?.event?.title}</Title>
                        {eventInfo?.orgUser?.id === user?.id || user?.role === "Admin" ?
                            <div className="modalButtonGroup">
                                <Button style={{marginRight: '8px'}} title="Редактирвоать событие"
                                        onClick={handleEdit}><EditOutlined/></Button>
                                <Popconfirm
                                    placement="bottomRight"
                                    title="Вы уверены, что хотите удалить событие?"
                                    onConfirm={handleDeleteEvent}
                                    okText="Да"
                                    cancelText="Нет"
                                >
                                    <Button type="ghost" danger title="Удалить событие"><DeleteOutlined/></Button>
                                </Popconfirm>
                            </div> : <></>
                        }
                        <Text strong>Место встречи: </Text>
                        <div className="companyInfo">
                            <Title level={4} className="companyName">{eventInfo?.item?.name}</Title>
                            {
                                eventInfo?.item?.rubric === 'Рестораны' ?
                                    <Tag className="companyRubric" color="magenta"><Text style={{color: 'inherit'}}
                                                                                         strong>{eventInfo?.item?.rubric}</Text></Tag> :
                                    eventInfo?.item?.rubric === 'Бизнес-центры' ?
                                        <Tag className="companyRubric" color="geekblue"><Text style={{color: 'inherit'}}
                                                                                              strong>{eventInfo?.item?.rubric}</Text></Tag> :
                                        <Tag className="companyRubric" color="green"><Text style={{color: 'inherit'}}
                                                                                           strong>{eventInfo?.item?.rubric}</Text></Tag>
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
                                                <Avatar style={{backgroundColor: '#87d068'}} size={33}
                                                        icon={<UserOutlined/>}/>
                                                <div className="memberInfo">
                                                    <Text strong
                                                          className="memberName">{member.name + " " + member.lastName}</Text>
                                                    <Text className="memberPosition">{member.position}</Text>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </>
                        }
                        {eventInfo?.event?.description &&
                            <Text strong style={{display: 'block', marginTop: '5px'}}>Описание: </Text>}
                        <div className="description">{eventInfo?.event?.description}</div>
                    </>) :
                <EditEventForm
                    onFormChange={onEventFormChange}
                    eventEditForm={form}
                    selMapItem={selMapItem}
                    setSelMapItem={onSelectMapItem}
                    user={user}
                    eventData={eventInfo}
                    onChangeMembers={onMembersChange}
                />}
        </Modal>
    );
};

export default connect(
    ({users}) => ({users: users.users}),
    ({getUsers: getUsersAction, updateEvent: updateEventAction, deleteEvent: deleteEventAction})
)(EventInfoModal)
