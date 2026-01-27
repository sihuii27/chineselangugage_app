import '../styles/resources.css';
import { Row, Col, Button } from "antd";
import { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import {Carousel} from 'antd';

const Time = () => {
    const [showPinyin, setShowPinyin] = useState(true);
    const [showTranslate, setshowTranslate] = useState(true);
    const timeExpressions = [
        { expression: '现在是下午三点半', translation: 'It is 3:30 PM now', pinyin: 'xiàn zài shì xià wǔ sān diǎn bàn' },
        { expression: '现在是早上七点四十分', translation: 'It is 7:40 AM now', pinyin: 'xiàn zài shì zǎo shàng qī diǎn sì shí fēn' },
        { expression: '现在是晚上九点', translation: 'It is 9:00 PM now', pinyin: 'xiàn zài shì wǎn shàng jiǔ diǎn' },
        { expression: '现在是凌晨一点', translation: 'It is 1:00 AM now', pinyin: 'xiàn zài shì líng chén yī diǎn' },
    ]
    const contentStyle = {
      margin: 0,
      height: '160px',
      lineHeight: '160px',
      textAlign: 'center',
      color: 'white',
    };
    return (
      <div>
        <h1>Time 时间 (shí jiān)</h1>
        
        <br/>
        <h2>Key Vocabulary</h2>
        <div className="container2">
          <Carousel arrows infinite={false}>
            <div>
              <h1 style={contentStyle}>现在 (xiàn zài) - Now</h1>
            </div>
            <div>
              <h1 style={contentStyle}>几点 (jǐ diǎn) - What Time</h1>
            </div>
            <div>
              <h1 style={contentStyle}>点 (diǎn) - O'Clock</h1>
            </div>
            <div>
              <h1 style={contentStyle}>分 (fēn) - Minute</h1>
            </div>
            <div>
              <h1 style={contentStyle}>秒 (miǎo) - Second</h1>
            </div>
            <div>
              <h1 style={contentStyle}>半 (bàn) - Half</h1>
            </div>
            <div>
              <h1 style={contentStyle}>早上 (zǎo shàng) - Morning</h1>
            </div>
            <div>
              <h1 style={contentStyle}>下午 (xià wǔ) - Afternoon</h1>
            </div>
            <div>
              <h1 style={contentStyle}>晚上 (wǎn shàng) - Evening/Night</h1>
            </div>
            <div>
              <h1 style={contentStyle}>凌晨 (líng chén) - Early Morning/ After midnight</h1>
            </div>
          </Carousel>

        </div>

        <h2>Time Structure</h2>
        <h3>时间 (shi jian) + 点 (dian)+ 分 (fen)</h3>
        <div className="container">

        Examples:
        <ul>
          <ol>一点 (yī diǎn) - 1:00</ol>
          <ol>三点半 (sān diǎn bàn) - 3:30</ol>
          <ol>四点十五分 (sì diǎn shí wǔ fēn) - 4:15</ol>
          <ol>六点四十分 (liù diǎn sì shí fēn) - 6:40</ol>
          <ol>八点零五分 (bā diǎn líng wǔ fēn) - 8:05</ol>
        </ul>

        With AM/PM
        <ul>
          <ol>早上七点 (zǎo shàng qī diǎn) - 7 AM</ol>
          <ol>下午三点 (xià wǔ sān diǎn) - 3 PM</ol>
          <ol>晚上九点 (wǎn shàng jiǔ diǎn) - 9 PM</ol>
        </ul>
        </div>

        <h2>Practice!</h2>
        <p>Try asking the time in Chinese: <strong>现在几点？(xiàn zài jǐ diǎn?)</strong></p>
        <p>Respond with the current time using the structure: <strong>现在是下午三点半 (xiàn zài shì xià wǔ sān diǎn bàn)</strong></p>
        
        <Button type="default" className="custombtn" onClick={()=>setShowPinyin(!showPinyin)} style={{ marginBottom: '16px' }}>
          {showPinyin ? <EyeOutlined/>:<EyeInvisibleOutlined/>}
          {showPinyin ? 'Show Hanyu Pinyin' :'Hide Hanyu Pinyin'}
        </Button>

        <Button type="default" className="custombtn" onClick={()=>setshowTranslate(!showTranslate)} style={{ marginBottom: '16px' }}>
          {showTranslate ? <EyeOutlined/>:<EyeInvisibleOutlined/>}
          {showTranslate ? 'Show Translation' :'Hide Translation'}
        </Button>
        
        <div className="container">
         
            <Row gutter={[24, 24]}>
              {timeExpressions.map((time) => (
                <Col span={12} key={time.expression}>
                  <div className="time-item">
                    <h2>{time.expression}</h2>
                    {!showTranslate? <h2>Translation: {time.translation}</h2>:""}
                    {!showPinyin?<h2>Pinyin: {time.pinyin}</h2>:""}
                  </div>
                </Col>
              ))}
            </Row>
         
        </div>
      </div>
    );
  }
export default Time;
  