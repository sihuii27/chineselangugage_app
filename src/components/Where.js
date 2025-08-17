import '../styles/resources.css';
import { Table } from "antd";

const What = () => {
    return (
      <div>
        <h1>哪里 (nǎ lǐ) - Where</h1>
        <br/>
        <div className="container">
          <h3> 在哪里?</h3>
          <h3 className="desc">zài nǎ lǐ?</h3> 
          <h3>Where is it?</h3>
        </div>
        <br/>
        <div className="container">
          <h3>到哪里？</h3>
          <h3 className="desc">dào nǎ lǐ?</h3> 
          <h3>Where to?</h3>
        </div>
        <br/>
        <div className="container">
          <h3>从哪里？</h3>
          <h3 className="desc">cóng nǎ lǐ?</h3> 
          <h3>Where from?</h3>
        </div>
        <br/>
        <div className="container">
          <h3>厕所在哪里？</h3>
          <h3 className="desc">cè suǒ zài nǎ lǐ?</h3> 
          <h3>Where is the restroom?</h3>
        </div>
      </div>

    );
  };
  
export default What;
  