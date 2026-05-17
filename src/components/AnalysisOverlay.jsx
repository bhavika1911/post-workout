import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TriangleAlert, Info } from 'lucide-react';

const AnalysisOverlay = ({ imageSrc, detections, onSelectPattern }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="analysis-container glass-card" style={{ position: 'relative', overflow: 'hidden', padding: '1rem' }}>
      <div style={{ position: 'relative', width: '100%', borderRadius: '1rem', overflow: 'hidden' }}>
        <img 
          src={imageSrc} 
          alt="Analysis Target" 
          style={{ width: '100%', display: 'block', borderRadius: '1rem' }} 
        />
        
        <svg 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="none"
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          {detections.map((d, i) => {
            const [ymin, xmin, ymax, xmax] = d.boundingBox;
            const isHovered = hoveredId === i;
            
            return (
              <g key={i} style={{ pointerEvents: 'auto', cursor: 'pointer' }}
                 onMouseEnter={() => setHoveredId(i)}
                 onMouseLeave={() => setHoveredId(null)}
                 onClick={() => onSelectPattern(d)}
              >
                <motion.rect
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    stroke: isHovered ? 'var(--accent)' : 'var(--danger)',
                    strokeWidth: isHovered ? 4 : 2,
                    fill: isHovered ? 'rgba(168, 85, 247, 0.1)' : 'rgba(244, 63, 94, 0.05)'
                  }}
                  x={xmin}
                  y={ymin}
                  width={xmax - xmin}
                  height={ymax - ymin}
                  rx="4"
                />
                
                {isHovered && (
                  <motion.foreignObject
                    x={xmin}
                    y={ymin - 40}
                    width="200"
                    height="40"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="label-tag">
                      <TriangleAlert size={14} />
                      <span>{d.type}</span>
                    </div>
                  </motion.foreignObject>
                )}
              </g>
            );
          })}
        </svg>

        {/* Scan line animation */}
        <div className="scan-line" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .analysis-container {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .label-tag {
          background: var(--danger);
          color: white;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          width: max-content;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }
        .scan-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(to right, transparent, var(--accent), transparent);
          box-shadow: 0 0 15px var(--accent);
          animation: scan 3s linear infinite;
          pointer-events: none;
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}} />
    </div>
  );
};

export default AnalysisOverlay;
