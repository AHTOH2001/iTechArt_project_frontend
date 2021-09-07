import {
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import {Layout, Menu} from 'antd'
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {setCurrentUserAsync} from '../../redux/user/user.actions'
import './sider.css'


const selectCurrentUser = state => state.user.currentUser

const Sider = () => {
    const [collapsed, setCollapsed] = useState(true)
    const currentUser = useSelector(selectCurrentUser)
    const dispatch = useDispatch()

    const {SubMenu} = Menu

    const onCollapse = () => {
        setCollapsed(!collapsed)
    }

    const onLogOut = () => {
        dispatch(setCurrentUserAsync(null))
    }

    return (
        <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className='sider'>
            <Link to='/' className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <SubMenu key="sub1" icon={<UserOutlined/>} title={currentUser.username}>
                    <Menu.Item key="1" icon={<LogoutOutlined/>} onClick={onLogOut}>
                        Log out
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Layout.Sider>
    )
}


export default Sider