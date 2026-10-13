"use client"

import Link from "next/link"

const FOOTER_COLS = [
  {
    heading: "Product",
    links: [
      { label: "Overview",      href: "/product" },
      { label: "How It Works",  href: "/how-it-works" },
      { label: "Use Cases",     href: "/use-cases" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/documentation" },
      { label: "Quickstart",    href: "/documentation/quickstart" },
      { label: "GitHub",        href: "https://github.com/shreyaaassss/Veritas", external: true },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About",         href: "/about" },
      { label: "Contact",       href: "/contact" },
      { label: "Book a Demo",   href: "/book-demo" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy",       href: "/privacy" },
      { label: "License",       href: "/license" },
      { label: "Security",      href: "/security" },
    ],
  },
]

export function VeritasFooter() {
  return (
    <footer className="py-16 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
      <div className="max-w-6xl mx-auto">
        {/* Top row: logo + columns */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          {/* Brand */}
          <div className="shrink-0">
            <Link href="/" className="font-pixel text-xs tracking-[0.25em] text-black/50 hover:text-black/80 transition-colors">
              VERITAS
            </Link>
            <p className="mt-4 text-xs text-black/35 leading-relaxed max-w-[180px]">
              Trustworthy AI agent orchestration. Open source.
            </p>
            {/* Status badge */}
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/[0.08] bg-black/[0.02]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
              <span className="text-[10px] text-black/35 tracking-widest">BETA</span>
            </div>
          </div>

          {/* Column links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
            {FOOTER_COLS.map(col => (
              <div key={col.heading}>
                <div className="text-[10px] text-black/30 tracking-widest uppercase mb-4">
                  {col.heading}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map(l => (
                    <li key={l.label}>
                      {"external" in l && l.external ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-black/40 hover:text-black/75 transition-colors tracking-wide"
                        >
                          {l.label} ↗
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="text-xs text-black/40 hover:text-black/75 transition-colors tracking-wide"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row: copyright */}
        <div className="mt-12 pt-6 border-t border-black/[0.04] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-xs text-black/20">
            © 2024 Veritas. Open-source project.
          </span>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-black/20 hover:text-black/50 transition-colors tracking-widest">
              Privacy
            </Link>
            <Link href="/license" className="text-xs text-black/20 hover:text-black/50 transition-colors tracking-widest">
              License
            </Link>
            <a
              href="https://github.com/shreyaaassss/Veritas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-black/20 hover:text-black/50 transition-colors tracking-widest"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
