"use client"

import React, { useRef, useEffect, useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { VeritasFooter } from "@/components/veritas-footer"
import { RevealText } from "@/components/reveal-text"
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

export default function AboutPage() {
  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">
      <MobileNav />

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <Tag>ABOUT</Tag>
          <RevealText className="mt-5 text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.02]">
            {"Built to make\nAI trustworthy."}
          </RevealText>
          <p className="mt-8 text-base text-black/45 leading-relaxed max-w-xl">
            Veritas is an open-source project created to solve a real problem: AI agents are becoming more capable, but the tools to understand and trust them haven&apos;t kept up.
          </p>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <BentoCard className="p-10 md:p-14" delay={0}>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-black/70 max-w-3xl">
              &ldquo;AI is becoming more capable every day. But capability without transparency creates systems that are hard to trust, difficult to debug, and impossible to govern. Veritas exists to change that.&rdquo;
            </p>
          </BentoCard>
        </div>
      </section>

      {/* ── THE PROBLEM ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Tag>THE PROBLEM</Tag>
              <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
                {"AI agents make decisions\nin the dark."}
              </RevealText>
              <div className="mt-8 space-y-5">
                {[
                  "When an AI agent fails, it is often impossible to know why. The decision that led to the failure happened inside a black box.",
                  "Compliance teams cannot audit what they cannot see. Regulatory requirements around automated decision-making are increasing, but most AI tools provide no audit trail.",
                  "Debugging production AI agents is painful. Without execution traces, you cannot reproduce failures or confidently fix them.",
                  "Trust in AI systems requires evidence, not assurances. Saying a system is trustworthy is not enough — you need to show the work.",
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-1 bg-black/10 rounded-full shrink-0 self-stretch" />
                    <p className="text-sm text-black/50 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <BentoCard className="p-8" delay={0}>
              <div className="text-xs text-black/30 tracking-widest uppercase mb-5">Without Veritas</div>
              <div className="space-y-3">
                {[
                  { icon: "✗", text: "Agent failed. No trace available." },
                  { icon: "✗", text: "Cannot reproduce the error." },
                  { icon: "✗", text: "No record of what data was accessed." },
                  { icon: "✗", text: "Audit review: insufficient documentation." },
                  { icon: "✗", text: "Cannot explain the decision to stakeholders." },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-red-50/50 border border-red-100/60">
                    <span className="text-red-400 text-sm shrink-0">{item.icon}</span>
                    <span className="text-xs text-black/50">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-black/[0.06] text-xs text-black/30">With Veritas, each of these has a clear answer.</div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── DESIGN PRINCIPLES ────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Tag>DESIGN PRINCIPLES</Tag>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"How we think\nabout the product."}
            </RevealText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                num: "01",
                title: "Transparency First",
                desc: "Every design decision starts with the question: does this make the system more transparent? Logging is not optional. Observability is not an add-on.",
                delay: 0,
              },
              {
                num: "02",
                title: "Honest About Limitations",
                desc: "We clearly distinguish what Veritas can do today from what is in development. We do not make claims we cannot support. This page itself follows that principle.",
                delay: 80,
              },
              {
                num: "03",
                title: "Developer Experience Matters",
                desc: "A transparency tool no one uses helps no one. Veritas is designed to be easy to integrate, easy to read, and easy to trust — so teams actually use it.",
                delay: 140,
              },
            ].map((p) => (
              <BentoCard key={p.num} className="p-8 flex flex-col min-h-[260px]" delay={p.delay}>
                <span className="font-pixel text-[11px] text-black/20 tracking-widest block mb-6">{p.num}</span>
                <h3 className="text-lg font-light mb-3">{p.title}</h3>
                <p className="text-sm text-black/45 leading-relaxed flex-1">{p.desc}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECT STATUS ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Tag>PROJECT STATUS</Tag>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Where we are today."}
            </RevealText>
          </div>
          <BentoCard className="p-8 md:p-10" delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-xs text-black/40 tracking-widest uppercase">Current: Beta</span>
                </div>
                <p className="text-sm text-black/55 leading-relaxed mb-4">
                  Veritas is an open-source project in active development. The core capabilities — verifiable execution, decision tracing, and audit logs — are functional and being tested in real workflows.
                </p>
                <p className="text-sm text-black/45 leading-relaxed">
                  Some features are still being built. We mark everything clearly as Available, Beta, or Planned on our product page.
                </p>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-black/[0.02] border border-black/[0.06]">
                  <div className="text-xs text-black/30 tracking-widest uppercase mb-2">License</div>
                  <div className="text-sm text-black/60">MIT — free to use, modify, and distribute.</div>
                </div>
                <div className="p-4 rounded-xl bg-black/[0.02] border border-black/[0.06]">
                  <div className="text-xs text-black/30 tracking-widest uppercase mb-2">Source</div>
                  <a
                    href="https://github.com/shreyaaassss/Veritas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-black/60 hover:text-black transition-colors"
                  >
                    github.com/shreyaaassss/Veritas ↗
                  </a>
                </div>
                <div className="p-4 rounded-xl bg-black/[0.02] border border-black/[0.06]">
                  <div className="text-xs text-black/30 tracking-widest uppercase mb-2">Deployment</div>
                  <div className="text-sm text-black/60">Self-hosted. No cloud dependency required.</div>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* ── CONTRIBUTORS ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Tag>CONTRIBUTORS</Tag>
            <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05]">
              {"Built in the open."}
            </RevealText>
          </div>
          <BentoCard className="p-8 md:p-10" delay={0}>
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1">
                <p className="text-sm text-black/55 leading-relaxed mb-4">
                  Veritas is built by contributors who care about trustworthy AI tooling. The project is open source and welcomes contributions of all kinds — code, documentation, issue reports, and design feedback.
                </p>
                <p className="text-sm text-black/45 leading-relaxed">
                  If you&apos;re working on AI agent transparency, auditability, or observability, we&apos;d love to hear from you.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <a
                  href="https://github.com/shreyaaassss/Veritas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest font-medium text-center"
                >
                  VIEW ON GITHUB
                </a>
                <Link href="/contact" className="px-8 py-3.5 border border-black/10 text-black/60 text-sm rounded-xl hover:border-black/25 hover:text-black hover:bg-black/[0.03] transition-all tracking-widest text-center">
                  GET IN TOUCH
                </Link>
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      <VeritasFooter />
    </div>
  )
}
