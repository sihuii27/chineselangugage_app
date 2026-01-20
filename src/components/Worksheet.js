import { Table, Button } from 'antd';
const pdfData = [
  {
    key: '1',
    title: 'Practice 1',
    file: '/slides/Chinese1.pdf',
  },
  {
    key: '2',
    title: 'Practice 2',
    file: '/slides/Chinese2.pdf',
  },
  {
    key: '3',
    title: 'Practice 3',
    file: '/slides/Chinese3.pdf',
  },
];

const columns = [
  {
    title: 'Worksheet Materials',
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

const Worksheet = () => {
  return (
    <>
      <h3>Worksheet Resources are available to download:</h3>
      <Table columns={columns} dataSource={pdfData} pagination={false} />
    </>
  );
};

export default Worksheet;