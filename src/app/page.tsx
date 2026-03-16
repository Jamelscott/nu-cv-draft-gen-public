"use client";

import { useState } from "react";

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");
  const [contextText, setContextText] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const generateCoverLetter = async () => {
    if (!resumeText.trim() || !jobText.trim()) {
      alert("Please provide both resume text and job application text.");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-cover-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobText,
          contextText: contextText.trim() || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ error: "Unknown error" }));
        if (response.status === 429) {
          throw new Error(
            "API quota exceeded. Please try again later or upgrade your Gemini API plan.",
          );
        }
        throw new Error(errorData.error || "Failed to generate cover letter");
      }

      const data = await response.json();
      setCoverLetter(data.coverLetter);
    } catch (error) {
      console.error("Error generating cover letter:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Failed to generate cover letter. Please try again.",
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (coverLetter) {
      try {
        await navigator.clipboard.writeText(coverLetter);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy text:", error);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = coverLetter;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    }
  };

  return (
    <div className="h-screen bg-linear-to-br from-slate-50 to-slate-100 p-4">
      <div className="mx-auto max-w-6xl flex flex-col">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Nu CV Draft Generator
          </h1>
          <p className="text-lg text-slate-600">
            Generate a personalized cover letter draft using your resume and a
            job description — then make it your own
          </p>
        </header>

        <div className="flex-1 grid gap-6 md:grid-cols-2">
          {/* Input Section */}
          <div className="flex flex-col space-y-6 h-[85vh]">
            <div
              className="rounded-xl bg-white p-6 shadow-sm border border-slate-200 flex flex-col"
              style={{ height: "25%" }}
            >
              <label className="block text-sm font-semibold text-slate-800 mb-3">
                Resume Text
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                className="flex-1 w-full p-4 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 text-slate-900 placeholder-slate-500"
              />
            </div>

            <div
              className="rounded-xl bg-white p-6 shadow-sm border border-slate-200 flex flex-col"
              style={{ height: "25%" }}
            >
              <label className="block text-sm font-semibold text-slate-800 mb-3">
                Job Application Text
              </label>
              <textarea
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                placeholder="Paste the job description here..."
                className="flex-1 w-full p-4 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 text-slate-900 placeholder-slate-500"
              />
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
              <label className="block text-sm font-semibold text-slate-800 mb-3">
                Additional Context (Optional)
              </label>
              <textarea
                value={contextText}
                onChange={(e) => setContextText(e.target.value)}
                placeholder="Any additional context about your experience or qualifications..."
                className="w-full h-24 p-4 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-slate-50 text-slate-900 placeholder-slate-500"
              />
            </div>

            <button
              onClick={generateCoverLetter}
              disabled={isGenerating}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Generating...
                </>
              ) : (
                "Generate Cover Letter"
              )}
            </button>
          </div>

          {/* Output Section */}
          <div className="flex flex-col rounded-xl bg-white p-6 shadow-sm border border-slate-200 h-[80.5vh]">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-slate-800">
                Generated Cover Letter
              </label>
              {coverLetter && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors duration-200"
                  title="Copy to clipboard"
                >
                  {isCopied ? (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              )}
            </div>
            <div className="overflow-y-auto">
              {coverLetter ? (
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full resize-none whitespace-pre-wrap text-slate-700 leading-relaxed p-4 bg-slate-50 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your generated cover letter will appear here..."
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  <div className="text-center">
                    <svg
                      className="w-12 h-12 mx-auto mb-4 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p>Your generated cover letter will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
