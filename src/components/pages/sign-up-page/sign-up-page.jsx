import {Row, Col, Layout} from 'antd'
import React from 'react'
import {Link} from 'react-router-dom'
import SignUp from '../../forms/sign-up/sign-up'
import 'antd/dist/antd.css'
import Header from '../../header/header'

const SignUpPage = () => {
    return (
        <Layout className='log-in'>
            <Header justify='end' content={[
                <Link to='/log-in' key={1}>
                    Log in
                </Link>
            ]}
            />
            <Layout.Content style={{padding: '10px'}}>
                <Row>
                    <Col span={8}>
                        <SignUp/>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    )
}


export default SignUpPage
