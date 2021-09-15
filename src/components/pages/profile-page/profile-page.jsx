import {Layout} from 'antd'
import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Sider from '../../sider/sider'
import AddProduct from './profile-contents/add-product'
import Settings from './profile-contents/settings'
import './profile-page.css'

const ProfilePage = () => {
    return (
        <Layout style={{minHeight: '100vh'}} className='profile'>
            <Sider/>
            <Layout className="site-layout">
                <Layout.Header className="site-layout-background" style={{padding: 0}}/>
                <Layout.Content style={{padding: '10px'}}>
                    <Switch>
                        <Route path='/profile/settings' component={Settings}/>
                        <Route path='/profile/add-product' component={AddProduct}/>
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
