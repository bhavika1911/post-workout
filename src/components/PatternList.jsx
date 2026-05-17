import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, AlertCircle, ChevronRight } from 'lucide-react';

const PatternList = ({ detections, selectedPattern, onSelectPattern }) => {
  return (
    <div className="pattern-list-container">
      <div className="list-header" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <ShieldAlert color="var(--danger)" />
        <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Detections Found ({detections.length})</h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {detections.map((d, i) => {
          const isSelected = selectedPattern === d;
          
          return (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              onClick={() => onSelectPattern(d)}
              className={`pattern-item glass-card ${isSelected ? 'selected' : ''}`}
              style={{
                padding: '1.25rem',
                cursor: 'pointer',
                borderLeft: `4px solid ${d.severity === 'High' ? 'var(--danger)' : d.severity === 'Medium' ? 'var(--warning)' : 'var(--accent)'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.1rem', color: isSelected ? 'var(--accent)' : 'inherit' }}>
                  {d.type}
                </span>
                <span className={`severity-badge ${d.severity.toLowerCase()}`}>
                  {d.severity}
                </span>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', margin: '0.5rem 0' }}>
                {d.description}
              </p>

              {isSelected && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}
                >
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'start', color: 'var(--success)' }}>
                    <BookOpen size={16} style={{ marginTop: '2px' }} />
                    <p style={{ fontSize: '0.85rem', margin: 0, fontStyle: 'italic' }}>
                      <strong>Education:</strong> {d.education}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pattern-item {
          background: var(--bg-card);
        }
        .pattern-item.selected {
          background: var(--bg-card-hover);
          border-color: var(--accent);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.15);
        }
        .severity-badge {
          font-size: 0.7rem;
          padding: 2px 8px;
          border-radius: 4px;
          text-transform: uppercase;
          font-weight: 800;
        }
        .severity-badge.high { background: rgba(244, 63, 94, 0.2); color: #fb7185; }
        .severity-badge.medium { background: rgba(245, 158, 11, 0.2); color: #fbbf24; }
        .severity-badge.low { background: rgba(168, 85, 247, 0.2); color: #c084fc; }
      `}} />
    </div>
  );
};

export default PatternList;
