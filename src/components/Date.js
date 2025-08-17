import '../styles/resources.css';
import { Row, Col, Button } from "antd";
import { useState } from 'react';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';

const Date = () => {
    const [showPinyin, setShowPinyin] = useState(true);
    const [showTranslate, setshowTranslate] = useState(true);
    const contentStyle = {
      margin: 0,
      height: '160px',
      lineHeight: '160px',
      textAlign: 'center',
      color: 'black',
    };
    const dateExpression = [
        { expression: '今天是星期一', translation: 'Today is Monday', pinyin: 'jīn tiān shì xīng qī yī' },
        { expression: '明天是星期二', translation: 'Tomorrow is Tuesday', pinyin: 'míng tiān shì xīng qī èr' },
        { expression: '昨天是星期日', translation: 'Yesterday was Sunday', pinyin: 'zuó tiān shì xīng qī rì' },
        { expression: '今天是三月十五日', translation: 'Today is March 15th', pinyin: 'jīn tiān shì sān yuè shí wǔ rì' },
    ]

    const months = [
        { month: '一月', pinyin: 'yī yuè' },
        { month: '二月', pinyin: 'èr yuè' },
        { month: '三月', pinyin: 'sān yuè' },
        { month: '四月', pinyin: 'sì yuè' },
        { month: '五月', pinyin: 'wǔ yuè' },
        { month: '六月', pinyin: 'liù yuè' },
        { month: '七月', pinyin: 'qī yuè' },
        { month: '八月', pinyin: 'bā yuè' },
        { month: '九月', pinyin: 'jiǔ yuè' },
        { month: '十月', pinyin: 'shí yuè' },
        { month: '十一月', pinyin: 'shí yī yuè' },
        { month: '十二月', pinyin: 'shí èr yuè' }
    ]

    const days = [
        { day: '星期一', pinyin: 'xīng qī yī' },
        { day: '星期二', pinyin: 'xīng qī èr' },
        { day: '星期三', pinyin: 'xīng qī sān' },
        { day: '星期四', pinyin: 'xīng qī sì' },
        { day: '星期五', pinyin: 'xīng qī wǔ' },
        { day: '星期六', pinyin: 'xīng qī liù' },
        { day: '星期日 / 星期天', pinyin: 'xīng qī rì / xīng qī tiān' }
    ]
    
    return (
      <div>
        <h1>Date 日期 (rì qī)</h1>
        <br/>
        <h2>Key Vocabulary</h2>
        <div className="container2">
          <Carousel arrows infinite={false}>
            <div>
              <h1 style={contentStyle}>日期 (rì qī) - date</h1>
            </div>
            <div>
              <h1 style={contentStyle}>年 (nián) - year</h1>
            </div>
            <div>
              <h1 style={contentStyle}>月 (yuè) - month</h1>
            </div>
            <div>
              <h1 style={contentStyle}>日 (rì) - day</h1>
            </div>
            <div>
              <h1 style={contentStyle}>号 (hào) - day (informal)</h1>
            </div>
            <div>
              <h1 style={contentStyle}>星期 (xīng qī) - week</h1>
            </div>
            <div>
              <h1 style={contentStyle}>天 (tiān) - day</h1>
            </div>
            <div>
              <h1 style={contentStyle}>今天 (jīn tiān) - today</h1>
            </div>
            <div>
              <h1 style={contentStyle}>明天 (míng tiān) - tomorrow</h1>
            </div>
            <div>
              <h1 style={contentStyle}>昨天 (zuó tiān) - yesterday</h1>
            </div>
            <div>
              <h1 style={contentStyle}>明天 (míng tiān) - tomorrow</h1>
            </div>
            <div>
              <h1 style={contentStyle}>以前 (yǐ qián) - before/ago</h1>
            </div>
            <div>
              <h1 style={contentStyle}>以后 (yǐ hòu) - after/later</h1>
            </div>
          </Carousel>
          <br />
        </div>

        <h3>Months 月份 (yuè fèn)</h3>

        <Row gutter={[24, 24]}>
        {months.map((mth) => (
            <Col key={mth.month} xs={24} sm={12} md={8}>
            <div className="container">
                <div className="number-display1"><h2>{mth.month}</h2></div>
                <div className="number-display1"><h2>{mth.pinyin}</h2></div>
            </div>
            </Col>
        ))}
        </Row>

        <h3>Days 星期 (xīng qī)</h3>
        <Row gutter={[24, 24]}>
        {days.map((day) => (
            <Col key={day.day} xs={24} sm={12} md={8}>
            <div className="container">
                <div className="number-display1"><h2>{day.day}</h2></div>
                <div className="number-display1"><h2>{day.pinyin}</h2></div>
            </div>
            </Col>
        ))}
        </Row>
        <h2>Date Structure</h2>
        <h3>年 (nián) + 月 (yuè) + 日 (rì) / 号 (hào)</h3>
        <div className="container1">
        Examples:
        <ul>
          <ol>今天是三月十五日 (jīn tiān shì sān yuè shí wǔ rì) - Today is March 15th</ol>
          <ol>明天是四月二十日 (míng tiān shì sì yuè èr shí rì) - Tomorrow is April 20th</ol>
          <ol>昨天是五月一号 (zuó tiān shì wǔ yuè yī hào) - Yesterday was May 1st</ol>
        </ul>
        </div>

        <h2>Practice!</h2>
        <p>Try asking the date in Chinese: <strong>今天几号？(jīn tiān jǐ hào?)</strong></p>
        <p>Respond with the current date using the structure: <strong>今天是三月十五日 (jīn tiān shì sān yuè shí wǔ rì)</strong></p>

        <Button type="default" className="custombtn" onClick={()=>setShowPinyin(!showPinyin)} style={{ marginBottom: '16px' }}>
          {showPinyin ? <EyeOutlined/>:<EyeInvisibleOutlined/>}
          {showPinyin ? 'Show Hanyu Pinyin' :'Hide Hanyu Pinyin'}
        </Button>

        <Button type="default" className="custombtn" onClick={()=>setshowTranslate(!showTranslate)} style={{ marginBottom: '16px' }}>
          {showTranslate ? <EyeOutlined/>:<EyeInvisibleOutlined/>}
          {showTranslate ? 'Show Translation' :'Hide Translation'}
        </Button>
        
        <div className="container1">
            <Row gutter={[24, 24]}>
              {dateExpression.map((date) => (
                <Col span={12} key={date.expression}>
                  <div className="date-item">
                    <h2>{date.expression}</h2>
                    {!showTranslate? <h2>Translation: {date.translation}</h2>:""}
                    {!showPinyin?<h2>Pinyin: {date.pinyin}</h2>:""}
                  </div>
                </Col>
              ))}
            </Row>
         
        </div>
      </div>
    );
  }
export default Date;
  