import '../styles/resources.css';

const Introduce = () => {
    return (
      <div>
        <h1>Introduce Yourself</h1>
        <br/>
        <h2>How to Introduce Yourself</h2>
        <div className="container">
            <h3>你好，我叫Susan</h3>
            <h3 className="desc">nǐ hǎo, wǒ jiào Susan</h3>
            <ol>
              <li>你好 (nǐ hǎo) - Hello</li>
              <li>我叫 (wǒ jiào) - My name is / I'm called.</li>
              <li>Susan</li>
            </ol>
        </div>
        <br/>
        <div className="container">
            <h3>大家好，我是Mary</h3>
            <h3 className="desc">dà jiā hǎo, wǒ shì Mary</h3>            
            <ol>
              <li>大家好 (dà jiā hǎo) - Hello Everyone</li>
              <li>我是 (wǒ shì) - I am</li>
              <li>Mary</li>
            </ol>
        </div>
        <br/>
        <h2>Occupations (zhí yè)</h2>
        <div className="container">
            <h3 className="desc">Common Occupations:</h3>
            <ol>
              <li>老师 (lǎo shī) - Teacher</li>
              <li>医生 (yī shēng) - Doctor</li>
              <li>学生 (xué shēng) - Student</li>
              <li>工程师 (gōng chéng shī) - Engineer</li>
              <li>护士 (hù shi) - Nurse</li>
              <li>商人 (shāng rén) - Business Person</li>
              <li>厨师 (chú shī) - Chef</li>
            </ol>
            <b>Examples:</b>
            <p>我是老师 (wǒ shì lǎo shī) - I am a teacher</p>
            <p>我是学生 (wǒ shì xuē shēng) - I am a student</p>
        </div>
        <br/>
        
        <h2>Where do you live</h2>
        <div className="container">
            <h3 className="desc">I live in... 我住在 + [place] (wǒ zhù zài + [place])</h3>
            <b>Examples:</b>
            <p>我住在新加坡 (wǒ zhù zài xīn jiā pō) - I live in Singapore</p>
        </div>
        <br/>

        <h2>How to say Nice To Meet You!</h2>
        <div className="container">
            <h3>很高兴认识你 - Nice to meet you</h3>
            <h3 className="desc">hěn gāo xìng rèn shi nǐ</h3>
            <p>When meeting someone for the first time, you can say:</p>
            <ul>
            <li>很高兴 (hěn gāo xìng) - Very happy / Nice</li>
            <li>认识 (rèn shi) - To know / to meet</li>
            <li>你 (nǐ) - You</li>
            </ul>
        </div>
      </div>

    );
  };
  
export default Introduce;
  