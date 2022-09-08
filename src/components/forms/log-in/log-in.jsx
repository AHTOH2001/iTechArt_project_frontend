import React from 'react'
import {Form, Input, Button, message} from 'antd'
import 'antd/dist/antd.css'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {setCurrentUserAsync} from '../../../redux/user/user.actions'
import {SmartRequest} from '../../../utils/utils'
import {useHistory} from 'react-router-dom'


const LogIn = () => {
    const [form] = Form.useForm()
    const {getFieldError, isFieldTouched, validateFields} = form
    const dispatch = useDispatch()

    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isFormErrorHidden, setIsFormErrorHidden] = useState(true)
    const [formError, setFormError] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const history = useHistory()

    const onFinish = (values) => {
        SmartRequest.post(
            'login/',
            values,
            {},
            false,
            false
        )
            .then(resp => {
                SmartRequest.setAccessToken(resp.data['access'])
                SmartRequest.get('profile/')
                    .then(resp => {
                        console.log('success in get profile:', resp)
                        const actualUser = resp.data
                        dispatch(setCurrentUserAsync(actualUser))
                        message.success('Successfully logged in')
                        history.push('/profile')
                    })
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
