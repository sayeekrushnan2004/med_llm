import React from 'react';
import { Stethoscope } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import SchemeInterface from './components/SchemeInterface';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = React.useState<'chat' | 'scheme'>('chat');

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <Stethoscope size={28} />
            <h1>MediChat AI</h1>
          </div>
          <nav className="nav">
            <button 
              className={`nav-link ${currentPage === 'chat' ? 'active' : ''}`}
              onClick={() => setCurrentPage('chat')}
            >
              Chat
            </button>
            <button 
              className={`nav-link ${currentPage === 'scheme' ? 'active' : ''}`}
              onClick={() => setCurrentPage('scheme')}
            >
              Scheme
            </button>
            <a href="#" className="nav-link">About</a>
            <a href="#" className="nav-link">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Virtual Medical Assistance</h2>
          <p>Ask our AI doctor about general medical advice, symptoms, and health concerns.</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="main-content">
        {currentPage === 'chat' ? <ChatInterface /> : <SchemeInterface />}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 MediChat AI. This is a demonstration project and not intended for actual medical diagnosis.</p>
          <p>Always consult a real healthcare professional for medical advice.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;