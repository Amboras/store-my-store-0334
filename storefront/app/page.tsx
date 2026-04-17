'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef } from 'react'
import { ArrowRight, ArrowUpRight, Zap, Star, Flame, Sparkles, Truck, Shield, RotateCcw } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'
import { HERO_PLACEHOLDER, LIFESTYLE_PLACEHOLDER } from '@/lib/utils/placeholder-images'

const MARQUEE_ITEMS = [
  'NEW ARRIVALS', '★', 'BOLD DESIGNS', '✦', 'FREE SHIPPING OVER $75', '★',
  'LIMITED DROPS', '✦', 'NEW ARRIVALS', '★', 'BOLD DESIGNS', '✦',
  'FREE SHIPPING OVER $75', '★', 'LIMITED DROPS', '✦',
]

const STATS = [
  { value: '50K+', label: 'Happy Customers', icon: Star },
  { value: '200+', label: 'Products', icon: Flame },
  { value: '4.9★', label: 'Average Rating', icon: Sparkles },
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
    setSubscribed(true)
    setNewsletterEmail('')
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-foreground overflow-hidden min-h-[92vh] flex items-center">
        {/* Decorative blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'var(--vivid-pink)' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: 'var(--vivid-cyan)' }} />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'var(--vivid-purple)' }} />

        <div className="container-custom relative z-10 py-24 lg:py-0">
          <div className="grid lg:grid-cols-12 gap-8 items-center">

            {/* Text — spans 6 cols */}
            <div className="lg:col-span-6 space-y-8 animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 text-white/70 backdrop-blur-sm">
                <Zap className="h-3 w-3" style={{ color: 'var(--vivid-yellow)' }} />
                <span>New Season Drop</span>
              </div>

              {/* Headline */}
              <h1 className="font-heading font-black leading-none" style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}>
                <span className="text-white block">MAKE</span>
                <span className="block gradient-text">NOISE.</span>
                <span className="text-white block">BE BOLD.</span>
              </h1>

              <p className="text-white/60 text-lg max-w-md leading-relaxed">
                Gear that doesn&apos;t whisper. Collections designed for people who refuse to blend in.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/products"
                  className="btn-vivid relative inline-flex items-center gap-3 px-8 py-4 text-sm font-black uppercase tracking-widest rounded-full overflow-hidden group"
                  prefetch={true}
                >
                  <span className="flex items-center gap-3">
                    Shop the Drop
                    <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest rounded-full border-2 border-white/20 text-white hover:bg-white hover:text-foreground transition-all duration-300"
                  prefetch={true}
                >
                  Browse All
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4 border-t border-white/10">
                {STATS.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="space-y-1">
                    <p className="text-2xl font-black text-white">{value}</p>
                    <p className="text-xs text-white/50 uppercase tracking-wider">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image — asymmetric offset, spans 5 cols offset by 1 */}
            <div className="lg:col-span-5 lg:col-start-8 relative animate-fade-in">
              {/* Rotated card behind */}
              <div className="absolute inset-0 rounded-3xl rotate-3 opacity-40"
                style={{ background: 'linear-gradient(135deg, var(--vivid-pink), var(--vivid-purple))' }} />

              {/* Main image */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10">
                <Image
                  src={HERO_PLACEHOLDER}
                  alt="Hero Collection"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
                    <p className="text-white text-xs uppercase tracking-widest font-bold">New Drop</p>
                    <p className="text-white text-xl font-black mt-0.5">SS 2025</p>
                  </div>
                  <div className="animate-ping-pop bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
                    style={{ boxShadow: '0 0 30px var(--vivid-pink)' }}>
                    <Flame className="h-6 w-6" style={{ color: 'var(--vivid-pink)' }} />
                  </div>
                </div>
              </div>

              {/* Floating pill */}
              <div className="absolute -top-4 -right-4 animate-float px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest text-white"
                style={{ background: 'var(--vivid-yellow)', color: '#000' }}>
                🔥 Trending
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── MARQUEE STRIP ─── */}
      <div className="relative overflow-hidden py-4" style={{ background: 'var(--vivid-pink)' }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {MARQUEE_ITEMS.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-6 text-sm font-black uppercase tracking-widest text-white">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── COLLECTIONS ─── */}
      {isLoading ? (
        <section className="py-section bg-background">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <div className="bg-background">
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection key={collection.id} collection={collection} alternate={index % 2 === 1} />
          ))}
        </div>
      ) : null}

      {/* ─── SPLIT BRAND STORY ─── */}
      <section className="relative overflow-hidden bg-foreground py-28">
        {/* Decorative blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: 'var(--vivid-cyan)' }} />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image with layered effect */}
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl"
                style={{ background: 'linear-gradient(135deg, var(--vivid-yellow), var(--vivid-orange))' }} />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
                <Image
                  src={LIFESTYLE_PLACEHOLDER}
                  alt="Our Story"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-2xl">
                <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">Est.</p>
                <p className="text-4xl font-black text-foreground">2019</p>
              </div>
            </div>

            {/* Text */}
            <div className="space-y-8 lg:pl-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20 text-white/60">
                <Sparkles className="h-3 w-3" style={{ color: 'var(--vivid-cyan)' }} />
                Our Philosophy
              </div>
              <h2 className="font-heading font-black text-white leading-none" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}>
                LOUD BY<br />
                <span className="gradient-text-warm">DESIGN.</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed max-w-md">
                We don&apos;t do muted. Every piece is crafted to make a statement — from the materials we choose to the colors that refuse to be ignored.
              </p>
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/10">
                {[
                  { label: 'Responsibly Made', icon: '♻' },
                  { label: 'Bold Colorways', icon: '🎨' },
                  { label: 'Premium Quality', icon: '⚡' },
                  { label: 'Limited Runs', icon: '🔥' },
                ].map(({ label, icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-xl">{icon}</span>
                    <span className="text-sm font-semibold text-white/70">{label}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-black uppercase tracking-widest rounded-full bg-white text-foreground hover:bg-white/90 transition-colors"
                prefetch={true}
              >
                Our Full Story
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="py-12 border-y" style={{ background: 'var(--vivid-yellow)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $75', color: 'var(--vivid-pink)' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy', color: 'var(--vivid-purple)' },
              { icon: Shield, title: 'Secure Checkout', desc: '256-bit SSL encryption', color: 'var(--vivid-orange)' },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="flex items-center gap-4 justify-center md:justify-start group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-black/10 group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5" style={{ color }} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-sm font-black text-black uppercase tracking-wide">{title}</p>
                  <p className="text-xs text-black/60">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="relative overflow-hidden py-28 bg-background">
        {/* Giant BG text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <p className="font-black text-muted/60 whitespace-nowrap"
            style={{ fontSize: 'clamp(8rem, 20vw, 18rem)', letterSpacing: '-0.05em', lineHeight: 1 }}>
            JOIN US
          </p>
        </div>

        <div className="container-custom relative z-10 text-center max-w-2xl mx-auto">
          {/* Spinning badge */}
          <div className="relative inline-block mb-8">
            <div className="w-24 h-24 rounded-full animate-spin-slow flex items-center justify-center mx-auto"
              style={{ background: 'conic-gradient(var(--vivid-pink), var(--vivid-purple), var(--vivid-cyan), var(--vivid-yellow), var(--vivid-pink))' }}>
              <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center">
                <Zap className="h-7 w-7" style={{ color: 'var(--vivid-pink)' }} />
              </div>
            </div>
          </div>

          <h2 className="font-heading font-black leading-none mb-4" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', letterSpacing: '-0.03em' }}>
            <span className="gradient-text">GET THE</span>
            <br />
            INSIDE SCOOP
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
            Early access to drops, exclusive discounts, and zero boring emails. Promise.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-3 px-8 py-5 rounded-2xl font-black text-white text-lg"
              style={{ background: 'linear-gradient(135deg, var(--vivid-pink), var(--vivid-purple))' }}>
              <Sparkles className="h-5 w-5" />
              You&apos;re in! Watch your inbox 🎉
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-muted rounded-full px-6 py-4 text-sm font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 border border-border"
                style={{ '--tw-ring-color': 'var(--vivid-pink)' } as React.CSSProperties}
              />
              <button
                type="submit"
                className="btn-vivid relative inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-black uppercase tracking-widest rounded-full overflow-hidden whitespace-nowrap"
              >
                <span className="flex items-center gap-2">
                  Let&apos;s Go <Zap className="h-4 w-4" />
                </span>
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
