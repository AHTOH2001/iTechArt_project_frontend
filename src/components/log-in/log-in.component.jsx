import React from 'react'
import {Form, Input, Button} from 'antd'
import 'antd/dist/antd.css'
import {useState} from 'react'

const LogIn = () => {
    const [form] = Form.useForm()
    const {getFieldsError, getFieldError, isFieldTouched, validateFields} = form

    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isFormErrorHidden, setIsFormErrorHidden] = useState(true)
    const [formError, setFormError] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)


    const onFinish = (values) => {
        fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => {
                if (res.status === 401) {
                    res.json().then(jsonRes => {
                        setFormError(jsonRes['detail'])
                        setIsFormErrorHidden(false)
                    })
                } else {
                    return res.json()
                }
            })
            .then(jsonRes => console.log('success: ', jsonRes))
            .catch(error => console.error('catch: ', error))
    }


    const onValuesChange = (changedValues, allValues) => {
        setTimeout(() => {
            setIsFormErrorHidden(true)
            // https://stackoverflow.com/questions/56278830/how-to-know-when-all-fields-are-validated-values-added-in-ant-design-form
            setUsernameError(isFieldTouched('username') && Boolean(getFieldError('username').length))
            setPasswordError(isFieldTouched('password') && Boolean(getFieldError('password').length))
            validateFields()
                .then(values => {
                    setIsButtonDisabled(false)
                })
                .catch(info => {
                    setIsButtonDisabled(true)
                })
            console.log('getFieldsError()', getFieldsError())
        }, 0)
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
                name='form error'
                hidden={isFormErrorHidden}
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <span className="ant-form-item-explain ant-form-item-explain-error">{formError}</span>
            </Form.Item>
            <Form.Item
                label="Username"
                name="username"
                validateStatus={usernameError ? 'error' : ''}
                help={usernameError ? null : ''}
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
                validateStatus={passwordError ? 'error' : ''}
                help={passwordError ? null : ''}
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
