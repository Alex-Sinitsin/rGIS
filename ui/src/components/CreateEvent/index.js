import React from 'react';
import { Steps, Button, message } from 'antd';

import { MapYandex } from "../index";
import "./createEvent.css";

const { Step } = Steps;

const CreateEvent = () => {
    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: 'Выберите объект для бронирования',
        },
        {
            title: 'Выберите дату и время',
        },
        {
            title: 'Что-то другое',
        },
    ];
    return (
        <>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">
                {current === 0 ?
                    (<MapYandex />)
                : (<></>)}
            </div>
            <div className="steps-action">
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Назад
                    </Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
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
