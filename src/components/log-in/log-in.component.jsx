import React from 'react'
import {Form, Input, Button} from 'antd'
import 'antd/dist/antd.css'
import {useState} from 'react'

const LogIn = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [form] = Form.useForm()

    const onFinish = (values) => {
        fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => {
                console.log(res)
                if (res.status === 401) {
                    console.log(401)
                } else {
                    return res.json()
                }
            })
            .then(jsonRes => console.log('success: ', jsonRes))
            .catch(error => console.error('catch: ', error))
    }


    const onValuesChange = (changedValues, allValues) => {

        for (let valueName in allValues) {
            if (!allValues[valueName]) {
                setIsButtonDisabled(true)
                return
            }
        }
        setIsButtonDisabled(false)
    }


    return (
        <Form
            form={form}
            name="log in"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button disabled={isButtonDisabled} type="primary" htmlType="submit">
                    Log in
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LogIn
