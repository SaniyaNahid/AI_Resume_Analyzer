import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { analyzeResume } from "./api";
import Hero from "./components/Hero";
import UploadCard from "./components/UploadCard";
import LoadingState from "./components/LoadingState";
import ErrorAlert from "./components/ErrorAlert";
import AnalysisResult from "./components/AnalysisResult";
import Footer from "./components/Footer";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resultsRef = useRef(null);

  // Scroll to results automatically once analysis succeeds.
  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const handleFileSelected = (selectedFile) => {
    setFile(selectedFile || null);
    setResult("");
    setError("");
  };

  const handleAnalyze = async () => {
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

  const handleReset = () => {
    setFile(null);
    setResult("");
    setError("");
  };

  return (
    <main className="app-shell">
      <Hero />

      <section className="workspace">
        <UploadCard
          file={file}
          loading={loading}
          hasResult={Boolean(result)}
          onFileSelected={handleFileSelected}
          onAnalyze={handleAnalyze}
          onReset={handleReset}
        />

        <div className="results-panel" ref={resultsRef}>
          <AnimatePresence mode="wait">
            {error && <ErrorAlert key="error" message={error} onRetry={handleAnalyze} />}
            {loading && <LoadingState key="loading" />}
            {!loading && result && <AnalysisResult key="result" raw={result} />}
            {!loading && !error && !result && (
              <div className="empty-state" key="empty">
                <h3>No analysis yet</h3>
                <p>Upload a resume and run the analyzer to see your results here.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default App;