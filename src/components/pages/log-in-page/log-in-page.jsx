import {Row, Col, Layout} from 'antd'
import React from 'react'
import LogIn from '../../log-in/log-in'
import 'antd/dist/antd.css'
import Header from '../../header/header'

const LogInPage = () => {
    return (
        <Layout className='log-in'>
            <Header/>
            <Layout.Content style={{padding: '10px'}}>
                <Row>
                    <Col span={8}>
                        <LogIn/>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    )
}


export default LogInPage
