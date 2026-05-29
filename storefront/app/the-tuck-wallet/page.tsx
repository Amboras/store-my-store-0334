'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Minus,
  Plus,
  Quote,
  RotateCcw,
  Shield,
  Star,
  Truck,
  Wallet as WalletIcon,
} from 'lucide-react'

/* ──────────────────────────────────────────────
   The Tuck Wallet — product page
   Palette: off-white #f5f1ec · black #0f0f0f · coral #e85d3c
─────────────────────────────────────────────── */

const WALLET_WHITE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082883778-0-01KSTKAF9N74KA3GAE05HV4VGR.webp'

const WALLET_BLACK =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082713723-0-01KSTK59984CN4NGARQ8N5B2T5.webp'

const WALLET_SAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082873474-0-01KSTKA570D0EPJVYDJB89G124.webp'

const POCKET_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-lifestyle-1780083034403-0-01KSTKF2D1BTMH34T1MERNR366.webp'

const CARD_HOLDER_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082715201-0-01KSTK5ANKNCW7MXE2W2HEYNXC.webp'

const CLIP_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082721113-0-01KSTK5GGAK4G7YDZQS4M7JFQZ.webp'

const KEY_RING_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780083071473-0-01KSTKG6K1D7F9KWS29NDSFYDR.webp'

const COLORS = [
  { name: 'Chalk White', hex: '#ece6dd', image: WALLET_WHITE },
  { name: 'Matte Black', hex: '#1a1a1a', image: WALLET_BLACK },
  { name: 'Sage Green', hex: '#8a9a82', image: WALLET_SAGE },
] as const

const BUNDLES = [
  {
    id: 'single',
    label: 'Single',
    sub: 'One Tuck Wallet',
    price: 55,
    perUnit: 55,
    save: 0,
  },
  {
    id: 'two',
    label: 'Two pack',
    sub: 'Share one',
    price: 99,
    perUnit: 49.5,
    save: 11,
  },
  {
    id: 'three',
    label: 'Three pack',
    sub: 'Gift set',
    price: 139,
    perUnit: 46.33,
    save: 26,
  },
] as const

type BundleId = (typeof BUNDLES)[number]['id']

const TRUST_BADGES = [
  { icon: WalletIcon, label: 'Front pocket slim' },
  { icon: Truck, label: 'Ships in 24 hours' },
  { icon: RotateCcw, label: 'Free returns' },
  { icon: Shield, label: 'Built to last' },
]

const UPSELL = [
  { name: 'The Tuck Card Holder', price: '$38', image: CARD_HOLDER_IMAGE },
  { name: 'The Tuck Clip', price: '$42', image: CLIP_IMAGE },
  { name: 'The Tuck Key Ring', price: '$28', image: KEY_RING_IMAGE },
]

const REVIEWS = [
  {
    quote:
      'Slim profile, clean look. I keep it in my front pocket and forget it’s there.',
    name: 'Aaron M.',
    detail: 'Tuck Wallet · Matte Black',
  },
  {
    quote:
      'Bought one for me, two as gifts. Everyone asked where I got it.',
    name: 'Lena K.',
    detail: 'Tuck Wallet · Three pack',
  },
  {
    quote:
      'Everyday carry, refined. The design speaks for itself — minimal in the best way.',
    name: 'Jordan P.',
    detail: 'Tuck Wallet · Sage Green',
  },
  {
    quote:
      'Replaces a wallet twice this size and somehow holds everything I need.',
    name: 'Sasha B.',
    detail: 'Tuck Wallet · Chalk White',
  },
]

