import React, {useEffect} from 'react';
import {Select} from "antd";
import {connect} from "react-redux";
import {getUsers as getUsersAction} from "../../redux/modules/users";

const {Option} = Select;

const ChooseMembers = ({authUser, users, getUsers, onChange}) => {

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleChange = selectedItems => {
        const selUsers = selectedItems.map(o => {
            return users.filter(e => e.name + " " + e.lastName === o);
        });
        onChange(selUsers);
        console.log(selectedItems);
    };

    const usersWithOutAuthUser = users.filter(el => el.id !== authUser.id)

    return (
        <div>
            <Select
                mode="multiple"
                allowClear
                style={{width: '100%'}}
                placeholder="Выберите участника"
                onChange={handleChange}
            >
                {usersWithOutAuthUser.map(usr => <Option key={usr.id} value={usr.name + " " + usr.lastName}>{usr.name + " " + usr.lastName + " - " + usr.position}</Option>)}
            </Select>
        </div>
    );
};

export default connect(
    ({users}) => ({users: users.users}),
    ({getUsers: getUsersAction})
)(ChooseMembers)
