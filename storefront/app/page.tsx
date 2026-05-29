'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight, ArrowUpRight, Star, Quote } from 'lucide-react'
import { trackMetaEvent } from '@/lib/meta-pixel'

/* ──────────────────────────────────────────────
   Tuck — clean, minimal, front-pocket aesthetic
   Palette: off-white #f5f1ec · black #0f0f0f · coral accent #e85d3c
─────────────────────────────────────────────── */

const HERO_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-lifestyle-1780082670068-0-01KSTK3YQVRXK58MHFWK8G26WC.webp'

const FEATURED_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082713723-0-01KSTK59984CN4NGARQ8N5B2T5.webp'

const WALLET_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082883778-0-01KSTKAF9N74KA3GAE05HV4VGR.webp'

const CARD_HOLDER_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082715201-0-01KSTK5ANKNCW7MXE2W2HEYNXC.webp'

const CLIP_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082721113-0-01KSTK5GGAK4G7YDZQS4M7JFQZ.webp'

const POCKET_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-lifestyle-1780083034403-0-01KSTKF2D1BTMH34T1MERNR366.webp'

const TRUST_BAR = [
  'Slim enough for your front pocket',
  'Free shipping',
  '30-day returns',
  'Built to last',
]

const COLLECTION_ITEMS = [
  { name: 'The Tuck Wallet', price: '$55', image: WALLET_IMAGE, href: '/the-tuck-wallet' },
  { name: 'The Tuck Card Holder', price: '$38', image: CARD_HOLDER_IMAGE, href: '/products' },
  { name: 'The Tuck Clip', price: '$42', image: CLIP_IMAGE, href: '/products' },
]

const REVIEWS = [
  {
    quote:
      'I forget it’s there. Front pocket, all day, every day — finally a wallet that doesn’t fight me.',
    name: 'Marcus T.',
    detail: 'Tuck Wallet · Matte Black',
  },
  {
    quote:
      'Carries exactly what I need and nothing I don\u2019t. The design is so clean it almost disappears.',
    name: 'Priya S.',
    detail: 'Tuck Card Holder · Sage Green',
  },
  {
    quote:
      'Went from a bulky bifold to Tuck and never looked back. Minimalism done right.',
    name: 'Daniel R.',
    detail: 'Tuck Wallet · Chalk White',
  },
]

