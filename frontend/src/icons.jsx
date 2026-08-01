// Lightweight inline icon set — avoids adding an icon-library dependency.
// All icons: 24x24 viewBox, stroke-based, inherit color via currentColor.

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const UploadCloudIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M7 17a4.5 4.5 0 0 1-1-8.9A5.5 5.5 0 0 1 16.5 7a4 4 0 0 1 1.5 7.9" />
    <path d="M12 12v7" />
    <path d="m9 15 3-3 3 3" />
  </svg>
);

export const FileTextIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M9 13h6M9 17h6M9 9h1" />
  </svg>
);

export const SparklesIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
  </svg>
);

export const TargetIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

export const TrendingUpIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </svg>
);

export const TrendingDownIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M3 7l6 6 4-4 8 8" />
    <path d="M15 17h6v-6" />
  </svg>
);

export const ListChecksIcon = (props) => (
  <svg {...base} {...props}>
    <path d="m3 7 2 2 3-3" />
    <path d="m3 15 2 2 3-3" />
    <path d="M11 6h10M11 16h10" />
  </svg>
);

export const LightbulbIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M9 18h6M10 22h4" />
    <path d="M12 2a6 6 0 0 0-4 10.5c.6.6 1 1.4 1 2.5h6c0-1.1.4-1.9 1-2.5A6 6 0 0 0 12 2z" />
  </svg>
);

export const ClipboardIcon = (props) => (
  <svg {...base} {...props}>
    <rect x="6" y="4" width="12" height="17" rx="2" />
    <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
    <path d="M9 11h6M9 15h6" />
  </svg>
);

export const AlertTriangleIcon = (props) => (
  <svg {...base} {...props}>
    <path d="M10.3 3.6 1.9 18a1.8 1.8 0 0 0 1.6 2.7h17a1.8 1.8 0 0 0 1.6-2.7L13.7 3.6a1.8 1.8 0 0 0-3.4 0z" />
    <path d="M12 9v4M12 17h.01" />
  </svg>
);

export const CheckCircleIcon = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.5 2.5 5-5" />
  </svg>
);

export const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.1 3.3 9.4 7.9 11 .6.1.8-.2.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6a11.5 11.5 0 0 0 7.9-11A11.5 11.5 0 0 0 12 .5z" />
  </svg>
);

export const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8.3 18.5H5.7v-9h2.6zM7 8.3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm11.5 10.2H16v-4.4c0-1-.4-1.8-1.4-1.8s-1.6.8-1.6 1.8v4.4h-2.6v-9H13v1.2c.4-.7 1.3-1.4 2.6-1.4 2 0 3 1.3 3 3.8z" />
  </svg>
);