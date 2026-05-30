'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Heart,
  Menu,
  Minus,
  Package,
  Percent,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Truck,
  Calendar,
} from 'lucide-react'

const SOCIAL_ICONS = [
  { name: 'Twitter', src: '/icons/simple-icons/twitter.svg' },
  { name: 'Facebook', src: '/icons/simple-icons/facebook.svg' },
  { name: 'Instagram', src: '/icons/simple-icons/instagram.svg' },
  { name: 'YouTube', src: '/icons/simple-icons/youtube.svg' },
]

/* ──────────────────────────────────────────────
   The Tuck Wallet — clean, minimal, editorial PDP
   Palette: white background, near-black ink,
   gold for star ratings, red badges for discounts only.
─────────────────────────────────────────────── */

const GOLD = '#f5b301'

const WALLET_WHITE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082883778-0-01KSTKAF9N74KA3GAE05HV4VGR.webp'

const WALLET_BLACK =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082713723-0-01KSTK59984CN4NGARQ8N5B2T5.webp'

const WALLET_SAGE =
  'https://ahjviugsxpwzpkyzgrhi.supabase.co/storage/v1/object/public/product-user-files/6c3fc4dc-b4bc-4d62-ba8d-479a5216ef3b%2Fai-product-1780082873474-0-01KSTKA570D0EPJVYDJB89G124.webp'

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
  { id: 'single', label: 'Single', sub: 'One wallet', price: 55, save: 0 },
  { id: 'two', label: 'Two pack', sub: 'Share one', price: 99, save: 11 },
  { id: 'three', label: 'Three pack', sub: 'Gift set', price: 139, save: 26 },
] as const

type BundleId = (typeof BUNDLES)[number]['id']

const RATING_BREAKDOWN = [
  { stars: 5, pct: 86 },
  { stars: 4, pct: 9 },
  { stars: 3, pct: 3 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 1 },
]

const REVIEWS = [
  {
    name: 'Aaron M.',
    date: '13 Oct 2024',
    rating: 5,
    quote:
      'Slim profile, clean look. I keep it in my front pocket and genuinely forget it&rsquo;s there. Holds four cards and folded cash — exactly what I need, nothing more.',
    avatarColor: '#e7d6b8',
  },
  {
    name: 'Lena K.',
    date: '02 Oct 2024',
    rating: 5,
    quote:
      'Bought one for me and two as gifts. Everyone asked where I got it. The packaging alone makes it feel like a premium drop.',
    avatarColor: '#cbd5b8',
  },
  {
    name: 'Jordan P.',
    date: '24 Sep 2024',
    rating: 5,
    quote:
      'Everyday carry, refined. The Sage Green colorway is gorgeous — the leather feels broken-in from day one but still clean.',
    avatarColor: '#c4b8d5',
  },
  {
    name: 'Sasha B.',
    date: '11 Sep 2024',
    rating: 4,
    quote:
      'Replaces a wallet twice this size and somehow holds everything I actually need. The chalk white shows wear gracefully.',
    avatarColor: '#d5b8b8',
  },
]

const UPSELL = [
  {
    name: 'The Tuck Card Holder',
    image: CARD_HOLDER_IMAGE,
    rating: 4.8,
    price: 38,
    compareAt: null,
    badge: null,
  },
  {
    name: 'The Tuck Clip',
    image: CLIP_IMAGE,
    rating: 4.7,
    price: 42,
    compareAt: 52,
    badge: '-20%',
  },
  {
    name: 'The Tuck Key Ring',
    image: KEY_RING_IMAGE,
    rating: 4.9,
    price: 28,
    compareAt: null,
    badge: null,
  },
  {
    name: 'The Tuck Wallet — Sage',
    image: WALLET_SAGE,
    rating: 5.0,
    price: 48,
    compareAt: 60,
    badge: '-20%',
  },
]

/* ── small UI atoms ── */

