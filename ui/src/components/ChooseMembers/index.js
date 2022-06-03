import React, {useEffect} from 'react';
import {Select, Typography} from "antd";
import {connect} from "react-redux";
import {getUsers as getUsersAction} from "../../redux/modules/users";
import "./chooseMembers.css";

const {Option, OptGroup} = Select;
const {Text} = Typography;

const ChooseMembers = ({authUser, users, getUsers, onChange}) => {
    let groups = [];
    const usersWithOutAuthUser = users.filter(el => el.id !== authUser?.id)

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleChange = selectedItems => {
        const selUsers = selectedItems.flatMap(o => {
            return users.filter(e => e.name + " " + e.lastName === o);
        });
        onChange(selUsers);
    };

    for (let element of usersWithOutAuthUser) {
        let existingGroups = groups && groups.filter(group => group.position === element.position);
        if (existingGroups.length > 0) {
            existingGroups[0].users.push(element);
        } else {
            let newGroup = {
                position: element.position,
                users: [element]
            };
            groups.push(newGroup);
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <Text style={{display: 'block', width: '80%', margin: '10px auto 0'}}>Участники события:</Text>
            <Select
                mode="multiple"
                allowClear={true}
                style={{display: 'block', width: '80%', margin: '10px auto 0'}}
                defaultValue={[]}
                placeholder="Выберите участника"
                onChange={handleChange}
            >
                {groups && groups.map(group => {
                    return <OptGroup key={group.position} value="" label={group.position}>
                        {group.users.map(user => {
                            return (
                                <Option key={user.id} title="" value={user.name + " " + user.lastName}>{user.name + " " + user.lastName}</Option>
                            )
                        })}
                    </OptGroup>
                })}
            </Select>
        </div>
    );
};

export default connect(
    ({users}) => ({users: users.users}),
    ({getUsers: getUsersAction})
)(ChooseMembers)
