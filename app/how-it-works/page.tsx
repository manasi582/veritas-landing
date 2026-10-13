"use client"

import React, { useRef, useEffect, useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { VeritasFooter } from "@/components/veritas-footer"
import { RevealText } from "@/components/reveal-text"
import { PixelIcon } from "@/components/pixel-icon"
import Link from "next/link"

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function BentoCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView(0.1)
  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-black/[0.07] bg-white overflow-hidden hover:border-black/[0.15] hover:bg-[#fafaf8] ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, border-color 0.3s ease, background-color 0.3s ease`,
      }}
    >
      {children}
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04]">
      {children}
    </span>
  )
}

const STEPS = [
  {
    n: "01",
    title: "Configure",
    desc: "Define your agent's purpose, tools, and boundaries in plain language or code. Specify what the agent is allowed to access, what it should log, and how failures should be handled. Veritas validates the configuration before any run begins.",
  },
  {
    n: "02",
    title: "Connect",
    desc: "Integrate Veritas with your existing data sources, APIs, and workflows. Every connection is wrapped with automatic logging — the tool name, arguments, response, and timing are all captured without extra code.",
  },
  {
    n: "03",
    title: "Test",
    desc: "Run your agent in a sandboxed environment. Inspect the full execution trace before going to production. Replay runs with different inputs to test edge cases. Compare traces across runs to identify regressions.",
  },
  {
    n: "04",
    title: "Verify",
    desc: "Before a run is marked complete, Veritas checks the output against the configured verification rules. If an output fails verification, it is flagged in the audit log and the run status reflects the failure.",
  },
  {
    n: "05",
    title: "Monitor",
    desc: "In production, every agent run produces a structured audit record in real time. You can query logs, set up alerts for anomalies, and replay any run exactly as it happened. Nothing is opaque.",
  },
]

