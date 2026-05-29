'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
  Shield,
  Star,
  Truck,
  Wallet as WalletIcon,
} from 'lucide-react'

/* ──────────────────────────────────────────────
   The Tuck Wallet — editorial product page
   Same palette as homepage:
   #ede3cf (paper) · #f4ecdb (paper-light) · #d9ccb0 (paper-dim)
   #0a0806 (ink) · #19120d (ink-deep) · #c93f1a (ember accent)
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
  { id: 'single', label: 'Single', sub: 'One Tuck Wallet', price: 55, save: 0 },
  { id: 'two', label: 'Two pack', sub: 'Share one', price: 99, save: 11 },
  { id: 'three', label: 'Three pack', sub: 'Gift set', price: 139, save: 26 },
] as const

type BundleId = (typeof BUNDLES)[number]['id']

const TRUST_BADGES = [
  { icon: WalletIcon, label: 'Front pocket slim' },
  { icon: Truck, label: 'Ships in 24 hours' },
  { icon: RotateCcw, label: 'Free returns' },
  { icon: Shield, label: 'Built to last' },
]

const UPSELL = [
  { n: '02', name: 'The Tuck Card Holder', sub: 'Three cards · zero bulk', price: '$38', image: CARD_HOLDER_IMAGE },
  { n: '03', name: 'The Tuck Clip', sub: 'Cash up front · cards behind', price: '$42', image: CLIP_IMAGE },
  { n: '04', name: 'The Tuck Key Ring', sub: 'Keys, contained', price: '$28', image: KEY_RING_IMAGE },
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

const SPECS = [
  { label: 'Profile', value: '7mm thin · slimmer than your phone' },
  { label: 'Capacity', value: '4 cards · folded cash · nothing else' },
  { label: 'Material', value: 'Full-grain leather · pebble finish' },
  { label: 'Stitching', value: 'Hand-finished · waxed thread' },
  { label: 'Carry', value: 'Front pocket · back pocket · jacket' },
  { label: 'Warranty', value: 'Built to last · two-year guarantee' },
]

/* ── eyebrow atom ── */
function Eyebrow({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-heading text-[#c93f1a] text-sm tracking-tight">{n}</span>
      <div className={`h-px w-10 ${dark ? 'bg-[#ede3cf]/30' : 'bg-[#0a0806]/30'}`} />
      <span className={`text-[10px] uppercase tracking-[0.35em] ${dark ? 'text-[#ede3cf]/55' : 'text-[#0a0806]/55'}`}>
        {label}
      </span>
    </div>
  )
}

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
    <div className="bg-[#ede3cf] text-[#0a0806] selection:bg-[#c93f1a] selection:text-[#ede3cf]">

      {/* Breadcrumbs — thin, editorial */}
      <div className="border-b border-[#0a0806]/15">
        <div className="px-4 sm:px-8 lg:px-12 py-4 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[#0a0806]/50">
          <nav className="flex items-center gap-2.5">
            <Link href="/" className="hover:text-[#0a0806] transition-colors">Tuck</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-[#0a0806] transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#0a0806]">The Tuck Wallet</span>
          </nav>
          <span className="hidden md:inline text-[#0a0806]/40">Issue 01 · The Flagship</span>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          HERO — full-bleed headline above, gallery + buy box below
      ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-10 lg:pt-16 pb-0">
        <div className="px-4 sm:px-8 lg:px-12">
          <p className="font-heading italic font-light text-[#0a0806]/50 text-sm sm:text-base mb-6 tracking-tight">
            A study in subtraction —
          </p>
          <h1
            className="font-heading font-bold leading-[0.82] tracking-[-0.045em] text-balance"
            style={{ fontSize: 'clamp(4rem, 14vw, 14rem)' }}
          >
            The Tuck<br />
            <span className="italic font-light">Wallet<span className="text-[#c93f1a]">.</span></span>
          </h1>
          <div className="mt-6 flex items-center gap-4">
            <Eyebrow n="01 —" label="Just enough" />
            <span className="hidden lg:inline text-xs text-[#0a0806]/40 italic font-light">
              — and finally, nothing more.
            </span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          GALLERY + BUY COLUMN
          Asymmetric: image col 7, buy col 4 offset, with section number watermark
      ════════════════════════════════════════════ */}
      <section className="pt-16 lg:pt-24 pb-28 lg:pb-44">
        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-14">

          {/* gallery */}
          <div className="lg:col-span-7 px-4 sm:px-8 lg:pl-12 lg:pr-0 space-y-4 relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-[#d9ccb0]">
              <Image
                key={activeColor.name}
                src={activeColor.image}
                alt={`The Tuck Wallet in ${activeColor.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover animate-fade-in"
              />
              <div className="absolute top-5 left-5 bg-[#ede3cf]/95 backdrop-blur-sm px-3 py-1.5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0806]/70">
                  Colorway · {activeColor.name}
                </p>
              </div>
              <div className="absolute bottom-5 right-5 text-[10px] uppercase tracking-[0.3em] text-[#ede3cf] bg-[#0a0806]/80 px-3 py-1.5">
                Fig. 01 — front
              </div>
            </div>

            {/* thumbnails — uneven sizing, editorial */}
            <div className="grid grid-cols-3 gap-3">
              {COLORS.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setColorIdx(i)}
                  className={`relative aspect-square overflow-hidden bg-[#d9ccb0] transition-all ${
                    i === colorIdx ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                  aria-label={c.name}
                >
                  <Image src={c.image} alt={c.name} fill sizes="20vw" className="object-cover" />
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-0.5 transition-colors ${
                      i === colorIdx ? 'bg-[#c93f1a]' : 'bg-transparent'
                    }`}
                  />
                  <span className="absolute top-2 left-2 text-[9px] uppercase tracking-[0.25em] text-[#ede3cf] bg-[#0a0806]/70 px-1.5 py-0.5">
                    0{i + 1}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* buy column — sticky, narrower, generous breathing */}
          <div className="lg:col-span-4 lg:col-start-9 px-4 sm:px-8 lg:px-0 lg:pr-12 lg:sticky lg:top-24 lg:self-start space-y-10">

            {/* rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-3.5 w-3.5 fill-[#c93f1a] text-[#c93f1a]" />
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#0a0806]/55">
                4.9 · 1,284 carries
              </span>
            </div>

            <p className="font-heading italic font-light text-xl lg:text-2xl text-[#0a0806]/75 leading-snug max-w-md tracking-tight">
              Slim profile. Front pocket friendly. Fits four cards and folded cash.
              Available in three colorways.
            </p>

            {/* price row */}
            <div className="flex items-baseline gap-5 border-t border-[#0a0806]/20 pt-7">
              <p className="font-heading text-5xl font-semibold tracking-tight">${activeBundle.price}</p>
              {activeBundle.save > 0 && (
                <p className="text-[11px] uppercase tracking-[0.25em] text-[#c93f1a] font-medium">
                  Save ${activeBundle.save}
                </p>
              )}
              <p className="ml-auto text-[10px] uppercase tracking-[0.3em] text-[#0a0806]/45">USD</p>
            </div>

            {/* Color */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0806]/55">
                  Color
                </p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0806]">
                  {activeColor.name}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColorIdx(i)}
                    aria-label={c.name}
                    className="group flex items-center gap-2"
                  >
                    <span
                      className={`w-9 h-9 rounded-full border transition-all ${
                        i === colorIdx
                          ? 'border-[#0a0806] ring-2 ring-[#0a0806] ring-offset-2 ring-offset-[#ede3cf]'
                          : 'border-[#0a0806]/20 hover:border-[#0a0806]/55'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Bundles */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0806]/55">
                Bundle
              </p>
              <div className="divide-y divide-[#0a0806]/10 border-t border-b border-[#0a0806]/10">
                {BUNDLES.map((b, i) => (
                  <button
                    key={b.id}
                    onClick={() => setBundle(b.id)}
                    className={`w-full flex items-center justify-between py-5 text-left transition-colors group ${
                      bundle === b.id ? 'text-[#0a0806]' : 'text-[#0a0806]/55 hover:text-[#0a0806]'
                    }`}
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className={`font-heading text-sm ${
                          bundle === b.id ? 'text-[#c93f1a] font-semibold' : 'text-[#0a0806]/30'
                        }`}
                      >
                        0{i + 1}
                      </span>
                      <div>
                        <p className="text-base font-medium">{b.label}</p>
                        <p className="text-xs italic font-light mt-0.5 text-[#0a0806]/55">
                          {b.sub}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <p className="text-base font-medium">${b.price}</p>
                        {b.save > 0 && (
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#c93f1a] mt-0.5">
                            − ${b.save}
                          </p>
                        )}
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                          bundle === b.id ? 'border-[#0a0806] bg-[#0a0806]' : 'border-[#0a0806]/25'
                        }`}
                      >
                        {bundle === b.id && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c93f1a]" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add */}
            <div className="space-y-5 pt-2">
              <div className="flex items-stretch gap-3">
                <div className="flex items-center border border-[#0a0806]/30">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-4 py-3.5 hover:bg-[#0a0806] hover:text-[#ede3cf] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-5 text-sm font-medium min-w-[2.5rem] text-center">{qty}</span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="px-4 py-3.5 hover:bg-[#0a0806] hover:text-[#ede3cf] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className="flex-1 group bg-[#0a0806] text-[#ede3cf] pl-5 pr-3 py-2.5 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-[#c93f1a] transition-colors duration-500 flex items-center justify-between gap-3"
                >
                  {added ? (
                    <>
                      <span>Added to cart</span>
                      <span className="w-9 h-9 rounded-full bg-[#c93f1a] group-hover:bg-[#0a0806] flex items-center justify-center transition-colors duration-500">
                        <Check className="h-4 w-4" />
                      </span>
                    </>
                  ) : (
                    <>
                      <span>Add — ${total}</span>
                      <span className="w-9 h-9 rounded-full bg-[#c93f1a] group-hover:bg-[#0a0806] flex items-center justify-center transition-colors duration-500">
                        <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-500" />
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Subscribe to drops */}
              <label className="flex items-start gap-4 py-4 border-t border-[#0a0806]/15 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={subscribe}
                  onChange={(e) => setSubscribe(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-[#c93f1a]"
                />
                <div>
                  <p className="text-sm font-medium">Subscribe to the Tuck drop</p>
                  <p className="text-xs text-[#0a0806]/55 mt-1 italic font-light leading-relaxed">
                    Monthly accessories — new colors, new carries. Skip or cancel any time.
                  </p>
                </div>
              </label>
            </div>

            {/* trust badges — minimal, single-row */}
            <div className="pt-4 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-[#0a0806]/15">
              {TRUST_BADGES.map((b) => (
                <div key={b.label} className="flex items-center gap-3 pt-4">
                  <b.icon className="h-4 w-4 text-[#c93f1a]" strokeWidth={1.5} />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#0a0806]/70 leading-tight">
                    {b.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PULL QUOTE — editorial moment
      ════════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 border-y border-[#0a0806]/15 bg-[#f4ecdb]">
        <div className="px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-2 hidden lg:block">
            <Eyebrow n="—" label="An aside" />
          </div>
          <div className="lg:col-span-10">
            <p
              className="font-heading italic font-light leading-[1.02] tracking-[-0.03em] text-balance"
              style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
            >
              <span className="text-[#0a0806]/30">“</span>You won&rsquo;t notice it&rsquo;s there.{' '}
              <span className="not-italic font-bold text-[#c93f1a]">That&rsquo;s the entire point.</span>
              <span className="text-[#0a0806]/30">”</span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          02 — STORY STRIP, full bleed pocket image
      ════════════════════════════════════════════ */}
      <section className="relative h-[75vh] min-h-[500px] overflow-hidden bg-[#0a0806]">
        <Image
          src={POCKET_IMAGE}
          alt="A Tuck wallet in a front pocket"
          fill
          sizes="100vw"
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0806]/85 via-[#0a0806]/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-8 lg:p-12 text-[#ede3cf]">
          <Eyebrow n="02 —" label="Front pocket friendly" dark />

          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-6">
              <h2
                className="font-heading font-bold leading-[0.85] tracking-[-0.04em] text-balance"
                style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
              >
                Designed to<br />
                <span className="italic font-light">disappear.</span>
              </h2>
              <p className="text-base lg:text-lg text-[#ede3cf]/75 max-w-md leading-relaxed font-light">
                7mm thin. Holds four cards and folded cash. The only wallet you&rsquo;ll
                feel when you go to grab it.
              </p>
            </div>

            <div className="lg:col-span-4 lg:col-start-9 space-y-3 text-right">
              <p className="font-heading text-7xl font-bold text-[#c93f1a] leading-none tracking-tight">
                7<span className="text-[#ede3cf]/40 text-3xl">mm</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#ede3cf]/55">
                Slimmer than your phone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          03 — SPECS, asymmetric
      ════════════════════════════════════════════ */}
      <section className="py-28 lg:py-44 bg-[#ede3cf]">
        <div className="px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-y-16 gap-x-8">

          {/* left — title */}
          <div className="lg:col-span-4 space-y-7 lg:sticky lg:top-24 lg:self-start">
            <Eyebrow n="03 —" label="The details" />
            <h2
              className="font-heading font-bold leading-[0.88] tracking-[-0.04em]"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5rem)' }}
            >
              Built around<br />
              <span className="italic font-light">what matters.</span>
            </h2>
            <p className="text-sm text-[#0a0806]/60 max-w-xs italic font-light leading-relaxed">
              Six decisions, made carefully. None of them by accident.
            </p>
          </div>

          {/* right — spec list */}
          <div className="lg:col-span-7 lg:col-start-6 divide-y divide-[#0a0806]/15 border-t border-b border-[#0a0806]/15">
            {SPECS.map((d, i) => (
              <div
                key={d.label}
                className="grid grid-cols-12 gap-4 py-7 items-baseline"
              >
                <span className="col-span-1 font-heading text-sm text-[#c93f1a]">
                  0{i + 1}
                </span>
                <p className="col-span-3 text-[10px] uppercase tracking-[0.3em] text-[#0a0806]/55">
                  {d.label}
                </p>
                <p className="col-span-8 text-base lg:text-lg font-light leading-snug">
                  {d.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          04 — REVIEWS, editorial single-quote with side meta
      ════════════════════════════════════════════ */}
      <section className="py-28 lg:py-44 bg-[#19120d] text-[#ede3cf] relative overflow-hidden">
        {/* giant faint 04 */}
        <p
          className="absolute -right-4 -bottom-20 font-heading italic font-light text-[#ede3cf]/[0.04] leading-none pointer-events-none select-none"
          style={{ fontSize: 'clamp(18rem, 40vw, 45rem)', letterSpacing: '-0.05em' }}
        >
          04
        </p>

        <div className="relative px-4 sm:px-8 lg:px-12">
          <div className="mb-16 lg:mb-24">
            <Eyebrow n="04 —" label="What people carry" dark />
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-3 space-y-8">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-[#c93f1a] text-[#c93f1a]" />
                ))}
              </div>

              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#ede3cf]/45">
                  Currently reading
                </p>
                <p className="text-sm font-medium">{REVIEWS[reviewIdx].name}</p>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#ede3cf]/50">
                  {REVIEWS[reviewIdx].detail}
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIdx(i)}
                    className={`text-xs font-heading transition-colors ${
                      i === reviewIdx
                        ? 'text-[#c93f1a] font-semibold'
                        : 'text-[#ede3cf]/30 hover:text-[#ede3cf]'
                    }`}
                    aria-label={`Review ${i + 1}`}
                  >
                    0{i + 1}
                    {i === reviewIdx && (
                      <span className="block h-px w-full bg-[#c93f1a] mt-1" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-9 relative">
              <span
                className="absolute -top-12 lg:-top-20 -left-4 font-heading text-[#c93f1a]/30 leading-none pointer-events-none select-none"
                style={{ fontSize: 'clamp(8rem, 14vw, 16rem)' }}
              >
                &ldquo;
              </span>
              <div className="relative min-h-[260px]">
                {REVIEWS.map((r, i) => (
                  <p
                    key={i}
                    className={`absolute inset-0 font-heading italic font-light leading-[1.05] tracking-[-0.025em] text-balance transition-opacity duration-700 ${
                      i === reviewIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 3.5rem)' }}
                  >
                    {r.quote}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          05 — UPSELL, editorial cards with section numbers
      ════════════════════════════════════════════ */}
      <section className="py-28 lg:py-44 bg-[#f4ecdb] border-y border-[#0a0806]/15">
        <div className="px-4 sm:px-8 lg:px-12">

          <div className="grid lg:grid-cols-12 gap-8 mb-16 lg:mb-24 items-end">
            <div className="lg:col-span-8 space-y-6">
              <Eyebrow n="05 —" label="Carries well with" />
              <h2
                className="font-heading font-bold leading-[0.88] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
              >
                The rest of<br />
                <span className="italic font-light">the kit.</span>
              </h2>
            </div>
            <div className="lg:col-span-3 lg:col-start-10">
              <p className="text-sm text-[#0a0806]/60 leading-relaxed font-light italic">
                Three companions to The Wallet — each built on the same idea.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-y-16 gap-x-8">
            {UPSELL.map((item, i) => (
              <Link
                key={item.name}
                href="/products"
                className={`group block ${
                  i === 0
                    ? 'lg:col-span-5'
                    : i === 1
                      ? 'lg:col-span-4 lg:pt-24'
                      : 'lg:col-span-3 lg:pt-48'
                }`}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#d9ccb0] mb-6">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                  />
                  <span className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.3em] text-[#ede3cf] bg-[#0a0806]/80 px-2.5 py-1">
                    {item.n}
                  </span>
                </div>
                <div className="flex items-end justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="font-heading text-lg font-semibold leading-tight tracking-tight group-hover:text-[#c93f1a] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#0a0806]/55 italic font-light">{item.sub}</p>
                  </div>
                  <p className="font-heading text-base font-medium whitespace-nowrap">
                    {item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          06 — SUBSCRIBE & SAVE
      ════════════════════════════════════════════ */}
      <section className="py-28 lg:py-44 bg-[#ede3cf]">
        <div className="px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-x-8 gap-y-16 items-center">

          <div className="lg:col-span-7 space-y-9">
            <Eyebrow n="06 —" label="Subscribe & save" />

            <h2
              className="font-heading font-bold leading-[0.85] tracking-[-0.045em]"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 7rem)' }}
            >
              Monthly<br />
              drops.<br />
              <span className="italic font-light text-[#c93f1a]">First access.</span>
            </h2>

            <p className="font-heading italic font-light text-lg lg:text-xl text-[#0a0806]/70 max-w-md leading-relaxed">
              A monthly accessories drop — new colors, new carries, first access.
              Skip a month or cancel any time.
            </p>

            <ul className="space-y-4 pt-4 border-t border-[#0a0806]/15">
              {[
                'A fresh Tuck accessory each month',
                'Members-only colorways',
                '15% off everything else in the shop',
                'Skip, pause, or cancel any time',
              ].map((perk, i) => (
                <li key={perk} className="flex items-baseline gap-5 text-base">
                  <span className="font-heading text-xs text-[#c93f1a]">0{i + 1}</span>
                  <span className="text-[#0a0806]/80 font-light">{perk}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Link
                href="#"
                className="group inline-flex items-center gap-5 bg-[#0a0806] text-[#ede3cf] pl-8 pr-3 py-3 text-xs uppercase tracking-[0.3em] hover:bg-[#c93f1a] transition-colors duration-500"
              >
                Join the drop — $24/mo
                <span className="w-11 h-11 rounded-full bg-[#c93f1a] group-hover:bg-[#0a0806] flex items-center justify-center transition-colors duration-500">
                  <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-500" />
                </span>
              </Link>
            </div>
          </div>

          {/* image — offset down, with caption */}
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-20">
            <div className="relative aspect-[3/4] overflow-hidden bg-[#d9ccb0]">
              <Image
                src={CARD_HOLDER_IMAGE}
                alt="Monthly Tuck accessories drop"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover"
              />
              <div className="absolute top-5 left-5 text-[9px] uppercase tracking-[0.3em] text-[#ede3cf] bg-[#0a0806]/80 px-2.5 py-1">
                Mo. 04
              </div>
            </div>
            <div className="flex items-baseline justify-between pt-5 border-b border-[#0a0806]/30 pb-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0806]/55">
                This month
              </p>
              <p className="text-sm font-medium italic font-light">Sage Card Sleeve</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          07 — CLOSING STRIP
      ════════════════════════════════════════════ */}
      <section className="relative py-32 lg:py-48 bg-[#0a0806] text-[#ede3cf] overflow-hidden">
        <p
          className="absolute -left-10 -bottom-20 font-heading italic font-light text-[#ede3cf]/[0.04] leading-none pointer-events-none select-none"
          style={{ fontSize: 'clamp(15rem, 35vw, 38rem)', letterSpacing: '-0.05em' }}
        >
          07
        </p>

        <div className="relative px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8 space-y-8">
            <Eyebrow n="07 —" label="Begin here" dark />
            <h2
              className="font-heading font-bold leading-[0.85] tracking-[-0.045em] text-balance"
              style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
            >
              Carry light.<br />
              <span className="italic font-light">Live lighter.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="group inline-flex items-center gap-3 border-b-2 border-[#ede3cf] pb-2 text-xs uppercase tracking-[0.3em] hover:text-[#c93f1a] hover:border-[#c93f1a] transition-colors"
            >
              Shop The Tuck Wallet
              <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
