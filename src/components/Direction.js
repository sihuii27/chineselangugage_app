import '../styles/resources.css';
import { Table } from "antd";

const Direction = () => {
  const columns = [
    {
      title: 'Direction Type',
      dataIndex: 'chinese',
      key: 'chinese',
    },
    {
        title: 'Description',
        dataIndex: 'meaning',
        key: 'meaning',
    },
    {
      title: 'Example',
      dataIndex: 'example',
      key: 'example',
    },
  ];
  const data = [
    {
      key: '1',
      chinese: 'Basic Directional Complement',
      meaning: 'Basic directional words used to indicate direction or movement',
      example: '上 (shàng) - up, 下 (xià) - down, 进 (jìn) - in, 出 (chū) - out， he, 起 (qǐ) - rise, 过 (guò) - pass',
    },
    {
        key: '2',
        chinese: 'Compound Directional Complement',
        meaning: 'Compound directional words formed by combining basic directional words',
        example: '上去 (shàng qù) - go up, 下来 (xià lái) - come down, 进去 (jìn qù) - go in, 出来 (chū lái) - come out, 起来 (qǐ lái) - get up, 过去 (guò qù) - go past',
    },
  ];
    return (
      <div>
        <h1>Basic Directional Complement</h1>
        <br/>
        <Table columns={columns} dataSource={data} pagination={false} bordered />
        <br/>
        <h2>Sentence Structure: Subject + Verb + Directional Complement + Details/Object (If any)</h2>
        <br/>
        <div className="container">
            <h3>我们走上楼梯。</h3>
            <h3 className="desc">wǒ men zǒu shàng lóu tī</h3>
            <h3>We walk up the stairs.</h3>
        </div>
        <br/>
        <div className="container">
            <h3>他跑回家。</h3>
            <h3 className="desc">tā pǎo huí jiā</h3>
            <h3>He runs home.</h3>
        </div>
        <br/>
        <div className="container">
            <h3>她走出房间。</h3>
            <h3 className="desc">tā zǒu chū fáng jiān</h3>
            <h3>She walks out of the room.</h3>
        </div>
        <br/>
        <div className="container">
            <h3>他们走下去了。</h3>
            <h3 className="desc">tā men zǒu xià qù le</h3>
            <h3>They walked down.</h3>
        </div>
        <br/>
        <div className="container">
            <h3>快过来！</h3>
            <h3 className="desc">kuài guò lái</h3>
            <h3>Come over quickly!</h3>
        </div>
        <br/>
        <div className="container">
            <h3>她进去房间了。</h3>
            <h3 className="desc">tā jìn qù fáng jiān le</h3>
            <h3>She went into the room.</h3> 
        </div>
        <br/>
        <div className="container">
            <h3>他从医院出来了。</h3>
            <h3 className="desc">tā cóng yī yuàn chū lái le</h3>
            <h3>He came out of the hospital.</h3>
        </div>
      </div>

    );
  };
  
export default Direction;
  