import '../styles/navbar.css';
import React, { useState } from 'react';
import {Row, Col, Button, Layout, Menu, Switch, Tooltip} from 'antd';
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';

const Navbar = () => {
    const { Header } = Layout;
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    const handleAuthToggle = () => {
        const newStatus = !isLoggedIn;
        setIsLoggedIn(newStatus);
        localStorage.setItem('isLoggedIn', newStatus);
        if (newStatus) {
            navigate('/login');
        } else {
            navigate('/login');
        }
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
                    <Menu.Item key="4" onClick={() => navigate('/tonegame')}>Game</Menu.Item>
                    <Menu.Item key="5" onClick={handleAuthToggle}>
                        {isLoggedIn ? 'Logout' : 'Login'}
                    </Menu.Item>
                </Menu>
            </div>
        </Layout>
        </>
   );
}

export default Navbar;
