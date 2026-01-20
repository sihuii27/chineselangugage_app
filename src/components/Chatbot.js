import React, { useState } from 'react';
import { FloatButton, Modal, Input, Button, Space } from 'antd';
import { MessageOutlined, SendOutlined } from '@ant-design/icons';

const Chatbot = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m your Chinese learning assistant. Ask me anything about the materials, grammar, pronunciation, or practice questions!',
      content2: 'I am not perfect and I might make mistakes sometimes so when in doubt please still double check with your tutor!' 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  
  return (
    <>
      <FloatButton
        icon={<MessageOutlined />}
        type="primary"
        style={{ right: 24, bottom: 24 }}
        onClick={() => setChatOpen(true)}
        tooltip="Ask AISihui Tutor"
      />

      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageOutlined />
            <span>Chinese Learning Assistant</span>
          </div>
        }
        open={chatOpen}
        onCancel={() => setChatOpen(false)}
        footer={null}
        width={600}
        styles={{
          body: { padding: 0 }
        }}
      >
        <div style={{ 
          height: '500px', 
          display: 'flex', 
          flexDirection: 'column' 
        }}>
          {/* Messages Area */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '16px',
            backgroundColor: '#f5f5f5'
          }}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '12px',
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: '70%',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    backgroundColor: msg.role === 'user' ? '#1890ff' : '#fff',
                    color: msg.role === 'user' ? '#fff' : '#000',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}>
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div style={{ 
            padding: '16px', 
            borderTop: '1px solid #f0f0f0',
            backgroundColor: '#fff'
          }}>
            <Space.Compact style={{ width: '100%' }}>
              <Input
                placeholder="Ask a question about any material..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={loading}
              />
              <Button 
                type="primary" 
                icon={<SendOutlined />}
                loading={loading}
              >
                Send
              </Button>
            </Space.Compact>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Chatbot;