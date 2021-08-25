import axios from 'axios'
import React from 'react'
import {Form, Input, Button} from 'antd'
import 'antd/dist/antd.css'
import {useState} from 'react'
import {connect} from 'react-redux'
import {setCurrentToken} from '../../redux/JWT/jwt.actions'
import Cookies from 'universal-cookie'


const LogIn = (props) => {
    const {setCurrentToken} = props

    const [form] = Form.useForm()
    const {getFieldError, isFieldTouched, validateFields} = form

    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [isFormErrorHidden, setIsFormErrorHidden] = useState(true)
    const [formError, setFormError] = useState('')
    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)


    const onFinish = (values) => {
        const cookies = new Cookies()
        console.log('coockies all:', cookies.getAll())
        axios.post(
            'http://localhost:8000/login/',
            values,
            {
                withCredentials: true,
                headers: {'X-CSRFToken': cookies.get('csrftoken')}
            }
        )
            .then(resp => {
                setCurrentToken(resp.data['access'])
                console.log('success: ', resp)
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    setFormError(error.response.data['detail'])
                    setIsFormErrorHidden(false)
                }
                console.error('catch: ', error)
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

    // should be done automatically when access token is outdated
    const onClick = (e) => {
        e.preventDefault()
        const cookies = new Cookies()
        axios.post('http://localhost:8000/refresh_token/', {}, {
            withCredentials: true,
            headers: {'X-CSRFToken': cookies.get('csrftoken')}
        })
            .then(resp => {
                setCurrentToken(resp.data['access'])
                console.log('success refresh:', resp)
            })
            .catch(error => console.error('error refresh:', error))
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
            <button onClick={onClick}>refresh</button>
        </Form>
    )
}

const mapDispatchToProps = dispatch => ({
    setCurrentToken: tokens => dispatch(setCurrentToken(tokens))
})

export default connect(null, mapDispatchToProps)(LogIn)
