import '../styles/landing.css';
import '../styles/resources.css'; 
import {Row, Col, Button, Layout, Menu, Table} from 'antd';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Worksheet from '../components/Worksheet';
import Slides from '../components/Slides';

const items = [
  {
    key: 'slides',
    label: 'Slides',
    children: [
      { key: '1', label: 'Download Slides' },
    ],
  },
  {
    key: 'worksheets',
    label: 'Worksheets',
    children: [
      { key: '2', label: 'Download Worksheet' },
    ],
  }
]

const getContent = {
  '1': <Slides />,
  '2': <Worksheet />,
}

const Resource = () => {
  const [size, setSize] = useState('large');
  const navigate = useNavigate();

  const [current, setCurrent] = useState('1');
    const onClick = e => {
      console.log('click ', e);
      setCurrent(e.key);
};

  return (
    <>
    <div className="resources">
        <Row>
            <Col span={4}>
                <div className="menu-sidebar">
                      
            </div>
            <Menu
                className="resources-menu"
                onClick={onClick}
                style={{ width: 300, height: '100%' }}
                mode="inline"
                selectedKeys={[current]}
                items={items}
                />
            </Col>
            <Col span={20} className="content-col">
                <div className="resources-content">
                {getContent[current] || <div>Select a topic to view content</div>}
                </div>
            </Col>
        </Row>

    </div>
    </>
  );
}

export default Resource;
