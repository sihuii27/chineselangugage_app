import React, { useState } from 'react';
import { Card, Button, Progress } from 'antd';
import { motion } from 'framer-motion';

const words = [
  { hanzi: '来', pinyin: 'lai', tone: 2 },
  { hanzi: '去', pinyin: 'qu', tone: 4 },
  { hanzi: '看', pinyin: 'kan', tone: 4 },
  { hanzi: '听', pinyin: 'ting', tone: 1 },
  { hanzi: '说', pinyin: 'shuo', tone: 1 },
  { hanzi: '做', pinyin: 'zuo', tone: 4 },
  { hanzi: '喝', pinyin: 'he', tone: 1 },
  { hanzi: '吃', pinyin: 'chi', tone: 1 },
  { hanzi: '你', pinyin: 'ni', tone: 3 },
  { hanzi: '我', pinyin: 'wo', tone: 3 },
  { hanzi: '学', pinyin: 'xue', tone: 2 },
  { hanzi: '问', pinyin: 'wen', tone: 4 },
  { hanzi: '有', pinyin: 'you', tone: 3 },
  { hanzi: '很', pinyin: 'hen', tone: 3 },
  { hanzi: '错', pinyin: 'cuo', tone: 4 },
  { hanzi: '好', pinyin: 'hao', tone: 3 },
];

const tones = [
  { id: 1, label: 'Tone 1', color: '#1890ff', curve: '' },
  { id: 2, label: 'Tone 2', color: '#52c41a', curve: '↗' },
  { id: 3, label: 'Tone 3', color: '#faad14', curve: '↘↗' },
  { id: 4, label: 'Tone 4', color: '#f5222d', curve: '↘' },
];

const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const ToneGame = () => {
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [lives, setLives] = useState(3);

  const handleAnswer = (toneId) => {
    if (gameOver) return;

    let newScore = score;
    if (toneId === currentWord.tone) {
      newScore = score + 1;
      setScore(newScore);
      setFeedback('correct');
    } else {
      setLives(lives - 1);
      setFeedback('wrong');
      if (lives - 1 <= 0) {
        setGameOver(true);
        setTimeout(() => setFeedback(null), 400);
        return;
      }
    }

    if (newScore >= 10) {
      setGameOver(true);
      setLives(3);
      setTimeout(() => setFeedback(null), 400);
      return;
    }

    setTimeout(() => {
      setCurrentWord(getRandomWord());
      setFeedback(null);
    }, 400);
  };

  const restartGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setCurrentWord(getRandomWord());
    setFeedback(null);
  };

  return (
    <Card
      title="Tone Matching Game"
      style={{ maxWidth: 800, margin: '20px auto', textAlign: 'center', padding: '40px', backgroundColor: '#f0f2f5' }}
    >
      <motion.div
        key={currentWord.hanzi}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ fontSize: 70, marginBottom: 20 }}
      >
        {currentWord.hanzi}
        <br/>
        <p style={{ fontSize: '50%'}}>{currentWord.pinyin}</p>
      </motion.div>

      <div style={{ marginBottom: 20 }}>
        {tones.map((tone) => (
          <Button
            key={tone.id}
            onClick={() => handleAnswer(tone.id)}
            disabled={gameOver}
            style={{
              margin: 8,
              backgroundColor:
                feedback &&
                (tone.id === currentWord.tone
                  ? '#95cc6eff'
                  : feedback === 'wrong'
                  ? '#ff7875'
                  : undefined),
              color: '#654e4eff',
              minWidth: 100,
            }}
          >
            {tone.label}
          </Button>
        ))}
      </div>

      {/* Score */}
      <Progress
        percent={Math.min((score / 10) * 100, 100)}
        format={() => `Score: ${score}/10`}
        strokeColor="#1890ff"
        style={{ marginBottom: 10 }}
      />
      <div style={{ fontSize: 18, marginBottom: 10 }}>
        Lives: {lives}/3
      </div>
      {gameOver && (
        <div>
          <h3>You reached {score} point!</h3>
          <Button type="default" onClick={restartGame}>Restart Game</Button>
        </div>
      )}
    </Card>
  );
};

export default ToneGame;