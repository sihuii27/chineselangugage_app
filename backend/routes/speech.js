const express = require('express');
const multer = require('multer');
const fs = require('fs');
const sdk = require('microsoft-cognitiveservices-speech-sdk');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/pronunciation', upload.single('audio'), async (req, res) => {
  const referenceText = req.body.referenceText;
  const audioPath = req.file?.path;

  if (!referenceText || !audioPath) {
    return res.status(400).json({ error: 'Missing audio or reference text' });
  }

  let recognizer;

  try {
    const speechConfig = sdk.SpeechConfig.fromSubscription(
      process.env.AZURE_SPEECH_KEY,
      process.env.AZURE_SPEECH_REGION
    );
    speechConfig.speechRecognitionLanguage = 'zh-CN';

    const pushStream = sdk.AudioInputStream.createPushStream(
      sdk.AudioStreamFormat.getWaveFormatPCM(16000, 16, 1)
    );

    // Push MP3 bytes into Azure
    fs.createReadStream(audioPath)
      .on('data', chunk => pushStream.write(chunk))
      .on('end', () => pushStream.close());

    const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);

    const pronunciationConfig = new sdk.PronunciationAssessmentConfig(
      referenceText,
      sdk.PronunciationAssessmentGradingSystem.HundredMark,
      sdk.PronunciationAssessmentGranularity.Phoneme,
      true
    );

    recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    pronunciationConfig.applyTo(recognizer);

    recognizer.recognizeOnceAsync(
      result => {
        console.log('Azure result:', result);
        const assessment =
          sdk.PronunciationAssessmentResult.fromResult(result);

        res.json({
          accuracy: Math.round(assessment.accuracyScore),
          pronunciation: Math.round(assessment.pronunciationScore),
          fluency: Math.round(assessment.fluencyScore),
          completeness: Math.round(assessment.completenessScore),
          words: assessment.detailResult?.Words || []
        });

        recognizer.close();
        fs.unlink(audioPath, () => {});
      },
      err => {
        console.error('Azure error:', err);
        res.status(500).json({ error: 'Azure processing failed' });
        recognizer.close();
        fs.unlink(audioPath, () => {});
      }
    );

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Pronunciation assessment failed' });
    if (audioPath) fs.unlink(audioPath, () => {});
  }
});

module.exports = router;
