import '../styles/resources.css';
import { Row, Col } from 'antd';
import { BookOutlined, GlobalOutlined, ReadOutlined } from '@ant-design/icons';

const GettingStarted = () => {
    return (
      <div className="content">
        <h1>Getting Started with ChineseQuest</h1>
        <br/>
        <div className="container">
          <h3 className="desc1">Learning Chinese can feel challenging at first but... it is completely normal ! </h3>
          <p>With thousands of unique characters, unfamiliar sounds, and tonal pronunciation, it is very different from most languages you may have learned before. But do not worry, the key to success is consistent practice, curiosity, and having the right resources by your side.</p>
        </div>
        <br/>
        <h2>Here is what makes Chinese Quest special:</h2>
          <Row gutter={[24, 24]}>
              <Col span={8}>
                <div className="container1">
                  <BookOutlined className="feature-icon" />
                  <h2 className="desc1">1. Interactive Lessons</h2>
                  <p>Engage with interactive lessons that make learning Chinese enjoyable and effective.</p>
                </div>
              </Col>
              <Col span={8}>
                <div className="container1">
                  <GlobalOutlined className="feature-icon" />
                  <h2 className="desc1">2. Real-Life Context</h2>
                  <p>Learn practical phrases and vocabulary that you can use in everyday conversations.</p>
                </div>   
              </Col>
              <Col span={8}>
                <div className="container1">
                  <ReadOutlined className="feature-icon" />
                  <h2 className="desc1">3. Cultural Insights</h2>
                  <p>Explore the rich culture behind the language to enhance your understanding and appreciation.</p>
                </div>
              </Col>
          </Row>
        <br/>
        <h2>Ready to start your Chinese learning journey?</h2>
        <h2 className="desc1">我们开始吧！Let's Begin!</h2>
      </div>

    );
  };
  
export default GettingStarted;