import React, { useState, useRef, useEffect } from 'react';
import { fetchMedicalBotResponse } from '../utils/api';
import '../styles/Chat.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm MediChat AI, your virtual doctor assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const botReply = await fetchMedicalBotResponse(input);
      setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I couldn't process your request. Please ensure your local LM Studio server is running." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatgpt-chat-page">
      <div className="chatgpt-chat-container">
        <div className="chatgpt-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chatgpt-message ${msg.role}`}>
              <div className="chatgpt-avatar">{msg.role === 'user' ? '🧑' : '🤖'}</div>
              <div className="chatgpt-bubble">{msg.content}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatgpt-input-row">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={loading}
            className="chatgpt-input"
          />
          <button onClick={handleSend} disabled={loading || !input.trim()} className="chatgpt-send-btn">
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
