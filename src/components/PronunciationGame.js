import React, { useState, useRef } from 'react';
import { Card, Button, Progress, Space, Modal, message, Row, Col } from 'antd';
import { AudioOutlined, StopOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
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
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [completed, setCompleted] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);

  const current = pronunciationWords[currentIndex];
  const progress = ((completed) / pronunciationWords.length) * 100;
  const averageAccuracy = results.length > 0 
    ? Math.round(results.reduce((a, b) => a + b, 0) / results.length)
    : 0;

  // start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudio(audioUrl);
        
      };
      
      mediaRecorder.start(100);
      setIsRecording(true);
      message.success('Recording started');
    } catch (error) {
      console.error('Error accessing microphone:', error);
      message.error('Unable to access microphone. Please check permissions.');
    }
  };

  // stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsRecording(false);
      message.success('Recording stopped');
    }
  };

  const playReferenceAudio = () => {
    if (!current.audio) {
      message.error('No reference audio available');
      return;
    }

  };

  // Play recorded audio
  const playRecordedAudio = () => {
    if (recordedAudio) {
      const audio = new Audio(recordedAudio);
      audio.play();
    }
  };

  const handleNext = () => {
    const newResults = [...results, accuracy];
    setResults(newResults);
    
    if (currentIndex < pronunciationWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setRecordedAudio(null);
      setAccuracy(null);
      setShowResult(false);
      setCompleted(completed + 1);
    } else {
      showCompletionModal();
    }
  };

  const handleRetry = () => {
    setRecordedAudio(null);
    setAccuracy(null);
    setShowResult(false);
  };

  const showCompletionModal = () => {
    Modal.success({
      title: 'Pronunciation Practice Complete!',
      content: (
        <div className="completion-content">
          <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
            Great job! You completed all {pronunciationWords.length} words.
          </p>
          <p style={{ fontSize: '1.1rem', color: '#1890ff', fontWeight: 'bold' }}>
            Average Accuracy: {averageAccuracy}%
          </p>
          <Progress 
            percent={averageAccuracy} 
            strokeColor={{
              '0%': '#f5222d',
              '50%': '#faad14',
              '100%': '#52c41a',
            }}
          />
        </div>
      ),
      okText: 'Try Again',
      onOk() {
        setCurrentIndex(0);
        setCompleted(0);
        setResults([]);
        setRecordedAudio(null);
        setAccuracy(null);
        setShowResult(false);
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
    if (acc >= 70) return 'Fail';
    return 'Keep Practicing';
  };

  return (
    <Card
      title="Pronunciation Practice"
      className="game-container"
      style={{ maxWidth: 800, margin: '20px auto' }}
      headStyle={{ fontSize: '24px', fontWeight: 'bold' }}
    >
      {/* Progress */}
      <Progress 
        percent={progress} 
        format={() => `${completed}/${pronunciationWords.length}`}
        strokeColor="#1890ff"
      />

      {/* Word Display */}
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

      {/* Reference Audio Button */}
      <div className="audio-controls">
        <Button
          type="primary"
          size="large"
          icon={<PlayCircleOutlined />}
          onClick={playReferenceAudio}
          className="audio-btn"
        >
          Listen Reference
        </Button>
      </div>

      {/* Recording Section */}
      <div className="recording-section">
        <h3>Record Your Voice</h3>
        <Space direction="vertical" style={{ width: '100%', display: 'flex' }}>
          {!recordedAudio ? (
            <motion.div
              animate={{ scale: isRecording ? 1 : 1 }}
            >
              {!isRecording ? (
                <Button
                  type="primary"
                  size="large"
                  danger
                  icon={<AudioOutlined />}
                  onClick={startRecording}
                  style={{ width: '100%', height: '60px', fontSize: '16px' }}
                >
                  Start Recording
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  icon={<StopOutlined />}
                  onClick={stopRecording}
                  style={{ width: '100%', height: '60px', fontSize: '16px', backgroundColor: '#ff4d4f' }}
                >
                  Stop Recording
                </Button>
              )}
            </motion.div>
          ) : (
            <>
              <div className="recorded-indicator">
                Recording captured
              </div>
              <Button
                type="default"
                size="large"
                icon={<PlayCircleOutlined />}
                onClick={playRecordedAudio}
                style={{ width: '100%' }}
              >
                Play Your Recording
              </Button>
            </>
          )}
        </Space>
      </div>

      {/* Result Section */}
      {showResult && recordedAudio && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="result-section"
        >
          <h3>Accuracy Analysis</h3>
          

          <Space style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleRetry} size="large">
              Retry
            </Button>
            <Button 
              type="primary" 
              onClick={handleNext} 
              size="large"
              disabled={currentIndex === pronunciationWords.length - 1 && !showResult}
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
