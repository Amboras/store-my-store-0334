'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowRight, ShoppingBag, ChevronLeft, ChevronRight } from 'lucide-react'

/* ──────────────────────────────────────────────
   Tuck — editorial homepage
   White content sections · dark nav (in header)
   Light grey product cards · black CTAs
   Single accent: ember red for badges & highlights
─────────────────────────────────────────────── */

const ACCENT = '#c93f1a'
const CARD_BG = '#f3f1ec'
const INK = '#0f0f0f'

const HERO_LIFESTYLE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-lifestyle-1780082670068-0-01KSTK3YQVRXK58MHFWK8G26WC.webp'

const HERO_TEXTURE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082713723-0-01KSTK59984CN4NGARQ8N5B2T5.webp'

const WALLET_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082883778-0-01KSTKAF9N74KA3GAE05HV4VGR.webp'

const CARD_HOLDER_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082715201-0-01KSTK5ANKNCW7MXE2W2HEYNXC.webp'

const CLIP_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082721113-0-01KSTK5GGAK4G7YDZQS4M7JFQZ.webp'

const POCKET_IMAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-lifestyle-1780083034403-0-01KSTKF2D1BTMH34T1MERNR366.webp'

/* ── product set for the carousel ── */
type Product = {
  category: string
  name: string
  price: string
  compareAt?: string
  image: string
  href: string
  badge?: 'Sale' | 'Best Seller' | 'New'
  tags: ('best-sellers' | 'new-arrivals')[]
}

const PRODUCTS: Product[] = [
  {
    category: 'Bifold',
    name: 'The Tuck Wallet',
    price: '$55.00',
    compareAt: '$72.00',
    image: WALLET_IMAGE,
    href: '/the-tuck-wallet',
    badge: 'Sale',
    tags: ['best-sellers'],
  },
  {
    category: 'Card Holder',
    name: 'The Tuck Card Holder',
    price: '$38.00',
    image: CARD_HOLDER_IMAGE,
    href: '/products',
    badge: 'Best Seller',
    tags: ['best-sellers'],
  },
  {
    category: 'Money Clip',
    name: 'The Tuck Clip',
    price: '$42.00',
    image: CLIP_IMAGE,
    href: '/products',
    tags: ['new-arrivals'],
  },
  {
    category: 'Bifold',
    name: 'Tuck Wallet · Sage',
    price: '$55.00',
    image: HERO_TEXTURE,
    href: '/the-tuck-wallet',
    badge: 'New',
    tags: ['new-arrivals'],
  },
  {
    category: 'Bifold',
    name: 'Tuck Wallet · Chalk',
    price: '$55.00',
    image: WALLET_IMAGE,
    href: '/the-tuck-wallet',
    tags: ['best-sellers', 'new-arrivals'],
  },
]

/* ── editorial slides for the hero ── */
const HERO_SLIDES = [
  {
    eyebrow: 'The Wallet',
    headline: { lead: 'Carry light,', italic: ' live lighter.' },
    leftImage: HERO_LIFESTYLE,
    rightImage: HERO_TEXTURE,
    href: '/the-tuck-wallet',
    cta: 'Shop Now',
  },
  {
    eyebrow: 'New Arrivals',
    headline: { lead: 'Built for', italic: ' the front pocket.' },
    leftImage: HERO_TEXTURE,
    rightImage: HERO_LIFESTYLE,
    href: '/products',
    cta: 'Discover',
  },
  {
    eyebrow: 'Best Sellers',
    headline: { lead: 'Less to carry,', italic: ' more to do.' },
    leftImage: POCKET_IMAGE,
    rightImage: HERO_LIFESTYLE,
    href: '/products',
    cta: 'Shop Best Sellers',
  },
]

/* ── editorial trio cards ── */
const PHILOSOPHY_CARDS = [
  {
    pill: 'Materials',
    image:
      'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082713723-0-01KSTK59984CN4NGARQ8N5B2T5.webp',
  },
  {
    pill: 'Construction',
    image:
      'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082715201-0-01KSTK5ANKNCW7MXE2W2HEYNXC.webp',
  },
  {
    pill: 'Front Pocket',
    image:
      'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-lifestyle-1780083034403-0-01KSTKF2D1BTMH34T1MERNR366.webp',
  },
]

