import React from 'react';
import {Col, DatePicker, Form, Input, Row} from "antd";
import "./chooseEventData.css";
import TextArea from "antd/es/input/TextArea";
import 'moment/locale/ru'
import moment from "moment";

const ChooseEventData = ({onFormChange, data, form}) => {
    return (
        <Form form={form && form}
              layout={"vertical"}
              className="eventForm"
              onFieldsChange={(_, allFields) => {
                  !form && onFormChange(allFields);
              }}
        >
            <Form.Item
                name="id"
                label="Идентификатор"
                initialValue={data && data?.id}
                hidden={true}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="title"
                label="Название события"
                initialValue={data && data.title}
                rules={[
                    {
                        required: true,
                        message: 'Введите название события пожалуйста!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Row gutter={20}>
                <Col span={12}>
                    <Form.Item
                        name="startDateTime"
                        label="Дата и время начала события"
                        initialValue={data && moment(data?.startDateTime)}
                        rules={[
                            {
                                required: true,
                                message: 'Заполните поле пожалуйста!',
                            },
                        ]}
                    >
                        <DatePicker format={'DD.MM.YYYY HH:mm'} showTime style={{width: '100%'}}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="endDateTime"
                        label="Дата и время конца события"
                        initialValue={data && moment(data.endDateTime).minutes().toString() === "59" ?
                            moment(data.endDateTime).add(1, 'minutes') : moment(data.endDateTime)
                        }
                        rules={[
                            {
                                required: true,
                                message: 'Заполните поле пожалуйста!',
                            },
                        ]}
                    >
                        <DatePicker format={'DD.MM.YYYY HH:mm'} showTime style={{width: '100%'}}/>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="description" label="Примечание" initialValue={data && data.description}>
                <TextArea autoSize={{minRows: 4}}/>
            </Form.Item>
        </Form>
    );
};

export default ChooseEventData;