function StarRow({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => {
        const filled = rating >= s
        const half = !filled && rating >= s - 0.5
        return (
          <Star
            key={s}
            style={{ width: size, height: size, color: filled || half ? GOLD : '#e5e7eb' }}
            fill={filled || half ? GOLD : 'none'}
          />
        )
      })}
    </div>
  )
}

function Pill({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
        active
          ? 'bg-black text-white border-black'
          : 'bg-white text-black border-gray-200 hover:border-black/40'
      }`}
    >
      {children}
    </span>
  )
}

/* ── Countdown timer ── */
function useCountdown(initialSeconds: number) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0))
    }, 1000)
    return () => clearInterval(id)
  }, [])
  const h = Math.floor(secondsLeft / 3600)
    .toString()
    .padStart(2, '0')
  const m = Math.floor((secondsLeft % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const s = (secondsLeft % 60).toString().padStart(2, '0')
  return `${h}:${m}:${s}`
}

/* ── Accordion ── */
function Accordion({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-base font-semibold">{title}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="px-5 pb-5 pt-1">{children}</div>}
    </div>
  )
}

export default function TuckWalletPage() {
  const [colorIdx, setColorIdx] = useState(0)
  const [bundle, setBundle] = useState<BundleId>('single')
  const [qty, setQty] = useState(1)
  const [reviewIdx, setReviewIdx] = useState(0)
  const [searchValue, setSearchValue] = useState('')
  const [isWishlisted, setIsWishlisted] = useState(false)

  const countdown = useCountdown(2 * 3600 + 30 * 60 + 25) // 02:30:25

  const activeColor = COLORS[colorIdx]
  const activeBundle = BUNDLES.find((b) => b.id === bundle) ?? BUNDLES[0]

  const handleNextReview = () => setReviewIdx((i) => (i + 1) % REVIEWS.length)
  const handlePrevReview = () => setReviewIdx((i) => (i - 1 + REVIEWS.length) % REVIEWS.length)

  return (
    <div className="min-h-screen bg-white text-[#111] selection:bg-black selection:text-white">

      {/* ════════════════════════════════════════════
          TOP NAV — hamburger left, logo centered, links + cart right
      ════════════════════════════════════════════ */}
      <header className="border-b border-gray-200/80 bg-white">
        <div className="px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-3 items-center h-16 lg:h-20">
            <div className="flex items-center">
              <button
                className="p-2 -ml-2 hover:bg-gray-50 rounded-lg transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            <Link href="/" className="justify-self-center flex items-baseline gap-0.5 group">
              <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-heading font-bold text-sm -mb-1 mr-1.5">
                T
              </span>
              <span className="font-heading text-2xl font-bold tracking-[-0.04em]">Tuck</span>
              <span className="font-heading text-2xl font-bold tracking-tight">.</span>
            </Link>

            <div className="justify-self-end flex items-center gap-6">
              <Link
                href="/about"
                className="hidden sm:inline-block text-sm font-medium hover:text-black/60 transition-colors"
              >
                About
              </Link>
              <Link
                href="/faq"
                className="hidden sm:inline-block text-sm font-medium hover:text-black/60 transition-colors"
              >
                FAQs
              </Link>
              <button
                className="relative p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
                  1
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════
          SECONDARY BAR — filter dropdowns + search + pills
      ════════════════════════════════════════════ */}
      <div className="border-b border-gray-200/80 bg-white">
        <div className="px-5 sm:px-8 lg:px-12 py-4">
          <div className="flex flex-wrap items-center gap-3 lg:gap-4">
            {/* Categories dropdown */}
            <button className="flex items-center justify-between gap-3 px-4 py-2.5 border border-gray-200 rounded-full text-sm font-medium hover:border-black/40 transition-colors min-w-[170px]">
              <span>Categories</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {/* New Product dropdown */}
            <button className="flex items-center justify-between gap-3 px-4 py-2.5 border border-gray-200 rounded-full text-sm font-medium hover:border-black/40 transition-colors min-w-[170px]">
              <span>New Product</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>

            {/* Search input */}
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2.5 pr-12 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-black/50 transition-colors"
              />
              <button
                className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>

            {/* Filter pills — push to right on desktop */}
            <div className="flex items-center gap-2 lg:ml-auto">
              <Pill active>Wallets</Pill>
              <Pill>Card Holders</Pill>
              <Pill>Clips</Pill>
              <Pill>Bundles</Pill>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          BREADCRUMB
      ════════════════════════════════════════════ */}
      <div className="px-5 sm:px-8 lg:px-12 pt-6 pb-4">
        <nav className="flex items-center gap-2.5 text-sm">
          <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-gray-300" />
          <span className="text-gray-500">Product details</span>
        </nav>
      </div>

      {/* ════════════════════════════════════════════
          MAIN PRODUCT SECTION
      ════════════════════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-12 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">

          {/* LEFT — Gallery */}
          <div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50">
              <Image
                key={activeColor.name}
                src={activeColor.image}
                alt={`The Tuck Wallet — ${activeColor.name}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover animate-fade-in"
              />

              {/* progress indicator at top — like the reference */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-1">
                {COLORS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === colorIdx ? 'w-12 bg-white' : 'w-6 bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-3 gap-3 lg:gap-4 mt-4">
              {COLORS.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setColorIdx(i)}
                  className={`relative aspect-square rounded-xl overflow-hidden bg-gray-50 transition-all ${
                    i === colorIdx ? 'ring-2 ring-black ring-offset-2' : 'opacity-80 hover:opacity-100'
                  }`}
                  aria-label={c.name}
                >
                  <Image src={c.image} alt={c.name} fill sizes="20vw" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Details */}
          <div className="space-y-6">
            {/* Category pill */}
            <div>
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-700">
                Slim Wallets
              </span>
            </div>

            {/* Title */}
            <div className="space-y-3">
              <h1 className="font-heading text-4xl lg:text-5xl font-bold leading-[1.05] tracking-[-0.02em]">
                The White Wallet
              </h1>
              <p className="text-sm text-gray-500 italic">{"Just enough."}</p>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold tracking-tight">${activeBundle.price}.00</p>

            {/* Countdown banner */}
            <div className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl bg-white">
              <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Truck className="h-3.5 w-3.5 text-gray-700" />
              </span>
              <p className="text-sm text-gray-700">
                Order in <span className="font-bold text-black tabular-nums">{countdown}</span> to get next day delivery
              </p>
            </div>

            {/* Select Bundle */}
            <div className="space-y-3 pt-2">
              <p className="text-sm font-medium text-gray-700">Select Bundle</p>
              <div className="grid grid-cols-3 gap-3">
                {BUNDLES.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBundle(b.id)}
                    className={`relative py-4 px-3 rounded-full border text-sm font-medium transition-all ${
                      bundle === b.id
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-gray-200 hover:border-black/30'
                    }`}
                  >
                    <span className="block">{b.label}</span>
                    {b.save > 0 && (
                      <span
                        className={`block text-[10px] font-normal mt-0.5 ${
                          bundle === b.id ? 'text-white/70' : 'text-gray-400'
                        }`}
                      >
                        save ${b.save}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 italic">
                {bundle === 'single' && 'One Tuck Wallet'}
                {bundle === 'two' && 'Two pack — share one'}
                {bundle === 'three' && 'Three pack — gift set'}
              </p>
            </div>

            {/* Color swatches — small, secondary */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-700">Color</p>
                <p className="text-xs text-gray-500">{activeColor.name}</p>
              </div>
              <div className="flex items-center gap-3">
                {COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColorIdx(i)}
                    aria-label={c.name}
                    className={`w-9 h-9 rounded-full border transition-all ${
                      i === colorIdx
                        ? 'border-black ring-2 ring-black ring-offset-2'
                        : 'border-gray-200 hover:border-black/40'
                    }`}
                    style={{ backgroundColor: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart + Wishlist */}
            <div className="flex items-center gap-3 pt-3">
              {/* Qty */}
              <div className="flex items-center border border-gray-200 rounded-full">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 rounded-l-full"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="px-3 text-sm font-medium min-w-[2rem] text-center">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 rounded-r-full"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Add to cart */}
              <button
                className="flex-1 h-12 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Add to Cart
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlisted((w) => !w)}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-black/40'
                }`}
                aria-label="Add to wishlist"
              >
                <Heart className="h-4 w-4" fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* Accordions */}
            <div className="space-y-3 pt-4">
              <Accordion title="Description & Carry" defaultOpen>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The Tuck Wallet is a slim minimal bifold built for front pocket carry.
                  7mm profile, full-grain leather, hand-finished waxed thread. Fits four
                  cards and folded cash — front pocket friendly, jacket friendly, life
                  friendly. Clean design, no bulk, just what you need. Available in three
                  considered colorways: Chalk White, Matte Black, and Sage Green.
                </p>
              </Accordion>

              <Accordion title="Shipping" defaultOpen>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Percent className="h-3.5 w-3.5 text-gray-700" />
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">Discount</p>
                      <p className="text-sm font-semibold">Free shipping</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Package className="h-3.5 w-3.5 text-gray-700" />
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">Package</p>
                      <p className="text-sm font-semibold">Recyclable box</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-3.5 w-3.5 text-gray-700" />
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">Delivery Time</p>
                      <p className="text-sm font-semibold">2–3 Working Days</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Truck className="h-3.5 w-3.5 text-gray-700" />
                    </span>
                    <div>
                      <p className="text-xs text-gray-500">Estimated Arrival</p>
                      <p className="text-sm font-semibold">Ships in 24 hrs</p>
                    </div>
                  </div>
                </div>
              </Accordion>
            </div>

            {/* Trust badges — minimal text row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-gray-500">
              <span>Front pocket slim</span>
              <span className="text-gray-300">·</span>
              <span>Ships in 24 hours</span>
              <span className="text-gray-300">·</span>
              <span>Free returns</span>
              <span className="text-gray-300">·</span>
              <span>Built to last</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          RATING & REVIEWS
      ════════════════════════════════════════════ */}
      <section className="px-5 sm:px-8 lg:px-12 py-16 lg:py-20 border-t border-gray-100">
        <h2 className="font-heading text-3xl lg:text-4xl font-bold tracking-tight mb-10 lg:mb-14">
          Rating &amp; Reviews
        </h2>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* LEFT — big number + breakdown */}
          <div className="lg:col-span-5">
            <div className="flex items-end gap-6 mb-2">
              <p className="font-heading text-8xl lg:text-[10rem] font-bold leading-none tracking-[-0.04em]">
                4,9
              </p>
              <div className="pb-3 space-y-1">
                <p className="font-heading text-3xl lg:text-4xl font-light text-gray-400">/5</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-8">(1,284 reviews · {REVIEWS.length} new)</p>

            <div className="space-y-3 max-w-md">
              {RATING_BREAKDOWN.map((r) => (
                <div key={r.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-6">
                    <Star className="h-3.5 w-3.5" style={{ color: GOLD }} fill={GOLD} />
                    <span className="text-xs font-medium">{r.stars}</span>
                  </div>
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-black rounded-full"
                      style={{ width: `${r.pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 w-8 text-right">{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — review card carousel */}
          <div className="lg:col-span-7 relative">
            <div className="border border-gray-200 rounded-2xl p-6 lg:p-8 bg-white">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="font-semibold text-base">{REVIEWS[reviewIdx].name}</p>
                  <div className="mt-2">
                    <StarRow rating={REVIEWS[reviewIdx].rating} size={14} />
                  </div>
                </div>
                <p className="text-xs text-gray-500">{REVIEWS[reviewIdx].date}</p>
              </div>

              <p
                className="text-base text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: '&ldquo;' + REVIEWS[reviewIdx].quote + '&rdquo;' }}
              />

              {/* avatar — sits bottom left of card */}
              <div className="mt-6 flex items-center gap-3">
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700"
                  style={{ backgroundColor: REVIEWS[reviewIdx].avatarColor }}
                >
                  {REVIEWS[reviewIdx].name.split(' ').map((n) => n[0]).join('')}
                </span>
                <p className="text-xs text-gray-500">Verified buyer · The Tuck Wallet</p>
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={handleNextReview}
              className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 bg-white items-center justify-center hover:border-black/40 hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={handlePrevReview}
              className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-gray-200 bg-white items-center justify-center hover:border-black/40 hover:bg-gray-50 transition-colors shadow-sm"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Mobile prev/next */}
            <div className="flex lg:hidden items-center justify-end gap-2 mt-4">
              <button
                onClick={handlePrevReview}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNextReview}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center"
                aria-label="Next review"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* horizontal scroll indicator */}
            <div className="mt-6 h-0.5 bg-gray-100 rounded-full relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-black rounded-full transition-all duration-500"
                style={{
                  width: `${(1 / REVIEWS.length) * 100}%`,
                  transform: `translateX(${reviewIdx * 100}%)`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          YOU MIGHT ALSO LIKE
      ════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 border-t border-gray-100 bg-white">
        <div className="px-5 sm:px-8 lg:px-12">
          <h2 className="font-heading text-4xl lg:text-5xl font-bold tracking-[-0.02em] text-center mb-12 lg:mb-16">
            You might also like
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {UPSELL.map((item) => (
              <Link key={item.name} href="/products" className="group block">
                <div className="relative aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-base leading-tight">{item.name}</h3>
                  <div className="flex items-center gap-2">
                    <StarRow rating={item.rating} size={12} />
                    <span className="text-xs text-gray-500">{item.rating.toFixed(1)}/5</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-semibold">${item.price}</span>
                    {item.compareAt && (
                      <span className="text-sm text-gray-400 line-through">${item.compareAt}</span>
                    )}
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-red-50 text-red-600">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════ */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="px-5 sm:px-8 lg:px-12 py-14 lg:py-16">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">

            {/* Brand */}
            <div className="col-span-2 lg:col-span-1 space-y-5">
              <Link href="/" className="inline-flex items-baseline gap-1">
                <span className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-heading font-bold text-sm -mb-1 mr-1.5">
                  T
                </span>
                <span className="font-heading text-xl font-bold tracking-[-0.04em]">Tuck</span>
                <span className="font-heading text-xl font-bold">.</span>
              </Link>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[220px]">
                Slim wallets built for the front pocket generation. Clean design, nothing
                more than you need.
              </p>
              <div className="flex items-center gap-3 pt-1">
                {SOCIAL_ICONS.map((s) => (
                  <Link
                    key={s.name}
                    href="#"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-black/40 transition-colors"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.src} alt={s.name} className="h-3.5 w-3.5 opacity-80" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-5">Company</h3>
              <ul className="space-y-3">
                {['About', 'Features', 'Works', 'Career'].map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-5">Help</h3>
              <ul className="space-y-3">
                {['Customer Support', 'Delivery Details', 'Terms &amp; Conditions', 'Privacy Policy'].map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-sm text-gray-600 hover:text-black transition-colors"
                      dangerouslySetInnerHTML={{ __html: l }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-5">FAQ</h3>
              <ul className="space-y-3">
                {['Account', 'Manage Deliveries', 'Orders', 'Payments'].map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-5">Resources</h3>
              <ul className="space-y-3">
                {['Free eBooks', 'Carry Guide', 'How To · Blog', 'Lookbook'].map((l) => (
                  <li key={l}>
                    <Link href="#" className="text-sm text-gray-600 hover:text-black transition-colors">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="mt-14 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              Tuck &copy; {new Date().getFullYear()}, All Rights Reserved
            </p>
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/logos/visa.svg" alt="Visa" className="h-6 w-auto" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/logos/mastercard.svg" alt="Mastercard" className="h-6 w-auto" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/logos/paypal.svg" alt="PayPal" className="h-6 w-auto" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/logos/apple-pay.svg" alt="Apple Pay" className="h-6 w-auto" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/logos/google-pay.svg" alt="Google Pay" className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
