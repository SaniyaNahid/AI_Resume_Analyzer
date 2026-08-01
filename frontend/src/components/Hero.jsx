import { motion } from "framer-motion";

function ResumeIllustration() {
  return (
    <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
      <defs>
        <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
        <linearGradient id="heroGradSoft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <circle cx="110" cy="110" r="100" fill="url(#heroGradSoft)" />

      <g transform="translate(55, 38)">
        <rect x="0" y="0" width="90" height="120" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
        <rect x="14" y="18" width="40" height="7" rx="3.5" fill="url(#heroGrad)" />
        <rect x="14" y="34" width="62" height="5" rx="2.5" fill="#E2E8F0" />
        <rect x="14" y="46" width="62" height="5" rx="2.5" fill="#E2E8F0" />
        <rect x="14" y="58" width="46" height="5" rx="2.5" fill="#E2E8F0" />
        <rect x="14" y="76" width="62" height="5" rx="2.5" fill="#E2E8F0" />
        <rect x="14" y="88" width="62" height="5" rx="2.5" fill="#E2E8F0" />
        <rect x="14" y="100" width="30" height="5" rx="2.5" fill="#E2E8F0" />
      </g>

      <g transform="translate(128, 100)">
        <circle cx="30" cy="30" r="30" fill="url(#heroGrad)" />
        <path
          d="M30 16v8M30 36v8M16 30h8M36 30h8M20.5 20.5l3 3M36.5 36.5l3 3M39.5 20.5l-3 3M23.5 36.5l-3 3"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function Hero() {
  return (
    <section className="hero">
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <span className="hero-badge">Powered by Gemini AI</span>
        <h1>
          <span className="grad-text">AI Resume Analyzer</span>
        </h1>
        <p className="hero-subtitle">
          Analyze your resume using AI, improve ATS compatibility, identify
          missing skills, and receive actionable recommendations instantly.
        </p>
      </motion.div>

      <motion.div
        className="hero-illustration"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        <ResumeIllustration />
      </motion.div>
    </section>
  );
}

export default Hero;