
"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

export default function PreviewCustom({ code }) {
  const [safeHtml, setSafeHtml] = useState("");

  useEffect(() => {
    const html = typeof code === "string" ? code : "";

    const sanitized = DOMPurify.sanitize(html, {
      FORBID_TAGS: [
        "script",
        "iframe",
        "object",
        "embed",
        "form",
        "base",
      ],
      FORBID_ATTR: ["srcdoc"],
    });

    setSafeHtml(sanitized);
  }, [code]);

  const srcDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>
  <style>
    html, body {
      margin: 0;
      min-height: 100%;
    }

    body {
      box-sizing: border-box;
      padding: 12px;
      background: #0F1720;
      color: #F7F5F0;
      font-family: Arial, sans-serif;
      overflow-wrap: anywhere;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  ${safeHtml}
</body>
</html>`;

  return (
    <div className="flex h-28 items-center justify-center overflow-hidden bg-[#0F1720]/60">
      {safeHtml ? (
        <iframe
          title="Database component preview"
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="pointer-events-none h-full w-full border-0"
        />
      ) : (
        <span className="text-xs text-[#F7F5F0]/40">
          No preview available
        </span>
      )}
    </div>
  );
}
