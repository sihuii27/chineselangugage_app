import '../styles/resources.css';
import { Row, Col, Button } from "antd";
import { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

const Numbers = () => {
    const [showChar, setShowChar] = useState(true);
    const [showPinyin, setPinyin] = useState(true);
    const basicNumbers = [
        { number: 0, character: '零', pinyin: 'líng'},
        { number: 1, character: '一', pinyin: 'yī'},
        { number: 2, character: '二', pinyin: 'èr'},
        { number: 3, character: '三', pinyin: 'sān'},
        { number: 4, character: '四', pinyin: 'sì'},
        { number: 5, character: '五', pinyin: 'wǔ'},
        { number: 6, character: '六', pinyin: 'liù'},
        { number: 7, character: '七', pinyin: 'qī'},
        { number: 8, character: '八', pinyin: 'bā'},
        { number: 9, character: '九', pinyin: 'jiǔ'},
        { number: 10, character: '十', pinyin: 'shí'}
    ];

    const largerNumbers = [
        { number: 11, character: '十一', pinyin: 'shí yī'},
        { number: 12, character: '十二', pinyin: 'shí èr' },
        { number: 15, character: '十五', pinyin: 'shí wǔ'},
        { number: 20, character: '二十', pinyin: 'èr shí' },
        { number: 21, character: '二十一', pinyin: 'èr shí yī'},
        { number: 30, character: '三十', pinyin: 'sān shí'},
        { number: 50, character: '五十', pinyin: 'wǔ shí' },
        { number: 99, character: '九十九', pinyin: 'jiǔ shí jiǔ'},
        { number: 100, character: '一百', pinyin: 'yī bǎi' },
        { number: 1000, character: '一千', pinyin: 'yī qiān'},
        { number: 2000, character: '两千', pinyin: 'liǎng qiān'}
    ];

    const culturalNote = [
        { number: 1, note: 'In Chinese, numbers are often used in pairs for good luck, such as "一对" (yī duì) meaning "a pair".' },
        { number: 2, note: 'The number 8 (八, bā) is considered lucky in Chinese culture because it sounds like the word for wealth (发, fā).' },
        { number: 3, note: 'The number 4 (四, sì) is considered unlucky because it sounds like the word for death (死, sǐ).' }
    ]

    return (
      <div>
        <h1>Numbers 数字 (shù zì)</h1>

        <br/>
        <Button type="default" className="custombtn" onClick={()=>setShowChar(!showChar)} style={{ marginBottom: '16px' }}>
          {showChar ? <EyeInvisibleOutlined/>:<EyeOutlined/>}
          {showChar ? 'Hide Character':'Show Character'}
        </Button>
        
        <Button type="default" className="custombtn" onClick={()=>setPinyin(!showPinyin)} style={{ marginBottom: '16px' }}>
          {showChar ? <EyeInvisibleOutlined/>:<EyeOutlined/>}
          {showChar ? 'Hide Pinyin':'Show Pinyin'}
        </Button>

        <h2>Numbers 1 to 10</h2>
        <Row gutter={[24, 24]}>
        {basicNumbers.map((num) => (
            <Col key={num.number} xs={24} sm={12} md={8}>
            <div className="container">
                <div className="number-display"><h2>{num.number}</h2></div>
                {showChar ? <div className="character"><h1>{num.character}</h1></div>:""}
                {showPinyin ? <div className="pinyin"><h2>{num.pinyin}</h2></div>:""}
            </div>
            </Col>
        ))}
        </Row>

        <h2>Numbers 10 to 100</h2>
        <Row gutter={[24, 24]}>
        {largerNumbers.map((num) => (
            <Col key={num.number} xs={24} sm={12} md={8}>
            <div className="container1">
                <div className="number-display1"><h2>{num.number}</h2></div>
                {showChar ?<div className="character"><h1>{num.character}</h1></div>:""}
                {showPinyin ?<div className="pinyin"><h2>{num.pinyin}</h2></div>:""}
            </div>
            </Col>
        ))}
        </Row>

        <br/>

        <h2>Chinese Cultural Notes</h2>
        <Row gutter={[24, 24]}>
        {culturalNote.map((culture) => (
            <Col key={culture.number} xs={24} sm={12} md={24}>
            <div className="containerculture">
                <h2>{culture.note}</h2>
            </div>
            </Col>
        ))}
        </Row>
      </div>

    );
  };
  
export default Numbers;
  