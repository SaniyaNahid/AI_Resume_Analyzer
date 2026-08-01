import { GithubIcon, LinkedinIcon } from "../icons";

// Replace the href values below with your own profile links.
function Footer() {
  return (
    <footer className="app-footer">
      <p>Built with React, FastAPI, and Gemini AI</p>
      <div className="footer-links">
        <a href="#" target="_blank" rel="noreferrer" aria-label="GitHub repository">
          <GithubIcon width={18} height={18} />
          GitHub
        </a>
        <a href="#" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
          <LinkedinIcon width={18} height={18} />
          LinkedIn
        </a>
      </div>
    </footer>
  );
}

export default Footer;