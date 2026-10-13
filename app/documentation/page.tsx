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

const DOC_SECTIONS = [
  {
    label: "GETTING STARTED",
    title: "Quickstart",
    desc: "Install the Veritas SDK, define your first agent, and run a verified execution in under 10 minutes.",
    href: "/documentation/quickstart",
    status: "available",
    delay: 0,
  },
  {
    label: "GUIDES",
    title: "User Guide",
    desc: "Learn the core Veritas concepts: agents, tools, audit logs, access boundaries, and verification rules.",
    href: "/documentation/user-guide",
    status: "available",
    delay: 80,
  },
  {
    label: "REFERENCE",
    title: "Configuration",
    desc: "All configuration options, environment variables, and SDK settings explained with examples.",
    href: "/documentation/configuration",
    status: "beta",
    delay: 140,
  },
  {
    label: "TROUBLESHOOTING",
    title: "Troubleshooting",
    desc: "Common errors, known issues, and how to resolve them. Includes log inspection guidance.",
    href: "/documentation/troubleshooting",
    status: "available",
    delay: 0,
  },
  {
    label: "ARCHITECTURE",
    title: "Architecture",
    desc: "Deep dive into how Veritas works internally: components, data flow, and trust boundaries.",
    href: "/documentation/architecture",
    status: "planned",
    delay: 80,
  },
  {
    label: "FAQ",
    title: "FAQ",
    desc: "Answers to common questions about installation, data handling, compatibility, and licensing.",
    href: "/use-cases#faq",
    status: "available",
    delay: 140,
  },
]

export default function DocumentationPage() {
  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">
      <MobileNav />

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <Tag>DOCUMENTATION</Tag>
          <RevealText className="mt-5 text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.02]">
            {"Everything you need\nto use Veritas."}
          </RevealText>
          <p className="mt-8 text-base text-black/45 leading-relaxed max-w-xl">
            The Veritas documentation covers installation, configuration, core concepts, and troubleshooting. Start with the Quickstart to get a verified agent running in minutes.
          </p>
          <div className="mt-8">
            <Link href="/documentation/quickstart" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest font-medium">
              START QUICKSTART →
            </Link>
          </div>
        </div>
      </section>

      {/* ── DOC SECTIONS ──────────────────────────────────────────────────── */}
      <section className="py-8 pb-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DOC_SECTIONS.map((doc) => (
              <Link key={doc.title} href={doc.href}>
                <BentoCard className="p-7 h-full flex flex-col cursor-pointer" delay={doc.delay}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="font-pixel text-[10px] tracking-widest text-black/30">{doc.label}</div>
                    {doc.status === "planned" && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/[0.04] text-black/30 border border-black/[0.06]">Planned</span>
                    )}
                    {doc.status === "beta" && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60">Beta</span>
                    )}
                  </div>
                  <h3 className="text-lg font-light mb-3">{doc.title}</h3>
                  <p className="text-sm text-black/45 leading-relaxed flex-1">{doc.desc}</p>
                  <div className="mt-5 text-xs text-black/35 group-hover:text-black/60 transition-colors tracking-widest">
                    {doc.status === "planned" ? "Coming soon" : "Read →"}
                  </div>
                </BentoCard>
              </Link>
            ))}
          </div>

          {/* Note about documentation status */}
          <div className="mt-8 p-5 rounded-2xl border border-black/[0.06] bg-black/[0.02]">
            <p className="text-xs text-black/40 leading-relaxed">
              <span className="text-black/60 font-medium">Documentation status:</span> Veritas is in beta. Core documentation (Quickstart, User Guide, Troubleshooting) is available. Architecture and API reference docs are in progress. The GitHub repository README contains additional information.{" "}
              <a href="https://github.com/shreyaaassss/Veritas" target="_blank" rel="noopener noreferrer" className="underline hover:text-black/60 transition-colors">
                View on GitHub ↗
              </a>
            </p>
          </div>
        </div>
      </section>

      <VeritasFooter />
    </div>
  )
}
