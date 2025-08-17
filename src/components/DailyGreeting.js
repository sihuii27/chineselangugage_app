import '../styles/resources.css';
import { Table } from "antd";

const DailyGreeting = () => {
    return (
      <div>
        <h1>Daily Greetings</h1>
        <br/>
        <h2>Common Phrases to greet others:</h2>
        <div className="container">
          <h3>你好</h3>
          <h3 className="desc">nǐ hǎo</h3> 
          <h3>Hello</h3>
        </div>
        <br/>
        <div className="container">
          <h3>您好</h3>
          <h3 className="desc">nín hǎo</h3> 
          <h3>Hello (formal)</h3>
        </div>
        <br/>
        <div className="container">
          <h3>早安</h3>
          <h3 className="desc">zǎo ān</h3> 
          <h3>Good morning</h3>
        </div>
        <br/>
        <div className="container">
          <h3>午安</h3>
          <h3 className="desc">wǔ ān</h3> 
          <h3>Good afternoon</h3>
        </div>
        <br/>
        <div className="container">
          <h3>晚安</h3>
          <h3 className="desc">wǎn ān</h3> 
          <h3>Good night</h3>
        </div>
        <br/>
        <div className="container">
          <h3>再见</h3>
          <h3 className="desc">zài jiàn</h3> 
          <h3>Goodbye</h3>
        </div>
        <br/>
        
      </div>

    );
  };
  
export default DailyGreeting;
  