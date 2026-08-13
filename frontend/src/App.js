import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://sprint11-prodesk.onrender.com/api/items';

function App() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_BASE_URL);
      setItems(response.data);
    } catch (err) {
      setError('Backend connection failed. Ensure server is active on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert('Title and Description are required.');

    setSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('image', file);
    }

    try {
      const response = await axios.post(API_BASE_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setItems([response.data, ...items]);
      setTitle('');
      setDescription('');
      setFile(null);
      e.target.reset();
    } catch (err) {
      setError('Failed to inject new document into MongoDB.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      setError('Failed to delete document from database.');
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Header Banner */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.badge}></div>
          <h1 style={styles.title}>System Integration Dashboard</h1>
          <p style={styles.subtitle}>MongoDB • Express • React • Node.js (MERN Stack Architecture)</p>
        </div>
      </header>

      <main style={styles.mainLayout}>
        {/* Error Boundary Banner */}
        {error && (
          <div style={styles.errorAlert}>
            <span style={{ fontWeight: 'bold' }}>⚠️ Connection Alert:</span> {error}
          </div>
        )}

        {/* Section 1: Data Injection Form */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Inject Document Payload</h2>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Title Payload</label>
              <input
                type="text"
                placeholder="e.g. System Integration Benchmark"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Description Body</label>
              <textarea
                placeholder="Enter details regarding this database document..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...styles.input, minHeight: '90px', resize: 'vertical' }}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Asset Attachment (FormData Stream / Multer / Cloudinary)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                style={styles.fileInput}
              />
            </div>

            <button type="submit" disabled={submitting} style={submitting ? styles.buttonDisabled : styles.buttonPrimary}>
              {submitting ? 'Streaming Payload...' : '+ Dispatch Payload to MongoDB'}
            </button>
          </form>
        </section>

        {/* Section 2: Database Render Feed */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>Persisted Database Documents</h2>
            <span style={styles.countBadge}>{items.length} Records</span>
          </div>

          {loading ? (
            <div style={styles.stateContainer}>
              <div style={styles.spinner}></div>
              <p style={{ color: '#64748b', marginTop: '10px' }}>Hydrating client state from database...</p>
            </div>
          ) : items.length === 0 ? (
            <div style={styles.stateContainer}>
              <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>No database records found. Inject a payload above.</p>
            </div>
          ) : (
            <div style={styles.grid}>
              {items.map((item) => (
                <div key={item._id} style={styles.itemCard}>
                  {item.imageUrl && (
                    <div style={styles.imageWrapper}>
                      <img src={item.imageUrl} alt={item.title} style={styles.itemImage} />
                    </div>
                  )}
                  <div style={styles.itemContent}>
                    <div style={styles.itemHeader}>
                      <h3 style={styles.itemTitle}>{item.title}</h3>
                      <button onClick={() => handleDelete(item._id)} style={styles.deleteBtn}>
                        Delete
                      </button>
                    </div>
                    <p style={styles.itemDescription}>{item.description}</p>
                    <div style={styles.itemFooter}>
                      <span style={styles.idCode}>ID: {item._id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// Inline Glassmorphism & Modern Dashboard Styles
const styles = {
  pageContainer: {
    minHeight: '100vh',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    paddingBottom: '60px'
  },
  header: {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    borderBottom: '1px solid #334155',
    padding: '40px 20px',
    textAlign: 'center'
  },
  headerContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(59, 130, 246, 0.15)',
    color: '#60a5fa',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    marginBottom: '12px',
    border: '1px solid rgba(96, 165, 250, 0.3)'
  },
  title: {
    margin: '0 0 10px 0',
    fontSize: '2.2rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    color: '#ffffff'
  },
  subtitle: {
    margin: 0,
    color: '#94a3b8',
    fontSize: '1rem'
  },
  mainLayout: {
    maxWidth: '850px',
    margin: '30px auto 0 auto',
    padding: '0 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px'
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    border: '1px solid #334155',
    padding: '24px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid #334155'
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#f1f5f9'
  },
  phaseTag: {
    fontSize: '0.75rem',
    backgroundColor: '#334155',
    color: '#cbd5e1',
    padding: '4px 10px',
    borderRadius: '6px',
    fontWeight: '600'
  },
  countBadge: {
    fontSize: '0.8rem',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '3px 10px',
    borderRadius: '12px',
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#cbd5e1'
  },
  input: {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '8px',
    padding: '12px',
    color: '#f8fafc',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  fileInput: {
    backgroundColor: '#0f172a',
    border: '1px dashed #475569',
    borderRadius: '8px',
    padding: '10px',
    color: '#94a3b8',
    fontSize: '0.875rem',
    cursor: 'pointer'
  },
  buttonPrimary: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '8px',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
  },
  buttonDisabled: {
    backgroundColor: '#475569',
    color: '#94a3b8',
    padding: '12px 20px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '700',
    fontSize: '1rem',
    cursor: 'not-allowed',
    marginTop: '8px'
  },
  errorAlert: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    color: '#fca5a5',
    padding: '14px',
    borderRadius: '8px',
    fontSize: '0.9rem'
  },
  stateContainer: {
    textAlign: 'center',
    padding: '40px 0'
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  itemCard: {
    backgroundColor: '#0f172a',
    borderRadius: '10px',
    border: '1px solid #334155',
    padding: '18px',
    display: 'flex',
    gap: '18px',
    alignItems: 'flex-start'
  },
  imageWrapper: {
    flexShrink: 0
  },
  itemImage: {
    width: '90px',
    height: '90px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #334155'
  },
  itemContent: {
    flexGrow: 1
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '6px'
  },
  itemTitle: {
    margin: 0,
    fontSize: '1.1rem',
    fontWeight: '700',
    color: '#f8fafc'
  },
  itemDescription: {
    margin: '0 0 12px 0',
    color: '#94a3b8',
    fontSize: '0.925rem',
    lineHeight: '1.4'
  },
  itemFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  idCode: {
    fontSize: '0.75rem',
    fontFamily: 'monospace',
    color: '#64748b',
    backgroundColor: '#1e293b',
    padding: '2px 8px',
    borderRadius: '4px'
  },
  deleteBtn: {
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    color: '#f87171',
    border: '1px solid rgba(239, 68, 68, 0.3)',
    padding: '5px 12px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '600',
    cursor: 'pointer'
  }
};

export default App;