"use client";

import { useState } from "react";

interface Props {
  data: Record<string, unknown>;
}

function highlightLine(line: string): React.ReactNode {
  // key: value, line
  const m = line.match(/^(\s*)("[\w_]+")(:\s*)(.+?)(,?)$/);
  if (m) {
    const [, indent, key, colon, raw, comma] = m;
    let valueNode: React.ReactNode;
    if (raw.startsWith('"')) {
      valueNode = <span className="text-emerald-400">{raw}</span>;
    } else if (raw === "null") {
      valueNode = <span className="text-slate-500">{raw}</span>;
    } else if (raw === "true" || raw === "false") {
      valueNode = <span className="text-amber-400">{raw}</span>;
    } else {
      valueNode = <span className="text-purple-400">{raw}</span>;
    }
    return (
      <>
        <span className="text-slate-600">{indent}</span>
        <span className="text-blue-400">{key}</span>
        <span className="text-slate-500">{colon}</span>
        {valueNode}
        <span className="text-slate-500">{comma}</span>
      </>
    );
  }
  return <span className="text-slate-500">{line}</span>;
}

export default function JsonOutput({ data }: Props) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(data, null, 2);
  const lines = json.split("\n");

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — silent fail
    }
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
      {/* Terminal chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <span className="text-slate-500 text-xs font-mono">classifier_output.json</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-400">Copied</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy JSON
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <pre className="p-5 text-xs font-mono leading-relaxed overflow-x-auto">
        {lines.map((line, i) => (
          <div key={i}>{highlightLine(line)}</div>
        ))}
      </pre>
    </div>
  );
}
