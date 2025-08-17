import '../styles/landing.css';
import Spline from '@splinetool/react-spline';
import {Row, Col, Button, Layout, Menu} from 'antd';
import React, { useState } from 'react';
import Typewriter from "typewriter-effect"
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';

const Landing = () => {
  const [size, setSize] = useState('large');
  const navigate = useNavigate();
  return (
    <>
    <div className="landing">
        <Row>
            <Col span={12} className="left-column">
                <h1>Welcome to ChineseQuest</h1>
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
