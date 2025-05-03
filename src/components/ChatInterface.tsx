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

const ChatPreviewBlurMessage: React.FC = () => (
  <div className="chat-blur-overlay">
    <div className="chat-blur-message">
      <h2>Continue the Conversation!</h2>
      <p>To unlock unlimited, uninterrupted medical chat, please visit the <a href="/chat" className="chat-blur-link">full chat page</a>.</p>
      <button className="chat-blur-btn" onClick={() => window.location.href = '/chat'}>
        Go to Full Chat &rarr;
      </button>
    </div>
  </div>
);

const ChatInterface: React.FC<ChatInterfaceProps> = ({ preview = false }) => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [blurPreview, setBlurPreview] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  useEffect(() => {
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

    if (preview && chatHistory.filter(m => m.user).length === 1) {
      setTimeout(() => {
        setBlurPreview(true);
      }, 500);
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
    <div className="chat-container-wrapper" style={{position: 'relative'}}>
      <div className={`chat-container${preview && blurPreview ? ' blurred' : ''}`}>
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
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="input-container">
          <input
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
      </div>
      {preview && blurPreview && (
        <ChatPreviewBlurMessage />
      )}
    </div>
  );
};

export default ChatInterface;