import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { fetchMedicalBotResponse } from '../utils/api';
import '../styles/ChatInterface.css';

interface Message {
  user: string;
  bot: string;
}

interface ChatInterfaceProps {
  preview?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ preview = false }) => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [blurPreview, setBlurPreview] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
    // Focus the input field when the component mounts
    inputRef.current?.focus();
    
    // Add a welcome message
    setChatHistory([
      { 
        user: '', 
        bot: 'Hello! I\'m MediChat AI, your virtual doctor assistant. How can I help you today?' 
      }
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    const userMessage = userInput;
    setChatHistory((prev) => [
      ...prev,
      { user: userMessage, bot: '...' }
    ]);
    setUserInput('');

    // Blur after second user message in preview mode
    if (preview && chatHistory.filter(m => m.user).length === 1) {
      setTimeout(() => setBlurPreview(true), 500); // allow bot to reply, then blur
    }

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container" style={preview && blurPreview ? {filter: 'blur(4px)', pointerEvents: 'none', position: 'relative'} : {position: 'relative'}}>
      <div className="chat-header">
        <h3>Chat with Medical AI</h3>
        <p>Ask me anything about general health concerns</p>
      </div>
      
      <div className="messages-container">
        {chatHistory.map((message, index) => (
          <ChatMessage 
            key={index} 
            userMessage={message.user} 
            botMessage={message.bot} 
            isTyping={index === chatHistory.length - 1 && message.bot === '...'}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="input-container">
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your health question here..."
          disabled={loading}
          className="message-input"
        />
        <button 
          onClick={handleSendMessage} 
          disabled={loading || !userInput.trim()} 
          className={`send-button ${loading ? 'loading' : ''}`}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>

      {preview && blurPreview && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          color: '#B23A48',
          fontWeight: 700,
          fontSize: '1.3rem',
          background: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
        }}>
          Get full chat at our chat service
        </div>
      )}
    </div>
  );
};

export default ChatInterface;