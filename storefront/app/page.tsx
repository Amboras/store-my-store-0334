'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowUpRight, Star } from 'lucide-react'
import { trackMetaEvent } from '@/lib/meta-pixel'

/* ──────────────────────────────────────────────
   Tuck — editorial redesign
   Warmer cream · deeper ink · accent used like a spark
   Palette: #ede3cf (paper) · #f4ecdb (paper-light) · #d9ccb0 (paper-dim)
            #0a0806 (ink) · #19120d (ink-deep) · #c93f1a (ember accent)
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
  {
    n: '01',
    name: 'The Tuck Wallet',
    sub: 'Slim bifold · four cards',
    price: '$55',
    image: WALLET_IMAGE,
    href: '/the-tuck-wallet',
  },
  {
    n: '02',
    name: 'The Tuck Card Holder',
    sub: 'Three cards · zero bulk',
    price: '$38',
    image: CARD_HOLDER_IMAGE,
    href: '/products',
  },
  {
    n: '03',
    name: 'The Tuck Clip',
    sub: 'Cash up front · cards behind',
    price: '$42',
    image: CLIP_IMAGE,
    href: '/products',
  },
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
      'Carries exactly what I need and nothing I don’t. The design is so clean it almost disappears.',
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

/* ── tiny atom: section eyebrow with number ── */
function Eyebrow({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-heading text-[#c93f1a] text-sm tracking-tight">{n}</span>
      <div className="h-px w-10 bg-[#0a0806]/30" />
      <span className="text-[10px] uppercase tracking-[0.35em] text-[#0a0806]/55">
        {label}
      </span>
    </div>
  )
}

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
    <div className="bg-[#ede3cf] text-[#0a0806] selection:bg-[#c93f1a] selection:text-[#ede3cf]">

      {/* ════════════════════════════════════════════
          HERO — typographic statement, full bleed
          Headline owns the page · product crops off-axis
      ════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-10 lg:pt-16">
        {/* faint frame index */}
        <div className="absolute top-6 right-4 sm:right-8 z-20 flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-[#0a0806]/45">
          <span>Vol. 01 · The front pocket</span>
          <span className="h-px w-8 bg-[#0a0806]/30" />
          <span>MMXXV</span>
        </div>

        <div className="relative">
          {/* the headline — bleeds across the whole viewport */}
          <div className="pl-4 sm:pl-8 lg:pl-12 pt-8 lg:pt-14 pb-0">
            <p className="font-heading italic font-light text-[#0a0806]/50 text-sm sm:text-base mb-6 tracking-tight">
              An essay in subtraction —
            </p>
            <h1
              className="font-heading font-bold leading-[0.82] tracking-[-0.045em]"
              style={{ fontSize: 'clamp(4.5rem, 17vw, 18rem)' }}
            >
              Carry
              <span className="italic font-light"> light.</span>
            </h1>
          </div>

          {/* product image — large, off-center, overlapping bottom of headline */}
          <div className="relative grid grid-cols-12 gap-0 mt-[-4vw] lg:mt-[-6vw]">
            <div className="col-span-12 lg:col-span-7 lg:col-start-6 relative z-10 pr-4 sm:pr-8 lg:pr-12">
              <div className="relative aspect-[5/6] sm:aspect-[6/5] lg:aspect-[4/5] overflow-hidden bg-[#d9ccb0]">
                <Image
                  src={HERO_IMAGE}
                  alt="A slim Tuck wallet held in hand"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* second-line headline sits in the empty left column */}
            <div className="col-span-12 lg:col-span-5 lg:row-start-1 px-4 sm:px-8 lg:pl-12 lg:pr-0 pt-8 lg:pt-16 self-end">
              <h1
                className="font-heading font-bold leading-[0.82] tracking-[-0.045em]"
                style={{ fontSize: 'clamp(4rem, 11vw, 11rem)' }}
              >
                Live
                <br />
                <span className="italic font-light text-[#c93f1a]">lighter.</span>
              </h1>
            </div>
          </div>

          {/* footer row of hero — caption left · CTA right */}
          <div className="px-4 sm:px-8 lg:px-12 pt-14 lg:pt-20 pb-14 lg:pb-24 grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-5 space-y-4">
              <Eyebrow n="00 —" label="Issue one · Now shipping" />
              <p className="text-base lg:text-lg text-[#0a0806]/65 leading-relaxed max-w-sm font-light">
                Slim wallets built for the front pocket generation. No bulk, no
                fold-over, no apology.
              </p>
            </div>

            <div className="lg:col-span-7 flex lg:justify-end">
              <Link
                href="/the-tuck-wallet"
                className="group inline-flex items-center gap-5 bg-[#0a0806] text-[#ede3cf] pl-8 pr-3 py-3 text-xs uppercase tracking-[0.3em] hover:bg-[#c93f1a] transition-colors duration-500"
              >
                Shop The Tuck Wallet
                <span className="w-11 h-11 rounded-full bg-[#c93f1a] group-hover:bg-[#0a0806] flex items-center justify-center transition-colors duration-500">
                  <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform duration-500" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          TRUST — a single thin rule with marquee energy
      ════════════════════════════════════════════ */}
      <section className="border-y border-[#0a0806]/15 bg-[#ede3cf]">
        <div className="overflow-hidden">
          <div className="flex items-center gap-12 lg:gap-20 py-5 px-4 sm:px-8 lg:px-12 whitespace-nowrap text-[11px] uppercase tracking-[0.3em] text-[#0a0806]/65">
            {[...TRUST_BAR, ...TRUST_BAR].map((item, i) => (
              <span key={i} className="flex items-center gap-12 lg:gap-20">
                {item}
                <span className="text-[#c93f1a]">✦</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          02 — FEATURED PRODUCT
          Asymmetric · image bleeds left · type column right
      ════════════════════════════════════════════ */}
      <section className="py-28 lg:py-44">
        <div className="grid lg:grid-cols-12 gap-x-8 gap-y-14 items-center">

          {/* image — bleeds off the left edge */}
          <div className="lg:col-span-7 relative">
            <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden bg-[#d9ccb0] lg:-ml-0">
              <Image
                src={FEATURED_IMAGE}
                alt="The Tuck Wallet in matte black"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </div>
            {/* oversized section number */}
            <p
              className="hidden lg:block absolute -bottom-12 -left-2 font-heading italic font-light text-[#0a0806]/15 leading-none pointer-events-none"
              style={{ fontSize: 'clamp(8rem, 14vw, 16rem)', letterSpacing: '-0.04em' }}
            >
              01
            </p>
          </div>

          {/* type column */}
          <div className="lg:col-span-4 lg:col-start-9 px-4 sm:px-8 lg:px-0 lg:pr-12 space-y-8">
            <Eyebrow n="01 —" label="The flagship" />

            <h2
              className="font-heading font-bold leading-[0.92] tracking-[-0.035em]"
              style={{ fontSize: 'clamp(2.75rem, 5.5vw, 5.5rem)' }}
            >
              The Tuck<br />
              <span className="italic font-light">Wallet.</span>
            </h2>

            <p className="text-base lg:text-lg text-[#0a0806]/65 leading-relaxed max-w-md font-light">
              A slim bifold built for front pocket carry. Fits four cards and
              folded cash — nothing more, nothing less.
            </p>

            {/* price row */}
            <div className="flex items-baseline gap-5 border-t border-[#0a0806]/20 pt-6">
              <p className="text-4xl font-heading font-semibold">$55</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0806]/45">
                USD · ships in 24h
              </p>
            </div>

            {/* colors */}
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0806]/45">
                Three colorways
              </p>
              <div className="flex items-center gap-4">
                {[
                  { name: 'Chalk White', hex: '#ece6dd' },
                  { name: 'Matte Black', hex: '#1a1a1a' },
                  { name: 'Sage Green', hex: '#8a9a82' },
                ].map((c) => (
                  <div key={c.name} className="flex items-center gap-2 group cursor-pointer">
                    <span
                      className="w-8 h-8 rounded-full border border-[#0a0806]/15 ring-offset-2 ring-offset-[#ede3cf] group-hover:ring-2 group-hover:ring-[#0a0806]/50 transition-all"
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
                className="group inline-flex items-center gap-3 border-b-2 border-[#0a0806] pb-2 text-xs uppercase tracking-[0.3em] hover:text-[#c93f1a] hover:border-[#c93f1a] transition-colors"
              >
                Shop now
                <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          PULL QUOTE — editorial moment, big italic
      ════════════════════════════════════════════ */}
      <section className="py-20 lg:py-32 border-y border-[#0a0806]/15 bg-[#f4ecdb]">
        <div className="px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-2 hidden lg:block">
            <Eyebrow n="—" label="A note" />
          </div>
          <div className="lg:col-span-10">
            <p
              className="font-heading italic font-light leading-[1.02] tracking-[-0.03em] text-balance"
              style={{ fontSize: 'clamp(2.25rem, 6vw, 6rem)' }}
            >
              <span className="text-[#0a0806]/30">“</span>Most wallets are{' '}
              <span className="line-through decoration-[#c93f1a] decoration-[3px]">too much.</span>{' '}
              Tuck is <span className="not-italic font-bold text-[#c93f1a]">just enough.</span>
              <span className="text-[#0a0806]/30">”</span>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          02 — COLLECTION
          Editorial: large 02, varied card sizes, no generic grid
      ════════════════════════════════════════════ */}
      <section className="py-28 lg:py-44 bg-[#ede3cf]">
        <div className="px-4 sm:px-8 lg:px-12">

          {/* header row — type on left, very small caption right */}
          <div className="grid lg:grid-cols-12 gap-8 mb-20 lg:mb-32 items-end">
            <div className="lg:col-span-8 space-y-6">
              <Eyebrow n="02 —" label="The collection" />
              <h2
                className="font-heading font-bold leading-[0.88] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(3rem, 8vw, 8rem)' }}
              >
                Everything you<br />
                <span className="italic font-light">need. Nothing</span><br />
                you don&rsquo;t.
              </h2>
            </div>
            <div className="lg:col-span-3 lg:col-start-10 space-y-4">
              <p className="text-sm text-[#0a0806]/65 leading-relaxed font-light">
                Three carries, one philosophy. Pick the silhouette that disappears
                into your day.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] border-b border-[#0a0806] pb-1 hover:text-[#c93f1a] hover:border-[#c93f1a] transition-colors"
              >
                Browse all
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* asymmetric showcase */}
          <div className="grid lg:grid-cols-12 gap-y-20 gap-x-8">
            {/* large feature card — column-span 7, taller */}
            <Link href={COLLECTION_ITEMS[0].href} className="lg:col-span-7 group block">
              <div className="relative aspect-[5/6] overflow-hidden bg-[#d9ccb0] mb-7">
                <Image
                  src={COLLECTION_ITEMS[0].image}
                  alt={COLLECTION_ITEMS[0].name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-[1200ms] ease-out"
                />
                <span className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.35em] text-[#ede3cf] bg-[#0a0806]/80 px-3 py-1.5">
                  {COLLECTION_ITEMS[0].n}
                </span>
              </div>
              <div className="flex items-end justify-between gap-8">
                <div className="space-y-1.5">
                  <h3
                    className="font-heading font-semibold leading-none tracking-tight group-hover:text-[#c93f1a] transition-colors"
                    style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
                  >
                    {COLLECTION_ITEMS[0].name}
                  </h3>
                  <p className="text-sm text-[#0a0806]/55 italic font-light">
                    {COLLECTION_ITEMS[0].sub}
                  </p>
                </div>
                <p className="font-heading text-xl font-medium whitespace-nowrap">
                  {COLLECTION_ITEMS[0].price}
                </p>
              </div>
            </Link>

            {/* right column — two smaller stacked cards, offset down */}
            <div className="lg:col-span-4 lg:col-start-9 space-y-16 lg:pt-32">
              {COLLECTION_ITEMS.slice(1).map((item) => (
                <Link key={item.name} href={item.href} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#d9ccb0] mb-6">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 35vw"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-[1200ms] ease-out"
                    />
                    <span className="absolute top-5 left-5 text-[10px] uppercase tracking-[0.35em] text-[#ede3cf] bg-[#0a0806]/80 px-3 py-1.5">
                      {item.n}
                    </span>
                  </div>
                  <div className="flex items-end justify-between gap-6">
                    <div className="space-y-1.5">
                      <h3 className="font-heading text-xl font-semibold leading-tight tracking-tight group-hover:text-[#c93f1a] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#0a0806]/55 italic font-light">
                        {item.sub}
                      </p>
                    </div>
                    <p className="font-heading text-base font-medium whitespace-nowrap">
                      {item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          03 — BRAND MANIFESTO over dark ink
      ════════════════════════════════════════════ */}
      <section className="py-32 lg:py-56 bg-[#19120d] text-[#ede3cf] relative overflow-hidden">
        {/* faint giant 03 in background */}
        <p
          className="absolute -right-6 lg:-right-16 -top-10 lg:-top-20 font-heading italic font-light text-[#ede3cf]/[0.04] leading-none pointer-events-none select-none"
          style={{ fontSize: 'clamp(20rem, 45vw, 50rem)', letterSpacing: '-0.05em' }}
        >
          03
        </p>

        <div className="relative px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-2 space-y-3">
            <span className="font-heading text-[#c93f1a] text-sm">03 —</span>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#ede3cf]/45 leading-relaxed">
              The philosophy<br />in twenty seven<br />words
            </p>
          </div>

          <div className="lg:col-span-10 space-y-12">
            <p
              className="font-heading font-light leading-[1.02] tracking-[-0.03em] text-balance"
              style={{ fontSize: 'clamp(2.25rem, 5.5vw, 5.5rem)' }}
            >
              Slim profile.<br />
              <span className="italic">Clean design.</span><br />
              <span className="font-bold not-italic">
                Everything you actually<br />need
                <span className="text-[#c93f1a]">.</span>
              </span>
            </p>

            <div className="flex items-center gap-6 pt-4">
              <div className="h-px flex-1 max-w-[160px] bg-[#ede3cf]/30" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#ede3cf]/50">
                — Tuck, the long answer to a short question
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          04 — REVIEWS
          Single large quote with editorial side meta
      ════════════════════════════════════════════ */}
      <section className="py-28 lg:py-44 bg-[#ede3cf]">
        <div className="px-4 sm:px-8 lg:px-12">

          <div className="mb-20 lg:mb-28">
            <Eyebrow n="04 —" label="Worn daily by thousands" />
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
            {/* meta column */}
            <div className="lg:col-span-3 space-y-8">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-[#c93f1a] text-[#c93f1a]" />
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0806]/45">
                  Average rating
                </p>
                <p className="font-heading text-5xl font-semibold tracking-tight">
                  4.9<span className="text-[#0a0806]/30 text-2xl">/5</span>
                </p>
                <p className="text-xs text-[#0a0806]/55 font-light italic">
                  Across 1,284 verified carries
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#0a0806]/45">
                  Currently reading
                </p>
                <div className="space-y-1.5">
                  <p className="text-sm font-medium">{REVIEWS[reviewIdx].name}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#0a0806]/50">
                    {REVIEWS[reviewIdx].detail}
                  </p>
                </div>

                {/* numbered selector */}
                <div className="flex items-center gap-4 pt-6">
                  {REVIEWS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setReviewIdx(i)}
                      className={`text-xs font-heading transition-colors ${
                        i === reviewIdx
                          ? 'text-[#c93f1a] font-semibold'
                          : 'text-[#0a0806]/30 hover:text-[#0a0806]'
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
            </div>

            {/* the quote — large italic */}
            <div className="lg:col-span-9 relative">
              <span
                className="absolute -top-12 lg:-top-20 -left-4 font-heading text-[#c93f1a]/30 leading-none pointer-events-none select-none"
                style={{ fontSize: 'clamp(8rem, 14vw, 16rem)' }}
              >
                &ldquo;
              </span>
              <div className="relative min-h-[280px]">
                {REVIEWS.map((r, i) => (
                  <p
                    key={i}
                    className={`absolute inset-0 font-heading italic font-light leading-[1.05] tracking-[-0.025em] text-balance transition-opacity duration-700 ${
                      i === reviewIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    style={{ fontSize: 'clamp(1.75rem, 4.5vw, 4rem)' }}
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
          05 — NEWSLETTER
          Headline takes the whole page, input is a thin underline
      ════════════════════════════════════════════ */}
      <section className="py-32 lg:py-56 bg-[#f4ecdb] border-y border-[#0a0806]/15 relative overflow-hidden">
        {/* faint giant 05 */}
        <p
          className="absolute -left-6 -bottom-20 font-heading italic font-light text-[#0a0806]/[0.05] leading-none pointer-events-none select-none"
          style={{ fontSize: 'clamp(15rem, 35vw, 40rem)', letterSpacing: '-0.05em' }}
        >
          05
        </p>

        <div className="relative px-4 sm:px-8 lg:px-12 grid lg:grid-cols-12 gap-y-16 gap-x-8 items-end">
          <div className="lg:col-span-7 space-y-8">
            <Eyebrow n="05 —" label="Newsletter" />
            <h2
              className="font-heading font-bold leading-[0.85] tracking-[-0.045em]"
              style={{ fontSize: 'clamp(4rem, 12vw, 13rem)' }}
            >
              Less is<br />
              <span className="italic font-light">more.</span>
            </h2>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <p className="text-base lg:text-lg text-[#0a0806]/65 max-w-sm leading-relaxed font-light">
              New drops, early access, and absolutely nothing else. The same
              philosophy, in your inbox.
            </p>

            {subscribed ? (
              <div className="border-b-2 border-[#c93f1a] pb-5">
                <p className="text-sm uppercase tracking-[0.3em] text-[#c93f1a] font-medium">
                  You&rsquo;re in. Welcome to Tuck.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-end gap-4 border-b-2 border-[#0a0806] pb-3 focus-within:border-[#c93f1a] transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-1 bg-transparent text-lg lg:text-xl placeholder:text-[#0a0806]/25 focus:outline-none font-light"
                    required
                  />
                  <button
                    type="submit"
                    className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] font-medium hover:text-[#c93f1a] transition-colors pb-1"
                  >
                    Subscribe
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:rotate-45 transition-transform" />
                  </button>
                </div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#0a0806]/40">
                  Unsubscribe any time · No spam, that&rsquo;s the whole point
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          06 — CLOSING STRIP
          Large pocket image with full-bleed type overlay
      ════════════════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden bg-[#0a0806]">
        <Image
          src={POCKET_IMAGE}
          alt="A Tuck wallet in a front pocket"
          fill
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0806] via-[#0a0806]/40 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-8 lg:p-12">
          {/* top eyebrow */}
          <div className="flex items-center gap-4 text-[#ede3cf]">
            <span className="font-heading text-[#c93f1a] text-sm">06 —</span>
            <div className="h-px w-10 bg-[#ede3cf]/30" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#ede3cf]/55">
              Carried by · everywhere
            </span>
          </div>

          {/* bottom — large statement + CTA right */}
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <h2
              className="lg:col-span-8 font-heading font-bold text-[#ede3cf] leading-[0.85] tracking-[-0.04em] text-balance"
              style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}
            >
              Made to<br />
              <span className="italic font-light">disappear.</span>
            </h2>
            <div className="lg:col-span-4 lg:text-right">
              <Link
                href="/the-tuck-wallet"
                className="group inline-flex items-center gap-3 border-b-2 border-[#ede3cf] pb-2 text-xs uppercase tracking-[0.3em] text-[#ede3cf] hover:text-[#c93f1a] hover:border-[#c93f1a] transition-colors"
              >
                Begin with The Wallet
                <ArrowUpRight className="h-4 w-4 group-hover:rotate-45 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