export default function HomePage() {
  const [slide, setSlide] = useState(0)
  const [filter, setFilter] = useState<'best-sellers' | 'new-arrivals'>('best-sellers')
  const scrollerRef = useRef<HTMLDivElement>(null)

  const slides = HERO_SLIDES.length
  const next = () => setSlide((s) => (s + 1) % slides)
  const prev = () => setSlide((s) => (s - 1 + slides) % slides)

  const filteredProducts = PRODUCTS.filter((p) => p.tags.includes(filter))

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector('[data-card]') as HTMLElement | null
    const step = card ? card.offsetWidth + 24 : 320
    el.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  const current = HERO_SLIDES[slide]

  return (
    <div className="bg-white text-[#0f0f0f]">
      {/* ════════════════════════════════════════════
          HERO — full-bleed split image with centered serif headline
      ════════════════════════════════════════════ */}
      <section className="relative w-full">
        <div className="relative grid grid-cols-2 w-full h-[calc(100vh-68px)] min-h-[560px] max-h-[820px] overflow-hidden">
          {HERO_SLIDES.map((s, i) => (
            <div
              key={i}
              className={`absolute inset-0 grid grid-cols-2 transition-opacity duration-700 ${
                i === slide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-hidden={i !== slide}
            >
              <div className="relative bg-[#e8dfc9]">
                <Image
                  src={s.leftImage}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative bg-[#1f2a1c]">
                <Image
                  src={s.rightImage}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}

          {/* Centered serif headline + eyebrow + CTA — sits over the split */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center text-white">
            <p className="text-[11px] uppercase tracking-[0.4em] mb-7 opacity-90 drop-shadow-md">
              {current.eyebrow}
            </p>
            <h1
              className="font-heading font-medium leading-[0.95] tracking-[-0.02em] drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)] text-balance max-w-[14ch]"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 6.5rem)' }}
            >
              {current.headline.lead}
              <span className="italic font-light">{current.headline.italic}</span>
            </h1>

            <Link
              href={current.href}
              className="group mt-12 inline-flex items-center gap-3 bg-[#eaffb4] text-[#0f0f0f] pl-7 pr-2 py-2 rounded-full text-sm tracking-wide hover:bg-white transition-colors"
            >
              {current.cta}
              <span className="w-9 h-9 rounded-full bg-[#0f0f0f] text-[#eaffb4] flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

          {/* Slide counter + arrows — bottom center */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-6 text-white">
            <span className="text-xs tracking-wider tabular-nums">
              {String(slide + 1).padStart(1, '0')}/{slides}
            </span>
            <div className="w-24 h-px bg-white/40 relative">
              <span
                className="absolute left-0 top-0 h-px bg-white transition-all duration-500"
                style={{ width: `${((slide + 1) / slides) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="p-1.5 hover:opacity-70 transition-opacity"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="p-1.5 hover:opacity-70 transition-opacity"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FIND YOUR WALLET — editorial collection carousel
      ════════════════════════════════════════════ */}
      <section className="bg-white pt-20 lg:pt-28 pb-24 lg:pb-32">
        {/* header row */}
        <div className="px-6 sm:px-10 lg:px-12 flex items-end justify-between gap-8 mb-12 lg:mb-16">
          <h2
            className="font-heading font-medium leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 4rem)' }}
          >
            Find your <span className="italic font-light">wallet.</span>
          </h2>

          <div className="hidden sm:flex items-center gap-1 bg-[#f3f1ec] p-1 rounded-full text-sm">
            <button
              onClick={() => setFilter('best-sellers')}
              className={`px-5 py-2 rounded-full transition-colors ${
                filter === 'best-sellers'
                  ? 'bg-white text-[#0f0f0f] shadow-sm'
                  : 'text-[#0f0f0f]/55 hover:text-[#0f0f0f]'
              }`}
            >
              Best Sellers
            </button>
            <button
              onClick={() => setFilter('new-arrivals')}
              className={`px-5 py-2 rounded-full transition-colors ${
                filter === 'new-arrivals'
                  ? 'bg-white text-[#0f0f0f] shadow-sm'
                  : 'text-[#0f0f0f]/55 hover:text-[#0f0f0f]'
              }`}
            >
              New Arrivals
            </button>
          </div>
        </div>

        {/* carousel */}
        <div
          ref={scrollerRef}
          className="flex gap-6 overflow-x-auto pb-4 px-6 sm:px-10 lg:px-12 snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {filteredProducts.map((p) => (
            <article
              key={p.name + p.category}
              data-card
              className="snap-start shrink-0 w-[78vw] sm:w-[44vw] md:w-[32vw] lg:w-[280px] xl:w-[300px]"
            >
              <Link href={p.href} className="group block">
                <div
                  className="relative aspect-[4/5] overflow-hidden rounded-md"
                  style={{ backgroundColor: CARD_BG }}
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 78vw, 300px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  {p.badge && (
                    <span
                      className={`absolute top-4 left-4 text-[10px] uppercase tracking-[0.15em] px-3 py-1 rounded-full ${
                        p.badge === 'Sale'
                          ? 'bg-[#c93f1a] text-white'
                          : p.badge === 'New'
                          ? 'bg-[#0f0f0f] text-white'
                          : 'bg-[#e8e3d2] text-[#0f0f0f]'
                      }`}
                    >
                      {p.badge}
                    </span>
                  )}

                  <button
                    aria-label={`Add ${p.name} to cart`}
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#0f0f0f] text-white flex items-center justify-center hover:bg-[#c93f1a] transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                </div>

                <div className="pt-5 px-1 space-y-1">
                  <p className="text-xs text-[#0f0f0f]/55 tracking-wide">{p.category}</p>
                  <p className="font-medium text-[15px] tracking-tight">{p.name}</p>
                  <div className="flex items-baseline gap-2 pt-0.5">
                    <span className="text-[15px] font-medium">{p.price}</span>
                    {p.compareAt && (
                      <span className="text-[13px] text-[#0f0f0f]/40 line-through">
                        {p.compareAt}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* progress + arrows below carousel */}
        <div className="px-6 sm:px-10 lg:px-12 mt-10 flex items-center justify-between">
          <div className="h-px bg-[#0f0f0f]/10 flex-1 max-w-[280px] relative">
            <span
              className="absolute left-0 top-0 h-px bg-[#0f0f0f] transition-all"
              style={{
                width: `${
                  filteredProducts.length > 0
                    ? Math.min(100, 100 / filteredProducts.length + 20)
                    : 0
                }%`,
              }}
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="w-10 h-10 rounded-full border border-[#0f0f0f]/15 flex items-center justify-center hover:bg-[#f3f1ec] transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="w-10 h-10 rounded-full border border-[#0f0f0f]/15 flex items-center justify-center hover:bg-[#f3f1ec] transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          BRAND STATEMENT — centered editorial
      ════════════════════════════════════════════ */}
      <section className="bg-white py-24 lg:py-32">
        <div className="px-6 sm:px-10 lg:px-12 text-center max-w-4xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#0f0f0f]/60 mb-7">
            The Philosophy
          </p>
          <h2
            className="font-heading font-medium leading-[1.02] tracking-[-0.02em] text-balance"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)' }}
          >
            Built for the <span className="italic font-light">front pocket.</span>
          </h2>
          <p className="mt-7 text-[15px] lg:text-base text-[#0f0f0f]/65 leading-relaxed max-w-xl mx-auto">
            A slim profile, a clean design, everything you actually need —
            and nothing you don&rsquo;t. Tuck is the long answer to a short question.
          </p>
        </div>

        {/* three editorial photo cards */}
        <div className="mt-14 lg:mt-20 px-6 sm:px-10 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {PHILOSOPHY_CARDS.map((card) => (
            <div
              key={card.pill}
              className="relative aspect-[4/5] overflow-hidden rounded-md bg-[#f3f1ec] group"
            >
              <Image
                src={card.image}
                alt={card.pill}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.15em] text-[#0f0f0f]">
                {card.pill}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          CLOSING STRIP — lifestyle moment
      ════════════════════════════════════════════ */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden bg-[#0f0f0f]">
        <Image
          src={POCKET_IMAGE}
          alt="A Tuck wallet in a front pocket"
          fill
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
          <p className="text-[11px] uppercase tracking-[0.4em] mb-6 opacity-80">
            Carried Daily
          </p>
          <h2
            className="font-heading font-medium leading-[0.95] tracking-[-0.02em] text-balance max-w-[14ch]"
            style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6rem)' }}
          >
            Made to <span className="italic font-light">disappear.</span>
          </h2>
          <Link
            href="/the-tuck-wallet"
            className="group mt-10 inline-flex items-center gap-3 bg-white text-[#0f0f0f] pl-7 pr-2 py-2 rounded-full text-sm tracking-wide hover:bg-[#eaffb4] transition-colors"
          >
            Shop The Wallet
            <span className="w-9 h-9 rounded-full bg-[#0f0f0f] text-white flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}
