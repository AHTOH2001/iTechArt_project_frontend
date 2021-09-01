import {Row, Col} from 'antd'
import React from 'react'
import LogIn from '../../log-in/log-in.component'
import 'antd/dist/antd.css'

class LogInPage extends React.Component {


    render() {
        return (
            <Row>
                <Col span={8}>
                    <LogIn/>
                </Col>
            </Row>
        )
    }
}


export default LogInPage
