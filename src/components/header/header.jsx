import {Menu, Row} from 'antd'
import React from 'react'
import './header.css'
import {Layout} from 'antd'
import {Link} from 'react-router-dom'

const Header = ({content, justify}) => {
    return (
        <Layout.Header className="header">
            <Link to='/' className="logo"/>
            <Row justify={justify}>
                <Menu theme="dark" mode="horizontal">
                    {content.map(e => <Menu.Item key={e.key}>{e}</Menu.Item>)}
                </Menu>
            </Row>
        </Layout.Header>
    )
}

Header.defaultProps = {
    content: []
}


export default Header
