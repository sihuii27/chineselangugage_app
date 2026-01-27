import '../styles/landing.css';
import Spline from '@splinetool/react-spline';
import {Row, Col, Button, Layout, Menu, Switch} from 'antd';
import React, { useState, useEffect } from 'react';
import Typewriter from "typewriter-effect"
import { useNavigate, useLocation} from 'react-router-dom';

const Landing = ({ setIsLoggedIn }) => {
  const [size, setSize] = useState('large');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Fetch username from API using token
      fetch(`${process.env.REACT_APP_API_URL}/auth/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (!response.ok) {
          console.error('Profile fetch failed:', response.status);
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Username from API:', data.username);
        setUsername(data.username);
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.error('Auth error:', error);
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
      });
    } else {
      // No token = guest user
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);

  return (
    <>
    <div className="landing">
        <Row>
            <Col span={12} className="left-column">
                <h1>Welcome {username} to ChineseQuest</h1>
                <p className='typewriter'>
                <Typewriter
                    options={{
                        strings: ['Your Chinese Adventure starts here!', 'Explore the resources and materials offered.', 'Practice Speaking Today!'],
                        autoStart: true,
                        loop: true,
                        delay: 75,
                }}
                />
                </p>
                <br/>
                <Button type="default" className="start-button" size={size} onClick={() => navigate('/lessons')}>
                    <p className='startxt'>Start Learning</p>
                </Button>
            </Col>
            <Col span={12} className="main">
                <Spline
                scene="https://prod.spline.design/LemeMbVPOnIiuSyJ/scene.splinecode"
                />
            </Col>
        </Row>

    </div>
    </>
  );
}

export default Landing;
