import '../styles/navbar.css';
import React, { useState } from 'react';
import {Row, Col, Button, Layout, Menu, Switch} from 'antd';
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';

const Navbar = () => {
    const { Header } = Layout;
    const navigate = useNavigate();
    const [isDarkMode, setDarkMode] = useState(false);
    const toggleDarkMode = (checked) => {
        setDarkMode(checked);
    };
    return (
        <>
        <Layout>
            <div className="navbar-container">
                <div className="logo-section">
                    <img onClick={() => navigate('/')} src="/ChineseQuest2.png" alt="Logo" className="navbar-logo"/>
                </div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} className="nav-menu"> 
                    <Menu.Item key="2" onClick={() => navigate('/lessons')}>Lessons</Menu.Item>
                    <Menu.Item key="3" onClick={() => navigate('/')}>Resources</Menu.Item>
                    <Menu.Item key="4" onClick={() => navigate('/')}>Get In Touch</Menu.Item>
                </Menu>
            </div>
        </Layout>
        </>
   );
}

export default Navbar;
