import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { fetchMedicalBotResponse } from '../utils/api';
import '../styles/Chat.css';

interface Message {
  user: string;
  bot: string;
}

const Chat: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-app-fullpage">
      <div className="chat-header-main">
        <h2>MediChat AI</h2>
        <p>Ask your health questions and get instant AI-powered answers.</p>
      </div>
      <div className="chat-container chat-container-fullpage">
        <div className="chat-messages-main">
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
      </div>
    </div>
  );
};

export default Chat;
