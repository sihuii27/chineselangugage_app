import { Table, Button } from 'antd';
const pdfData = [
  {
    key: '1',
    title: 'Numbers, Date and Time',
    file: '/slides/Chinese_Lesson_2.pdf',
  },
  {
    key: '2',
    title: 'Grammar and Conversations',
    file: '/slides/Chinese_Lesson_3.pdf',
  },
  {
    key: '3',
    title: 'Hospital Conversations',
    file: '/slides/Chinese_Lesson_4.pdf',
  },
  {
    key: '4',
    title: 'Food and Conversations',
    file: '/slides/Chinese_Lesson_6.pdf',
  },
  {
    key: '5',
    title: 'Family and Conversations',
    file: '/slides/Chinese_Lesson_7.pdf',
  },
  {
    key: '6',
    title: 'Body Organs and Parts',
    file: '/slides/Chinese_Lesson_8.pdf',
  },
];

const columns = [
  {
    title: 'Slide Materials',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Download',
    key: 'download',
    render: (_, record) => (
      <a href={record.file} download>
        <Button type="default">Download PDF</Button>
      </a>
    ),
  },
];

const Slides = () => {
  return (
    <>
      <h3>Slides Resources are available to download:</h3>
      <Table columns={columns} dataSource={pdfData} pagination={false} />
    </>
  );
};

export default Slides;