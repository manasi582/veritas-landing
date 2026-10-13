"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { IntroAnimation, HERO_REVEAL_MS } from "@/components/intro-animation"
import { PixelIcon } from "@/components/pixel-icon"
import { RevealText } from "@/components/reveal-text"
import { StackingAgentCards } from "@/components/stacking-agent-cards"
import { MobileNav } from "@/components/mobile-nav"
import { DevExSection } from "@/components/devex-section"
import { VeritasFooter } from "@/components/veritas-footer"
import { GlitchBackground } from "@/components/glitch-background"
import Link from "next/link"

// ─── Intersection Observer hook ───────────────────────────────────────────────
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

// ─── Bento card ───────────────────────────────────────────────────────────────
function BentoCard({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView(0.08)
  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-black/[0.07] bg-white overflow-hidden hover:border-black/[0.14] hover:bg-[#fafaf8] transition-colors ${className}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms, border-color 0.3s, background-color 0.3s`,
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

function RuleBadge({ title, severity, label }: { title: string; severity: "HIGH" | "MEDIUM"; label: string }) {
  const color = severity === "HIGH" ? "bg-red-50 text-red-600 border-red-200/70" : "bg-amber-50 text-amber-600 border-amber-200/70"
  return (
    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-black/[0.06] bg-black/[0.02] hover:bg-black/[0.04] transition-colors">
      <span className="text-xs font-light text-black/70 shrink-0 w-36">{title}</span>
      <span className="text-xs text-black/50 flex-1">{label}</span>
      <span className={`text-[9px] px-2 py-0.5 rounded-full border tracking-widest shrink-0 ${color}`}>{severity}</span>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function VeritasPage() {
  const [mounted, setMounted] = useState(false)
  const [heroReady, setHeroReady] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const [ctaHovered, setCtaHovered] = useState(false)

  useEffect(() => setMounted(true), [])

  const handleIntroDone = useCallback(() => {
    setHeroReady(true)
  }, [])

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">

      {mounted && <IntroAnimation onDone={handleIntroDone} />}

      <MobileNav />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] overflow-hidden flex flex-col">
        <div
          className="absolute inset-0 z-0"
          style={{
            opacity: heroReady ? 1 : 0,
            transition: `opacity 1.2s ease ${HERO_REVEAL_MS}ms`,
          }}
        >
          <video
            autoPlay muted loop playsInline
            onCanPlay={() => setVideoReady(true)}
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/agentic-hero-9yW3wnTNMfn2U6lsVhTTZSJFEvAoSj.mp4"
            style={{
              transform: videoReady ? "scale(1.05)" : "scale(0.85)",
              transition: "transform 2s cubic-bezier(0.16, 1, 0.3, 1)",
              filter: "saturate(1.8) brightness(1.15) contrast(1.05)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "55%", background: "linear-gradient(to top, #F5F4F0 0%, #F5F4F0 12%, rgba(245,244,240,0.75) 28%, rgba(245,244,240,0.35) 48%, rgba(245,244,240,0.08) 70%, transparent 100%)" }} />
          <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none" style={{ height: "18%", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", maskImage: "linear-gradient(to top, black 0%, transparent 100%)", WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)" }} />
        </div>

        <div className="h-20" />

        <div className="relative z-20 flex-1 flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-16 max-w-6xl">
          <div style={{ opacity: heroReady ? 1 : 0, transform: heroReady ? "translateY(0)" : "translateY(24px)", transition: "opacity 1s ease 200ms, transform 1s cubic-bezier(0.16,1,0.3,1) 200ms" }}>
            <Tag>DPDPA COMPLIANCE PLATFORM</Tag>
            <RevealText className="mt-5 text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.02]">
              {"Stop guessing.\nStart proving\nDPDPA compliance."}
            </RevealText>
            <p className="mt-7 text-base text-black/50 max-w-lg leading-relaxed">
              Veritas automatically detects personal data violations in your application logs, records tamper-evident evidence, and gives your compliance team a live dashboard to investigate every case  -  entirely on your own infrastructure.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              {[
                { dot: "#10b981", label: "v1.0.16", sub: "LATEST RELEASE" },
                { dot: "#3b82f6", label: "On-Premise", sub: "YOUR INFRA" },
                { dot: "#8b5cf6", label: "DPDPA 2023", sub: "INDIA" },
              ].map(({ dot, label, sub }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: dot }} />
                  <span className="text-sm text-black/70">{label}</span>
                  <span className="font-pixel text-[9px] text-black/30 tracking-widest">{sub}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book-demo" className="px-8 py-3.5 bg-[#111] text-white text-sm rounded-xl hover:bg-[#2a2a2a] transition-colors tracking-widest font-medium">
                BOOK A DEMO
              </Link>
              <Link href="/how-it-works" className="px-8 py-3.5 border border-black/15 text-black/70 text-sm rounded-xl hover:border-black/30 hover:text-black transition-all tracking-widest">
                HOW IT WORKS →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ─────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <Tag>THE PROBLEM</Tag>
          <RevealText className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] max-w-4xl">
            {"DPDPA 2023 requires you to\ndetect violations before\nthey become breaches."}
          </RevealText>
          <p className="mt-8 text-base text-black/45 leading-relaxed max-w-2xl">
            Every organisation subject to DPDPA must track where personal data goes, why it&apos;s being used, how long it&apos;s retained, and prove compliance to auditors. Doing this manually across hundreds of services is impossible.
          </p>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { n: "01", icon: "platform" as const, title: "Personal data leaks into logs", desc: "A debug line dumps a customer record. Without automated scanning, you'll never know  -  until an auditor finds it.", delay: 0 },
              { n: "02", icon: "workflow" as const, title: "Data used beyond declared purpose", desc: "An API call accesses fields your privacy policy doesn't permit for that service. Purpose limitation violated silently.", delay: 60 },
              { n: "03", icon: "integrations" as const, title: "Retention windows exceeded", desc: "Data from 3 years ago sits in a system that's only allowed to keep it for 6 months. Every day is a fresh violation.", delay: 120 },
            ].map((item) => (
              <BentoCard key={item.n} className="p-7" delay={item.delay}>
                <div className="mb-5">
                  <PixelIcon type={item.icon} size={36} />
                </div>
                <div className="font-pixel text-[10px] text-black/20 tracking-widest mb-4">{item.n}</div>
                <h3 className="text-base font-light mb-3 leading-snug">{item.title}</h3>
                <p className="text-sm text-black/45 leading-relaxed">{item.desc}</p>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES BENTO ──────────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <Tag>CAPABILITIES</Tag>
          <RevealText className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
            {"Everything you need\nfor DPDPA compliance."}
          </RevealText>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

            {/* PII Detection  -  large with iridescent image */}
            <BentoCard className="md:col-span-2 overflow-hidden" delay={0}>
              <div className="relative min-h-[280px]">
                {/* Iridescent image right side */}
                <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 pointer-events-none">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/researcher-CvhqOuV6irGwBOnJoTGFlXdbyYBRjb.png"
                    alt="PII Detection"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to right, white 0%, transparent 55%)" }} />
                </div>
                <div className="relative z-10 p-8 md:max-w-[58%]">
                  <div className="mb-4"><PixelIcon type="platform" size={36} /></div>
                  <div className="font-pixel text-[10px] text-black/25 tracking-widest mb-3">PII DETECTION ENGINE</div>
                  <h3 className="text-xl font-light mb-3">Detects personal data in your application logs</h3>
                  <p className="text-sm text-black/45 leading-relaxed mb-5">
                    Automatically scans logs and API traffic for personal data across dozens of entity types. Every detection is validated to eliminate false positives. Runs fully on your server  -  no external API calls.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Aadhaar", "PAN Card", "Phone Numbers", "Names", "Email", "Address"].map(t => (
                      <span key={t} className="text-[10px] px-2.5 py-1 rounded-full bg-black/[0.04] text-black/45 border border-black/[0.06] font-pixel tracking-widest">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* On-premise */}
            <BentoCard className="p-8" delay={80}>
              <div className="mb-4"><PixelIcon type="agents" size={36} /></div>
              <div className="font-pixel text-[10px] text-black/25 tracking-widest mb-3">DATA RESIDENCY</div>
              <h3 className="text-xl font-light mb-3">Zero data leaves your network</h3>
              <p className="text-sm text-black/45 leading-relaxed">
                Server, evidence store, and dashboard all run on your infrastructure. No cloud dependency. The only optional egress is AI investigation  -  and it sends no raw PII.
              </p>
              <div className="mt-5 p-3 rounded-xl bg-emerald-50 border border-emerald-200/60">
                <p className="text-xs text-emerald-700 font-medium">Your data. Your network. Your control.</p>
              </div>
            </BentoCard>

            {/* 4 DPDPA Rules */}
            <BentoCard className="p-8 md:col-span-1 lg:col-span-2" delay={0}>
              <div className="mb-4"><PixelIcon type="workflow" size={36} /></div>
              <div className="font-pixel text-[10px] text-black/25 tracking-widest mb-3">DPDPA RULE ENGINE</div>
              <h3 className="text-xl font-light mb-5">4 rules. Every violation caught.</h3>
              <div className="space-y-2.5">
                <RuleBadge title="Data Exposure" severity="HIGH" label="Personal data appears where it must never appear  -  logs, debug output, API responses" />
                <RuleBadge title="Purpose Violation" severity="HIGH" label="Data used in a system whose declared consent scope doesn&apos;t permit it" />
                <RuleBadge title="Retention Exceeded" severity="MEDIUM" label="Data held past the permitted retention window for that field" />
                <RuleBadge title="Re-identification Risk" severity="MEDIUM" label="Individually harmless fields appearing together that could identify a person" />
              </div>
            </BentoCard>

            {/* Evidence chain */}
            <BentoCard className="p-8" delay={80}>
              <div className="mb-4"><PixelIcon type="pricing" size={36} /></div>
              <div className="font-pixel text-[10px] text-black/25 tracking-widest mb-3">TAMPER-EVIDENT EVIDENCE</div>
              <h3 className="text-xl font-light mb-3">SHA-256 hash chain</h3>
              <p className="text-sm text-black/45 leading-relaxed mb-4">
                Every verdict links to the previous via SHA-256 hash. Verify the chain at any time. Export a signed PDF audit report for regulators.
              </p>
              <div className="font-mono text-[10px] text-black/25 leading-relaxed bg-black/[0.02] rounded-lg p-3 border border-black/[0.05]">
                <div>verdict_hash: <span className="text-black/40">sha256(prev + verdict)</span></div>
                <div className="mt-1">chain_valid: <span className="text-emerald-600">true</span></div>
              </div>
            </BentoCard>

            {/* Dashboard  -  large with iridescent image */}
            <BentoCard className="md:col-span-2 overflow-hidden" delay={0}>
              <div className="relative min-h-[260px]">
                <div className="hidden md:block absolute inset-y-0 right-0 w-1/2 pointer-events-none">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/analyst-Ysxnqg7Fpy2cfA56PiIttv1KximMhT.png"
                    alt="Investigation Dashboard"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to right, white 0%, transparent 55%)" }} />
                </div>
                <div className="relative z-10 p-8 md:max-w-[58%]">
                  <div className="mb-4"><PixelIcon type="integrations" size={36} /></div>
                  <div className="font-pixel text-[10px] text-black/25 tracking-widest mb-3">INVESTIGATION DASHBOARD</div>
                  <h3 className="text-xl font-light mb-3">Live violations. Full case lifecycle.</h3>
                  <p className="text-sm text-black/45 leading-relaxed mb-5">
                    Violations appear live via WebSocket. Open cases, investigate with optional AI explanations (no raw PII sent), annotate, and move OPEN → ACKNOWLEDGED → RESOLVED.
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Live Stream", "Audit Ledger", "Agent Management", "PDF Export"].map(f => (
                      <div key={f} className="p-2.5 rounded-xl bg-black/[0.03] border border-black/[0.05] text-center">
                        <div className="text-xs text-black/50">{f}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BentoCard>

            {/* Optional LLM */}
            <BentoCard className="p-8" delay={80}>
              <div className="mb-4"><PixelIcon type="agents" size={36} /></div>
              <div className="font-pixel text-[10px] text-black/25 tracking-widest mb-3">OPTIONAL AI</div>
              <h3 className="text-xl font-light mb-3">Plain-language violation explanations</h3>
              <p className="text-sm text-black/45 leading-relaxed">
                Connect OpenAI, Anthropic, or a local Ollama model. Get statute-referenced explanations of each violation. Raw PII never sent  -  only field names and rule text.
              </p>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── STACKING CARDS  -  who it's for ───────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <Tag>WHO IT&apos;S FOR</Tag>
          <RevealText className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] mb-16">
            {"Built for every team\nresponsible for\ndata compliance."}
          </RevealText>
          <StackingAgentCards />
        </div>
      </section>

      {/* ── DEVEX / INSTALLATION ────────────────────────────────────────────── */}
      <DevExSection />

      {/* ── DEPLOYMENT OPTIONS ──────────────────────────────────────────────── */}
      <section className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <Tag>DEPLOYMENT</Tag>
          <RevealText className="mt-5 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05]">
            {"Deploys on your\ninfrastructure."}
          </RevealText>
          <p className="mt-8 text-base text-black/45 max-w-xl leading-relaxed">
            Veritas is a licensed software package that installs directly on your existing servers. Linux, macOS, and Windows supported  -  with Kubernetes agent deployment for containerised environments.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { os: "Linux", pkg: "Ubuntu 22.04+", delay: 0 },
              { os: "macOS", pkg: "macOS 12+ (Apple Silicon)", delay: 80 },
              { os: "Windows", pkg: "Windows 10/11, Server 2019+", delay: 160 },
            ].map((item) => (
              <BentoCard key={item.os} className="p-7" delay={item.delay}>
                <div className="font-pixel text-[10px] text-black/25 tracking-widest mb-3">{item.os.toUpperCase()}</div>
                <div className="text-sm font-light text-black/60">{item.pkg}</div>
              </BentoCard>
            ))}
          </div>

          <div className="mt-6">
            <BentoCard className="p-7" delay={0}>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-1">
                  <div className="font-pixel text-[10px] text-black/25 tracking-widest mb-2">KUBERNETES</div>
                  <p className="text-sm text-black/50 leading-relaxed">Deploy the Veritas Agent as a DaemonSet  -  one agent per node, log forwarding stays entirely inside your cluster.</p>
                </div>
                <Link
                  href="/documentation"
                  className="shrink-0 px-6 py-3 bg-[#111] text-white text-xs rounded-xl hover:bg-[#2a2a2a] transition-colors tracking-widest font-medium"
                >
                  VIEW INSTALLATION GUIDE →
                </Link>
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* ── GLITCH CTA ──────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[520px] flex flex-col items-center justify-center overflow-hidden border-t border-black/[0.06] bg-black"
        onMouseEnter={() => setCtaHovered(true)}
        onMouseLeave={() => setCtaHovered(false)}
      >
        <GlitchBackground isHovered={ctaHovered} />
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 max-w-3xl mx-auto">
          <Tag>GET STARTED</Tag>
          <h2 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.05] text-white">
            Ready to automate<br />your DPDPA compliance?
          </h2>
          <p className="mt-6 text-base text-white/50 max-w-md leading-relaxed">
            Book a demo and see Veritas detect a real DPDPA violation  -  from agent deployment to evidence export.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link href="/book-demo" className="px-10 py-4 bg-white text-black text-sm rounded-xl hover:bg-white/90 transition-colors tracking-widest font-medium">
              BOOK A DEMO
            </Link>
            <Link href="/how-it-works" className="px-10 py-4 border border-white/20 text-white/70 text-sm rounded-xl hover:border-white/40 hover:text-white transition-all tracking-widest">
              HOW IT WORKS
            </Link>
            <Link href="/documentation" className="px-10 py-4 border border-white/20 text-white/70 text-sm rounded-xl hover:border-white/40 hover:text-white transition-all tracking-widest">
              DOCUMENTATION
            </Link>
          </div>
        </div>
      </section>

      <VeritasFooter />
    </div>
  )
}
