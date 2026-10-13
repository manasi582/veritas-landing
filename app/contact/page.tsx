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

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
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
          <Tag>CONTACT</Tag>
          <RevealText className="mt-5 text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.02]">
            {"Get in touch."}
          </RevealText>
          <p className="mt-8 text-base text-black/45 leading-relaxed max-w-lg">
            Have a question about Veritas, a bug to report, or want to contribute? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* ── CONTACT CONTENT ───────────────────────────────────────────────── */}
      <section className="py-8 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Left: contact info cards */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                  label: "GENERAL QUESTIONS",
                  title: "Questions about Veritas",
                  desc: "For questions about the product, installation, or how Veritas might fit your use case, use the contact form or reach us through GitHub.",
                  action: null,
                  delay: 0,
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
                  label: "SECURITY",
                  title: "Responsible disclosure",
                  desc: "If you&apos;ve found a security vulnerability in Veritas, please report it responsibly. Use the contact form with subject line 'Security Issue' and we&apos;ll respond with priority.",
                  action: null,
                  delay: 80,
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
                  label: "DEMO REQUESTS",
                  title: "Want to see a demo?",
                  desc: "For a guided walkthrough of Veritas with a member of the team, use the dedicated demo request form.",
                  action: { label: "Book a demo →", href: "/book-demo" },
                  delay: 140,
                },
              ].map((card) => (
                <BentoCard key={card.label} className="p-7" delay={card.delay}>
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl border border-black/10 flex items-center justify-center shrink-0 mt-0.5">
                      {card.icon}
                    </div>
                    <div>
                      <div className="font-pixel text-[10px] tracking-widest text-black/30 mb-2">{card.label}</div>
                      <h3 className="text-base font-light mb-2">{card.title}</h3>
                      <p className="text-xs text-black/45 leading-relaxed">{card.desc}</p>
                      {card.action && (
                        <Link href={card.action.href} className="mt-3 inline-block text-xs text-black/50 hover:text-black tracking-widest transition-colors">
                          {card.action.label}
                        </Link>
                      )}
                    </div>
                  </div>
                </BentoCard>
              ))}

              <div className="px-4 py-3 rounded-xl border border-black/[0.06] bg-black/[0.02]">
                <p className="text-xs text-black/35 leading-relaxed">
                  Expected response time: 2–3 business days. For urgent security issues, we prioritize faster response.
                </p>
              </div>
            </div>

            {/* Right: contact form */}
            <div>
              {submitted ? (
                <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50 p-10 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mb-5">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-600">
                      <path d="M9 12l2 2 4-4"/>
                      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-light mb-3 text-emerald-800">Message sent</h3>
                  <p className="text-sm text-emerald-700/70 leading-relaxed max-w-xs">
                    Thanks for reaching out. We&apos;ll get back to you within 2–3 business days.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }) }}
                    className="mt-6 text-xs text-emerald-600/60 hover:text-emerald-700 tracking-widest transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-black/[0.07] bg-white p-8 shadow-sm"
                >
                  <h3 className="text-lg font-light mb-6">Send a message</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-black/45 tracking-wide mb-1.5">Name <span className="text-black/30">*</span></label>
                        <input
                          type="text" name="name" required value={form.name} onChange={handleChange}
                          placeholder="Your name"
                          className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-black/45 tracking-wide mb-1.5">Email <span className="text-black/30">*</span></label>
                        <input
                          type="email" name="email" required value={form.email} onChange={handleChange}
                          placeholder="you@example.com"
                          className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/20 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-black/45 tracking-wide mb-1.5">Subject <span className="text-black/30">*</span></label>
                      <input
                        type="text" name="subject" required value={form.subject} onChange={handleChange}
                        placeholder="What is this about?"
                        className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-black/45 tracking-wide mb-1.5">Message <span className="text-black/30">*</span></label>
                      <textarea
                        name="message" rows={5} required value={form.message} onChange={handleChange}
                        placeholder="Tell us more..."
                        className="w-full bg-black/[0.02] border border-black/[0.08] rounded-xl px-4 py-3 text-sm text-[#111] placeholder:text-black/25 focus:outline-none focus:border-black/20 transition-colors resize-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit" disabled={submitting}
                    className="mt-6 w-full py-3.5 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                  <p className="mt-4 text-[11px] text-black/30 text-center leading-relaxed">
                    We only use your contact details to reply to your message.{" "}
                    <Link href="/privacy" className="underline hover:text-black/50 transition-colors">Privacy policy</Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-black/45">Rather see the product in action?</p>
          <Link href="/book-demo" className="px-8 py-3.5 bg-[#111] text-white text-sm rounded-xl hover:bg-[#333] transition-colors tracking-widest font-medium">
            BOOK A DEMO
          </Link>
        </div>
      </section>

      <VeritasFooter />
    </div>
  )
}