export default function HomePage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [reviewIdx, setReviewIdx] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup' })
    setSubscribed(true)
    setEmail('')
  }

  return (
    <div className="bg-[#f5f1ec] text-[#0f0f0f]">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative">
        <div className="container-custom pt-12 pb-20 lg:pt-20 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* Copy */}
            <div className="lg:col-span-6 space-y-8 animate-fade-in-up">
              <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-[#e85d3c]" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#0f0f0f]/60">
                  Tuck · Est. for the front pocket
                </span>
              </div>

              <h1
                className="font-heading font-bold leading-[0.95] text-balance"
                style={{ fontSize: 'clamp(3.25rem, 8vw, 7rem)', letterSpacing: '-0.035em' }}
              >
                Carry light.<br />
                Live <span className="italic font-light">lighter.</span>
              </h1>

              <p className="text-lg lg:text-xl text-[#0f0f0f]/60 max-w-md leading-relaxed">
                Slim wallets built for the front pocket generation.
              </p>

              <div className="pt-4">
                <Link
                  href="/the-tuck-wallet"
                  className="group inline-flex items-center gap-3 bg-[#0f0f0f] text-[#f5f1ec] px-9 py-4 text-sm font-medium uppercase tracking-[0.2em] hover:bg-[#e85d3c] transition-colors duration-300"
                >
                  Shop now
                  <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="lg:col-span-6 relative animate-fade-in">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#ece6dd]">
                <Image
                  src={HERO_IMAGE}
                  alt="A slim Tuck wallet held in hand"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Floating tag */}
              <div className="absolute -bottom-5 -left-5 lg:-left-8 bg-[#f5f1ec] border border-[#0f0f0f]/10 px-5 py-3 shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#0f0f0f]/50">Now Shipping</p>
                <p className="text-sm font-medium mt-0.5">The Tuck Wallet</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUST BAR ═══════════════════ */}
      <section className="border-y border-[#0f0f0f]/10 bg-[#f5f1ec]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#0f0f0f]/10">
            {TRUST_BAR.map((item) => (
              <div
                key={item}
                className="px-4 py-6 lg:py-8 text-center text-xs md:text-sm uppercase tracking-[0.15em] text-[#0f0f0f]/70"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FEATURED PRODUCT ═══════════════════ */}
      <section className="py-24 lg:py-36">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image */}
            <div className="relative">
              <div className="relative aspect-square overflow-hidden bg-[#ece6dd]">
                <Image
                  src={FEATURED_IMAGE}
                  alt="The Tuck Wallet in matte black"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Copy */}
            <div className="space-y-8 lg:pl-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#e85d3c]" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#e85d3c] font-medium">
                  The Flagship
                </span>
              </div>

              <h2
                className="font-heading font-bold leading-[1]"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
              >
                The Tuck Wallet.
              </h2>

              <p className="text-base lg:text-lg text-[#0f0f0f]/60 leading-relaxed max-w-md">
                A slim bifold built for front pocket carry. Fits four cards and folded cash —
                nothing more, nothing less.
              </p>

              <div className="flex items-baseline gap-4">
                <p className="text-3xl font-heading font-semibold">$55</p>
                <p className="text-xs uppercase tracking-[0.2em] text-[#0f0f0f]/50">USD</p>
              </div>

              {/* Color options */}
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#0f0f0f]/50">
                  Three colorways
                </p>
                <div className="flex items-center gap-3">
                  {[
                    { name: 'Chalk White', hex: '#ece6dd' },
                    { name: 'Matte Black', hex: '#1a1a1a' },
                    { name: 'Sage Green', hex: '#8a9a82' },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center gap-2 group cursor-pointer">
                      <span
                        className="w-7 h-7 rounded-full border border-[#0f0f0f]/15 ring-offset-2 ring-offset-[#f5f1ec] group-hover:ring-2 group-hover:ring-[#0f0f0f]/40 transition-all"
                        style={{ backgroundColor: c.hex }}
                        aria-label={c.name}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/the-tuck-wallet"
                  className="group inline-flex items-center gap-3 bg-[#0f0f0f] text-[#f5f1ec] px-9 py-4 text-sm font-medium uppercase tracking-[0.2em] hover:bg-[#e85d3c] transition-colors duration-300"
                >
                  Shop now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════ COLLECTION ROW ═══════════════════ */}
      <section className="py-24 lg:py-32 bg-[#ece6dd]/40 border-y border-[#0f0f0f]/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#e85d3c]" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#0f0f0f]/60">
                  The Collection
                </span>
              </div>
              <h2
                className="font-heading font-bold leading-none"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
              >
                Everything you need.<br />
                <span className="italic font-light text-[#0f0f0f]/70">Nothing you don\u2019t.</span>
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] border-b border-[#0f0f0f] pb-1 hover:text-[#e85d3c] hover:border-[#e85d3c] transition-colors"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {COLLECTION_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden bg-[#f5f1ec] mb-5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-medium tracking-tight group-hover:text-[#e85d3c] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#0f0f0f]/60">{item.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ BRAND STATEMENT ═══════════════════ */}
      <section className="py-32 lg:py-48 relative overflow-hidden">
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-[#e85d3c]" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#e85d3c] font-medium">
                Why Tuck
              </span>
              <div className="w-8 h-px bg-[#e85d3c]" />
            </div>

            <p
              className="font-heading font-light leading-[1.1] text-balance"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)', letterSpacing: '-0.025em' }}
            >
              Most wallets are <span className="line-through text-[#0f0f0f]/30">too much.</span><br />
              Tuck is <span className="italic font-medium">just enough.</span>
            </p>

            <p className="text-base lg:text-lg text-[#0f0f0f]/60 max-w-xl mx-auto leading-relaxed">
              Slim profile, clean design, everything you actually need.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ REVIEW CAROUSEL ═══════════════════ */}
      <section className="py-24 lg:py-32 bg-[#0f0f0f] text-[#f5f1ec]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-12">

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-px bg-[#e85d3c]" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#f5f1ec]/60">
                  Worn daily by thousands
                </span>
                <div className="w-8 h-px bg-[#e85d3c]" />
              </div>
            </div>

            {/* Quote */}
            <div className="relative min-h-[260px] flex items-center justify-center">
              <Quote
                className="absolute -top-4 left-1/2 -translate-x-1/2 h-10 w-10 text-[#e85d3c]/30"
                strokeWidth={1}
              />
              {REVIEWS.map((r, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 flex flex-col items-center justify-center space-y-8 transition-opacity duration-500 ${
                    i === reviewIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-[#e85d3c] text-[#e85d3c]" />
                    ))}
                  </div>

                  <p
                    className="font-heading font-light leading-snug text-balance px-4"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '-0.02em' }}
                  >
                    &ldquo;{r.quote}&rdquo;
                  </p>

                  <div className="space-y-1">
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#f5f1ec]/40">
                      {r.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 pt-6">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIdx(i)}
                  className={`h-1.5 transition-all duration-300 ${
                    i === reviewIdx ? 'w-8 bg-[#e85d3c]' : 'w-1.5 bg-[#f5f1ec]/30'
                  }`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ EMAIL SIGNUP ═══════════════════ */}
      <section className="py-24 lg:py-36 bg-[#f5f1ec]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#e85d3c]" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#0f0f0f]/60">
                  Newsletter
                </span>
              </div>

              <h2
                className="font-heading font-bold leading-[0.95]"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.03em' }}
              >
                Less is <span className="italic font-light">more.</span>
              </h2>
              <p className="text-base lg:text-lg text-[#0f0f0f]/60 max-w-sm leading-relaxed">
                New drops and early access. No noise.
              </p>
            </div>

            <div>
              {subscribed ? (
                <div className="border-b-2 border-[#e85d3c] pb-5">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#e85d3c] font-medium">
                    You\u2019re in. Welcome to Tuck.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-end gap-4 border-b-2 border-[#0f0f0f] pb-3 focus-within:border-[#e85d3c] transition-colors">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="flex-1 bg-transparent text-base lg:text-lg placeholder:text-[#0f0f0f]/30 focus:outline-none"
                      required
                    />
                    <button
                      type="submit"
                      className="text-sm uppercase tracking-[0.2em] font-medium hover:text-[#e85d3c] transition-colors flex items-center gap-2 pb-1"
                    >
                      Subscribe
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-xs text-[#0f0f0f]/40">
                    Unsubscribe any time. No spam — that\u2019s the whole point.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════ POCKET STRIP ═══════════════════ */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden bg-[#0f0f0f]">
        <Image
          src={POCKET_IMAGE}
          alt="A Tuck wallet in a front pocket"
          fill
          sizes="100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f]/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-custom pb-12 lg:pb-20">
            <p
              className="font-heading font-bold text-[#f5f1ec] leading-none text-balance max-w-xl"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
            >
              Made to <span className="italic font-light">disappear.</span>
            </p>
          </div>
        </div>
      </section>

    </div>
  )
}
