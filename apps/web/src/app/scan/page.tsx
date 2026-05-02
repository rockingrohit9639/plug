"use client";

import { useState } from "react";

type ScanStatus = "idle" | "validating" | "fetching" | "analyzing" | "scoring" | "complete" | "error";

const STEPS = [
  { key: "validating", label: "Validating GitHub URL" },
  { key: "fetching", label: "Fetching repo metadata & source" },
  { key: "analyzing", label: "Analyzing with Claude Haiku" },
  { key: "scoring", label: "Computing trust score" },
  { key: "complete", label: "Report ready" },
] as const;

function getStepIndex(status: ScanStatus): number {
  return STEPS.findIndex((s) => s.key === status);
}

export default function ScanPage() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimmed = url.trim();
    if (!trimmed) return;

    const githubRegex = /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+\/?$/;
    if (!githubRegex.test(trimmed)) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }

    // Simulate the workflow steps (will be replaced with real API calls)
    setStatus("validating");
    await delay(1200);
    setStatus("fetching");
    await delay(2000);
    setStatus("analyzing");
    await delay(3000);
    setStatus("scoring");
    await delay(1500);
    setStatus("complete");
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight">Scan a server</h1>
      <p className="mt-2 text-zinc-500">
        Paste a GitHub URL to an MCP server. We&apos;ll analyze the source code,
        inspect tool definitions, and generate a security report.
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/org/mcp-server"
            disabled={status !== "idle" && status !== "complete" && status !== "error"}
            className="flex-1 h-12 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status !== "idle" && status !== "complete" && status !== "error"}
            className="h-12 px-6 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Scan
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-grade-f">{error}</p>
        )}
      </form>

      {status !== "idle" && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Scan progress</h2>
          <div className="flex flex-col gap-1">
            {STEPS.map((step, i) => {
              const currentIndex = getStepIndex(status);
              const isComplete = status === "error" ? false : i < currentIndex;
              const isCurrent = i === currentIndex;

              return (
                <div key={step.key} className="flex items-center gap-3 py-2">
                  <div className="flex-shrink-0">
                    {isComplete ? (
                      <div className="w-6 h-6 rounded-full bg-grade-a/20 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-grade-a" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    ) : isCurrent ? (
                      <div className="w-6 h-6 rounded-full border-2 border-accent flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-zinc-300 dark:border-zinc-700" />
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      isComplete
                        ? "text-zinc-500"
                        : isCurrent
                          ? "text-foreground font-medium"
                          : "text-zinc-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {status === "complete" && (
            <div className="mt-8 p-4 rounded-lg border border-grade-a/30 bg-grade-a/5">
              <p className="text-sm font-medium text-grade-a">
                Scan complete! Redirecting to report...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="mt-8 p-4 rounded-lg border border-grade-f/30 bg-grade-f/5">
              <p className="text-sm font-medium text-grade-f">
                Something went wrong. Please try again.
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-12 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <h3 className="text-sm font-semibold mb-2">What we check</h3>
        <ul className="text-sm text-zinc-500 space-y-1">
          <li>• Hidden directives in tool descriptions</li>
          <li>• Filesystem path references (~/.ssh, ~/.config)</li>
          <li>• Parameter exfiltration patterns</li>
          <li>• Cross-tool shadowing</li>
          <li>• Instruction injection</li>
          <li>• Obfuscation (base64, unicode tricks)</li>
        </ul>
      </div>
    </div>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