export default function TuckWalletPage() {
  const [colorIdx, setColorIdx] = useState(0)
  const [bundle, setBundle] = useState<BundleId>('single')
  const [qty, setQty] = useState(1)
  const [subscribe, setSubscribe] = useState(false)
  const [reviewIdx, setReviewIdx] = useState(0)
  const [added, setAdded] = useState(false)

  const activeColor = COLORS[colorIdx]
  const activeBundle = BUNDLES.find((b) => b.id === bundle) ?? BUNDLES[0]
  const total = (activeBundle.price * qty).toFixed(2)

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="bg-[#f5f1ec] text-[#0f0f0f]">

      {/* Breadcrumbs */}
      <div className="border-b border-[#0f0f0f]/10">
        <div className="container-custom py-4">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#0f0f0f]/50">
            <Link href="/" className="hover:text-[#0f0f0f] transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-[#0f0f0f] transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#0f0f0f]">The Tuck Wallet</span>
          </nav>
        </div>
      </div>

      {/* ═══════════════════ HERO / BUY BOX ═══════════════════ */}
      <section className="py-10 lg:py-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20">

            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden bg-[#ece6dd]/60">
                <Image
                  key={activeColor.name}
                  src={activeColor.image}
                  alt={`The Tuck Wallet in ${activeColor.name}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover animate-fade-in"
                />
                <div className="absolute top-5 left-5 bg-[#f5f1ec]/90 backdrop-blur-sm px-3 py-1.5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#0f0f0f]/70">
                    {activeColor.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColorIdx(i)}
                    className={`relative aspect-square overflow-hidden bg-[#ece6dd]/60 border-2 transition-colors ${
                      i === colorIdx ? 'border-[#0f0f0f]' : 'border-transparent hover:border-[#0f0f0f]/30'
                    }`}
                    aria-label={c.name}
                  >
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="20vw"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Buy column */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-7">

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-[#e85d3c]" />
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#e85d3c] font-medium">
                    Just enough.
                  </span>
                </div>

                <h1
                  className="font-heading font-bold leading-[0.95]"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '-0.03em' }}
                >
                  The Tuck Wallet.
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-[#e85d3c] text-[#e85d3c]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#0f0f0f]/60">4.9 · 1,284 reviews</span>
                </div>
              </div>

              <p className="text-base text-[#0f0f0f]/65 leading-relaxed max-w-md">
                Slim profile. Front pocket friendly. Fits 4 cards and folded cash.
                Available in three colorways.
              </p>

              <div className="flex items-baseline gap-3 border-t border-[#0f0f0f]/10 pt-6">
                <p className="text-3xl font-heading font-semibold">${activeBundle.price}</p>
                {activeBundle.save > 0 && (
                  <p className="text-sm text-[#e85d3c] font-medium">
                    Save ${activeBundle.save}
                  </p>
                )}
                <p className="text-xs uppercase tracking-[0.2em] text-[#0f0f0f]/50 ml-auto">USD</p>
              </div>

              {/* Color */}
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#0f0f0f]/60">
                  Color · <span className="text-[#0f0f0f]">{activeColor.name}</span>
                </p>
                <div className="flex items-center gap-3">
                  {COLORS.map((c, i) => (
                    <button
                      key={c.name}
                      onClick={() => setColorIdx(i)}
                      className="group flex items-center gap-2"
                      aria-label={c.name}
                    >
                      <span
                        className={`w-8 h-8 rounded-full border transition-all ${
                          i === colorIdx
                            ? 'border-[#0f0f0f] ring-2 ring-[#0f0f0f] ring-offset-2 ring-offset-[#f5f1ec]'
                            : 'border-[#0f0f0f]/20 hover:border-[#0f0f0f]/50'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Bundles */}
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#0f0f0f]/60">
                  Bundle
                </p>
                <div className="space-y-2">
                  {BUNDLES.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBundle(b.id)}
                      className={`w-full flex items-center justify-between p-4 border-2 transition-all text-left ${
                        bundle === b.id
                          ? 'border-[#0f0f0f] bg-[#0f0f0f]/[0.02]'
                          : 'border-[#0f0f0f]/15 hover:border-[#0f0f0f]/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            bundle === b.id ? 'border-[#0f0f0f] bg-[#0f0f0f]' : 'border-[#0f0f0f]/30'
                          }`}
                        >
                          {bundle === b.id && <Check className="h-3 w-3 text-[#f5f1ec]" strokeWidth={3} />}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{b.label}</p>
                          <p className="text-xs text-[#0f0f0f]/55 mt-0.5">{b.sub}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">${b.price}</p>
                        {b.save > 0 && (
                          <p className="text-[10px] uppercase tracking-wider text-[#e85d3c] mt-0.5">
                            Save ${b.save}
                          </p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity + Add to cart */}
              <div className="space-y-4 pt-2">
                <div className="flex items-stretch gap-3">
                  <div className="flex items-center border-2 border-[#0f0f0f]">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="px-4 py-3 hover:bg-[#0f0f0f] hover:text-[#f5f1ec] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-5 text-sm font-medium min-w-[2rem] text-center">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="px-4 py-3 hover:bg-[#0f0f0f] hover:text-[#f5f1ec] transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={handleAdd}
                    className="flex-1 bg-[#0f0f0f] text-[#f5f1ec] px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] hover:bg-[#e85d3c] transition-colors duration-300 flex items-center justify-center gap-3"
                  >
                    {added ? (
                      <>
                        <Check className="h-4 w-4" /> Added
                      </>
                    ) : (
                      <>
                        Add — ${total}
                        <ArrowUpRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>

                {/* Subscribe to drops */}
                <label className="flex items-start gap-3 p-4 border border-dashed border-[#0f0f0f]/20 cursor-pointer hover:border-[#e85d3c]/60 transition-colors">
                  <input
                    type="checkbox"
                    checked={subscribe}
                    onChange={(e) => setSubscribe(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[#e85d3c]"
                  />
                  <div>
                    <p className="text-sm font-medium">Subscribe to the Tuck drop</p>
                    <p className="text-xs text-[#0f0f0f]/55 mt-0.5">
                      Monthly accessories — new colors, new carries. Skip or cancel any time.
                    </p>
                  </div>
                </label>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-[#0f0f0f]/10">
                {TRUST_BADGES.map((b) => (
                  <div key={b.label} className="flex items-center gap-3">
                    <div className="w-9 h-9 border border-[#0f0f0f]/15 flex items-center justify-center">
                      <b.icon className="h-4 w-4 text-[#0f0f0f]/70" strokeWidth={1.5} />
                    </div>
                    <p className="text-xs text-[#0f0f0f]/70 leading-tight">{b.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════ STORY STRIP ═══════════════════ */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden bg-[#0f0f0f]">
        <Image
          src={POCKET_IMAGE}
          alt="A Tuck wallet in a front pocket"
          fill
          sizes="100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/60 via-[#0f0f0f]/20 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-custom">
            <div className="max-w-xl space-y-6 text-[#f5f1ec]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#e85d3c]" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#f5f1ec]/70">
                  Front pocket friendly
                </span>
              </div>
              <h2
                className="font-heading font-bold leading-[0.95]"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', letterSpacing: '-0.03em' }}
              >
                Designed to <span className="italic font-light">disappear.</span>
              </h2>
              <p className="text-base text-[#f5f1ec]/75 max-w-md leading-relaxed">
                7mm thin. Holds four cards and folded cash. The only wallet you’ll feel
                when you go to grab it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SPEC GRID ═══════════════════ */}
      <section className="py-24 lg:py-32">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#e85d3c]" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#0f0f0f]/60">
                  The Details
                </span>
              </div>
              <h2
                className="font-heading font-bold leading-[0.95]"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
              >
                Built around <span className="italic font-light">what matters.</span>
              </h2>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-10">
              {[
                { label: 'Profile', value: '7mm thin · slimmer than your phone' },
                { label: 'Capacity', value: '4 cards · folded cash · nothing else' },
                { label: 'Material', value: 'Full-grain leather · pebble finish' },
                { label: 'Stitching', value: 'Hand-finished · waxed thread' },
                { label: 'Carry', value: 'Front pocket · back pocket · jacket' },
                { label: 'Warranty', value: 'Built to last · two-year guarantee' },
              ].map((d) => (
                <div key={d.label} className="border-t border-[#0f0f0f]/10 pt-4">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#0f0f0f]/50 mb-1.5">
                    {d.label}
                  </p>
                  <p className="text-base font-medium leading-snug">{d.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ REVIEW CAROUSEL ═══════════════════ */}
      <section className="py-24 lg:py-32 bg-[#0f0f0f] text-[#f5f1ec]">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center space-y-12">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-px bg-[#e85d3c]" />
              <span className="text-[11px] uppercase tracking-[0.3em] text-[#f5f1ec]/60">
                What people carry
              </span>
              <div className="w-8 h-px bg-[#e85d3c]" />
            </div>

            <div className="relative min-h-[280px] flex items-center justify-center">
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
                    style={{ fontSize: 'clamp(1.35rem, 2.6vw, 2rem)', letterSpacing: '-0.02em' }}
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

      {/* ═══════════════════ UPSELL ROW ═══════════════════ */}
      <section className="py-24 lg:py-32 bg-[#ece6dd]/40 border-y border-[#0f0f0f]/10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#e85d3c]" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#0f0f0f]/60">
                  Carries well with
                </span>
              </div>
              <h2
                className="font-heading font-bold leading-none"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em' }}
              >
                The rest of the Tuck kit.
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {UPSELL.map((item) => (
              <Link key={item.name} href="/products" className="group block">
                <div className="relative aspect-square overflow-hidden bg-[#f5f1ec] mb-5">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f5f1ec] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Plus className="h-4 w-4" />
                  </div>
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

      {/* ═══════════════════ SUBSCRIBE & SAVE ═══════════════════ */}
      <section className="py-24 lg:py-36">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">

            <div className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#e85d3c]" />
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#e85d3c] font-medium">
                  Subscribe &amp; save
                </span>
              </div>

              <h2
                className="font-heading font-bold leading-[0.95]"
                style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', letterSpacing: '-0.03em' }}
              >
                Monthly drops.<br />
                <span className="italic font-light">First access.</span>
              </h2>

              <p className="text-base lg:text-lg text-[#0f0f0f]/60 max-w-md leading-relaxed">
                Monthly accessories drop — new colors, new carries, first access.
                Skip a month or cancel any time.
              </p>

              <ul className="space-y-3 pt-2">
                {[
                  'A fresh Tuck accessory each month',
                  'Members-only colorways',
                  '15% off everything else in the shop',
                  'Skip, pause, or cancel any time',
                ].map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-[#0f0f0f]/75">
                    <Check className="h-4 w-4 text-[#e85d3c] flex-shrink-0" strokeWidth={2.5} />
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <Link
                  href="#"
                  className="group inline-flex items-center gap-3 bg-[#0f0f0f] text-[#f5f1ec] px-9 py-4 text-sm font-medium uppercase tracking-[0.2em] hover:bg-[#e85d3c] transition-colors duration-300"
                >
                  Join the drop — $24/mo
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#ece6dd]">
                <Image
                  src={CARD_HOLDER_IMAGE}
                  alt="Monthly Tuck accessories drop"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute bottom-5 left-5 bg-[#f5f1ec]/95 backdrop-blur-sm px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#0f0f0f]/60">This month</p>
                  <p className="text-sm font-medium mt-0.5">Sage Card Sleeve</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section className="py-24 bg-[#0f0f0f] text-[#f5f1ec]">
        <div className="container-custom text-center space-y-8">
          <p
            className="font-heading font-bold leading-[1]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.03em' }}
          >
            Carry light. <span className="italic font-light">Live lighter.</span>
          </p>
          <Link
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="inline-flex items-center gap-3 border border-[#f5f1ec]/30 hover:border-[#e85d3c] hover:text-[#e85d3c] px-9 py-4 text-sm font-medium uppercase tracking-[0.2em] transition-colors"
          >
            Shop The Tuck Wallet
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

    </div>
  )
}
