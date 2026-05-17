import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, RefreshCw, Zap, ArrowLeft } from 'lucide-react';
import UploadZone from './components/UploadZone';
import AnalysisOverlay from './components/AnalysisOverlay';
import PatternList from './components/PatternList';
import { analyzeImage } from './services/gemini';

function App() {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detections, setDetections] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async (uploadedFile) => {
    // Basic validation
    if (!uploadedFile) return;

    setFile(uploadedFile);
    const url = URL.createObjectURL(uploadedFile);
    setImageSrc(url);
    setIsAnalyzing(true);
    setDetections([]);
    setError(null);

    try {
      const results = await analyzeImage(uploadedFile);
      // Ensure bounding boxes are valid
      const validatedResults = (results || []).map(r => ({
        ...r,
        boundingBox: Array.isArray(r.boundingBox) ? r.boundingBox : [0,0,0,0],
        severity: r.severity || 'Low',
        type: r.type || 'Unknown Pattern'
      }));
      setDetections(validatedResults);
    } catch (err) {
      setError("Analysis failed. This could be due to API constraints or connectivity.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    if (imageSrc) URL.revokeObjectURL(imageSrc);
    setFile(null);
    setImageSrc(null);
    setDetections([]);
    setSelectedPattern(null);
    setError(null);
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="logo-section" onClick={reset} style={{ cursor: 'pointer' }}>
          <div className="logo-icon">
            <ShieldAlert size={32} color="var(--accent)" />
          </div>
          <h1>UX Guardian <span className="beta-tag">AI</span></h1>
        </div>
        <nav>
          <a href="#" className="nav-link"><Zap size={16} /> Detection Engine</a>
          {file && <button className="button-secondary" onClick={reset}>Scan Another</button>}
        </nav>
      </header>

      <main className="content">
        <AnimatePresence mode="wait">
          {!file ? (
            <UploadZone key="upload" onUpload={handleUpload} isAnalyzing={isAnalyzing} />
          ) : (
            <motion.div 
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="results-layout"
            >
              <div className="left-panel">
                <AnalysisOverlay 
                  imageSrc={imageSrc} 
                  detections={detections} 
                  onSelectPattern={setSelectedPattern} 
                />
              </div>
              
              <div className="right-panel">
                {isAnalyzing ? (
                  <div className="loading-state glass-card">
                    <RefreshCw className="spin" size={48} color="var(--accent)" />
                    <h3>Analyzing Visual Trust...</h3>
                    <p>Gemini is identifying deceptive UI patterns.</p>
                  </div>
                ) : (
                  <>
                    {error ? (
                      <div className="glass-card error-card">
                        <ShieldAlert color="var(--danger)" size={48} />
                        <h3>Scan Interrupted</h3>
                        <p>{error}</p>
                        <button className="button-primary" onClick={reset}>Go Back</button>
                      </div>
                    ) : (
                      <PatternList 
                        detections={detections} 
                        selectedPattern={selectedPattern}
                        onSelectPattern={setSelectedPattern}
                      />
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="main-footer">
        <p>&copy; 2024 UX Guardian AI. Built for Digital Transparency.</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .app-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem 0;
        }
        .logo-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .logo-section h1 {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 800;
          background: linear-gradient(to right, #fff, var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .beta-tag {
          font-size: 0.7rem;
          background: var(--accent);
          -webkit-text-fill-color: white;
          padding: 2px 6px;
          border-radius: 4px;
          vertical-align: middle;
        }
        
        nav {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        .nav-link {
          color: var(--text-dim);
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .button-secondary {
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-main);
          padding: 0.6rem 1.2rem;
          border-radius: 0.75rem;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }
        .button-secondary:hover {
          background: var(--bg-card);
          border-color: var(--text-dim);
        }
        
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-bottom: 4rem;
        }
        
        .results-layout {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        
        @media (max-width: 1100px) {
          .results-layout {
            grid-template-columns: 1fr;
          }
        }
        
        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5rem 2rem;
          text-align: center;
        }
        .spin {
          animation: spin 2s linear infinite;
          margin-bottom: 1.5rem;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .error-card {
          padding: 3rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        .main-footer {
          padding: 2rem 0;
          border-top: 1px solid var(--border);
          text-align: center;
          color: var(--text-dim);
          font-size: 0.85rem;
        }
      `}} />
    </div>
  );
}

export default App;
