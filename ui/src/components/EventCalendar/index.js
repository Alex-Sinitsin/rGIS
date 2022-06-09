import React, {createRef, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {getEvents as getEventsAction, getOneEvent as getOneEventAction} from "../../redux/modules/events";
import {useNavigate} from "react-router-dom";
import {Col, Row, Typography} from "antd";
import {UnorderedListOutlined} from "@ant-design/icons";

import FullCalendar from '@fullcalendar/react'
import ruLocale from '@fullcalendar/core/locales/ru';
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'

import interactionPlugin from '@fullcalendar/interaction'
import "./eventCalendar.css";
import {EventInfoModal} from "../index";
import moment from "moment";

const {Title, Text} = Typography;

const EventCalendar = ({user, events, singleEvent, getEvents, getOneEvent}) => {
    const navigate = useNavigate()
    const calendarRef = createRef();
    const [eventList, setEventList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        user && getEvents(user?.accessToken);
    }, [user, getEvents]);

    useEffect(() => {
        const fEventList = getFormattedEventList(events);
        setEventList(fEventList);
    }, [events]);

    const renderEventContent = (eventInfo) => {
        return (
            <>
                <div className="eventCell"
                     style={{backgroundColor: calendarRef.current.getApi().view.type === 'dayGridMonth' ? eventInfo.backgroundColor : 'transparent'}}>
                    <Text className="eventCellTimeText" strong>{eventInfo.timeText}</Text>
                    <Text className="eventCellTitleText">{eventInfo.event.title}</Text>
                </div>
            </>
        )
    }

    const eventListEmpty = () => (
        <div style={{textAlign: 'center'}}>
            <UnorderedListOutlined style={{fontSize: 80}}/>
            <Title level={3}>Нет событий для отображения</Title>
        </div>
    );

    const getFormattedEventList = (list) => {
        return list.map(event => {
            return {
                eventID: event.id,
                title: event.title,
                start: event.startDateTime,
                end: moment(event.endDateTime).minutes().toString() === "59" ?
                    moment(event.endDateTime).add(1, 'minutes').format("YYYY-MM-DD HH:mm").toString() :
                    moment(event.endDateTime).locale('ru').format("YYYY-MM-DD HH:mm").toString(),
                orgUserID: event.orgUserId,
                itemID: event.itemId,
                description: event.description,
                color: event.orgUserId === user.userInfo.id ? "#FFCDD2" : "#B3E5FC"
            }
        })
    }

    const eventClickHandle = (info) => {
        getOneEvent(info.event.extendedProps.eventID)
        singleEvent && singleEvent?.event?.id === info.event.extendedProps.eventID ? setModalVisible(true) : setTimeout(() => setModalVisible(true), 300)
    }

    const deleteEvent = (eventID) => {
        console.log(eventID);
    }

    return (
        <>
            <Row>
                <Col xl={{span: 18, offset: 3}} span={24}>
                    <FullCalendar
                        ref={calendarRef}
                        height={610}
                        locale={ruLocale}
                        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
                        slotDuration={'00:30:00'}
                        initialView="dayGridMonth"
                        events={eventList}
                        eventClick={info => eventClickHandle(info)}
                        eventContent={renderEventContent}
                        displayEventEnd={true}
                        dayMaxEventRows={2}
                        customButtons ={{
                            addEventButton: {
                                text: "Добавить мероприятие",
                                click: () => {
                                    navigate('/booking')
                                }
                            }
                        }}
                        headerToolbar={{
                            left: 'prev,today,next',
                            center: 'title',
                            right: 'addEventButton,dayGridMonth,listMonth'
                        }}
                        buttonText={{
                            listMonth: 'Расписание'
                        }}
                        noEventsContent={eventListEmpty}
                        eventTimeFormat={
                            {
                                hour: '2-digit',
                                minute: '2-digit',
                                meridiem: 'narrow',
                                hour12: false
                            }
                        }
                    />
                </Col>
            </Row>
            {singleEvent && <EventInfoModal
                deleteEvent={deleteEvent}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                eventInfo={singleEvent}
            />}
        </>
    );
};

export default connect(
    ({events, singleEvent}) => ({events: events.events, singleEvent: events.singleEvent}),
    ({getEvents: getEventsAction, getOneEvent: getOneEventAction})
)(EventCalendar)
