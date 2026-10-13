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

const FAQ_ITEMS = [
  {
    q: "Is Veritas free to use?",
    a: "Yes. Veritas is open source and licensed under the MIT license. You can use it, modify it, and distribute it freely. Self-hosting is fully supported. There is no cloud service or subscription required.",
  },
  {
    q: "What data does Veritas log?",
    a: "Veritas logs agent task inputs, tool calls (name, arguments, response, timing), intermediate decisions, state transitions, and final outputs. It does NOT log API keys, tokens, or other credentials — these are redacted automatically before any log is written.",
  },
  {
    q: "Can I use Veritas with any LLM?",
    a: "Veritas is designed to be model-agnostic. The core logging and verification layer sits between your agent code and your LLM provider. Support for specific providers is growing — check the documentation for the current list of tested integrations.",
  },
  {
    q: "How do I get started?",
    a: "The quickest path is the Quickstart guide in the documentation. It walks you through installing the SDK, defining an agent, and running your first verified execution in a few minutes.",
  },
  {
    q: "Does Veritas require any external services?",
    a: "No. By default, Veritas runs entirely locally. Audit logs are written to your filesystem. There are no external API calls, no cloud accounts required, and no data leaves your environment unless you configure it to.",
  },
  {
    q: "What is the current product status?",
    a: "Veritas is in beta. Core features — verifiable execution, decision tracing, and audit logs — are functional. Some features like the Access Boundaries permission model and a dashboard UI are still in development. We clearly label everything as Available, Beta, or Planned.",
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-black/[0.06] last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 hover:text-black/80 transition-colors"
        aria-expanded={open}
      >
        <span className="text-sm font-light text-black/70">{question}</span>
        <span
          className="shrink-0 w-5 h-5 rounded-full border border-black/10 flex items-center justify-center text-black/30 transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "none" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "300px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="text-sm text-black/45 leading-relaxed pb-5">{answer}</p>
      </div>
    </div>
  )
}

