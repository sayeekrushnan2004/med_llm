import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowDown } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { fetchMedicalBotResponse } from '../utils/api';
import jsPDF from 'jspdf';
import '../styles/Chat.css';

interface Message {
  user: string;
  bot: string;
}

const Chat: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    inputRef.current?.focus();
    setChatHistory([
      {
        user: '',
        bot: "Hello! I'm MediChat AI, your virtual doctor assistant. How can I help you today?"
      }
    ]);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = chatMessagesRef.current;
      if (!container) return;
      // Show button if not at the bottom
      setShowScrollButton(
        container.scrollHeight - container.scrollTop - container.clientHeight > 40
      );
    };
    const container = chatMessagesRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initial check
      handleScroll();
    }
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, [chatHistory]);

  const handleScrollToBottom = () => {
    const container = chatMessagesRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    setLoading(true);
    const userMessage = userInput;
    setChatHistory((prev) => [
      ...prev,
      { user: userMessage, bot: '...' }
    ]);
    setUserInput('');
    try {
      const botReply = await fetchMedicalBotResponse(userMessage);
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { user: userMessage, bot: botReply }
      ]);
    } catch (error) {
      setChatHistory((prev) => [
        ...prev.slice(0, -1),
        { user: userMessage, bot: "Sorry, I couldn't process your request. Please ensure your local LM Studio server is running." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(18);
    doc.text('MediChat AI - Chat Session', 14, y);
    y += 12;
    doc.setFontSize(12);
  
    chatHistory.forEach((msg, idx) => {
      if (msg.user) {
        doc.setTextColor(178, 58, 72);
        const userLines = doc.splitTextToSize(`You: ${msg.user}`, 180);
        doc.text(userLines, 14, y);
        y += userLines.length * 7;
      }
      if (msg.bot) {
        doc.setTextColor(34, 40, 49);
        const botLines = doc.splitTextToSize(`AI: ${msg.bot}`, 180);
        doc.text(botLines, 14, y);
        y += botLines.length * 7;
      }
      y += 4; // extra space between messages
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
  
    doc.save('medichat-session.pdf');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-app-fullpage">
      <div className="model-card-preview" style={{margin: '0 auto', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="model-card-preview-inner">
          <div className="model-card-preview-content">
            <div className="model-card-header-row">
              <img className="model-card-avatar" src="https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/stethoscope.svg" alt="AI Doctor" />
              <div className="model-card-header-text">
                <h2>Medical AI Chat</h2>
                <p>Ask your health questions and get instant, AI-powered answers.</p>
              </div>
            </div>
            <div className="model-card-preview-chat">
              <div className="chat-messages-main" ref={chatMessagesRef}>
                {chatHistory.map((message, index) => (
                  <ChatMessage
                    key={index}
                    userMessage={message.user}
                    botMessage={message.bot}
                  />
                ))}
                <div ref={messagesEndRef} tabIndex={-1} />
                {showScrollButton && (
                  <button className="chat-scroll-btn" onClick={handleScrollToBottom} aria-label="Scroll to bottom">
                    <ArrowDown size={24} />
                  </button>
                )}
              </div>
            </div>
            <div className="chat-input-main">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your health question here..."
                disabled={loading}
                className="chat-input-box"
              />
              <button
                onClick={handleSendMessage}
                disabled={loading || !userInput.trim()}
                className={`chat-send-btn${loading ? ' loading' : ''}`}
                aria-label="Send message"
              >
                <Send size={20} />
              </button>
            </div>
          </div> {/* end of model-card-preview-content */}
        </div> {/* end of model-card-preview-inner */}
      </div> {/* end of model-card-preview */}
      <div className="chat-export-btn-row">
        <button className="chat-export-btn" onClick={handleExportPDF}>Export Chat as PDF</button>
      </div>
    </div>
  );
};

export default Chat;
