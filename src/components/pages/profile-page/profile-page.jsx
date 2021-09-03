import React from 'react'
import {Layout} from 'antd'
import './profile-page.css'
import Sider from '../../sider/sider'


const ProfilePage = () => {
    return (
        <Layout style={{minHeight: '100vh'}} className='profile'>
            <Sider/>
            <Layout className="site-layout">
                <Layout.Header className="site-layout-background" style={{padding: 0}}/>
                <Layout.Content style={{margin: '0 16px'}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        Content
                    </div>
                </Layout.Content>
                <Layout.Footer style={{textAlign: 'center'}}>
                    © FrontieBontie
                </Layout.Footer>
            </Layout>
        </Layout>
    )
}


export default ProfilePage
