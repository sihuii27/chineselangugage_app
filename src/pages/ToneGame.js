import React, { useState } from 'react';
import { Card, Button, Progress } from 'antd';
import { motion } from 'framer-motion';

const words = [
  { hanzi: '妈', tone: 1 },
  { hanzi: '麻', tone: 2 },
  { hanzi: '马', tone: 3 },
  { hanzi: '骂', tone: 4 },
  { hanzi: '去', tone: 4 },
  { hanzi: '吃', tone: 1 },
];

// Tone definitions
const tones = [
  { id: 1, label: 'Tone 1 ─', color: '#1890ff', curve: '─' },
  { id: 2, label: 'Tone 2 ↗', color: '#52c41a', curve: '↗' },
  { id: 3, label: 'Tone 3 ↘↗', color: '#faad14', curve: '↘↗' },
  { id: 4, label: 'Tone 4 ↘', color: '#f5222d', curve: '↘' },
];

// Helper to get random word
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

const ToneGame = () => {
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'

  const handleAnswer = (toneId) => {
    if (toneId === currentWord.tone) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }

    // Next word after 400ms
    setTimeout(() => {
      setCurrentWord(getRandomWord());
      setFeedback(null);
    }, 400);
  };

  return (
    <Card
      title="Tone Matching Game"
      style={{ maxWidth: 450, margin: '20px auto', textAlign: 'center' }}
    >
      {/* Word Display */}
      <motion.div
        key={currentWord.hanzi}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ fontSize: 70, marginBottom: 20 }}
      >
        {currentWord.hanzi}
      </motion.div>

      {/* Tone Buttons */}
      <div style={{ marginBottom: 20 }}>
        {tones.map((tone) => (
          <Button
            key={tone.id}
            onClick={() => handleAnswer(tone.id)}
            style={{
              margin: 4,
              backgroundColor:
                feedback &&
                (tone.id === currentWord.tone
                  ? '#95cc6eff'
                  : feedback === 'wrong'
                  ? '#ff7875'
                  : undefined),
              color: '#654e4eff',
              minWidth: 90,
            }}
          >
            {tone.label}
          </Button>
        ))}
      </div>

      {/* Score */}
      <Progress
        percent={(score / 20) * 100}
        format={(percent) => `Score: ${score}`}
        strokeColor="#1890ff"
        style={{ marginBottom: 10 }}
      />
    </Card>
  );
};

export default ToneGame;
