import '../styles/resources.css';
import { Table } from "antd";

const How = () => {
    return (
      <div>
        <h1>怎么 (zěn me) - How</h1>
        <br/>
        <div className="container">
            <h3>你怎么来？</h3>
            <h3 className="desc">nǐ zěn me lái?</h3> 
            <h3>How are you coming?</h3>
        </div>
        <br/>
        <div className="container">
            <h3>你怎么样？</h3>
            <h3 className="desc">nǐ zěn me qù?</h3> 
            <h3>How are you doing?</h3>
        </div>
        <br/>
        <div className="container">
            <h3>你怎么做？</h3>
            <h3 className="desc">nǐ zěn me zuò?</h3> 
            <h3>How do you do it?</h3>
        </div>
        <br/>
        <h1>Other question words using How</h1>
        <div className="container">
            <h3>几</h3>
            <h3 className="desc">jǐ</h3>
            <h3>How many</h3> 
        </div>

        <br/>
        <div className="container">
            <h3>多少</h3>
            <h3 className="desc">dūo shǎo</h3>
            <h3>How much</h3>
        </div>

        <br/>
        <div className="container">
            <h3>几岁</h3>
            <h3 className="desc">jǐ suì</h3>
            <h3>How old</h3>
        </div>
      </div>

    );
  };
  
export default How;
  