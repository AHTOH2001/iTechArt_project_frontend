import {Layout, Menu, Row} from 'antd'
import React from 'react'
import {Link} from 'react-router-dom'
import './header.css'

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
