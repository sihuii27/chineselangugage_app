import '../styles/resources.css';
import { Table } from "antd";

const PinyinTones = () => {
    const columns = [
        {
          title: 'Chinese Character',
          dataIndex: 'chinese',
          key: 'chinese',
        },
        {
            title: 'Hanyu Pinyin',
            dataIndex: 'pinyin',
            key: 'pinyin',
        },
        {
            title: 'English Meaning',
            dataIndex: 'meaning',
            key: 'meaning',
        },
      ];
      const data = [
        {
          key: '1',
          chinese: '妈',
          pinyin: 'mā',
          meaning: 'mother'
        },
        {
            key: '2',
            chinese: '麻',
            pinyin: 'má',
            meaning: 'hemp'
        },
        {
            key: '3',
            chinese: '马',
            pinyin: 'mǎ',
            meaning: 'horse'
        },
        {
            key: '4',
            chinese: '骂',
            pinyin: 'mà',
            meaning: 'scold'
        },
      ];
    return (
      <div>
        <h1>Hanyu Pinyin</h1>
        <br/>
        <h2>Pinyin consists of three components:</h2>
        <ul>
          <li>Initials (consonants)</li>
          <li>Finals (vowels)</li>
          <li>Tones (pitch variations)</li>
        </ul>
        <h2>Tones in Pinyin</h2>
        <div className="container">
          <b>First Tone (ā):</b> High and flat
        </div>
        <br/>
        <div className="container">
          <b>Second Tone (á):</b> Rising, like asking a question
        </div>
        <br/>
        <div className="container">
          <b>Third Tone (ǎ):</b> Starts mid, dips down, then rises
        </div>
        <br/>
        <div className="container">
          <b>Fourth Tone (à):</b> Sharp and falling, like giving a command
        </div>
        <br/>
        <div className="container">
          <b>Neutral Tone (a):</b> Light and quick, no specific pitch
        </div>
        <br/>
        
        <h2>Examples of Pinyin:</h2>
        <Table columns={columns} dataSource={data} pagination={false} bordered />
      </div>

    );
  };
  
export default PinyinTones;
  