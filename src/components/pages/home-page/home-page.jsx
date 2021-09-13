import {Layout} from 'antd'
import React from 'react'
import {Link} from 'react-router-dom'
import Header from '../../header/header'
import './home-page.css'

const HomePage = () => (
    <Layout className="home">
        <Header content={[
            <Link to='/log-in' key={1}>
                Log in
            </Link>
        ]}
        />
        <Layout.Content style={{padding: '0 50px'}}>
            <div className="site-layout-content">Content</div>
        </Layout.Content>
        <Layout.Footer style={{textAlign: 'center'}}>
            © FrontieBontie
        </Layout.Footer>
    </Layout>
)

export default HomePage

