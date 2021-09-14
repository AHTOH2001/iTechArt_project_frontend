import {Button, Form, Input, message} from 'antd'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {setCurrentUserAsync} from '../../../redux/user/user.actions'
import {SmartRequest} from '../../../utils/utils'

const selectCurrentUser = state => state.user.currentUser

const PatchProfile = () => {
    const [form] = Form.useForm()
    const {getFieldError, validateFields} = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()
    const history = useHistory()


    const onFinish = (values) => {
        setFormError('')
        SmartRequest.patch(
            'profile/',
            {user: values},
            {}
        )
            .then(resp => {
                const actualUser = resp.data
                dispatch(setCurrentUserAsync(actualUser))
                message.success('Successfully updated account info')
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setIsButtonDisabled(true)
                    if (typeof error.response.data['detail'] !== 'object') {
                        setFormError(error.response.data['detail'])
                    } else {
                        setFieldsErrors(error.response.data['detail']['user'])
                    }
                } else {
                    console.error('catch on profile patch: ', error)
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
                initialValue={currentUser.user.username}
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
                <Input autoComplete="username"/>
            </Form.Item>

            <Form.Item
                initialValue={currentUser.user.email}
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
                <Input type="email" autoComplete="email"/>
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button disabled={isButtonDisabled} type="primary" htmlType="submit">
                    Update info
                </Button>
            </Form.Item>
        </Form>
    )
}

export default PatchProfile
