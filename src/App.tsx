import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import Chat from './components/Chat';
import SchemeInterface from './components/SchemeInterface';
import './styles/App.css';

function ChatPage() {
  return (
    <main className="main-content">
      <Chat />
    </main>
  );
}

function SchemePage() {
  return (
    <main className="main-content">
      <SchemeInterface />
    </main>
  );
}

function AppContent() {
  const location = useLocation();

  // Ripple effect for nav buttons
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('nav-ripple');
    const ripple = button.getElementsByClassName('nav-ripple')[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
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
              onClick={handleNavClick}
            >
              Home
            </Link>
            <Link 
              to="/chat"
              className={`nav-link${location.pathname === '/chat' ? ' active' : ''}`}
              onClick={handleNavClick}
            >
              Chat
            </Link>
            <Link 
              to="/scheme"
              className={`nav-link${location.pathname === '/scheme' ? ' active' : ''}`}
              onClick={handleNavClick}
            >
              Scheme
            </Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section */}
            <section className="hero">
              <div className="hero-content">
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
                    window.location.href = '/chat';
                  }}>
                    Try Now <span className="banner-btn-arrow">&rarr;</span>
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

            {/* Features Section */}
            <section className="features-section">
              <div className="features-container">
                <h2>Why Choose MediChat AI?</h2>
                <div className="features-list">
                  {[
                    { icon: '🩺', title: 'Symptom Checker', desc: 'Get instant guidance on symptoms and possible causes, anytime.' },
                    { icon: '💡', title: 'Health Tips', desc: 'Personalized wellness tips to help you stay healthy every day.' },
                    { icon: '🔒', title: 'Privacy & Security', desc: 'Your health data is confidential and never shared with third parties.' },
                    { icon: '⏰', title: '24/7 Availability', desc: 'Access medical guidance any time, day or night, from anywhere.' }
                  ].map((f, i) => (
                    <div className="feature-card" key={i}>
                      <span className="feature-icon" role="img" aria-label={f.title}>{f.icon}</span>
                      <h3>{f.title}</h3>
                      <p>{f.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Expanded Space & New Functionalities Section */}
            <section className="expanded-space-section">
              <div className="expanded-space-grid">
                <div className="expanded-card">
                  <div className="expanded-icon">
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
                  <div className="expanded-icon">
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
                  <div className="expanded-icon">
                    <span role="img" aria-label="government">🏛️</span>
                  </div>
                  <h2>Explore Government Schemes</h2>
                  <p>Discover medical schemes tailored for you. Click below to view available options and eligibility.</p>
                  <Link to="/scheme" className="banner-btn-primary expanded-schemes-btn">
                    View Schemes &rarr;
                  </Link>
                </div>
              </div>
            </section>

            {/* Model Card Preview at Bottom of Home */}
            <div className="model-card-preview">
              <div className="model-card-preview-inner">
                <div className="model-card-preview-content">
                  <div className="model-card-header-row">
                    <img className="model-card-avatar" src="https://cdn.jsdelivr.net/gh/lucide-icons/lucide/icons/stethoscope.svg" alt="AI Doctor" />
                    <div className="model-card-header-text">
                      <h2>Preview: Medical AI Chat</h2>
                      <p>Try our AI-powered medical chat assistant below. For a full experience, visit the Chat page.</p>
                    </div>
                  </div>
                  <div className="model-card-preview-chat">
                    <ChatInterface preview={true} />
                  </div>
                  <button
                    className="banner-btn-primary model-card-preview-btn"
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
        <Route path="/scheme" element={<SchemePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Footer */}
      <footer className="footer">
        <img className="footer-bg-img" src="https://images.unsplash.com/photo-1512070679279-c2f999098c01?auto=format&fit=crop&w=1600&q=80" alt="footer medical banner" />
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