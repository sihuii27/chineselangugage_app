<img width="295" height="267" alt="image" src="https://github.com/user-attachments/assets/d2e1754d-fd78-465f-b835-2c6981ec01f2" />
<img width="295" height="267" alt="image" src="https://github.com/user-attachments/assets/307bf129-abe6-4033-9d65-1ebf9d49879f" />
<img width="350" height="350" alt="image" src="https://github.com/user-attachments/assets/a7ff408c-e7c0-4012-8dfe-c8bddde3ab07" />

<h1>Overview</h1>

Many existing Chinese language learning applications rely heavily on static word lists and repetitive memorization, offering limited interactivity and real-world practice. This makes it difficult for learners to stay engaged and effectively develop listening, speaking, reading, and writing skills. Additionally, essential features are often locked behind paid subscriptions, restricting learners’ access to meaningful practice and slowing their learning progress. As a result, learners lack an accessible, engaging, and interactive platform that supports comprehensive Chinese learning at different proficiency levels.

<h2>Features</h2>

Lesson Guides:Explanations with examples to understand sentence structures and grammar structure.

Quizzes & Exercises: An interactive audio recording feature that analyzes pronunciation accuracy and provides targeted practice activities.

Progress Tracking: Track your learning progress and revisit completed lessons.

<h2>Tech Stack</h2>
<b>Frontend:</b>

React.js

Ant Design – UI library.

Framer Motion: Animations for transitions.

MicRecorder: Record audio from user’s microphone.

<b>Backend:</b>

Node.js + Express: Server to handle audio uploads and communication with Azure.

Multer: Handle audio file uploads.

Azure Cognitive Services, Speech SDK: Provides Pronunciation Assessment and transcription.

Webm-to-Wav converter: Convert recorded audio to WAV format for Azure analysis.

<h2>Next Steps</h2>

<b>Fix audio recording pipeline:</b>

Use MediaRecorder to generate uncompressed WAV.

Boost audio volume if needed.

Ensure recordings are long enough for Azure.

<b>Improve Azure assessment integration:</b>

Verify accurate PronunciationAssessment results.

