import {Button, Form, Input, message} from 'antd'
import React, {useState} from 'react'
import {SmartRequest} from '../../../utils/utils'

const ResetPasswordForm = ({setVisible}) => {
    const [form] = Form.useForm()
    const {getFieldError, validateFields} = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})
    const [isValidating, setIsValidating] = useState(false)

    const onFinish = (values) => {
        setIsValidating(true)
        SmartRequest.post('reset-password/', values, {}, false, false)
            .then(() => {
                message.success('Mail for resetting password has been sent to your email', 5)
                setIsValidating(false)
                setTimeout(() => setVisible(false), 1000)
            })
            .catch(error => {
                setIsValidating(false)
                if (error.response && error.response.status === 400) {
                    setIsButtonDisabled(true)
                    if (typeof error.response.data['detail'] !== 'object') {
                        setFormError(error.response.data['detail'])
                    } else {
                        setFieldsErrors(error.response.data['detail'])
                    }
                } else {
                    console.error('Error in reset password:', error)
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
            onFinish={onFinish}
            style={{padding: '20px', alignContent: 'center'}}
            wrapperCol={{
                span: 16,
            }}
            onValuesChange={onValuesChange}
        >
            <p>Enter the email you used to register</p>
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
                name="email"
                validateStatus={isValidating ? 'validating' : fieldsErrors['email'] && fieldsErrors['email'].length ? 'error' : ''}
                help={fieldsErrors['email'] && fieldsErrors['email'].length ? fieldsErrors['email'][0] : ''}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input placeholder="Email" type="email" autoComplete="email"/>
            </Form.Item>
            <Form.Item>
                <Button disabled={isButtonDisabled} type="primary" htmlType="submit">
                    Request
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ResetPasswordForm
