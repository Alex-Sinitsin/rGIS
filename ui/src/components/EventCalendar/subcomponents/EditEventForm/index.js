import React from 'react';
import {MapYandex} from "../../../index";
import {Typography} from "antd";

import "./editEventForm.css";
import ChooseEventData from "../../../ChooseEventData";
import ChooseMembers from "../../../ChooseMembers";

const {Text} = Typography;

const EditEventForm = (props) => {

    const getMembersValues = () => {
        let valuesArray = [];

        props.eventData?.members?.map(member => {
            return valuesArray.push(member.name + " " + member.lastName)
        });

        return valuesArray;
    }

    const membersOptions = getMembersValues();

    return (
        <>
            <ChooseEventData onFormChange={props.onFormChange} data={props.eventData?.event}/>
            <div className="yandexMapInModal">
                <p><Text strong>Бронируемое помещение: </Text><Text>{props.eventData?.item?.name}</Text></p>
                <p><Text strong>Новое выбранное
                    помещение: </Text><Text>{props.selMapItem ? props.selMapItem.name : "Помещение не выбрано"}</Text>
                </p>
                <MapYandex setSelectedItem={props.setSelMapItem} user={props.user}/>
            </div>
            <ChooseMembers data={membersOptions} authUser={props.user} onChange={props.onChangeMembers} selectMode="multiple"/>
        </>
    );
};

export default EditEventForm;
