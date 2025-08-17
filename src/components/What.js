import '../styles/resources.css';
import { Table } from "antd";

const What = () => {
    return (
      <div>
        <h1>什么 (shén me) - What</h1>
        <br/>
        <div className="container">
          <h3>Noun: 什么东西?</h3>
          <h3 className="desc">shén me dōng xi?</h3> 
          <h3>What thing?</h3>
        </div>
        <br/>
        <div className="container">
          <h3>吃什么？</h3>
          <h3 className="desc">chī shén me?</h3> 
          <h3>What to eat?</h3>
        </div>
        <br/>
        <div className="container">
          <h3>你在做什么？</h3>
          <h3 className="desc">nǐ zài zuò shén me?</h3> 
          <h3>What are you doing?</h3>
        </div>
      </div>

    );
  };
  
export default What;
  