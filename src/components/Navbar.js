import '../styles/navbar.css';
import React, { useEffect } from 'react';
import {Row, Col, Button, Layout, Menu, Switch, Tooltip} from 'antd';
import { useNavigate} from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn, username }) => {
    const { Header } = Layout;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('joinDate');
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
        navigate('/login');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <>
        <Layout>
            <div className="navbar-container">
                <div className="logo-section">
                    <img onClick={() => navigate('/landing')} src="https://chinesepdf.blob.core.windows.net/images/ChineseQuest2.png" alt="Logo" className="navbar-logo"/>
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="nav-menu"> 
                    <Menu.Item key="2" onClick={() => navigate('/lessons')}>Lessons</Menu.Item>
                    <Tooltip
                        title={!isLoggedIn ? "Login to access Resources" : ""}
                        placement="bottom"
                        open={!isLoggedIn ? undefined : false}
                    >
                        <Menu.Item key="3" onClick={() => navigate('/resources')} disabled={!isLoggedIn}>
                            Resources
                        </Menu.Item>
                    </Tooltip>
                    <Menu.Item key="4" onClick={() => navigate('/games')}>Exercises</Menu.Item>
                    {isLoggedIn && (
                        <Menu.Item key="5" onClick={() => navigate('/profile')}>Profile</Menu.Item>
                    )}
                    <Menu.Item key="6" onClick={isLoggedIn ? handleLogout : handleLogin}>
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </Menu.Item>
                </Menu>
            </div>
        </Layout>
        </>
   );
}

export default Navbar;
