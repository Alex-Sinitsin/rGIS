import React, {useEffect} from 'react';
import {Steps, Button, message, Typography} from 'antd';

import {MapYandex} from "../index";
import ChooseEventData from "../ChooseEventData";
import "./createEvent.css";
import ChooseMembers from "../ChooseMembers";
import {connect} from "react-redux";
import {createEvent as createEventAction} from "../../redux/modules/events";
import {useNavigate} from "react-router-dom";
import {useForm} from "antd/lib/form/Form";

const {Step} = Steps;
const {Text} = Typography;

const CreateEvent = ({user, createNewEvent}) => {
    const navigate = useNavigate();
    const [current, setCurrent] = React.useState(0);
    const [selMapItem, setSelMapItem] = React.useState(null);
    const [eventForm, setEventForm] = React.useState({newEvent: {}});
    const [form] = useForm();

    useEffect(() => {
        document.title = "Создание нового мероприятия - Сатурн ГИС";
    }, [])

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const nextButtonClick = () => {
        if (current === 0 && eventForm.newEvent?.itemID === undefined) {
            message.warn('Пожалуйста выберите помещение, которое хотите забронировать!');
        } else next();

        if(current === 1) {
            form
                .validateFields()
                .then((values) => {
                    onEventFormFinish(values)
                    form.resetFields();
                })
                .catch(_ => null)
        }
    }

    const onEventFormFinish = (values) => {
        setEventForm(prevState => ({
            newEvent: {
                ...prevState.newEvent,
                title: values.title,
                orgUserID: user.id,
                startDateTime: values.startDateTime.format('YYYY-MM-DD HH:mm').toString(),
                endDateTime: values.endDateTime.format('YYYY-MM-DD HH:mm').toString(),
                description: values.description
            }
        }));
        next();
    }

    const onSelectMapItem = (item) => {
        setSelMapItem(item);
        setEventForm(prevState => ({
            newEvent: {
                ...prevState.newEvent,
                itemID: item.id
            }
        }));
    }

    const onMembersChange = (members) => {
        let userIds = [];
        members.map(user => userIds.push(user.id))
        setEventForm(prevState => ({
            newEvent: {
                ...prevState.newEvent,
                members: userIds
            },

        }));
    }

    const onEventCreate = () => {
        createNewEvent(eventForm.newEvent)
            .then(res => {
                if (res.status === "success") message.success(res.message, 5);
                setEventForm({newEvent: {}})
                navigate('/')
            })
            .catch(error => { message.error(error.message, 5) })
    }

    const steps = [
        {
            title: 'Выберите объект для бронирования',
        },
        {
            title: 'Заполните информацию о мероприятии',
        },
        {
            title: 'Добавьте участников',
        },
    ];
    return (
        <>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title}/>
                ))}
            </Steps>
            <div className="steps-content">
                {current === 0 ?
                    (<>
                        <p><Text strong>Выбранное помещение: </Text><Text>{selMapItem ? selMapItem.name : "Помещение не выбрано"}</Text></p>
                        <MapYandex setSelectedItem={onSelectMapItem} user={user}/>
                    </>)
                    : (<></>)}
                {current === 1 ?
                    (<ChooseEventData form={form} onFormFinish={onEventFormFinish} data={eventForm.newEvent}/>)
                    : (<></>)}
                {current === 2 ?
                    (<ChooseMembers authUser={user} onChange={onMembersChange} selectMode="multiple"/>)
                    : (<></>)}
            </div>
            <div className="steps-action">
                {current > 0 && (
                    <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                        Назад
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={nextButtonClick}>
                        Далее
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={onEventCreate}>
                        Готово
                    </Button>
                )}
            </div>
        </>
    );
};

export default connect(
    ({events}) => ({events: events}),
    ({createNewEvent: createEventAction})
)(CreateEvent)
