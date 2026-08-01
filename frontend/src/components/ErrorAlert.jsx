import { motion } from "framer-motion";

import { AlertTriangleIcon } from "../icons";

function ErrorAlert({ message, onRetry }) {
  return (
    <motion.div
      className="error-alert"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <span className="error-alert-icon">
        <AlertTriangleIcon width={20} height={20} />
      </span>
      <div className="error-alert-body">
        <strong>Analysis failed</strong>
        <p>{message}</p>
      </div>
      {onRetry && (
        <button className="btn btn-ghost" onClick={onRetry}>
          Try again
        </button>
      )}
    </motion.div>
  );
}

export default ErrorAlert;