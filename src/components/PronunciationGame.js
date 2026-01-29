import React, { useState } from 'react';
import { Card, Button, Progress, Space, Modal, message } from 'antd';
import { AudioOutlined, StopOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useReactMediaRecorder } from 'react-media-recorder';
import '../styles/pronunciation.css';

const pronunciationWords = [
  { hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'Hello', audio: 'ni_hao' },
  { hanzi: '谢谢', pinyin: 'xiè xie', meaning: 'Thank you', audio: 'xiexie' },
  { hanzi: '对不起', pinyin: 'duì bù qǐ', meaning: 'Sorry', audio: 'duibuqi' },
  { hanzi: '请', pinyin: 'qǐng', meaning: 'Please', audio: 'qing' },
  { hanzi: '是', pinyin: 'shì', meaning: 'Is/Are', audio: 'shi' },
  { hanzi: '好', pinyin: 'hǎo', meaning: 'Good', audio: 'hao' },
  { hanzi: '我', pinyin: 'wǒ', meaning: 'I/Me', audio: 'wo' },
  { hanzi: '你', pinyin: 'nǐ', meaning: 'You', audio: 'ni' },
];

const PronunciationGame = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accuracy, setAccuracy] = useState(null);
  const [completed, setCompleted] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    clearBlobUrl,
  } = useReactMediaRecorder({
    audio: true,
    onStop: (blobUrl, blob) => {
      setRecordedAudioBlob(blob);
      message.success('Recording stopped');
    },
    onError: () => {
      message.error('Microphone access was denied or an error occurred.');
    }
  });

  const isRecording = status === 'recording';
  const current = pronunciationWords[currentIndex];
  const progress = ((completed) / pronunciationWords.length) * 100;

  const submitPronunciation = async () => {
    if (!recordedAudioBlob) {
      message.error('No audio file to submit.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('audio', recordedAudioBlob, 'speech.wav');
      formData.append('referenceText', current.hanzi);

      const res = await fetch(`${process.env.REACT_APP_API_URL}/speech/pronunciation`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Pronunciation request failed');
      }

      const data = await res.json();
      setAccuracy(Math.round(data.accuracy));
      setShowResult(true);

    } catch (err) {
      console.error(err);
      message.error(`Analysis failed: ${err.message}`);
    }
  };

  const playRecordedAudio = () => {
    if (mediaBlobUrl) {
      const audio = new Audio(mediaBlobUrl);
      audio.play();
    }
  };

  const handleNext = () => {
    const newResults = [...results, accuracy];
    setResults(newResults);

    if (currentIndex < pronunciationWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setAccuracy(null);
      setShowResult(false);
      setCompleted(completed + 1);
      clearBlobUrl();
      setRecordedAudioBlob(null);
    } else {
      setCompleted(completed + 1);
      showCompletionModal(newResults);
    }
  };

  const handleRetry = () => {
    setAccuracy(null);
    setShowResult(false);
    clearBlobUrl();
    setRecordedAudioBlob(null);
  };

  const showCompletionModal = (finalResults) => {
    const finalAverage = Math.round(finalResults.reduce((a, b) => a + b, 0) / finalResults.length);
    Modal.success({
      title: 'Pronunciation Practice Complete!',
      content: (
        <div className="completion-content">
          <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
            Great job! You completed all {pronunciationWords.length} words.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#1890ff', fontWeight: 'bold' }}>
            Average Accuracy: {finalAverage}%
          </p>
          <Progress
            percent={finalAverage}
            strokeColor={{ '0%': '#f5222d', '50%': '#faad14', '100%': '#52c41a' }}
          />
        </div>
      ),
      okText: 'Try Again',
      onOk() {
        setCurrentIndex(0);
        setCompleted(0);
        setResults([]);
        setAccuracy(null);
        setShowResult(false);
        clearBlobUrl();
        setRecordedAudioBlob(null);
      },
    });
  };

  const getAccuracyColor = (acc) => {
    if (acc >= 85) return '#52c41a';
    if (acc >= 70) return '#faad14';
    return '#f5222d';
  };

  const getAccuracyLevel = (acc) => {
    if (acc >= 90) return 'Excellent';
    if (acc >= 80) return 'Good';
    if (acc >= 70) return 'Fair';
    return 'Keep Practicing';
  };

  return (
    <Card
      title="Pronunciation Practice"
      className="game-container"
      style={{ maxWidth: 800, margin: '20px auto' }}
      headStyle={{ fontSize: '24px', fontWeight: 'bold' }}
    >
      <Progress
        percent={progress}
        format={() => `${completed}/${pronunciationWords.length}`}
        strokeColor="#1890ff"
      />

      <motion.div
        key={currentIndex}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="pronunciation-card"
      >
        <div className="hanzi-large">{current.hanzi}</div>
        <div className="pinyin-large">{current.pinyin}</div>
        <div className="meaning-text">Meaning: {current.meaning}</div>
      </motion.div>

      <div className="recording-section">
        <h3>Record Your Voice</h3>
        <Space direction="vertical" style={{ width: '100%', display: 'flex' }}>
          {!mediaBlobUrl ? (
            <motion.div animate={{ scale: isRecording ? 1.05 : 1 }}>
              <Button
                type="primary"
                size="large"
                danger={!isRecording}
                icon={isRecording ? <StopOutlined /> : <AudioOutlined />}
                onClick={isRecording ? stopRecording : startRecording}
                style={{ width: '100%', height: '60px', fontSize: '16px' }}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="recorded-indicator">Recording captured</div>
              <Button
                type="default"
                size="large"
                icon={<PlayCircleOutlined />}
                onClick={playRecordedAudio}
                style={{ width: '100%' }}
              >
                Play Your Recording
              </Button>
              <Button
                type="primary"
                size="large"
                onClick={submitPronunciation}
                style={{ width: '100%' }}
              >
                Analyze Pronunciation
              </Button>
            </>
          )}
        </Space>
      </div>

      {showResult && mediaBlobUrl && accuracy !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>Accuracy Analysis</h3>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <div style={{ fontSize: '48px', fontWeight: 'bold', color: getAccuracyColor(accuracy) }}>
              {accuracy}%
            </div>
            <div style={{ fontSize: '18px', marginTop: '10px', color: '#666' }}>
              {getAccuracyLevel(accuracy)}
            </div>
          </div>
          <Progress
            percent={accuracy}
            strokeColor={getAccuracyColor(accuracy)}
            style={{ marginBottom: '20px' }}
          />
          <Space style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleRetry} size="large">
              Retry
            </Button>
            <Button
              type="primary"
              onClick={handleNext}
              size="large"
            >
              {currentIndex === pronunciationWords.length - 1 ? 'Complete' : 'Next Word'}
            </Button>
          </Space>
        </motion.div>
      )}
    </Card>
  );
};

export default PronunciationGame;
