'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('motivational');

  const fetchQuote = async (cat = category) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/quotes?category=${cat}`);
      const data = await res.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (err) {
      console.error('Failed to fetch:', err);
      setQuote("Oops! Couldn't load quote.");
      setAuthor('');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, [category]); // re-fetch on category change

  const categories = ['motivational', 'funny', 'philosophy', 'tech'];

  return (
    <main style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.heading}>💡 QuoteVault</h1>
        {loading ? (
          <p style={styles.quote}>Loading...</p>
        ) : (
          <>
            <p style={styles.quote}>"{quote}"</p>
            <p style={styles.author}>- {author}</p>
          </>
        )}

        <div style={styles.buttonGroup}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                ...styles.button,
                backgroundColor: category === cat ? '#2563eb' : '#e5e7eb',
                color: category === cat ? '#fff' : '#111827',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <button onClick={() => fetchQuote()} style={styles.refresh}>
          🔄 Surprise Me
        </button>
      </div>
    </main>
  );
}

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#1f2937',
  },
  quote: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#374151',
  },
  author: {
    fontSize: '1rem',
    fontStyle: 'italic',
    marginBottom: '1.5rem',
    color: '#6b7280',
  },
  buttonGroup: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  refresh: {
    backgroundColor: '#10b981',
    color: '#fff',
    padding: '0.6rem 1.2rem',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};
