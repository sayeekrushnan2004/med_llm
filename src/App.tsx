import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import './styles/App.css';

function ChatPage() {
  return (
    <main className="main-content">
      <ChatInterface />
    </main>
  );
}

function AppContent() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = React.useState<'chat' | 'scheme'>('chat');

  const handleNavClick = (page: 'chat' | 'scheme') => {
    if (page === currentPage) return;
    setCurrentPage(page);
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
            <Link 
              to="/"
              className={`nav-link${location.pathname === '/' ? ' active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/chat"
              className={`nav-link${location.pathname === '/chat' ? ' active' : ''}`}
            >
              Chat
            </Link>
            <Link 
              to="/scheme"
              className={`nav-link${location.pathname === '/scheme' ? ' active' : ''}`}
            >
              Scheme
            </Link>
            <Link to="#" className="nav-link">About</Link>
            <Link to="#" className="nav-link">Contact</Link>
          </nav>
        </div>
      </header>

      {/* Only show homepage sections on / */}
      <Routes>
        <Route path="/" element={
          <>
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

            {/* Features Section */}
            <section className="features-section" style={{padding: '72px 0 72px 0', background: '#fff', borderBottom: '1px solid #e3e8ee', marginBottom: '64px'}}>
              <div className="features-container" style={{maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 48}}>
                <h2 style={{fontSize: '2.2rem', fontWeight: 700, color: '#B23A48', marginBottom: 12}}>Why Choose MediChat AI?</h2>
                <div className="features-list" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 40, width: '100%'}}>
                  <div className="feature-card" style={{flex: '1 1 220px', minWidth: 220, maxWidth: 260, background: '#f7fafd', borderRadius: 16, boxShadow: '0 4px 16px rgba(178,58,72,0.06)', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
                    <span style={{fontSize: 36, color: '#B23A48'}} role="img" aria-label="stethoscope">🩺</span>
                    <h3 style={{fontWeight: 600, fontSize: '1.2rem'}}>Symptom Checker</h3>
                    <p style={{color: '#495057'}}>Get instant guidance on symptoms and possible causes, anytime.</p>
                  </div>
                  <div className="feature-card" style={{flex: '1 1 220px', minWidth: 220, maxWidth: 260, background: '#f7fafd', borderRadius: 16, boxShadow: '0 4px 16px rgba(178,58,72,0.06)', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
                    <span style={{fontSize: 36, color: '#B23A48'}} role="img" aria-label="bulb">💡</span>
                    <h3 style={{fontWeight: 600, fontSize: '1.2rem'}}>Health Tips</h3>
                    <p style={{color: '#495057'}}>Personalized wellness tips to help you stay healthy every day.</p>
                  </div>
                  <div className="feature-card" style={{flex: '1 1 220px', minWidth: 220, maxWidth: 260, background: '#f7fafd', borderRadius: 16, boxShadow: '0 4px 16px rgba(178,58,72,0.06)', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
                    <span style={{fontSize: 36, color: '#B23A48'}} role="img" aria-label="lock">🔒</span>
                    <h3 style={{fontWeight: 600, fontSize: '1.2rem'}}>Privacy & Security</h3>
                    <p style={{color: '#495057'}}>Your health data is confidential and never shared with third parties.</p>
                  </div>
                  <div className="feature-card" style={{flex: '1 1 220px', minWidth: 220, maxWidth: 260, background: '#f7fafd', borderRadius: 16, boxShadow: '0 4px 16px rgba(178,58,72,0.06)', padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16}}>
                    <span style={{fontSize: 36, color: '#B23A48'}} role="img" aria-label="clock">⏰</span>
                    <h3 style={{fontWeight: 600, fontSize: '1.2rem'}}>24/7 Availability</h3>
                    <p style={{color: '#495057'}}>Access medical guidance any time, day or night, from anywhere.</p>
                  </div>
                </div>
              </div>
            </section>
            {/* End Features Section */}

            {/* Expanded Space & New Functionalities Section */}
            <section className="expanded-space-section">
              <div className="expanded-space-grid">
                <div className="expanded-card">
                  <div className="expanded-icon" style={{background: 'rgba(178,58,72,0.08)'}}>
                    <span role="img" aria-label="bulb">💡</span>
                  </div>
                  <h2>How It Works</h2>
                  <ol>
                    <li>Type your health question or concern.</li>
                    <li>Our AI analyzes your input and provides instant guidance.</li>
                    <li>Get suggestions, tips, and next steps for your well-being.</li>
                  </ol>
                </div>
                <div className="expanded-card">
                  <div className="expanded-icon" style={{background: 'rgba(178,58,72,0.08)'}}>
                    <span role="img" aria-label="topics">📚</span>
                  </div>
                  <h2>Popular Health Topics</h2>
                  <ul>
                    <li>Fever & Cough</li>
                    <li>Headache & Migraine</li>
                    <li>Nutrition & Diet</li>
                    <li>Mental Wellness</li>
                    <li>Child Health</li>
                  </ul>
                </div>
                <div className="expanded-card expanded-card-schemes">
                  <div className="expanded-icon" style={{background: 'rgba(178,58,72,0.08)'}}>
                    <span role="img" aria-label="government">🏛️</span>
                  </div>
                  <h2>Explore Government Schemes</h2>
                  <p>Discover medical schemes tailored for you. Click below to view available options and eligibility.</p>
                  <button
                    className="banner-btn-primary expanded-schemes-btn"
                    onClick={() => handleNavClick('scheme')}
                  >
                    View Schemes &rarr;
                  </button>
                </div>
              </div>
            </section>
            {/* End Expanded Space & New Functionalities Section */}

            {/* Model Card Preview at Bottom of Home */}
            <div style={{width: '100%', display: 'flex', justifyContent: 'center', margin: '64px 0 0 0'}}>
              <div style={{maxWidth: 900, width: '100%'}}>
                <div style={{background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(178,58,72,0.07)', padding: 32, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <h2 style={{color: '#B23A48', fontWeight: 700, fontSize: '1.5rem', marginBottom: 12}}>Preview: Medical AI Chat</h2>
                  <p style={{color: '#495057', fontSize: '1.08rem', textAlign: 'center', marginBottom: 18}}>
                    Try our AI-powered medical chat assistant below. For a full experience, visit the Chat page.
                  </p>
                  <div style={{width: '100%', maxWidth: 800, margin: '0 auto'}}>
                    <ChatInterface />
                  </div>
                  <button
                    className="banner-btn-primary"
                    style={{fontSize: '1.1rem', padding: '12px 32px', borderRadius: 32, marginTop: 24}}
                    onClick={() => window.location.href = '/chat'}
                  >
                    Open Full Chat &rarr;
                  </button>
                </div>
              </div>
            </div>
          </>
        } />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

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

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;