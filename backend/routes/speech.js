const express = require('express');
const multer = require('multer');
const fs = require('fs');
const sdk = require('microsoft-cognitiveservices-speech-sdk');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

ffmpeg.setFfmpegPath(ffmpegStatic);

router.post('/pronunciation', upload.single('audio'), (req, res) => {
  const referenceText = req.body.referenceText;
  const inputAudioPath = req.file?.path;

  if (!referenceText || !inputAudioPath) {
    return res.status(400).json({ error: 'Missing audio or reference text' });
  }

  const outputWavPath = `${inputAudioPath}_converted.wav`;

  ffmpeg(inputAudioPath)
    .outputOptions([
      '-acodec pcm_s16le', // Set audio codec to 16-bit PCM
      '-ar 16000',         // Set audio sample rate to 16kHz
      '-ac 1',             // Set audio to 1 channel (mono)
    ])
    .save(outputWavPath)
    .on('end', () => {
      try {
        const speechConfig = sdk.SpeechConfig.fromSubscription(
          process.env.AZURE_SPEECH_KEY,
          process.env.AZURE_SPEECH_REGION
        );
        speechConfig.speechRecognitionLanguage = 'zh-CN';

        const audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(outputWavPath));

        const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
          referenceText,
          sdk.PronunciationAssessmentGradingSystem.HundredMark,
          sdk.PronunciationAssessmentGranularity.Phoneme,
          true
        );

        const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
        pronunciationConfig.applyTo(recognizer);

        recognizer.recognizeOnceAsync(
          (result) => {
            console.log('Azure result:', result);
            const assessment = sdk.PronunciationAssessmentResult.fromResult(result);

            // Check if the assessment was successful
            if (result.reason === sdk.ResultReason.RecognizedSpeech) {
                res.json({
                    accuracy: assessment.accuracyScore,
                    pronunciation: assessment.pronunciationScore,
                    fluency: assessment.fluencyScore,
                    completeness: assessment.completenessScore,
                    words: assessment.detailResult?.Words || [],
                });
            } else {
                res.status(400).json({ 
                    error: 'Speech could not be recognized. Please try again.',
                    details: result.errorDetails 
                });
            }

            recognizer.close();
            fs.unlink(inputAudioPath, () => {});
            fs.unlink(outputWavPath, () => {});
          },
          (err) => {
            console.error('Azure recognition error:', err);
            res.status(500).json({ error: 'Azure processing failed' });
            recognizer.close();
            fs.unlink(inputAudioPath, () => {});
            fs.unlink(outputWavPath, () => {});
          }
        );
      } catch (err) {
        console.error('Server error during Azure processing:', err);
        res.status(500).json({ error: 'Pronunciation assessment failed' });
        // Ensure files are cleaned up even on error
        fs.unlink(inputAudioPath, () => {});
        fs.unlink(outputWavPath, () => {});
      }
    })
    .on('error', (err) => {
      console.error('FFmpeg conversion error:', err.message);
      res.status(500).json({ error: 'Failed to convert audio file for analysis.' });
      fs.unlink(inputAudioPath, () => {});
    });
});

module.exports = router;
