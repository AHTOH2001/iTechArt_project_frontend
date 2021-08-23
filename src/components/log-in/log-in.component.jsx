import React from 'react'
import {Form, Input, Button} from 'antd'
import 'antd/dist/antd.css'
import {useState} from 'react'
import {connect} from 'react-redux'
import {setCurrentTokens} from '../../redux/JWT/jwt.actions'


const LogIn = (props) => {
    const {setCurrentTokens} = props

    const [form] = Form.useForm()
    const {getFieldError, isFieldTouched, validateFields} = form

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
            .then(resp => {
                if (resp.status === 401) {
                    resp.json().then(jsonRes => {
                        setFormError(jsonRes['detail'])
                        setIsFormErrorHidden(false)
                    })
                    throw new Error(`HTTP error! status: ${resp.status}`)
                } else {
                    return resp.json()
                }
            })
            .then(jsonRes => {
                setCurrentTokens(jsonRes)
                console.log('success: ', jsonRes)
            })
            .catch(error => console.error('catch: ', error))
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

const mapDispatchToProps = dispatch => ({
    setCurrentTokens: tokens => dispatch(setCurrentTokens(tokens))
})

export default connect(null, mapDispatchToProps)(LogIn)
