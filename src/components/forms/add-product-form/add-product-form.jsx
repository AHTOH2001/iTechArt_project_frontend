import React from 'react'
import {Form, Input, Button, message, Select, InputNumber, Row, Col} from 'antd'
import 'antd/dist/antd.css'
import {useState} from 'react'
import {SmartRequest} from '../../../utils/utils'
import {useHistory} from 'react-router-dom'

const AddProductForm = () => {
    const [form] = Form.useForm()
    const {getFieldError, validateFields, resetFields} = form
    const [isButtonDisabled, setIsButtonDisabled] = useState(true)
    const [formError, setFormError] = useState('')
    const [fieldsErrors, setFieldsErrors] = useState({})

    const onFinish = (values) => {
        setFormError('')
        SmartRequest.post(
            'add-product/',
            values,
            {}
        )
            .then(() => {
                message.success('Successfully added product')
                resetFields()
                setIsButtonDisabled(true)
                // history.push('/log-in')
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
                    console.error('catch on adding product:', error)
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
                label="Product category"
                name="category"
                validateStatus={fieldsErrors['category'] && fieldsErrors['category'].length ? 'error' : ''}
                help={fieldsErrors['category'] && fieldsErrors['category'].length ? fieldsErrors['category'][0] : ''}
                rules={[
                    {
                        required: true,
                        message: 'Please select the product category you are selling!',
                    },
                ]}
            >
                <Select allowClear>
                    <Select.Option value="Hats">Hats</Select.Option>
                    <Select.Option value="Unisex T-Shirts">Unisex T-Shirts</Select.Option>
                    <Select.Option value="Women's T-Shirts">Womens T-Shirts</Select.Option>
                    <Select.Option value="Long Sleeve Tees">Long Sleeve Tees</Select.Option>
                    <Select.Option value="Hoodies">Hoodies</Select.Option>
                    <Select.Option value="Sweatshirts">Sweatshirts</Select.Option>
                    <Select.Option value="Tank Tops">Tank Tops</Select.Option>
                    <Select.Option value="Socks">Socks</Select.Option>
                    <Select.Option value="Face Masks">Face Masks</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label="Title"
                name="title"
                validateStatus={fieldsErrors['title'] && fieldsErrors['title'].length ? 'error' : ''}
                help={fieldsErrors['title'] && fieldsErrors['title'].length ? fieldsErrors['title'][0] : ''}
                rules={[
                    {
                        required: true,
                        message: 'Please input product title!',
                    },
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Product description"
                name="description"
                validateStatus={fieldsErrors['description'] && fieldsErrors['description'].length ? 'error' : ''}
                help={fieldsErrors['description'] && fieldsErrors['description'].length ? fieldsErrors['description'][0] : ''}
                rules={[
                    {
                        required: true,
                        message: 'Please input product description!',
                    },
                ]}
            >
                <Input.TextArea
                    placeholder="Be descriptive about the product you’re offering and include details of how it can be used"/>
            </Form.Item>
            <Form.Item
                label="Price"
                required
                validateStatus={fieldsErrors['price'] && fieldsErrors['price'].length ? 'error' : ''}
                help={fieldsErrors['price'] && fieldsErrors['price'].length ? fieldsErrors['price'][0] : ''}
            >
                <Form.Item
                    name="price"
                    noStyle
                    rules={[
                        {
                            required: true,
                            message: 'Please input product price!',
                        },
                    ]}
                >
                    <InputNumber style={{width: 130}} precision={2} max={99999} min={0.01} className="ant-input"/>
                </Form.Item>
                <span style={{display: 'inline', verticalAlign: 'baseline'}} className="ant-input-group-addon">$</span>
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button disabled={isButtonDisabled} type="primary" htmlType="submit">
                    Publish
                </Button>
            </Form.Item>
        </Form>
    )
}


export default AddProductForm
