import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import { fetchMedicalBotResponse } from '../utils/api';
import ExportChatButton from './ExportChatButton';
import '../styles/Chat.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm MediJI, your average AI Doctor with a desi background. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardActive, setCardActive] = useState(false);
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

  const handleCardClick = () => {
    setCardActive(true);
    setTimeout(() => setCardActive(false), 300); // Animation duration
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(18);
    doc.text('MediJI AI - Chat Session', 14, y);
    y += 12;
    doc.setFontSize(12);
    messages.forEach((msg) => {
      if (msg.role === 'user') {
        doc.setTextColor(178, 58, 72);
        const userLines = doc.splitTextToSize(`You: ${msg.content}`, 180);
        doc.text(userLines, 14, y);
        y += userLines.length * 7;
      }
      if (msg.role === 'assistant') {
        doc.setTextColor(34, 40, 49);
        const botLines = doc.splitTextToSize(`MEdiJI AI: ${msg.content}`, 180);
        doc.text(botLines, 14, y);
        y += botLines.length * 7;
      }
      y += 4;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save('MediJI-session.pdf');
  };  return (
    <div className="chatgpt-chat-page">
      <div className="chatgpt-intro">
        {/* Floating animated icons for extra visual appeal */}
        <img
          src="https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/heart-pulse.svg"
          alt="Heart Pulse"
          className="chatgpt-intro-floating heart"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/activity.svg"
          alt="Pulse"
          className="chatgpt-intro-floating pulse"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/stethoscope.svg"
          alt="Stethoscope"
          className="chatgpt-intro-floating stethoscope"
        />
        <img
          src="https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/stethoscope.svg"
          alt="AI Doctor Logo"
          className="chatgpt-intro-logo"
        />
        <h2>MediJI Chat</h2>
        <p>
          Ask your health questions and get instant, AI-powered answers.
        </p>
      </div>
      <div
        className={`chatgpt-chat-container${cardActive ? ' card-animate' : ''}`}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="chatgpt-chat-container-header-red">
          <h3>Chat with MediJI </h3>
          <span className="chatgpt-chat-container-header-desc">Ask me anything about general health concerns</span>
        </div>
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
      <ExportChatButton onExport={handleExportPDF} />
    </div>
  );
};

export default Chat;
