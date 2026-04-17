'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight, ArrowUpRight, Zap, Star, Shield,
  Truck, RotateCcw, ChevronRight, Sparkles
} from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'
import { HERO_PLACEHOLDER, LIFESTYLE_PLACEHOLDER } from '@/lib/utils/placeholder-images'

const MARQUEE_ITEMS = [
  'NEW SEASON', '///', 'PREMIUM DROPS', '///', 'FREE SHIPPING $75+', '///',
  'LIMITED EDITION', '///', 'NEW SEASON', '///', 'PREMIUM DROPS', '///',
  'FREE SHIPPING $75+', '///', 'LIMITED EDITION', '///',
]

const FEATURES = [
  { icon: Truck,     title: 'Free Shipping',    desc: 'On orders over $75' },
  { icon: RotateCcw, title: 'Easy Returns',     desc: '30-day return policy' },
  { icon: Shield,    title: 'Secure Checkout',  desc: '256-bit SSL encryption' },
  { icon: Zap,       title: 'Fast Dispatch',    desc: 'Ships within 24 hours' },
]

const STATS = [
  { value: '50K+',  label: 'Customers Worldwide' },
  { value: '200+',  label: 'Premium Products' },
  { value: '4.9',   label: 'Average Rating' },
  { value: '99%',   label: 'Satisfaction Rate' },
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup' })
    setSubscribed(true)
    setEmail('')
  }

  return (
    <div className="bg-[#050505] text-white">

      {/* ═══════════════════════════════════════════
          HERO — full viewport, dark with neon glow
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Background — deep black with radial neon bleed */}
        <div className="absolute inset-0 bg-[#050505]">
          {/* Top-left neon green orb */}
          <div
            className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full animate-drift"
            style={{ background: 'radial-gradient(circle, rgba(0,255,135,0.12) 0%, transparent 70%)' }}
          />
          {/* Bottom-right neon blue orb */}
          <div
            className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.10) 0%, transparent 70%)' }}
          />
          {/* Center purple hint */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full opacity-30"
            style={{ background: 'radial-gradient(ellipse, rgba(191,95,255,0.07) 0%, transparent 70%)' }}
          />

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* Scan line */}
          <div
            className="absolute left-0 right-0 h-px animate-scan pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,135,0.15), transparent)' }}
          />
        </div>

        {/* ── Top nav label ── */}
        <div className="relative z-10 border-b border-white/5">
          <div className="container-custom flex items-center justify-between py-4 text-[11px] uppercase tracking-[0.2em] text-white/30 font-mono">
            <span>EST. 2019 — PREMIUM COLLECTIONS</span>
            <span className="hidden sm:block">SS / 2025</span>
            <span className="animate-neon-pulse" style={{ color: 'var(--neon-green)' }}>● LIVE</span>
          </div>
        </div>

        {/* ── Main hero content ── */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="container-custom w-full py-20 lg:py-0">
            <div className="grid lg:grid-cols-12 gap-12 items-center min-h-[75vh]">

              {/* LEFT — Text col (7 cols) */}
              <div className="lg:col-span-7 space-y-10 animate-fade-in-up">

                {/* Eyebrow */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-px"
                    style={{ background: 'var(--neon-green)' }}
                  />
                  <span
                    className="text-xs font-mono uppercase tracking-[0.25em] animate-flicker"
                    style={{ color: 'var(--neon-green)' }}
                  >
                    New Season Drop
                  </span>
                </div>

                {/* Headline */}
                <div>
                  <h1
                    className="font-heading font-black leading-[0.9] text-white"
                    style={{ fontSize: 'clamp(4rem, 9vw, 8.5rem)', letterSpacing: '-0.04em' }}
                  >
                    CRAFTED<br />
                    FOR THE<br />
                    <span className="gradient-text">BOLD.</span>
                  </h1>
                </div>

                {/* Sub */}
                <p className="text-white/40 text-lg leading-relaxed max-w-lg font-light">
                  Premium collections that don&apos;t compromise. Built for those
                  who demand more — from the materials, the craft, the detail.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/products"
                    prefetch
                    className="btn-neon inline-flex items-center gap-3 px-9 py-4 text-sm font-bold uppercase tracking-widest rounded-none"
                  >
                    <span className="flex items-center gap-3">
                      Shop Now
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                  <Link
                    href="/collections"
                    prefetch
                    className="btn-dark inline-flex items-center gap-3 px-9 py-4 text-sm font-bold uppercase tracking-widest rounded-none"
                  >
                    View Collections
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/[0.06]">
                  {STATS.map(({ value, label }) => (
                    <div key={label}>
                      <p
                        className="text-2xl font-black font-mono"
                        style={{ color: 'var(--neon-green)' }}
                      >
                        {value}
                      </p>
                      <p className="text-[11px] text-white/30 uppercase tracking-widest mt-1">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — Image col (4 cols, offset 1) */}
              <div className="lg:col-span-4 lg:col-start-9 relative animate-fade-in">

                {/* Neon border frame */}
                <div
                  className="absolute -inset-2 rounded-none opacity-60"
                  style={{ background: 'linear-gradient(135deg, var(--neon-green), transparent 60%, var(--neon-blue))' }}
                />
                <div className="absolute -inset-[3px] bg-[#050505] rounded-none" />

                {/* Image */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <Image
                    src={HERO_PLACEHOLDER}
                    alt="Hero"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover grayscale contrast-125 brightness-75"
                  />
                  {/* Neon overlay tint */}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(0,255,135,0.08) 100%)' }}
                  />
                  {/* Bottom label */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
                    <p className="text-[10px] font-mono uppercase tracking-[0.25em] mb-1" style={{ color: 'var(--neon-green)' }}>
                      Featured
                    </p>
                    <p className="text-white font-black text-xl tracking-tight">SS 2025 Collection</p>
                  </div>
                </div>

                {/* Floating rating badge */}
                <div
                  className="absolute -left-6 top-1/3 -translate-y-1/2 px-4 py-3 border border-white/10 bg-black/80 backdrop-blur-md"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="h-3 w-3 fill-current" style={{ color: 'var(--neon-gold)' }} />
                    ))}
                  </div>
                  <p className="text-white text-xs font-bold">4.9 / 5.0</p>
                  <p className="text-white/30 text-[10px] font-mono">50K+ reviews</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 container-custom pb-8 flex items-center gap-3 text-white/20 text-[11px] font-mono uppercase tracking-widest">
          <div className="w-4 h-4 border border-white/20 rounded-full flex items-center justify-center animate-bounce">
            <div className="w-1 h-1 rounded-full bg-white/40" />
          </div>
          Scroll to explore
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MARQUEE STRIP
      ═══════════════════════════════════════════ */}
      <div className="relative overflow-hidden border-y border-white/[0.06] py-3 bg-[#080808]">
        <div className="flex animate-marquee whitespace-nowrap">
          {MARQUEE_ITEMS.map((item, i) => (
            <span
              key={i}
              className={`inline-flex items-center gap-6 px-6 text-xs font-mono uppercase tracking-[0.2em] ${
                item === '///' ? 'opacity-20 text-white' : ''
              }`}
              style={item !== '///' ? { color: 'var(--neon-green)' } : {}}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          COLLECTIONS
      ═══════════════════════════════════════════ */}
      {isLoading ? (
        <section className="py-24 bg-[#050505]">
          <div className="container-custom">
            <div className="space-y-3 mb-12">
              <div className="h-2 w-16 rounded-full animate-pulse" style={{ background: 'var(--neon-green)', opacity: 0.3 }} />
              <div className="h-8 w-48 bg-white/5 rounded animate-pulse" />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="aspect-[3/4] bg-white/[0.03] animate-pulse rounded-none" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <div className="bg-[#050505]">
          {collections.map((col: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, idx: number) => (
            <CollectionSection key={col.id} collection={col} alternate={idx % 2 === 1} />
          ))}
        </div>
      ) : null}

      {/* ═══════════════════════════════════════════
          BRAND STORY — split section
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#070707] py-28 border-t border-white/[0.04]">
        {/* neon green glow far left */}
        <div
          className="absolute top-0 left-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,255,135,0.06) 0%, transparent 70%)' }}
        />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Image */}
            <div className="relative order-2 lg:order-1">
              {/* Accent line left */}
              <div
                className="absolute -left-4 top-0 bottom-0 w-[2px]"
                style={{ background: 'linear-gradient(180deg, var(--neon-green), transparent)' }}
              />

              <div className="aspect-[4/5] overflow-hidden relative grayscale contrast-110 brightness-[0.65]">
                <Image
                  src={LIFESTYLE_PLACEHOLDER}
                  alt="Our Story"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Bottom card */}
              <div className="absolute -bottom-6 -right-6 bg-[#0a0a0a] border border-white/[0.08] p-6 shadow-2xl">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-1">Founded</p>
                <p className="text-4xl font-black text-white">2019</p>
                <p className="text-[11px] text-white/30 mt-1 font-mono">Premium since day one</p>
              </div>
            </div>

            {/* Text */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px" style={{ background: 'var(--neon-green)' }} />
                <span className="text-xs font-mono uppercase tracking-[0.25em]" style={{ color: 'var(--neon-green)' }}>
                  Our Philosophy
                </span>
              </div>

              <h2
                className="font-heading font-black leading-none text-white"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.04em' }}
              >
                BUILT TO<br />
                <span className="gradient-text">OUTLAST.</span>
              </h2>

              <p className="text-white/35 text-lg leading-relaxed max-w-md font-light">
                We obsess over every thread, every seam, every detail so you don&apos;t have to.
                Premium isn&apos;t a price point — it&apos;s a standard.
              </p>

              {/* Values list */}
              <div className="space-y-4 py-6 border-y border-white/[0.06]">
                {[
                  'Sustainably sourced materials',
                  'Artisan-level craftsmanship',
                  'Timeless silhouettes, modern edge',
                  'Zero compromise on quality',
                ].map(item => (
                  <div key={item} className="flex items-center gap-4">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'var(--neon-green)', boxShadow: '0 0 6px var(--neon-green)' }}
                    />
                    <span className="text-white/50 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                prefetch
                className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest group"
                style={{ color: 'var(--neon-green)' }}
              >
                Read Our Story
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES BAR
      ═══════════════════════════════════════════ */}
      <section className="border-t border-b border-white/[0.05] bg-[#060606] py-0">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-white/[0.05]">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex items-center gap-5 px-6 py-8 group hover:bg-white/[0.02] transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-none flex items-center justify-center flex-shrink-0 border border-white/[0.08] group-hover:border-[rgba(0,255,135,0.3)] transition-colors"
                >
                  <Icon className="h-4 w-4 text-white/30 group-hover:text-[#00FF87] transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white/70 group-hover:text-white transition-colors">{title}</p>
                  <p className="text-xs text-white/25 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-32 bg-[#050505]">
        {/* Neon green glow center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,255,135,0.05) 0%, transparent 70%)' }}
        />

        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p
            className="font-black text-white/[0.015] whitespace-nowrap"
            style={{ fontSize: 'clamp(8rem, 22vw, 20rem)', letterSpacing: '-0.05em', lineHeight: 1 }}
          >
            STAY IN
          </p>
        </div>

        <div className="container-custom relative z-10 max-w-2xl mx-auto text-center">

          {/* Icon */}
          <div
            className="inline-flex items-center justify-center w-16 h-16 mb-8 border animate-neon-pulse"
            style={{ borderColor: 'rgba(0,255,135,0.3)', background: 'rgba(0,255,135,0.04)' }}
          >
            <Sparkles className="h-6 w-6" style={{ color: 'var(--neon-green)' }} />
          </div>

          <h2
            className="font-heading font-black leading-none mb-5 text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.04em' }}
          >
            STAY AHEAD.<br />
            <span className="gradient-text">STAY FIRST.</span>
          </h2>
          <p className="text-white/30 text-base mb-10 max-w-md mx-auto font-light leading-relaxed">
            Get early access to drops, members-only pricing, and zero noise.
            Unsubscribe any time — no hard feelings.
          </p>

          {subscribed ? (
            <div
              className="inline-flex items-center gap-3 px-8 py-5 border text-sm font-bold uppercase tracking-widest"
              style={{ borderColor: 'rgba(0,255,135,0.4)', color: 'var(--neon-green)' }}
            >
              <Sparkles className="h-4 w-4" />
              You&apos;re on the list. Watch your inbox.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-0 max-w-lg mx-auto border border-white/[0.08]"
            >
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent px-6 py-4 text-sm text-white placeholder:text-white/20 focus:outline-none border-r-0 border-white/[0.08] font-mono"
              />
              <button
                type="submit"
                className="px-8 py-4 text-xs font-bold uppercase tracking-widest border-l border-white/[0.08] text-black transition-all whitespace-nowrap"
                style={{ background: 'var(--neon-green)' }}
              >
                Join Now
              </button>
            </form>
          )}

          <p className="text-white/15 text-xs mt-6 font-mono uppercase tracking-widest">
            No spam. Ever.
          </p>
        </div>
      </section>

    </div>
  )
}
