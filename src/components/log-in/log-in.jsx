import React, {useEffect} from 'react'
import {Form, Input, Button} from 'antd'
import 'antd/dist/antd.css'
import {useState} from 'react'
import {connect} from 'react-redux'
import {log_in_user} from '../../redux/user/user.actions'
import {SmartRequest} from '../../utils/utils'


const LogIn = ({log_in_user}) => {

    const [form] = Form.useForm()
    const {getFieldError, isFieldTouched, validateFields} = form

    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isFormErrorHidden, setIsFormErrorHidden] = useState(true)
    const [formError, setFormError] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)


    useEffect(() => {
        console.log('effect in log in.')
    })

    const onFinish = (values) => {
        SmartRequest.post(
            //todo find out what to do with hard coded url
            'http://localhost:8000/login/',
            values
        )
            .then(resp => {
                // to uncomment resolve todo in utils.js
                // access_token = resp.data['access']
                log_in_user()
                console.log('success on sign in: ', resp)
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setFormError(error.response.data['detail'])
                    setIsFormErrorHidden(false)
                } else {
                    console.error('catch on sign in: ', error)
                }
            })
    }


    const onValuesChange = () => {
        setTimeout(() => {
            setIsFormErrorHidden(true)
            // https://stackoverflow.com/questions/56278830/how-to-know-when-all-fields-are-validated-values-added-in-ant-design-form
            setUsernameError(isFieldTouched('username') && Boolean(getFieldError('username').length))
            setPasswordError(isFieldTouched('password') && Boolean(getFieldError('password').length))
            validateFields()
                .then(() => {
                    setIsButtonDisabled(false)
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
            <span>is auth in log in: {localStorage.getItem('isAuthorized')}</span>
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

const mapDispatchToProps = {log_in_user}


export default connect(null, mapDispatchToProps)(LogIn)
