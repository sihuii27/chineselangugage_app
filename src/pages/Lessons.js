import React, { useState } from 'react';
import { Menu, Row, Col } from 'antd';
import '../styles/resources.css'; 
import Pinyin from '../components/Pinyin';
import DailyGreeting from '../components/DailyGreeting';
import GettingStarted from '../components/GettingStarted';
import Introduce from '../components/Introduce';
import BasicCourtesy from '../components/BasicCourtesy';
import Numbers from '../components/Numbers';
import Time from '../components/Time';
import Date from '../components/Date';
import Who from '../components/Who';
import What from '../components/What';
import Where from '../components/Where';
import Why from '../components/Why';
import When from '../components/When';
import How from '../components/How';
import Direction from '../components/Direction';
import Chatbot from '../components/Chatbot';

const items = [
  {
    key: 'sub1',
    label: 'Getting Started',
    children: [
      { key: '1', label: 'Introduction to Chinese' },
      {key: '2', label: 'Pinyin Tones'}
    ],
  },
  {
    key: 'sub2',
    label: 'Basic Introduction 介绍 (jiè shào)',
    children: [
      { key: '3', label: 'Daily Greetings' },
      { key: '4', label: 'Introducing Yourself' },
      { key: '5', label: 'Basic Courtesy' }
    ],
  },
  {
    key: 'sub3',
    label: 'Numbers 数字 (shù zì)',
    children: [
      { key: '6', label: 'Counting Numbers' },
      { key: '7', label: 'Time' },
      { key: '8', label: 'Dates' },
    ],
  },
  {
    key: 'sub4',
    label: 'Question Words 疑问词 (yí wèn cí)',
    children: [
      { key: '9', label: 'Who' },
      { key: '10', label: 'What' },
      { key: '11', label: 'Where' },
      { key: '12', label: 'Why' },
      { key: '13', label: 'When' },
      { key: '14', label: 'How' },
    ],
  },
  {
    key: 'sub5',
    label: 'Directions 方向 (fāng xiàng)',
    children: [
      { key: '15', label: 'Directional Complements' }
    ],
  },
];

const getContent = {
  '1': <GettingStarted />,
  '2': <Pinyin />,
  '3': <DailyGreeting />,
  '4': <Introduce />,
  '5': <BasicCourtesy />,
  '6': <Numbers />,	
  '7': <Time />,
  '8': <Date />,
  '9': <Who />,
  '10': <What />,
  '11': <Where />,
  '12': <Why />,
  '13': <When />,
  '14': <How />,
  '15': <Direction />
}
const Lessons = () => {
  const [current, setCurrent] = useState('1');
  const onClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <>
      <Row>
        <Col span={4}>
        <div className="menu-sidebar">
        </div>
        <Menu
            className="resources-menu"
            onClick={onClick}
            style={{ width: 300, height: '100%' }}
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />
        </Col>
        <Col span={20} className="content-col">
          <div className="resources-content">
            {getContent[current] || <div>Select a topic to view content</div>}
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Lessons;