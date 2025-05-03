import React from 'react';
import { User, Bot } from 'lucide-react';
import '../styles/ChatMessage.css';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  userMessage: string;
  botMessage: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ userMessage, botMessage }) => {
  return (
    <div className="message-group">
      {userMessage && (
        <div className="message user-message">
          <div className="message-avatar user-avatar">
            <User size={20} />
          </div>
          <div className="message-content">
            <div className="message-bubble user-bubble">
              <p>{userMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="message bot-message">
        <div className="message-avatar bot-avatar">
          <Bot size={20} />
        </div>
        <div className="message-content">
          <div className="message-bubble bot-bubble">
            <ReactMarkdown>{botMessage}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;