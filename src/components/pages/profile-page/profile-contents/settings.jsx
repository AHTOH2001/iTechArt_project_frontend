import {Col, Row} from 'antd'
import React from 'react'
import ChangePassword from '../../../forms/change-password/change-password'
import PatchProfile from '../../../forms/patch-profile/patch-profile'


const Settings = () => {
    return (
        <Row>
            <Col span={8}>
                <PatchProfile/>
            </Col>
            <Col span={8} offset={4}>
                <ChangePassword/>
            </Col>
        </Row>
    )
}


export default Settings
