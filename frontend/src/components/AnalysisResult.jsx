import { motion } from "framer-motion";

import {
  TargetIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  ListChecksIcon,
  LightbulbIcon,
  ClipboardIcon,
  SparklesIcon,
} from "../icons";
import ScoreGauge from "./ScoreGauge";

// Maps a section heading to an icon + accent color.
// Falls back to a generic look for headings the prompt didn't anticipate,
// so this keeps working even if the AI response wording shifts slightly.
function classifySection(title) {
  const t = title.toLowerCase();

  if (t.includes("score") || t.includes("ats")) {
    return { icon: TargetIcon, color: "primary", isScore: t.includes("score") };
  }
  if (t.includes("missing") || t.includes("gap")) {
    return { icon: ListChecksIcon, color: "warning", isScore: false };
  }
  if (t.includes("strength")) {
    return { icon: TrendingUpIcon, color: "success", isScore: false };
  }
  if (t.includes("weak")) {
    return { icon: TrendingDownIcon, color: "danger", isScore: false };
  }
  if (t.includes("suggestion") || t.includes("improve")) {
    return { icon: LightbulbIcon, color: "secondary", isScore: false };
  }
  if (t.includes("summary")) {
    return { icon: ClipboardIcon, color: "primary", isScore: false };
  }
  if (t.includes("skill")) {
    return { icon: SparklesIcon, color: "secondary", isScore: false };
  }
  return { icon: ClipboardIcon, color: "slate", isScore: false };
}

function cleanTitle(raw) {
  return raw
    .replace(/^#{1,4}\s*/, "")
    .replace(/\*\*/g, "")
    .replace(/^\d+\.\s*/, "")
    .trim();
}

// Minimal markdown-lite renderer: bold text + bullet lists + paragraphs.
// Enough for the structured recruiter-style output the backend produces,
// without pulling in a full markdown dependency.
function renderBody(body) {
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  const blocks = [];
  let currentList = null;

  const flushList = () => {
    if (currentList) {
      blocks.push({ type: "list", items: currentList });
      currentList = null;
    }
  };

  lines.forEach((line) => {
    if (/^[*-]\s+/.test(line)) {
      currentList = currentList || [];
      currentList.push(line.replace(/^[*-]\s+/, ""));
    } else {
      flushList();
      blocks.push({ type: "p", text: line });
    }
  });
  flushList();

  const renderInline = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i}>{part.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return blocks.map((block, i) =>
    block.type === "list" ? (
      <ul key={i}>
        {block.items.map((item, j) => (
          <li key={j}>{renderInline(item)}</li>
        ))}
      </ul>
    ) : (
      <p key={i}>{renderInline(block.text)}</p>
    )
  );
}

function parseAnalysis(raw) {
  const chunks = raw.split(/\n(?=#{1,4}\s)/).filter((c) => /^#{1,4}\s/.test(c.trim()));

  if (chunks.length === 0) {
    return [{ title: "Analysis", body: raw, ...classifySection("analysis") }];
  }

  return chunks.map((chunk) => {
    const [firstLine, ...rest] = chunk.split("\n");
    const title = cleanTitle(firstLine);
    const body = rest.join("\n").trim();
    const meta = classifySection(title);

    let score = null;
    if (meta.isScore) {
      const match = (body + " " + title).match(/(\d{1,3})\s*(?:\/|out of)\s*100/i);
      if (match) score = Math.min(100, Math.max(0, parseInt(match[1], 10)));
    }

    return { title, body, score, ...meta };
  });
}

function AnalysisResult({ raw }) {
  const sections = parseAnalysis(raw);

  return (
    <motion.div
      className="results-grid"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {sections.map((section, i) => (
        <motion.div
          key={i}
          className={`card result-card accent-${section.color}`}
          variants={{
            hidden: { opacity: 0, y: 14, scale: 0.98 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className="result-card-header">
            <span className={`result-icon accent-${section.color}`}>
              <section.icon width={18} height={18} />
            </span>
            <h3>{section.title}</h3>
          </div>

          {section.score !== null && <ScoreGauge value={section.score} />}

          <div className="result-card-body">{renderBody(section.body)}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default AnalysisResult;