export default function HowItWorksPage() {
  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">
      <MobileNav />

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <PixelIcon type="workflow" size={40} />
          <div className="mt-4"><Tag>HOW IT WORKS</Tag></div>
          <RevealText className="mt-5 text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.02]">
            {"Every step,\nvisible."}
          </RevealText>
          <p className="mt-8 text-base text-black/45 leading-relaxed max-w-xl">
            Veritas doesn&apos;t hide what your AI agents are doing. From the first configuration to the last log line, every action is observable, traceable, and explainable.
          </p>
        </div>
      </section>

      {/* ── STEP BY STEP WORKFLOW ─────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Tag>THE WORKFLOW</Tag>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Five steps from idea\nto monitored agent."}
            </RevealText>
          </div>
          <div className="flex flex-col gap-3">
            {STEPS.map((step, i) => (
              <BentoCard key={step.n} className="p-8 md:p-10" delay={i * 60}>
                <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-12">
                  <div className="shrink-0">
                    <span className="font-pixel text-[11px] text-black/20 tracking-widest block mb-2">{step.n}</span>
                    <h3 className="text-2xl font-light">{step.title}</h3>
                  </div>
                  <div className="w-px bg-black/[0.06] hidden md:block shrink-0 self-stretch" />
                  <p className="text-sm text-black/45 leading-relaxed flex-1 md:pt-7">{step.desc}</p>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── DATA LIFECYCLE ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Tag>DATA LIFECYCLE</Tag>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"What Veritas logs —\nand what it doesn&apos;t."}
            </RevealText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <BentoCard className="p-8" delay={0}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                <span className="text-xs text-black/40 tracking-widest uppercase">What is logged</span>
              </div>
              <ul className="space-y-3">
                {[
                  "Agent task inputs and configuration",
                  "Every tool call: name, arguments, response, timing",
                  "Intermediate decisions and reasoning steps",
                  "State transitions during the run",
                  "Final outputs with provenance links",
                  "Errors, retries, and failure states",
                  "Run metadata: duration, agent version, timestamp",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-black/55">
                    <span className="w-1 h-1 rounded-full bg-emerald-500/60 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </BentoCard>

            <BentoCard className="p-8" delay={80}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-red-400/80" />
                <span className="text-xs text-black/40 tracking-widest uppercase">What is NOT logged</span>
              </div>
              <ul className="space-y-3">
                {[
                  "API keys, tokens, or credentials (auto-redacted)",
                  "Fields marked as sensitive in your configuration",
                  "Raw PII if redaction rules are configured",
                  "Tool internals — only the public API surface is logged",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-black/55">
                    <span className="w-1 h-1 rounded-full bg-red-400/60 mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-black/[0.02] border border-black/[0.06]">
                <p className="text-xs text-black/40 leading-relaxed">
                  Redaction happens before data is written to any log. Secret values are never stored, even temporarily.
                </p>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Tag>ARCHITECTURE</Tag>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"How the pieces\nfit together."}
            </RevealText>
          </div>
          <BentoCard className="p-8 md:p-10" delay={0}>
            <div className="flex flex-col md:flex-row items-stretch gap-3">
              {[
                { label: "Your App", desc: "Sends task requests to the Veritas agent runtime via SDK or API.", color: "bg-black/[0.04]" },
                { label: "Veritas Core", desc: "Orchestrates the agent run. Applies access boundaries. Captures all events.", color: "bg-black/[0.06]" },
                { label: "Tool Layer", desc: "Wraps each tool call with logging and secret redaction before execution.", color: "bg-black/[0.04]" },
                { label: "Audit Log", desc: "Structured, queryable record of every event in the run. Stored locally or via configured backend.", color: "bg-black/[0.06]" },
              ].map((node, i) => (
                <React.Fragment key={node.label}>
                  <div className={`flex-1 rounded-xl p-5 ${node.color} border border-black/[0.06]`}>
                    <div className="text-xs font-pixel tracking-widest text-black/40 mb-2">{String(i + 1).padStart(2, "0")}</div>
                    <div className="text-sm font-light text-black/80 mb-2">{node.label}</div>
                    <div className="text-xs text-black/40 leading-relaxed">{node.desc}</div>
                  </div>
                  {i < 3 && (
                    <div className="hidden md:flex items-center text-black/20">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </BentoCard>
        </div>
      </section>

      {/* ── EXAMPLE SCENARIO ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Tag>EXAMPLE SCENARIO</Tag>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"A run, from start\nto audit record."}
            </RevealText>
          </div>
          <BentoCard className="p-8 md:p-10" delay={0}>
            <p className="text-sm text-black/55 leading-relaxed mb-8 max-w-2xl">
              Here is a concrete example of a Veritas agent run for a data extraction task:
            </p>
            <div className="space-y-4">
              {[
                { time: "10:00:00.001", event: "run_started", detail: "Task: 'Extract Q3 revenue figures from report.pdf'" },
                { time: "10:00:00.045", event: "tool_called", detail: "read_file(path='report.pdf') — 2.3MB PDF" },
                { time: "10:00:01.120", event: "tool_result", detail: "File content extracted — 12,440 tokens" },
                { time: "10:00:01.133", event: "decision_point", detail: "Agent selected extraction strategy: structured table parsing" },
                { time: "10:00:02.887", event: "output_generated", detail: "Revenue figures extracted: Q3 total = $..." },
                { time: "10:00:02.901", event: "verification_passed", detail: "Output matches expected schema" },
                { time: "10:00:02.903", event: "run_completed", detail: "Duration: 2902ms. Audit record: run-20241013-001.json" },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-4 px-4 py-3 rounded-xl bg-black/[0.02] border border-black/[0.04]">
                  <span className="text-[10px] text-black/25 font-mono shrink-0 pt-0.5">{log.time}</span>
                  <span className="text-[11px] text-black/50 font-mono shrink-0">{log.event}</span>
                  <span className="text-xs text-black/40 leading-relaxed">{log.detail}</span>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-[1.05]">
              Want to see this in practice?
            </h2>
            <p className="mt-3 text-sm text-black/45 max-w-sm">
              Read the documentation to get started, or book a demo to walk through a real workflow with us.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/documentation" className="px-8 py-3.5 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest font-medium text-center">
              READ THE DOCS
            </Link>
            <Link href="/book-demo" className="px-8 py-3.5 border border-black/10 text-black/60 text-sm rounded-xl hover:border-black/25 hover:text-black hover:bg-black/[0.03] transition-all tracking-widest text-center">
              BOOK A DEMO
            </Link>
          </div>
        </div>
      </section>

      <VeritasFooter />
    </div>
  )
}
