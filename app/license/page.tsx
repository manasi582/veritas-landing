"use client"

import React, { useRef, useEffect, useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { VeritasFooter } from "@/components/veritas-footer"
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

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.1)
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)", transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms` }}>
      {children}
    </div>
  )
}

const MIT_TEXT = `MIT License

Copyright (c) 2024 Veritas Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`

export default function LicensePage() {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(MIT_TEXT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-[#F5F4F0] text-[#111] min-h-screen font-sans antialiased">
      <MobileNav />

      <div className="pt-40 pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">

          <FadeIn>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] tracking-widest text-black/40 bg-black/[0.04] mb-5">LICENSE</span>
            <h1 className="text-5xl md:text-6xl font-light tracking-tight leading-[1.02] mb-6">MIT License</h1>
          </FadeIn>

          <FadeIn delay={80}>
            <div className="mb-10 p-6 rounded-2xl border border-black/[0.07] bg-white">
              <h2 className="text-lg font-light mb-3">What the MIT license means for you</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: "✓", label: "Use commercially", desc: "Use Veritas in commercial products with no restrictions." },
                  { icon: "✓", label: "Modify freely", desc: "Modify the source code for any purpose." },
                  { icon: "✓", label: "Distribute", desc: "Distribute copies or modified versions." },
                  { icon: "✓", label: "Private use", desc: "Use privately without disclosure." },
                  { icon: "✓", label: "Sublicense", desc: "Grant sublicenses to others." },
                  { icon: "!", label: "Keep attribution", desc: "Preserve the copyright notice in all copies." },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className={`text-sm font-medium shrink-0 ${item.icon === "✓" ? "text-emerald-600" : "text-amber-600"}`}>{item.icon}</span>
                    <div>
                      <div className="text-xs font-medium text-black/70 mb-0.5">{item.label}</div>
                      <div className="text-xs text-black/40">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={160}>
            <div className="rounded-2xl border border-black/[0.07] bg-white overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06]">
                <span className="text-xs text-black/40 tracking-widest uppercase">Full License Text</span>
                <button onClick={copy} className="text-[11px] text-black/35 hover:text-black/60 tracking-widest transition-colors">
                  {copied ? "COPIED ✓" : "COPY"}
                </button>
              </div>
              <pre className="p-6 text-[12px] font-mono text-black/50 leading-relaxed whitespace-pre-wrap overflow-x-auto">{MIT_TEXT}</pre>
            </div>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a
                href="https://github.com/shreyaaassss/Veritas/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#111] text-white text-xs rounded-xl hover:bg-[#333] transition-colors tracking-widest text-center"
              >
                VIEW ON GITHUB ↗
              </a>
              <Link href="/contact" className="px-6 py-3 border border-black/10 text-black/60 text-xs rounded-xl hover:border-black/25 hover:text-black transition-all tracking-widest text-center">
                QUESTIONS? CONTACT US
              </Link>
            </div>
          </FadeIn>

        </div>
      </div>

      <VeritasFooter />
    </div>
  )
}
