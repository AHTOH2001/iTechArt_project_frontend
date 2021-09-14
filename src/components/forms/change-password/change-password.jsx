import {Button, Form, Input, message} from 'antd'
import React, {useState} from 'react'
import {SmartRequest} from '../../../utils/utils'


const ChangePassword = () => {
    const [form] = Form.useForm()
    const {getFieldError, validateFields, resetFields} = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})


    const onFinish = (values) => {
        setFormError('')
        SmartRequest.patch(
            'change-password/',
            values,
            {}
        )
            .then(resp => {
                console.log('success in change password:', resp)
                message.success('Successfully changed password')
                resetFields()
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setIsButtonDisabled(true)
                    if (typeof error.response.data['detail'] !== 'object') {
                        setFormError(error.response.data['detail'])
                    } else {
                        setFieldsErrors(error.response.data['detail'])
                    }
                } else {
                    console.error('catch on password change: ', error)
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
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
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
                label="Old password"
                name="password_old"
                validateStatus={fieldsErrors['password_old'] && fieldsErrors['password_old'].length ? 'error' : ''}
                help={fieldsErrors['password_old'] && fieldsErrors['password_old'].length ? fieldsErrors['password_old'][0] : ''}
                rules={[
                    {
                        required: true,
                        message: 'Please input your old password!',
                    },
                ]}
            >
                <Input.Password autoComplete="off"/>
            </Form.Item>
            <Form.Item
                label="New password"
                name="password_new"
                validateStatus={fieldsErrors['password_new'] && fieldsErrors['password_new'].length ? 'error' : ''}
                help={fieldsErrors['password_new'] && fieldsErrors['password_new'].length ? fieldsErrors['password_new'][0] : ''}
                rules={[
                    {
                        required: true,
                        message: 'Please input your new password!',
                    },
                ]}
            >
                <Input.Password autoComplete="off"/>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button disabled={isButtonDisabled} type="primary" htmlType="submit">
                    Change password
                </Button>
            </Form.Item>

        </Form>
    )
}

export default ChangePassword
