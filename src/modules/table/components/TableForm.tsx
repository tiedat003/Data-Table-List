import React from 'react';
import './TableCss.css'
import { SetStateAction, useEffect, useState } from 'react';
import { Button, Input, Pagination, Modal, DatePicker, Form, Select } from 'antd';
import type { FormProps } from 'antd';
import axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { dataSource } from './data';
import { capitalize } from '../utils';
import { v4 as uuidv4 } from 'uuid';

interface Data {
    id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    date?: any;
    userType?: string,
    status?: string,
}

type Row = {
    id: string;
    first_name: string;
    last_name: string;
    email: string
};

type Inputs = {
    id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    date?: any;
    userType?: string,
    status?: string,
};

const TableForm = ({ rows }: { rows: Row[] }) => {

    const [data, setData] = useState<Data[]>([])
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm()
    const [sortRows, setSortRows] = useState(rows)
    const [editRowId, setEditRowId] = useState<string | null>(null)
    const [isNew, setIsNew] = useState(false)

    const filter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (value) {
            setSortRows([...rows.filter(row => {
                return Object.values(row)
                    .join('')
                    // .toLowerCase()
                    .includes(value)
            })])
        } else {
            setSortRows(rows)
        }
    }

    const onFinish: FormProps<Inputs>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<Inputs>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleOpenModal = (id?: string) => {
        if (id) {
            const rowToEdit = data.find(row => row.id === id)
            if (rowToEdit) {
                setEditRowId(id)
                form.setFieldsValue(rowToEdit)
                setIsNew(false)
            }
        } else {
            form.resetFields()
            setEditRowId(null)
            setIsNew(true)
        }
        setOpen(true)
    }

    const handleSave = () => {
        form.validateFields().then(values => {
            if (isNew) {
                const newRow = { id: uuidv4(), ...values }
                setData(prevData => {
                    const updatedData = [...prevData, newRow]
                    console.log("Updated data:", updatedData);
                    return updatedData;
                })
            } else {
                setData(prevData =>
                    prevData.map(row =>
                        row.id === editRowId ? { ...row, ...values } : row
                    )
                )
            }
            setOpen(false)
            setEditRowId(null)
        })
    }

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure want to delete?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                const deletedData = data.filter(row => row.id !== id)
                setData(deletedData)
            }
        });
    }

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('https://rapidapi.com/learn/api/rest')
    //             getData(response.data);
    //             console.log(response);

    //         } catch (error) {
    //             console.error('Error fetching data:', error)
    //         }
    //     };
    //     fetchData();
    // }, []);

    const { Search } = Input;

    const { RangePicker } = DatePicker

    return (
        <>
            <Search
                placeholder="Search..."
                onChange={filter}
                style={{ width: 200, margin: '10px' }}
            />
            <Button
                color="primary"
                variant="outlined"
                onClick={() => handleOpenModal()}
                style={{ margin: '10px' }}
            > New </Button>

            <table>
                <thead>
                    <tr>
                        {['Id', 'First Name', 'Last Name', 'Email', 'Date', 'User Type', 'Status', 'Action'].map((entry, index) => (
                            <th key={index}>{capitalize(entry)}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortRows.map((row) => (
                        <tr key={row.id}>
                            {Object.values(row).map((entry, columnIndex) => (
                                <td key={columnIndex}>{entry}</td>
                            ))}
                            <td>
                                <Button
                                    className='button'
                                    type="primary"
                                    onClick={() => handleOpenModal(row.id)}
                                    style={{ margin: '5px' }}>
                                    Edit
                                </Button>

                                <Button
                                    className='button'
                                    color="danger"
                                    variant="solid"
                                    onClick={() => handleDelete(row.id)}
                                >
                                    Delete
                                </Button>

                                <Modal
                                    title={isNew ? "Add New Row" : "Edit Row"}
                                    centered
                                    open={open}
                                    onOk={handleSave}
                                    onCancel={() => setOpen(false)}
                                    okText="Save"
                                    cancelText="Cancel"
                                >
                                    <Form
                                        name="basic"
                                        form={form}
                                        labelCol={{ span: 8 }}
                                        wrapperCol={{ span: 16 }}
                                        style={{ maxWidth: 800 }}
                                        initialValues={{ remember: true }}
                                        onFinish={onFinish}
                                        onFinishFailed={onFinishFailed}
                                        autoComplete="off"
                                    >
                                        <Form.Item<Inputs>
                                            label="First Name"
                                            name="firstName"
                                            rules={[{ required: true, message: 'Please input your first name!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item<Inputs>
                                            label="Last Name"
                                            name="lastName"
                                            rules={[{ required: true, message: 'Please input your last name!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item<Inputs>
                                            label="Email"
                                            name="email"
                                            rules={[{ required: true, type: 'email', message: 'Please input your email!' }]}
                                        >
                                            <Input />
                                        </Form.Item>

                                        <Form.Item
                                            label="Date"
                                            name="date"
                                            rules={[{ required: true, message: 'Please select date from to!' }]}
                                        >
                                            <RangePicker />
                                        </Form.Item>

                                        <Form.Item
                                            label="User Type"
                                            name="userType"
                                            rules={[{ required: true, message: 'Please select a user type!' }]}
                                        >
                                            <Select>
                                                <Select.Option value="admin">Admin</Select.Option>
                                                <Select.Option value="user">User</Select.Option>
                                            </Select>
                                        </Form.Item>

                                        <Form.Item
                                            label="Status"
                                            name="status"
                                            rules={[{ required: true, message: 'Please select status!' }]}>
                                            <Select>
                                                <Select.Option value="active">Active</Select.Option>
                                                <Select.Option value="awaiting">Awaiting</Select.Option>
                                                <Select.Option value="error">Error</Select.Option>
                                            </Select>
                                        </Form.Item>

                                        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                            <Button
                                                type="primary"
                                                htmlType="submit">
                                                Submit
                                            </Button>
                                        </Form.Item> */}
                                    </Form>

                                </Modal>
                            </td>
                        </tr>
                    ))}
                </tbody>

                <Pagination align="end" defaultCurrent={1} total={50} style={{ margin: '5px' }} />
            </table>
        </>
    )
}
export default TableForm
