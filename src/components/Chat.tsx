import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowDown } from 'lucide-react';
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-app-fullpage">
      <div className="chat-header-main chat-header-main-enhanced">
        <div className="chat-header-bg-shape"></div>
        <h2>MediChat AI</h2>
        <p>Ask your health questions and get instant <span className="chat-header-highlight">AI-powered answers</span>.</p>
        <div className="chat-header-badges">
          <span className="chat-badge">24/7 Virtual Doctor</span>
          <span className="chat-badge chat-badge-tip">Private & Secure</span>
        </div>
        <div className="chat-header-illustration">
          <img src="https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/stethoscope.svg" alt="Stethoscope" />
        </div>
      </div>
      <div className="chat-container chat-container-fullpage">
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
