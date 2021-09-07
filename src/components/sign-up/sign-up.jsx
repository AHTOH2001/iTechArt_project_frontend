import React from 'react'
import {Form, Input, Button} from 'antd'
import 'antd/dist/antd.css'
import {useState} from 'react'
import {SmartRequest} from '../../utils/utils'


const SignUp = () => {
    const [form] = Form.useForm()
    const {getFieldError, validateFields, fields} = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})

    const onFinish = (values) => {
        console.log('fields:', fields)
        setFormError('')
        SmartRequest.post(
            'signup/',
            {user: values},
            {},
            false,
            false
        )
            .then(resp => {
                alert('success')
                console.log('success on sign up: ', resp, values)
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    if (typeof error.response.data['detail'] !== 'object') {
                        setFormError(error.response.data['detail'])
                    } else {
                        setFieldsErrors(error.response.data['detail']['user'])
                    }
                } else {
                    console.error('catch on sign up: ', error)
                }
            })
    }


    const onValuesChange = (changedValues) => {
        setTimeout(() => {
            setFormError('')
            // https://stackoverflow.com/questions/56278830/how-to-know-when-all-fields-are-validated-values-added-in-ant-design-form
            let resFieldsErrors = {...fieldsErrors}
            for (let val in changedValues) {
                resFieldsErrors[val] = getFieldError(val)
            }
            setFieldsErrors(resFieldsErrors)
            console.log('resFieldsErrors', resFieldsErrors)
            validateFields()
                .then(() => {
                    if (Object.values(resFieldsErrors).filter(e => e.length).length === 0)
                        setIsButtonDisabled(false)
                    else
                        setIsButtonDisabled(true)
                })
                .catch(() => {
                    setIsButtonDisabled(true)
                })
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
                hidden={!formError}
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
                validateStatus={fieldsErrors['username'] && fieldsErrors['username'].length ? 'error' : ''}
                help={fieldsErrors['username'] && fieldsErrors['username'].length ? fieldsErrors['username'][0] : ''}
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
                label="Email"
                name="email"
                validateStatus={fieldsErrors['email'] && fieldsErrors['email'].length ? 'error' : ''}
                help={fieldsErrors['email'] && fieldsErrors['email'].length ? fieldsErrors['email'][0] : ''}
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                validateStatus={fieldsErrors['password'] && fieldsErrors['password'].length ? 'error' : ''}
                help={fieldsErrors['password'] && fieldsErrors['password'].length ? fieldsErrors['password'][0] : ''}
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
                    Sign up
                </Button>
            </Form.Item>
        </Form>
    )
}


export default SignUp
