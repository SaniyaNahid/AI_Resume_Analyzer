import { useState } from "react";

import { analyzeResume } from "./api";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    setFile(selectedFile || null);
    setResult("");
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please choose a PDF resume before analyzing.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setError("");

      const data = await analyzeResume(formData);
      setResult(data.analysis);
    } catch (err) {
      console.error(err);

      const message =
        err.response?.data?.detail ||
        "Something went wrong while analyzing the resume. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">AI Resume Analyzer</p>
          <h1>Review your resume with clear, recruiter-style feedback.</h1>
          <p className="hero-text">
            Upload a PDF resume and get a structured review with skills, gaps,
            ATS score, and improvement suggestions.
          </p>
        </div>

        <div className="stats-strip" aria-label="Resume analysis highlights">
          <div>
            <strong>ATS</strong>
            <span>Score</span>
          </div>
          <div>
            <strong>Skills</strong>
            <span>Extracted</span>
          </div>
          <div>
            <strong>Gaps</strong>
            <span>Found</span>
          </div>
        </div>
      </section>

      <section className="workspace">
        <div className="upload-panel">
          <div className="panel-header">
            <span className="step-badge">01</span>
            <div>
              <h2>Upload Resume</h2>
              <p>PDF files only. Keep it under your API quota limit.</p>
            </div>
          </div>

          <label className="drop-zone">
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <span className="upload-icon">PDF</span>
            <strong>{file ? file.name : "Choose your resume PDF"}</strong>
            <small>
              {file
                ? `${(file.size / 1024 / 1024).toFixed(2)} MB selected`
                : "Click here to browse from your computer"}
            </small>
          </label>

          {error && <p className="error-message">{error}</p>}

          <button className="primary-button" onClick={handleUpload} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        <div className="result-panel">
          <div className="panel-header">
            <span className="step-badge">02</span>
            <div>
              <h2>Analysis Result</h2>
              <p>Your feedback will appear here after processing.</p>
            </div>
          </div>

          <div className={result ? "result-box has-result" : "result-box"}>
            {loading && (
              <div className="loading-state">
                <span className="spinner" />
                <p>Reading resume and preparing feedback...</p>
              </div>
            )}

            {!loading && result && <pre>{result}</pre>}

            {!loading && !result && (
              <div className="empty-state">
                <h3>No analysis yet</h3>
                <p>Upload a resume and run the analyzer to see insights.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
