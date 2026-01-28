import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Progress, Space, Modal, message, Row, Col } from 'antd';
import { AudioOutlined, StopOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import MicRecorder from 'mic-recorder-to-mp3';
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
  const [recordedAudioURL, setRecordedAudioURL] = useState(null);
  const [recordedAudioFile, setRecordedAudioFile] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [completed, setCompleted] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState([]);
  const recorder = useRef(null);
  
  useEffect(() => {
    recorder.current = new MicRecorder({ bitRate: 128 });
  }, []);

  const current = pronunciationWords[currentIndex];
  const progress = ((completed) / pronunciationWords.length) * 100;
  const averageAccuracy = results.length > 0 
    ? Math.round(results.reduce((a, b) => a + b, 0) / results.length)
    : 0;

  const submitPronunciation = async () => {
        if (!recordedAudioFile) {
            message.error('No audio file to submit.');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('audio', recordedAudioFile, 'speech.wav');
            formData.append('referenceText', current.hanzi);

            const res = await fetch(`${process.env.REACT_APP_API_URL}/speech/pronunciation`, {
                method: 'POST',
                body: formData
            });

            if (!res.ok) {
                throw new Error('Pronunciation request failed');
            }

            const data = await res.json();
            setAccuracy(Math.round(data.accuracy));
            setShowResult(true);

        } catch (err) {
            console.error(err);
            message.error('Pronunciation analysis failed');
        }
  };

  // start recording
  const startRecording = () => {
        // Ask for microphone permission first
        navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
            recorder.current.start().then(() => {
                setIsRecording(true);
                message.success('Recording started');
            }).catch((e) => {
                console.error(e);
                message.error('Could not start recording.');
            });
        }).catch(() => {
            message.error('Microphone access was denied.');
        });
  };

  // stop recording
  const stopRecording = async () => {
      try {
          const [buffer, blob] = await recorder.current.stop().getMp3();
          const file = new File(buffer, 'user-speech.wav', {
              type: blob.type,
              lastModified: Date.now()
          });

          const audioUrl = URL.createObjectURL(file);
          setRecordedAudioURL(audioUrl);
          setRecordedAudioFile(file); 
          setIsRecording(false);
          message.success('Recording stopped');
      } catch (e) {
          console.error(e);
          message.error('Could not stop recording.');
      }
  };

  const playReferenceAudio = () => {
    if (!current.audio) {
      message.error('No reference audio available');
      return;
    }
  };

  // play recorded audio
  const playRecordedAudio = () => {
    if (recordedAudioURL) {
        const audio = new Audio(recordedAudioURL);
        audio.play();
    }
  };

  const handleNext = () => {
    const newResults = [...results, accuracy];
    setResults(newResults);
    
    if (currentIndex < pronunciationWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setRecordedAudioURL(null);
      setRecordedAudioFile(null);
      setAccuracy(null);
      setShowResult(false);
      setCompleted(completed + 1);
    } else {
      showCompletionModal();
    }
  };

  const handleRetry = () => {
    setRecordedAudioURL(null);
    setRecordedAudioFile(null);
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
        setRecordedAudioURL(null);
        setRecordedAudioFile(null);
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
          {!recordedAudioURL ? (
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

      {showResult && recordedAudioURL && accuracy !== null && (
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
