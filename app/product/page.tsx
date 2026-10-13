"use client"

import React, { useRef, useEffect, useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { VeritasFooter } from "@/components/veritas-footer"
import { RevealText } from "@/components/reveal-text"
import { PixelIcon } from "@/components/pixel-icon"
import Link from "next/link"

function useInView(threshold = 0.1) {
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
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={`rounded-2xl border border-black/[0.07] bg-white overflow-hidden ${className}`}
      style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest text-black/40 bg-black/[0.04]">{children}</span>
}

function StatusBadge({ status }: { status: "production" | "beta" | "planned" }) {
  const styles = {
    production: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    beta: "bg-amber-50 text-amber-600 border-amber-200/60",
    planned: "bg-black/[0.04] text-black/40 border-black/[0.08]",
  }
  const labels = { production: "Production", beta: "Beta", planned: "Planned" }
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full border tracking-widest ${styles[status]}`}>
      {labels[status]}
    </span>
  )
}

export default function ProductPage() {
  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">
      <MobileNav />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <Tag>PRODUCT</Tag>
          <RevealText className="mt-5 text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.02]">
            {"Veritas DPDPA\nCompliance Platform."}
          </RevealText>
          <p className="mt-8 text-base text-black/45 leading-relaxed max-w-xl">
            An on-premise compliance monitoring platform for the Digital Personal Data Protection Act 2023. Detects violations in your application telemetry, enforces DPDPA rules, and maintains a tamper-evident audit ledger - entirely within your infrastructure.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="px-4 py-2 rounded-xl bg-white border border-black/[0.07] text-sm text-black/60">v1.0.16</div>
            <div className="px-4 py-2 rounded-xl bg-white border border-black/[0.07] text-sm text-black/60">412 tests passing</div>
            <div className="px-4 py-2 rounded-xl bg-white border border-black/[0.07] text-sm text-black/60">Ubuntu · macOS · Windows</div>
          </div>
        </div>
      </section>

      {/* DPDPA Rules */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <Tag>DPDPA RULE ENGINE</Tag>
          <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05] mb-12">{"Four rules. Every violation caught."}</RevealText>

          <div className="space-y-3">
            {[
              {
                id: "EXPOSURE_001",
                title: "Data Exposure",
                severity: "HIGH",
                when: "Personal data appears where it must never appear  -  application logs, debug output, API responses not intended to carry it.",
                example: "A debug log line contains an Aadhaar number. DPDPA § 8(3) requires data minimisation  -  no more data than necessary for the purpose.",
                statute: "DPDPA 2023 § 8(3)  -  Data minimisation",
                delay: 0,
              },
              {
                id: "PURPOSE_001",
                title: "Purpose Limitation",
                severity: "HIGH",
                when: "Data appears in a system whose declared purpose or consent scope does not permit it, or a field not declared in the org config at all.",
                example: "A phone number collected for order fulfillment appears in a marketing analytics system. The consent scope is order_fulfillment, not marketing.",
                statute: "DPDPA 2023 § 6  -  Purpose limitation",
                delay: 60,
              },
              {
                id: "RETENTION_001",
                title: "Retention Violation",
                severity: "MEDIUM",
                when: "Data in a source system is older than the retention window declared for that field in the org config.",
                example: "Customer Aadhaar data stored in the KYC system is 200 days old, but retention_days is 180. Every day after the window is a fresh violation.",
                statute: "DPDPA 2023 § 8(7)  -  Storage limitation",
                delay: 120,
              },
              {
                id: "LINKAGE_001",
                title: "Data Linkage / Re-identification",
                severity: "MEDIUM",
                when: "Several individually harmless fields appear together in a way that could identify a specific person, as defined by the org's linkage rules.",
                example: "name, phone, and delivery_address appear together in a single event. Each field alone is not identifying, but together they uniquely identify an individual.",
                statute: "DPDPA 2023 § 2(t)  -  Definition of personal data",
                delay: 180,
              },
            ].map((rule) => (
              <BentoCard key={rule.id} className="p-8 md:p-10" delay={rule.delay}>
                <div className="flex items-start justify-between gap-6 mb-5">
                  <div className="flex items-center gap-4">
                    <code className="font-pixel text-[11px] text-black/35 tracking-widest">{rule.id}</code>
                    <h3 className="text-xl font-light">{rule.title}</h3>
                  </div>
                  <span className={`shrink-0 text-[10px] px-2.5 py-1 rounded-full border tracking-widest ${rule.severity === "HIGH" ? "bg-red-50 text-red-600 border-red-200/70" : "bg-amber-50 text-amber-600 border-amber-200/60"}`}>
                    {rule.severity}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-[10px] text-black/30 tracking-widest uppercase mb-2">Fires when</div>
                    <p className="text-sm text-black/55 leading-relaxed">{rule.when}</p>
                  </div>
                  <div>
                    <div className="text-[10px] text-black/30 tracking-widest uppercase mb-2">Example</div>
                    <p className="text-sm text-black/55 leading-relaxed">{rule.example}</p>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-black/[0.05]">
                  <span className="font-pixel text-[9px] text-black/25 tracking-widest">{rule.statute}</span>
                </div>
              </BentoCard>
            ))}
          </div>
        </div>
      </section>

      {/* PII Detection Engine */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <Tag>PII DETECTION</Tag>
          <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05] mb-12">{"Built for India's personal data."}</RevealText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <BentoCard className="p-8" delay={0}>
              <div className="font-pixel text-[10px] text-black/25 tracking-widest mb-5">DETECTION ENGINE</div>
              <h3 className="text-lg font-light mb-4">Microsoft Presidio + spaCy</h3>
              <p className="text-sm text-black/50 leading-relaxed mb-5">
                Runs fully locally  -  no data leaves your network for detection. Presidio provides the NLP pipeline, spaCy (en_core_web_lg) handles named entity recognition. All detection happens synchronously inside your server process.
              </p>
              <div className="space-y-2">
                {["Regex patterns + NLP hybrid approach", "Confidence scoring per entity", "Validators eliminate false positives", "Custom recognizers for Indian PII types"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-black/50">
                    <div className="w-1 h-1 rounded-full bg-black/25 shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </BentoCard>

            <BentoCard className="p-8" delay={80}>
              <div className="font-pixel text-[10px] text-black/25 tracking-widest mb-5">INDIAN PII RECOGNIZERS</div>
              <div className="space-y-3">
                {[
                  { type: "Aadhaar", detail: "Custom recognizer with Verhoeff checksum validation to eliminate false positives" },
                  { type: "PAN Card", detail: "Pattern AAAAA9999A, validated against structural rules" },
                  { type: "Indian Phone", detail: "10-digit numbers with Indian operator prefix patterns" },
                  { type: "Name", detail: "spaCy PERSON entity + Indian name patterns" },
                  { type: "Email", detail: "Standard RFC 5322 pattern" },
                  { type: "Location", detail: "spaCy LOCATION entity (address, city)" },
                ].map(item => (
                  <div key={item.type} className="pb-3 border-b border-black/[0.05] last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-pixel text-[10px] text-black/40 tracking-widest">{item.type.toUpperCase()}</span>
                    </div>
                    <p className="text-xs text-black/40 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* Evidence chain & dashboard */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <Tag>EVIDENCE & DASHBOARD</Tag>
          <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05] mb-12">{"Auditor-grade evidence.\nLive investigation."}</RevealText>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <BentoCard className="p-8" delay={0}>
              <div className="font-pixel text-[10px] text-black/25 tracking-widest mb-5">TAMPER-EVIDENT EVIDENCE CHAIN</div>
              <h3 className="text-lg font-light mb-4">SHA-256 hash chain per organisation</h3>
              <p className="text-sm text-black/50 leading-relaxed mb-5">
                Every verdict is linked to the previous one by storing <code className="bg-black/[0.05] px-1 rounded font-mono text-[11px]">sha256(prev_hash + verdict)</code>. If any record is altered, the chain breaks. The dashboard can verify the entire chain at any time.
              </p>
              <div className="space-y-2">
                {["Append-only SQLite evidence store", "Per-organisation isolation", "Full chain verification via dashboard", "Export tamper-evident PDF audit reports", "Chain verification on demand"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-black/50">
                    <span className="text-emerald-600">✓</span> {f}
                  </div>
                ))}
              </div>
            </BentoCard>

            <BentoCard className="p-8" delay={80}>
              <div className="font-pixel text-[10px] text-black/25 tracking-widest mb-5">INVESTIGATION DASHBOARD</div>
              <h3 className="text-lg font-light mb-4">7 purpose-built views</h3>
              <div className="space-y-3">
                {[
                  { view: "Live Stream", desc: "Violations pushed via WebSocket the moment they're detected" },
                  { view: "Audit Ledger", desc: "Full chronological record of all verdicts for this org" },
                  { view: "Case View", desc: "Per-violation investigation panel with optional AI Q&A" },
                  { view: "Agents", desc: "Register, monitor heartbeat, revoke any agent instantly" },
                  { view: "Policy", desc: "View the current org config and its version history" },
                  { view: "Audit Log", desc: "Every admin action logged  -  who did what and when" },
                  { view: "Scan Sandbox", desc: "Test PII detection against a sample payload before deploying" },
                ].map(item => (
                  <div key={item.view} className="flex items-start gap-3">
                    <span className="font-pixel text-[9px] text-black/30 tracking-widest w-24 shrink-0">{item.view.toUpperCase()}</span>
                    <span className="text-xs text-black/50 leading-relaxed">{item.desc}</span>
                  </div>
                ))}
              </div>
            </BentoCard>
          </div>
        </div>
      </section>

      {/* Licensing */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <Tag>LICENSING</Tag>
          <RevealText className="mt-5 text-4xl md:text-5xl font-light tracking-tight leading-[1.05] mb-12">{"Machine-bound.\nOffline-first."}</RevealText>

          <BentoCard className="p-8 md:p-10" delay={0}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-lg font-light mb-4">How Veritas licensing works</h3>
                <p className="text-sm text-black/50 leading-relaxed mb-5">
                  Veritas uses RSA-PSS signed license files (<code className="bg-black/[0.05] px-1 rounded font-mono text-[10px]">.vlic</code>). The license encodes your organisation name, tier, issue date, expiry date, and optionally a machine fingerprint. The product embeds only the public key  -  your private key never leaves our servers.
                </p>
                <div className="space-y-3 text-sm text-black/55">
                  {[
                    "No call home  -  license is verified locally on every startup",
                    "Machine-bound option: fingerprint ties the license to your specific server",
                    "Linux fingerprint: hash of /etc/machine-id (stable across renames and network changes)",
                    "Expiry enforced locally  -  renew by installing a new .vlic file",
                    "Invalid or expired license: clear error message, service exits cleanly",
                  ].map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <span className="text-black/30 shrink-0 mt-0.5">·</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-light mb-4">License workflow</h3>
                <div className="space-y-4">
                  {[
                    { n: "1", step: "Install Veritas on your server" },
                    { n: "2", step: "Run: sudo veritas fingerprint (prints a 64-char hash)" },
                    { n: "3", step: "Send that hash to your Veritas contact" },
                    { n: "4", step: "Receive a signed veritas.vlic file" },
                    { n: "5", step: "Run: sudo veritas license /path/to/veritas.vlic" },
                    { n: "6", step: "Service starts. Dashboard is available." },
                  ].map(item => (
                    <div key={item.n} className="flex items-start gap-4">
                      <span className="font-pixel text-[10px] text-black/25 tracking-widest shrink-0 w-4">{item.n}</span>
                      <span className="text-sm text-black/55">{item.step}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/book-demo" className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black tracking-widest transition-colors">
                    Request a license → /book-demo
                  </Link>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </section>

      {/* Feature status */}
      <section className="py-24 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto">
          <Tag>FEATURE STATUS</Tag>
          <h2 className="mt-5 text-3xl font-light tracking-tight mb-10">What&apos;s built. What&apos;s next.</h2>
          <BentoCard className="p-8" delay={0}>
            <div className="space-y-3">
              {[
                { feature: "PII detection (Presidio + spaCy + Indian recognizers)", status: "production" as const },
                { feature: "DPDPA rule engine (EXPOSURE, PURPOSE, RETENTION, LINKAGE)", status: "production" as const },
                { feature: "SHA-256 tamper-evident evidence chain", status: "production" as const },
                { feature: "Investigation dashboard (7 views)", status: "production" as const },
                { feature: "Agent registration, heartbeat, revoke", status: "production" as const },
                { feature: "RSA-PSS machine-bound licensing", status: "production" as const },
                { feature: "Multi-organisation support", status: "production" as const },
                { feature: "RBAC (4 roles)", status: "production" as const },
                { feature: "Linux .deb, macOS .pkg, Windows installer", status: "production" as const },
                { feature: "Kubernetes DaemonSet agent deployment", status: "production" as const },
                { feature: "Optional LLM investigation (OpenAI / Anthropic / Ollama)", status: "production" as const },
                { feature: "PDF audit report export", status: "production" as const },
                { feature: "412 automated tests (Ubuntu, macOS, Windows CI)", status: "production" as const },
                { feature: "Ingest queue and worker pool (for high-throughput deployments)", status: "planned" as const },
                { feature: "License portal hardening (fingerprint validation, row-level security)", status: "planned" as const },
                { feature: "macOS and Windows machine-id fingerprint parity", status: "planned" as const },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-black/[0.05] last:border-0">
                  <span className="text-sm text-black/60 leading-relaxed">{item.feature}</span>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </BentoCard>
        </div>
      </section>

      {/* CTAs */}
      <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3">
          <Link href="/book-demo" className="flex-1 px-8 py-4 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest font-medium text-center">BOOK A DEMO</Link>
          <Link href="/how-it-works" className="flex-1 px-8 py-4 border border-black/10 text-black/60 text-sm rounded-xl hover:border-black/25 hover:text-black transition-all tracking-widest text-center">HOW IT WORKS</Link>
          <Link href="/documentation" className="flex-1 px-8 py-4 border border-black/10 text-black/60 text-sm rounded-xl hover:border-black/25 hover:text-black transition-all tracking-widest text-center">INSTALLATION GUIDE</Link>
        </div>
      </section>

      <VeritasFooter />
    </div>
  )
}
