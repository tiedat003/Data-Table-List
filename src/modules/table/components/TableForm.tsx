import React from 'react';
import './TableCss.css'
import { SetStateAction, useEffect, useState } from 'react';
import { Button, Input, GetProps, Pagination, Modal, DatePicker, Form, Select, Table, Typography } from 'antd';
import type { FormProps } from 'antd';
import axios from 'axios';

interface Data {
    id: string,
    name: string,
    email: string,
}

type Inputs = {
    name?: string,
    email?: string,
    date: any;
    userType?: string,
    status?: string,
};

const TableForm = () => {

    const [data, getData] = useState<Data[]>([])
    const [open, setOpen] = useState(false)
    const [form] = Form.useForm<{ name: string }>();

    const onFinish: FormProps<Inputs>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<Inputs>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://rapidapi.com/learn/api/rest')
                getData(response.data);
                console.log(response);

            } catch (error) {
                console.error('Error fetching data:', error)
            }
        };
        fetchData();
    }, []);

    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    type SearchProps = GetProps<typeof Input.Search>;
    const { Search } = Input;

    const { RangePicker } = DatePicker

    const handleDelete = () => {
        alert('Are you sure you want to delete?')
    }

    return (
        <>
            <table >
                <thead>
                    <Search placeholder="Search..." onSearch={onSearch} style={{ width: 200, margin: '10px' }} />
                    <Button color="primary" variant="outlined" onClick={() => setOpen(true)} style={{ marginTop: '10px' }}> New </Button>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date</th>
                        <th scope="col">User Type</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>A</td>
                        <td>@gmail</td>
                        <td>28/10/2024 - 04/11/2024</td>
                        <td>Type</td>
                        <td>Active</td>
                        <td>

                            <Button className='button' type="primary" onClick={() => setOpen(true)}>
                                Edit
                            </Button>

                            <Modal
                                title="User Edit"
                                centered
                                open={open}
                                onOk={() => setOpen(false)}
                                onCancel={() => setOpen(false)}
                            >
                                <Form
                                    name="basic"
                                    labelCol={{ span: 8 }}
                                    wrapperCol={{ span: 16 }}
                                    style={{ maxWidth: 800 }}
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                >
                                    <Form.Item<Inputs>
                                        label="Name"
                                        name="name"
                                        rules={[{ required: true, message: 'Please input your name!' }]}
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

                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                        <Button
                                            type="primary"
                                            htmlType="submit">
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Modal>

                            <Button
                                className='button'
                                color="danger"
                                variant="solid"
                                onClick={handleDelete}
                                style={{ margin: '5px' }}>
                                Delete
                            </Button>
                        </td>
                    </tr>

                </tbody>

                <Pagination align="end" defaultCurrent={1} total={50} style={{ margin: '5px' }} />
            </table>
            {/* <Table dataSource={dataSource} columns={columns} /> */}
        </>
    )
}
export default TableForm
