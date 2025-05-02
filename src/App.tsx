import React from 'react';
import { Stethoscope } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import SchemeInterface from './components/SchemeInterface';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = React.useState<'chat' | 'scheme'>('chat');
  const [transitioning, setTransitioning] = React.useState(false);
  const [displayPage, setDisplayPage] = React.useState<'chat' | 'scheme'>('chat');

  const handleNavClick = (page: 'chat' | 'scheme') => {
    if (page === currentPage) return;
    setTransitioning(true);
    setTimeout(() => {
      setDisplayPage(page);
      setCurrentPage(page);
      setTransitioning(false);
    }, 350); // match transition duration in CSS
  };

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
              onClick={() => handleNavClick('chat')}
            >
              Chat
            </button>
            <button 
              className={`nav-link ${currentPage === 'scheme' ? 'active' : ''}`}
              onClick={() => handleNavClick('scheme')}
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
        <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <h2>Virtual Medical Assistance</h2>
          <p>Ask our AI doctor about general medical advice, symptoms, and health concerns.</p>
        </div>
      </section>

      {/* Banner Section */}
      <section className="banner">
        <div className="banner-content">
          <h1>
            Your Personal <span className="banner-highlight">AI Medical</span> Assistant
          </h1>
          <p className="banner-desc">
            Get instant, reliable medical advice powered by advanced AI technology. Our system provides general medical guidance to help you make informed health decisions.
          </p>
          <div className="banner-buttons">
            <button className="banner-btn-primary" onClick={() => {
              const el = document.querySelector('.main-content');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }}>
              Try Now <span style={{marginLeft: 8}}>&rarr;</span>
            </button>
            <button className="banner-btn-secondary">Learn More</button>
          </div>
        </div>
        <div className="banner-chat-mockup">
          <div className="banner-chat-card">
            <div className="banner-chat-header">
              <div className="banner-chat-avatar"> <span role="img" aria-label="bot">🤖</span> </div>
              <div>
                <div className="banner-chat-title">MediAI Assistant</div>
                <div className="banner-chat-status">Online</div>
              </div>
            </div>
            <div className="banner-chat-bubble bot">Hello! I'm your AI medical assistant. How can I help you today?</div>
            <div className="banner-chat-bubble user">I have a headache. What should I do?</div>
          </div>
        </div>
      </section>
      {/* End Banner Section */}

      {/* Main Content with transition */}
      <main className={`main-content page-fade ${transitioning ? 'fade-out' : 'fade-in'}`}>
        {displayPage === 'chat' ? <ChatInterface /> : <SchemeInterface />}
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