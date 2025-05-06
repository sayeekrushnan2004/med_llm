import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import '../styles/NewsFeed.css';

const TOPICS = [
  'all',
  'nutrition',
  'mental health',
  'fitness',
  'medicine',
  'wellness',
  'disease',
  'technology',
];

const topicToQuery = (topic: string) => {
  if (topic === 'all') return 'health';
  if (topic === 'mental health') return 'mental';
  return topic;
};

const NewsFeed: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load news.');
        setLoading(false);
      });
  }, [topic]);

  return (
    <div className="main-content">
      <div className="news-header" style={{textAlign:'center', marginBottom:32}}>
        <h2 style={{color:'var(--accent)'}}>📰 AI Health News Feed</h2>
        <p style={{color:'var(--text-secondary)'}}>Curated, AI-personalized health news and articles. Filter by topic.</p>
        <div style={{margin:'24px 0', display:'flex', flexWrap:'wrap', gap:12, justifyContent:'center'}}>
          {TOPICS.map(t => (
            <button
              key={t}
              className={`banner-btn-secondary${topic===t?' active':''}`}
              style={{minWidth:100, fontWeight:600, background: topic===t?'var(--primary)':'', color: topic===t?'#fff':''}}
              onClick={()=>setTopic(t)}
            >
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {loading && <div style={{textAlign:'center', color:'var(--accent)'}}>Loading news...</div>}
      {error && <div style={{textAlign:'center', color:'var(--error)'}}>{error}</div>}
      <div className="news-feed-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))',gap:32}}>
        {articles
          .filter(a => topic === 'all' || (a.title + (a.summary || '')).toLowerCase().includes(topicToQuery(topic)))
          .map((a, i) => (
            <a
              key={i}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="news-card"
              style={{
                background:'var(--background-alt)',
                borderRadius:18,
                boxShadow:'0 4px 24px rgba(178,58,72,0.10)',
                color:'var(--text-light)',
                textDecoration:'none',
                display:'flex',
                flexDirection:'column',
                minHeight:340,
                transition:'box-shadow 0.2s,transform 0.2s',
                overflow:'hidden',
              }}
            >
              {a.image && <img src={a.image} alt={a.title} style={{width:'100%',height:180,objectFit:'cover'}} />}
              <div style={{padding:20,flex:1,display:'flex',flexDirection:'column'}}>
                <h3 style={{marginBottom:10, color:'var(--accent)'}}>{a.title}</h3>
                <p style={{flex:1, color:'var(--text-secondary)', fontSize:'1.05rem'}}>{a.summary}</p>
                <div className="news-meta" style={{marginTop:16, fontSize:'0.95rem', color:'var(--primary-light)'}}>
                  {a.url.replace('https://www.medicalnewstoday.com/', '').split('/')[0]}
                </div>
              </div>
            </a>
          ))}
      </div>
      {!loading && articles.length===0 && !error && (
        <div style={{textAlign:'center', color:'var(--text-secondary)', marginTop:32}}>No news found for this topic.</div>
      )}
    </div>
  );
};

export default NewsFeed;
