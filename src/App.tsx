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
        <img 
          src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1200&q=80" 
          alt="Medical theme" 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.18,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
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
        <img className="footer-bg-img" src="https://images.unsplash.com/photo-1512070679279-c2f999098c01?auto=format&fit=crop&w=1600&q=80" alt="footer medical banner" style={{position:'absolute',left:0,top:0,width:'100%',height:'100%',objectFit:'cover',opacity:0.18,zIndex:0,pointerEvents:'none'}} />
        <div className="footer-content">
          <p>© 2025 MediChat AI. This is a demonstration project and not intended for actual medical diagnosis.</p>
          <p>Always consult a real healthcare professional for medical advice.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;