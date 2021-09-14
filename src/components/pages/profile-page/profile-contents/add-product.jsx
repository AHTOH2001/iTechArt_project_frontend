import {Col, Row} from 'antd'
import React from 'react'
import AddProductForm from '../../../forms/add-product-form/add-product-form'

const AddProduct = () => {
    return (
        <Row>
            <Col span={10}>
                <AddProductForm/>
            </Col>
        </Row>
    )
}

export default AddProduct
