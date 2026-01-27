import React, { useState } from 'react';
import { Row, Col, Menu } from 'antd';
import '../styles/resources.css';
import '../styles/games.css';
import ToneGame from '../components/ToneGame';
import PronunciationGame from '../components/PronunciationGame';

const gameItems = [
  {
    key: 'sub1',
    label: 'Interactive Games',
    children: [
      { key: 'tone-matching', label: 'Tone Matching' },
      { key: 'pronunciation', label: 'Pronunciation Practice' },
    ],
  },
  
];

const getGameContent = {
  'tone-matching': <ToneGame />,
  'pronunciation': <PronunciationGame />,
};

const Games = () => {
  const [selectedGame, setSelectedGame] = useState('tone-matching');

  const handleGameSelect = (e) => {
    setSelectedGame(e.key);
  };

  return (
    <Row>
      <Col span={4}>
        <div className="menu-sidebar"></div>
        <Menu
          className="resources-menu"
          onClick={handleGameSelect}
          style={{ width: 300, height: '100%' }}
          selectedKeys={[selectedGame]}
          mode="inline"
          items={gameItems}
        />
      </Col>
      <Col span={20} className="content-col">
        <div className="game-content">
          {getGameContent[selectedGame] || <ToneGame />}
        </div>
      </Col>
    </Row>
  );
};

export default Games;
