import { useRef, useState } from "react";
import { motion } from "framer-motion";

import { UploadCloudIcon, FileTextIcon, SparklesIcon } from "../icons";

function UploadCard({ file, loading, hasResult, onFileSelected, onAnalyze, onReset }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!loading) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (loading) return;

    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onFileSelected(dropped);
  };

  const handleBrowseChange = (e) => {
    const selected = e.target.files?.[0];
    onFileSelected(selected || null);
  };

  return (
    <motion.div
      className="card upload-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
    >
      <div className="card-heading">
        <h2>Upload your resume</h2>
        <p>PDF format only, up to a few MB.</p>
      </div>

      <div
        className={`dropzone ${isDragging ? "is-dragging" : ""} ${loading ? "is-disabled" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !loading && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (!loading && (e.key === "Enter" || e.key === " ")) inputRef.current?.click();
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          onChange={handleBrowseChange}
          disabled={loading}
          hidden
        />

        {file ? (
          <div className="dropzone-file">
            <span className="file-icon">
              <FileTextIcon width={22} height={22} />
            </span>
            <div>
              <strong>{file.name}</strong>
              <small>{(file.size / 1024 / 1024).toFixed(2)} MB selected</small>
            </div>
          </div>
        ) : (
          <>
            <span className="dropzone-icon">
              <UploadCloudIcon width={26} height={26} />
            </span>
            <strong>Drag & drop your resume here</strong>
            <small>or click to browse from your computer</small>
            <span className="format-pill">Supported: PDF</span>
          </>
        )}
      </div>

      <div className="upload-actions">
        <button
          className="btn btn-primary"
          onClick={onAnalyze}
          disabled={loading || !file}
        >
          {loading ? (
            <>
              <span className="btn-spinner" /> Analyzing...
            </>
          ) : (
            <>
              <SparklesIcon width={17} height={17} /> Analyze Resume
            </>
          )}
        </button>

        {hasResult && !loading && (
          <button className="btn btn-secondary" onClick={onReset}>
            Upload Another Resume
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default UploadCard;