import React from 'react'
import {Layout} from 'antd'
import './profile-page.css'
import Sider from '../../sider/sider'
import {Route, Switch} from 'react-router-dom'
import Settings from './profile-contents/settings'

const ProfilePage = () => {
    return (
        <Layout style={{minHeight: '100vh'}} className='profile'>
            <Sider/>
            <Layout className="site-layout">
                <Layout.Header className="site-layout-background" style={{padding: 0}}/>
                <Layout.Content style={{padding: '10px'}}>
                    <Switch>
                        <Route path='/profile/settings' component={Settings}/>
                        <Route path='/profile'>Default content</Route>
                    </Switch>
                </Layout.Content>
                <Layout.Footer style={{textAlign: 'center'}}>
                    © FrontieBontie
                </Layout.Footer>
            </Layout>
        </Layout>
    )
}


export default ProfilePage
