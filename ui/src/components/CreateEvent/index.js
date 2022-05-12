import React, {useEffect} from 'react';
import {Steps, Button, message} from 'antd';

import {MapYandex} from "../index";
import ChooseEventData from "../ChooseEventData";
import "./createEvent.css";

const {Step} = Steps;

const CreateEvent = () => {
    const [current, setCurrent] = React.useState(0);
    const [eventForm, setEventForm] = React.useState({newEvent: {}, members: []});

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    useEffect(() => {
        console.log(eventForm);
    }, [eventForm])

    const nextButtonClick = () => {
      if(current === 0 && eventForm.newEvent?.itemId === undefined) {
          message.warn('Пожалуйста выберите объект, которое хотите забронировать!');
      } else next();
    }

    const onEventFormFinish = (values) => {
        setEventForm(prevState => ({
            newEvent: {
                ...prevState.newEvent,
                title: values.title,
                startDateTime: values.startDateTime.format('YYYY-MM-DD HH:mm').toString(),
                endDateTime: values.endDateTime.format('YYYY-MM-DD HH:mm').toString(),
                description: values.description
            }
        }));
        next();
    }

    const onSelectMapItem = (item) => {
        setEventForm(prevState => ({
            newEvent: {
                ...prevState.newEvent,
                itemId: item.id
            }
        }));
    }

    const steps = [
        {
            title: 'Выберите объект для бронирования',
        },
        {
            title: 'Выберите название, дату и время',
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
                    (<MapYandex setSelectedItem={onSelectMapItem}/>)
                    : (<></>)}
                {current === 1 ?
                    (<ChooseEventData onFormFinish={onEventFormFinish}/>)
                    : (<></>)}
            </div>
            <div className="steps-action">
                {current > 0 && (
                    <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                        Назад
                    </Button>
                )}
                {current < steps.length - 1 && current !== 1 && (
                    <Button type="primary" onClick={nextButtonClick}>
                        Далее
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Успешно создано!')}>
                        Готово
                    </Button>
                )}
            </div>
        </>
    );
};

export default CreateEvent;
