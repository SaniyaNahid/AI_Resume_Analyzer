import { motion } from "framer-motion";

function LoadingState() {
  return (
    <motion.div
      className="loading-panel"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="thinking-row">
        <span className="thinking-dot" />
        <span className="thinking-dot" />
        <span className="thinking-dot" />
        <p>Analyzing your resume...</p>
      </div>

      <div className="skeleton-grid">
        {[0, 1, 2, 3].map((i) => (
          <div className="skeleton-card" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
            <div className="skeleton-line skeleton-line-icon" />
            <div className="skeleton-line skeleton-line-title" />
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default LoadingState;