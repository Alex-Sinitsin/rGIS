import React, {useContext, useEffect, useRef, useState} from 'react';
import {Form, Select} from "antd";

const EditableContext = React.createContext(null);

const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const selectRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing) {
            selectRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
            [dataIndex]: record[dataIndex],
        });
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            handleSave({ ...record, ...values });
        } catch (error) {}
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{
                    margin: 0,
                }}
                name={dataIndex}
                initialValue={record.role ? record.role : "Пользователь"}
                rules={[{required: true}]}
            >
                <Select
                    ref={selectRef}
                    onSelect={save}
                    onBlur={save}
                >
                    <Select.Option key="admin" value="Admin">Администратор</Select.Option>
                    <Select.Option key="user" value="User">Пользователь</Select.Option>
                </Select>
            </Form.Item>
        ) : (
            <div
                className="editable-cell-value-wrap"
                style={{
                    paddingRight: 24,
                }}
                onClick={toggleEdit}
            >
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};

export {
    EditableRow,
    EditableCell
}
