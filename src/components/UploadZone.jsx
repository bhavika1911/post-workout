import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const UploadZone = ({ onUpload, isAnalyzing }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0 && !isAnalyzing) {
        onUpload(acceptedFiles[0]);
      }
    },
    [onUpload, isAnalyzing]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
    disabled: isAnalyzing,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-card upload-container ${isDragActive ? 'drag-active' : ''}`}
      style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        cursor: isAnalyzing ? 'wait' : 'pointer',
        maxWidth: '800px',
        margin: '2rem auto',
        borderStyle: 'dashed',
        borderWidth: '2px',
        borderColor: isDragActive ? 'var(--accent)' : 'var(--border)',
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <div style={{ marginBottom: '1.5rem' }}>
        {isAnalyzing ? (
          <div className="pulsing-icon">
            <ShieldAlert size={64} color="var(--accent)" />
          </div>
        ) : (
          <Upload size={64} color={isDragActive ? "var(--accent)" : "var(--text-dim)"} />
        )}
      </div>
      <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
        {isAnalyzing ? "Scanning Interface..." : "Audit Your Interface"}
      </h2>
      <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>
        {isAnalyzing 
          ? "Our AI is dissecting the visual hierarchy for deceptive patterns." 
          : "Drop a screenshot here or click to browse. We'll expose the dark patterns."}
      </p>

      {!isAnalyzing && (
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <span className="badge">Supports PNG, JPG, WEBP</span>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .upload-container {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .drag-active {
          background: rgba(168, 85, 247, 0.05);
          transform: scale(1.02);
        }
        .badge {
          background: var(--bg-card);
          padding: 0.4rem 1rem;
          border-radius: 2rem;
          font-size: 0.8rem;
          color: var(--text-dim);
          border: 1px solid var(--border);
        }
        .pulsing-icon {
          animation: icon-pulse 1.5s infinite ease-in-out;
        }
        @keyframes icon-pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}} />
    </motion.div>
  );
};

export default UploadZone;
