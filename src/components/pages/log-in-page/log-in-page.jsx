import {Row, Col, Layout} from 'antd'
import React from 'react'
import {Link} from 'react-router-dom'
import LogIn from '../../forms/log-in/log-in'
import 'antd/dist/antd.css'
import Header from '../../header/header'
import ResetPasswordModal from '../../modals/reset-password-modal/reset-password-modal'

const LogInPage = () => {
    return (
        <Layout className='log-in'>
            <Header justify='end' content={[
                <Link to='/sign-up' key={1}>
                    Create an account
                </Link>
            ]}
            />
            <Layout.Content style={{padding: '10px'}}>
                <Row>
                    <Col span={8}>
                        <LogIn/>
                        <Col offset={8}>
                            <ResetPasswordModal/>
                        </Col>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    )
}


export default LogInPage
