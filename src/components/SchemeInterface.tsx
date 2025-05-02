import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { fetchMedicalBotResponse } from '../utils/api';
import '../styles/SchemeInterface.css';

interface Message {
  user: string;
  bot: string;
}

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", 
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", 
  "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const SchemeInterface: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [age, setAge] = useState('');
  const [state, setState] = useState('');
  const [gender, setGender] = useState('');
  const [profileSubmitted, setProfileSubmitted] = useState(false);
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
        bot: 'Welcome to the Medical Scheme Assistant! Please fill in your details and ask about available medical schemes.' 
      }
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!userInput.trim() || !age || !state || !gender || !profileSubmitted) {
      setChatHistory(prev => [
        ...prev,
        { 
          user: '', 
          bot: 'Please fill in all required fields (Age, State, and Gender) and submit your profile before sending your message.' 
        }
      ]);
      return;
    }

    setLoading(true);
    const userMessage = `Query: ${userInput}\nAge: ${age}\nState: ${state}\nGender: ${gender}`;

    setChatHistory(prev => [
      ...prev,
      { user: userMessage, bot: '...' }
    ]);
    setUserInput('');

    try {
      const botReply = await fetchMedicalBotResponse(userMessage);
      setChatHistory(prev => [
        ...prev.slice(0, -1),
        { user: userMessage, bot: botReply }
      ]);
    } catch (error) {
      setChatHistory(prev => [
        ...prev.slice(0, -1),
        { user: userMessage, bot: "Sorry, I couldn't process your request. Please ensure your local LM Studio server is running." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async () => {
    if (!age || !state || !gender) {
      setChatHistory(prev => [
        ...prev,
        {
          user: '',
          bot: 'Please fill in all required fields (Age, State, and Gender) before submitting your profile.'
        }
      ]);
      return;
    }
    setLoading(true);
    setChatHistory(prev => [
      ...prev,
      { user: '', bot: '...' }
    ]);
    try {
      const profileMessage = `Suggest 5 medical schemes for the following profile:\nAge: ${age}\nState: ${state}\nGender: ${gender}`;
      const botReply = await fetchMedicalBotResponse(profileMessage);
      setChatHistory(prev => [
        ...prev.slice(0, -1),
        { user: '', bot: botReply }
      ]);
      setProfileSubmitted(true);
    } catch (error) {
      setChatHistory(prev => [
        ...prev.slice(0, -1),
        { user: '', bot: "Sorry, I couldn't process your request. Please ensure your local LM Studio server is running." }
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
    <div className="scheme-container">
      <div className="scheme-header">
        <h3>Medical Scheme Assistant</h3>
        <p>Get information about medical schemes based on your profile</p>
      </div>

      <div className="user-details">
        <div className="input-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            min="0"
            max="120"
            disabled={profileSubmitted}
          />
        </div>

        <div className="input-group">
          <label htmlFor="state">State</label>
          <select
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled={profileSubmitted}
          >
            <option value="">Select your state</option>
            {indianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            disabled={profileSubmitted}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      {!profileSubmitted && (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '16px 0' }}>
          <button
            onClick={handleProfileSubmit}
            disabled={loading || !age || !state || !gender}
            style={{
              padding: '10px 24px',
              background: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.2s',
            }}
          >
            {loading ? 'Loading...' : 'Enter'}
          </button>
        </div>
      )}
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
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about medical schemes..."
          disabled={loading || !profileSubmitted}
          className="message-input"
        />
        <button
          onClick={handleSendMessage}
          disabled={loading || !userInput.trim() || !age || !state || !gender || !profileSubmitted}
          className={`send-button ${loading ? 'loading' : ''}`}
          aria-label="Send message"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default SchemeInterface;