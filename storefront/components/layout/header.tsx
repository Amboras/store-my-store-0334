'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Search, ShoppingBag, User, Menu, X, LogIn, ChevronDown } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { useAuth } from '@/hooks/use-auth'
import CartDrawer from '@/components/cart/cart-drawer'
import { useCollections } from '@/hooks/use-collections'

type DropdownKey = 'shop' | 'collections' | 'pages' | 'features' | null

const PAGES_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping', href: '/shipping' },
]

const FEATURES_LINKS = [
  { label: 'The Tuck Wallet', href: '/the-tuck-wallet' },
  { label: 'New Arrivals', href: '/products' },
  { label: 'Best Sellers', href: '/products' },
]

const SHOP_LINKS = [
  { label: 'All Products', href: '/products' },
  { label: 'The Wallet', href: '/the-tuck-wallet' },
  { label: 'Card Holders', href: '/products' },
  { label: 'Money Clips', href: '/products' },
]

export default function Header() {
  const { itemCount } = useCart()
  const { isLoggedIn } = useAuth()
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null)
  const { data: collections } = useCollections()

  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuCloseRef = useRef<HTMLButtonElement>(null)

  // Focus close button when mobile menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      mobileMenuCloseRef.current?.focus()
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on Escape
  useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  // Focus trap for mobile menu
  const handleMobileMenuKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !mobileMenuRef.current) return
    const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  const collectionsLinks =
    collections && collections.length > 0
      ? collections.slice(0, 6).map((c: { id: string; title: string; handle: string }) => ({
          label: c.title,
          href: `/collections/${c.handle}`,
        }))
      : [{ label: 'View all collections', href: '/collections' }]

  const dropdownMap: Record<Exclude<DropdownKey, null>, { label: string; href: string }[]> = {
    shop: SHOP_LINKS,
    collections: collectionsLinks,
    pages: PAGES_LINKS,
    features: FEATURES_LINKS,
  }

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full bg-[#0f0f0f] text-[#f4f1ea]"
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <div className="px-4 sm:px-8 lg:px-10">
          <div className="relative flex h-16 lg:h-[68px] items-center justify-between gap-4">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 lg:hidden hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* LEFT — Dropdown nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {(['shop', 'collections', 'pages', 'features'] as const).map((key) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(key)}
                >
                  <button
                    className="flex items-center gap-1.5 px-3 py-2 text-[13px] tracking-wide capitalize hover:opacity-70 transition-opacity"
                    aria-expanded={openDropdown === key}
                  >
                    {key}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${
                        openDropdown === key ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openDropdown === key && (
                    <div className="absolute top-full left-0 pt-2 z-50">
                      <div className="min-w-[200px] bg-[#0f0f0f] border border-white/10 py-2 shadow-xl">
                        {dropdownMap[key].map((link) => (
                          <Link
                            key={link.href + link.label}
                            href={link.href}
                            className="block px-4 py-2 text-[13px] text-[#f4f1ea]/80 hover:text-[#f4f1ea] hover:bg-white/5 transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CENTER — Logo */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 flex items-baseline gap-0.5 group"
              prefetch={true}
            >
              <span className="font-heading italic text-2xl lg:text-3xl font-medium tracking-tight text-[#f4f1ea]">
                Tuck
              </span>
              <span className="font-heading italic text-2xl lg:text-3xl font-medium text-[#d4ff4d] tracking-tight">
                .
              </span>
            </Link>

            {/* RIGHT — Search + Icons */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* inline search input on desktop */}
              <div className="hidden lg:flex items-center gap-3 px-4 py-2">
                <span className="text-[13px] text-[#f4f1ea]/55">
                  What are you looking for?
                </span>
              </div>

              <Link
                href="/search"
                className="p-2 hover:opacity-70 transition-opacity"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" />
              </Link>

              <Link
                href={isLoggedIn ? '/account' : '/auth/login'}
                className="p-2 hover:opacity-70 transition-opacity hidden sm:block"
                aria-label={isLoggedIn ? 'Account' : 'Sign in'}
              >
                {isLoggedIn ? (
                  <User className="h-[18px] w-[18px]" />
                ) : (
                  <LogIn className="h-[18px] w-[18px]" />
                )}
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:opacity-70 transition-opacity"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="h-[18px] w-[18px]" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#d4ff4d] text-[10px] font-bold text-[#0f0f0f] px-1">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onKeyDown={handleMobileMenuKeyDown}
            className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-[#0f0f0f] text-[#f4f1ea] animate-slide-in-right"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <span className="font-heading italic text-xl">Menu</span>
              <button
                ref={mobileMenuCloseRef}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:opacity-70"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              <Link
                href="/the-tuck-wallet"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-lg tracking-wide border-b border-white/10"
                prefetch={true}
              >
                The Wallet
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 text-lg tracking-wide border-b border-white/10"
                prefetch={true}
              >
                Shop All
              </Link>
              {collections?.map((collection: { id: string; title: string; handle: string }) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-lg tracking-wide border-b border-white/10"
                  prefetch={true}
                >
                  {collection.title}
                </Link>
              ))}
              {PAGES_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-lg tracking-wide border-b border-white/10"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-1">
                <Link
                  href={isLoggedIn ? '/account' : '/auth/login'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-[#f4f1ea]/70"
                >
                  {isLoggedIn ? 'Account' : 'Sign In'}
                </Link>
                <Link
                  href="/search"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 text-[#f4f1ea]/70"
                >
                  Search
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
