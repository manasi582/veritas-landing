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

function StatusBadge({ label, type }: { label: string; type: "available" | "beta" | "planned" }) {
  const colors = {
    available: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    beta: "bg-amber-50 text-amber-700 border-amber-200/60",
    planned: "bg-black/[0.03] text-black/40 border-black/[0.08]",
  }
  const dots = {
    available: "bg-emerald-500",
    beta: "bg-amber-500",
    planned: "bg-black/20",
  }
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] tracking-widest border ${colors[type]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[type]}`} />
      {label}
    </span>
  )
}

export default function ProductPage() {
  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">
      <MobileNav />

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <Tag>PRODUCT</Tag>
          <RevealText className="mt-5 text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.02]">
            {"The Veritas product,\nexplained."}
          </RevealText>
          <p className="mt-8 text-base text-black/45 leading-relaxed max-w-xl">
            Veritas is an open-source AI agent orchestration platform designed around a single principle: every decision an AI agent makes should be visible, traceable, and trustworthy.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <StatusBadge label="Open Source" type="available" />
            <StatusBadge label="Beta" type="beta" />
            <StatusBadge label="MIT License" type="available" />
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Tag>WHO IT&apos;S FOR</Tag>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Built for teams who need\nto trust their AI."}
            </RevealText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
                label: "COMPLIANCE & GOVERNANCE",
                title: "Audit every AI decision",
                desc: "Regulatory requirements demand a record of every automated decision. Veritas gives compliance teams the structured, exportable audit trail they need — without slowing down the product team.",
                delay: 0,
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
                label: "ENGINEERING TEAMS",
                title: "Debug and observe agents",
                desc: "When an AI agent behaves unexpectedly in production, you need to know why. Veritas makes every decision traceable so you can replay executions and fix issues quickly.",
                delay: 80,
              },
              {
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
                label: "AI RESEARCHERS",
                title: "Evaluate agent behavior",
                desc: "Studying how AI agents make decisions? Veritas provides structured logging and comparison tools to analyze agent behavior systematically across multiple runs.",
                delay: 140,
              },
            ].map((c) => (
              <BentoCard key={c.label} className="p-8 flex flex-col min-h-[280px]" delay={c.delay}>
                <div className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center mb-5">
                  {c.icon}
                </div>
                <div className="font-pixel text-[10px] tracking-widest text-black/30 mb-3">{c.label}</div>
                <h3 className="text-lg font-light mb-3">{c.title}</h3>
                <p className="text-sm text-black/45 leading-relaxed flex-1">{c.desc}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES ─────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <PixelIcon type="platform" size={40} />
            <div className="mt-4"><Tag>CORE CAPABILITIES</Tag></div>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"What Veritas does today."}
            </RevealText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              {
                status: "available" as const,
                title: "Verifiable Execution",
                desc: "Every agent run produces a structured execution record. Inputs, tool calls, intermediate states, and final outputs are all captured in a queryable format. You can replay any run deterministically.",
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4"/><path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/></svg>,
                delay: 0,
              },
              {
                status: "available" as const,
                title: "Decision Tracing",
                desc: "Step through every decision your agent made during a run. Each decision point is logged with the context that influenced it, the options considered, and the outcome chosen.",
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
                delay: 80,
              },
              {
                status: "available" as const,
                title: "Audit Logs",
                desc: "Structured, permanent logs of every action, output, and state change. Logs include timestamps, agent identity, tool used, and result. Export to JSON or query via API.",
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10h8M8 14h5"/></svg>,
                delay: 0,
              },
              {
                status: "beta" as const,
                title: "Access Boundaries",
                desc: "Define exactly which tools, APIs, and resources each agent is permitted to access. Attempts to call unauthorized tools are blocked and logged. Fine-grained permission model currently in beta.",
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                delay: 80,
              },
            ].map((cap) => (
              <BentoCard key={cap.title} className="p-8 flex flex-col min-h-[220px]" delay={cap.delay}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl border border-black/10 flex items-center justify-center">
                    {cap.icon}
                  </div>
                  <StatusBadge label={cap.status === "available" ? "Available" : "Beta"} type={cap.status} />
                </div>
                <h3 className="text-lg font-light mb-3">{cap.title}</h3>
                <p className="text-sm text-black/45 leading-relaxed flex-1">{cap.desc}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── INPUTS / OUTPUTS ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Tag>HOW DATA FLOWS</Tag>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Logged at every step."}
            </RevealText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { step: "01", label: "INPUT", title: "Task & context", desc: "The initial task, context documents, and configuration are logged before the agent starts. Nothing happens before it is recorded.", delay: 0 },
              { step: "02", label: "PROCESSING", title: "Decisions & tool calls", desc: "Every intermediate decision, tool call, and state transition is captured in real time. Secrets and PII are redacted automatically.", delay: 80 },
              { step: "03", label: "OUTPUT", title: "Result & audit record", desc: "The final result is returned alongside a complete audit record linking every output back to the decisions that produced it.", delay: 140 },
            ].map((s) => (
              <BentoCard key={s.step} className="p-8 min-h-[220px] flex flex-col" delay={s.delay}>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-pixel text-[11px] text-black/20 tracking-widest">{s.step}</span>
                  <span className="text-[10px] text-black/30 tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/[0.03] border border-black/[0.06]">{s.label}</span>
                </div>
                <h3 className="text-lg font-light mb-3">{s.title}</h3>
                <p className="text-sm text-black/45 leading-relaxed flex-1">{s.desc}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── HONEST LIMITATIONS ────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Tag>CURRENT LIMITATIONS</Tag>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"What we&apos;re still building."}
            </RevealText>
          </div>
          <BentoCard className="p-8 md:p-10" delay={0}>
            <p className="text-sm text-black/60 leading-relaxed mb-8 max-w-2xl">
              Veritas is in active beta. We believe in being transparent about what the product can and cannot do today. The following capabilities are either in development or planned.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { status: "beta" as const, label: "Access Boundaries", note: "Permission model works but is being hardened for production use." },
                { status: "planned" as const, label: "Native integrations library", note: "Pre-built connectors for common APIs are on the roadmap." },
                { status: "planned" as const, label: "Dashboard UI", note: "A visual audit dashboard is in design. Currently logs are via API and CLI." },
                { status: "planned" as const, label: "Multi-agent coordination", note: "Verifying interactions between multiple agents is a planned capability." },
                { status: "beta" as const, label: "Streaming output logging", note: "Real-time streaming log capture works but has known edge cases." },
                { status: "planned" as const, label: "Long-term storage", note: "Audit log retention beyond local runs requires self-hosted configuration." },
              ].map((l) => (
                <div key={l.label} className="flex items-start gap-4">
                  <StatusBadge label={l.status === "beta" ? "Beta" : "Planned"} type={l.status} />
                  <div>
                    <div className="text-sm font-light text-black/70 mb-1">{l.label}</div>
                    <div className="text-xs text-black/40 leading-relaxed">{l.note}</div>
                  </div>
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
              Ready to go deeper?
            </h2>
            <p className="mt-3 text-sm text-black/45 max-w-sm">
              See the full workflow, read the technical docs, or book a demo to see Veritas in action.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link href="/how-it-works" className="px-8 py-3.5 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest font-medium text-center">
              SEE HOW IT WORKS
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
