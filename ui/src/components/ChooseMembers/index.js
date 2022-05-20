import React, {useEffect} from 'react';
import {Select} from "antd";
import {connect} from "react-redux";
import {getUsers as getUsersAction} from "../../redux/modules/users";

const {Option, OptGroup} = Select;

const ChooseMembers = ({users, getUsers, onChange, selItems, setSelItems}) => {

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters'];
    const filteredOptions = OPTIONS.filter(o => !selItems.includes(o));

    const handleChange = selectedItems => {
        setSelItems(selectedItems);
        console.log(selectedItems);
    };

    return (
        <div>
            <Select
                mode="multiple"
                allowClear
                style={{width: '100%'}}
                placeholder="Выберите участника"
                onChange={handleChange}
            >
                <OptGroup label="Engineer">
                    {filteredOptions.map(item => (
                        <Option key={item} value={item}>
                            {item}
                        </Option>
                    ))}
                </OptGroup>
            </Select>
        </div>
    );
};

export default connect(
    ({ users }) => ({ users }),
    ({getUsers: getUsersAction()})
)(ChooseMembers)
