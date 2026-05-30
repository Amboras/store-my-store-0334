'use client'

import { usePathname } from 'next/navigation'

// Routes that render their own page-specific header / footer
// and should NOT show the global storefront chrome.
const STANDALONE_ROUTES = ['/the-tuck-wallet']

export default function ConditionalChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || ''
  const isStandalone = STANDALONE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`)
  )
  if (isStandalone) return null
  return <>{children}</>
}