export default function UseCasesPage() {
  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">
      <MobileNav />

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <PixelIcon type="agents" size={40} />
          <div className="mt-4"><Tag>USE CASES</Tag></div>
          <RevealText className="mt-5 text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.02]">
            {"Who Veritas\nis built for."}
          </RevealText>
          <p className="mt-8 text-base text-black/45 leading-relaxed max-w-xl">
            Veritas is most valuable for teams who need to understand, audit, or trust what their AI agents are doing. Here are the most common patterns we see.
          </p>
        </div>
      </section>

      {/* ── USE CASE 1: COMPLIANCE ────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="font-pixel text-[10px] tracking-widest text-black/30 mb-4">USE CASE 01</div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-[1.05] mb-5">
                Compliance &amp; governance teams
              </h2>
              <p className="text-sm text-black/50 leading-relaxed mb-8">
                Regulatory requirements around automated decision-making are growing. Financial services, healthcare, and legal teams are increasingly expected to explain and audit every AI-assisted decision. Veritas provides the infrastructure to meet those requirements without slowing down your team.
              </p>
              <div className="space-y-4 mb-8">
                <div className="text-[10px] text-black/30 tracking-widest uppercase">What Veritas provides</div>
                {[
                  "Structured audit log for every agent run — exportable and queryable",
                  "Immutable record linking every output to the data and decisions that produced it",
                  "Access boundary enforcement — documented proof of what agents were allowed to do",
                  "Redaction of sensitive data before logging",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-black/55">
                    <span className="w-1 h-1 rounded-full bg-black/30 mt-2 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-black/[0.02] border border-black/[0.06] mb-6">
                <div className="text-[10px] text-black/30 tracking-widest uppercase mb-2">Prerequisites</div>
                <div className="text-xs text-black/45 leading-relaxed">Veritas beta access, existing AI agent or workflow, Node.js or Python runtime.</div>
              </div>
              <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest">
                DISCUSS THIS USE CASE
              </Link>
            </div>
            <BentoCard className="p-8" delay={0}>
              <div className="text-xs text-black/30 tracking-widest uppercase mb-5">Scenario</div>
              <p className="text-sm text-black/55 leading-relaxed mb-6">
                A financial services company uses AI agents to triage incoming support requests and draft initial responses. Regulators require the company to demonstrate that every automated response can be traced back to specific data inputs and decision rules.
              </p>
              <div className="space-y-3">
                {[
                  { icon: "✓", text: "Every draft response linked to the customer message that triggered it", color: "text-emerald-600" },
                  { icon: "✓", text: "Agent tool calls (CRM lookup, knowledge base search) fully logged", color: "text-emerald-600" },
                  { icon: "✓", text: "Audit report exported for regulatory review in minutes", color: "text-emerald-600" },
                  { icon: "✓", text: "Sensitive customer data redacted from logs automatically", color: "text-emerald-600" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-black/50">
                    <span className={`shrink-0 font-medium ${item.color}`}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── USE CASE 2: ENGINEERING ───────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <BentoCard className="p-8 order-2 lg:order-1" delay={0}>
              <div className="text-xs text-black/30 tracking-widest uppercase mb-5">Scenario</div>
              <p className="text-sm text-black/55 leading-relaxed mb-6">
                A development team runs AI agents to review pull requests. One morning, agents start approving PRs they should have flagged. Without execution traces, the team cannot tell whether the issue is the prompt, the tool, or the underlying model.
              </p>
              <div className="space-y-3">
                {[
                  { icon: "→", text: "Replay the failing run exactly as it happened" },
                  { icon: "→", text: "Compare decision trace against a passing run" },
                  { icon: "→", text: "Identify the exact decision point where behavior diverged" },
                  { icon: "→", text: "Fix and verify in the sandbox before redeploying" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs text-black/50">
                    <span className="shrink-0 text-black/30">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </BentoCard>
            <div className="order-1 lg:order-2">
              <div className="font-pixel text-[10px] tracking-widest text-black/30 mb-4">USE CASE 02</div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-[1.05] mb-5">
                Engineering teams
              </h2>
              <p className="text-sm text-black/50 leading-relaxed mb-8">
                Running AI agents in production means dealing with failures that are hard to reproduce. Unlike traditional software, agent failures often depend on subtle context that is lost if not captured at runtime. Veritas makes every production run debuggable.
              </p>
              <div className="space-y-4 mb-8">
                <div className="text-[10px] text-black/30 tracking-widest uppercase">What Veritas provides</div>
                {[
                  "Execution replay — run any logged run again exactly as it happened",
                  "Decision trace comparison — diff two runs to find where they diverged",
                  "Sandboxed testing before production deployment",
                  "Error and retry logging with full context",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-black/55">
                    <span className="w-1 h-1 rounded-full bg-black/30 mt-2 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <Link href="/documentation" className="inline-flex items-center gap-2 px-6 py-3 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest">
                READ THE DOCS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── USE CASE 3: RESEARCH ──────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="font-pixel text-[10px] tracking-widest text-black/30 mb-4">USE CASE 03</div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-[1.05] mb-5">
                Research &amp; evaluation
              </h2>
              <p className="text-sm text-black/50 leading-relaxed mb-8">
                Understanding AI agent behavior systematically requires structured data. Researchers studying agent decision-making, reliability, or safety need more than end-to-end accuracy metrics — they need the full trace of how decisions were made.
              </p>
              <div className="space-y-4 mb-8">
                <div className="text-[10px] text-black/30 tracking-widest uppercase">What Veritas provides</div>
                {[
                  "Structured, machine-readable logs for every run",
                  "Decision-level granularity — not just outputs, but reasoning steps",
                  "Consistent schema across runs for comparison and analysis",
                  "Export to JSON for analysis in external tools",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-black/55">
                    <span className="w-1 h-1 rounded-full bg-black/30 mt-2 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-black/[0.02] border border-black/[0.06] mb-6">
                <div className="text-[10px] text-black/30 tracking-widest uppercase mb-2">Prerequisites</div>
                <div className="text-xs text-black/45 leading-relaxed">Veritas beta access. Python or Node.js. An existing agent or model you want to study.</div>
              </div>
              <Link href="/book-demo" className="inline-flex items-center gap-2 px-6 py-3 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest">
                DISCUSS YOUR USE CASE
              </Link>
            </div>
            <BentoCard className="p-8" delay={0}>
              <div className="text-xs text-black/30 tracking-widest uppercase mb-4">Example analysis workflow</div>
              <div className="space-y-3">
                {[
                  { n: "01", text: "Run agent on 50 tasks with Veritas logging enabled" },
                  { n: "02", text: "Export structured decision traces to JSON" },
                  { n: "03", text: "Analyse decision patterns across runs using your preferred tools" },
                  { n: "04", text: "Identify failure modes and edge cases from trace data" },
                  { n: "05", text: "Iterate on agent configuration with full before/after comparison" },
                ].map((step) => (
                  <div key={step.n} className="flex items-start gap-3 text-xs text-black/50 py-2.5 border-b border-black/[0.04] last:border-0">
                    <span className="font-pixel text-[10px] text-black/20 tracking-widest shrink-0">{step.n}</span>
                    {step.text}
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── PREREQUISITES ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Tag>PREREQUISITES</Tag>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"What you need\nto get started."}
            </RevealText>
          </div>
          <BentoCard className="p-8 md:p-10" delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: "Runtime", items: ["Node.js 18+ or Python 3.9+", "npm, pnpm, or pip"] },
                { label: "AI Provider", items: ["An API key for your LLM provider", "OpenAI, Anthropic, or other supported models"] },
                { label: "Environment", items: ["Local machine or server", "No cloud accounts required"] },
              ].map((col) => (
                <div key={col.label}>
                  <div className="text-[10px] text-black/30 tracking-widest uppercase mb-4">{col.label}</div>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-black/55">
                        <span className="w-1 h-1 rounded-full bg-black/25 mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <Tag>FAQ</Tag>
              <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
                {"Common\nquestions."}
              </RevealText>
              <p className="mt-6 text-sm text-black/45 leading-relaxed">
                Don&apos;t see your question here?{" "}
                <Link href="/contact" className="underline hover:text-black/70 transition-colors">
                  Contact us
                </Link>{" "}
                or open an issue on GitHub.
              </p>
            </div>
            <div className="divide-y divide-black/[0.06]">
              {FAQ_ITEMS.map((item) => (
                <FaqItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight leading-[1.05]">
              Want to discuss your use case?
            </h2>
            <p className="mt-3 text-sm text-black/45 max-w-sm">
              Book a 20-minute session to walk through how Veritas fits your specific workflow.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/book-demo" className="px-8 py-3.5 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest font-medium text-center">
              BOOK A DEMO
            </Link>
            <Link href="/documentation" className="px-8 py-3.5 border border-black/10 text-black/60 text-sm rounded-xl hover:border-black/25 hover:text-black hover:bg-black/[0.03] transition-all tracking-widest text-center">
              READ THE DOCS
            </Link>
          </div>
        </div>
      </section>

      <VeritasFooter />
    </div>
  )
}
