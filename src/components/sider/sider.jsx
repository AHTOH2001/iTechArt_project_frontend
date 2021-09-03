import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import {Layout, Menu} from 'antd'
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {setCurrentUser} from '../../redux/user/user.actions'
import './sider.css'


const Sider = ({currentUser, setCurrentUser}) => {
    const [collapsed, setCollapsed] = useState(true)

    const {SubMenu} = Menu

    const onCollapse = () => {
        setCollapsed(!collapsed)
    }

    const onLogOut = () => {
        setCurrentUser(null)
    }

    return (
        <Layout.Sider collapsible collapsed={collapsed} onCollapse={onCollapse} className='sider'>
            <Link to='/' className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <SubMenu icon={<UserOutlined/>} title={currentUser.username}>
                    <Menu.Item key="2" icon={<LogoutOutlined/>} onClick={onLogOut}>
                        Log out
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Layout.Sider>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Sider)
