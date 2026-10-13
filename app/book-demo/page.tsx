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

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest font-sans text-black/40 bg-black/[0.04]">
      {children}
    </span>
  )
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.1)
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

interface FormData {
  name: string
  email: string
  organization: string
  role: string
  message: string
}

export default function BookDemoPage() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", organization: "", role: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    // Simulate async submission
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">
      <MobileNav />

      {/* ── PAGE HERO ────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left: info */}
            <div>
              <Tag>BOOK A DEMO</Tag>
              <RevealText className="mt-5 text-5xl md:text-6xl font-light tracking-tight leading-[1.02]">
                {"See Veritas\nin action."}
              </RevealText>
              <p className="mt-8 text-sm text-black/45 leading-relaxed max-w-sm">
                Book a 15–20 minute session with the Veritas team to walk through the product and see how it fits your workflow.
              </p>

              {/* What the demo covers */}
              <div className="mt-10">
                <div className="text-[10px] text-black/30 tracking-widest uppercase mb-4">What we&apos;ll cover</div>
                <ul className="space-y-3">
                  {[
                    "A live walkthrough of a Veritas agent run with full audit trail",
                    "How decision tracing and audit logs work in practice",
                    "Integration options and self-hosting setup",
                    "Q&A — your specific use case and requirements",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-black/55">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/25 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What to expect */}
              <div className="mt-10 p-5 rounded-2xl border border-black/[0.07] bg-white">
                <div className="text-[10px] text-black/30 tracking-widest uppercase mb-3">What happens next</div>
                <p className="text-xs text-black/45 leading-relaxed">
                  After you submit this form, we&apos;ll reach out within 1–2 business days to schedule a time that works for you. There&apos;s no automated booking — a real person will follow up.
                </p>
              </div>

              {/* Alternative */}
              <div className="mt-6">
                <p className="text-xs text-black/35">
                  Prefer to reach out directly?{" "}
                  <Link href="/contact" className="underline hover:text-black/60 transition-colors">
                    Use the contact form →
                  </Link>
                </p>
              </div>
            </div>

            {/* Right: form */}
            <FadeIn delay={100}>
              {submitted ? (
                <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50 p-10 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mb-5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-600">
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-light mb-3 text-emerald-800">Request received</h3>
                  <p className="text-sm text-emerald-700/70 leading-relaxed max-w-xs">
                    Thanks, {form.name || "there"}! We&apos;ll be in touch within 1–2 business days to schedule your demo.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", organization: "", role: "", message: "" }) }}
                    className="mt-6 text-xs text-emerald-600/60 hover:text-emerald-700 tracking-widest transition-colors"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-black/[0.07] bg-white p-8 shadow-sm"
                >
                  <h3 className="text-lg font-light mb-6">Request a demo</h3>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs text-black/45 tracking-wide mb-1.5">
                        Name <span className="text-black/30">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/20 transition-colors"
                      />
                    </div>

                    {/* Work email */}
                    <div>
                      <label className="block text-xs text-black/45 tracking-wide mb-1.5">
                        Work email <span className="text-black/30">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/20 transition-colors"
                      />
                    </div>

                    {/* Organization */}
                    <div>
                      <label className="block text-xs text-black/45 tracking-wide mb-1.5">
                        Organization <span className="text-black/25">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={form.organization}
                        onChange={handleChange}
                        placeholder="Your company or project"
                        className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/20 transition-colors"
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-xs text-black/45 tracking-wide mb-1.5">
                        Your role <span className="text-black/25">(optional)</span>
                      </label>
                      <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl px-4 py-3 text-sm text-[#111] focus:outline-none focus:border-black/20 transition-colors appearance-none"
                      >
                        <option value="">Select a role</option>
                        <option value="engineer">Engineer / Developer</option>
                        <option value="product">Product Manager</option>
                        <option value="compliance">Compliance / Legal</option>
                        <option value="researcher">Researcher</option>
                        <option value="leadership">Leadership / Executive</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* What to learn */}
                    <div>
                      <label className="block text-xs text-black/45 tracking-wide mb-1.5">
                        What would you like to learn? <span className="text-black/25">(optional)</span>
                      </label>
                      <textarea
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your use case or specific questions..."
                        className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/20 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-6 w-full py-3.5 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "SENDING..." : "REQUEST DEMO"}
                  </button>

                  <p className="mt-4 text-[11px] text-black/30 text-center leading-relaxed">
                    We only use this information to schedule and follow up on your demo request.{" "}
                    <Link href="/privacy" className="underline hover:text-black/50 transition-colors">
                      Privacy policy
                    </Link>
                  </p>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      <VeritasFooter />
    </div>
  )
}
