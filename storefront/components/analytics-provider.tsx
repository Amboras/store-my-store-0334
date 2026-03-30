'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { hasAnalyticsConsent } from '@/lib/cookie-consent'
import { initAnalytics, trackPageView, destroyAnalytics } from '@/lib/analytics'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    if (hasAnalyticsConsent()) {
      initAnalytics()
    }
    return () => destroyAnalytics()
  }, [])

  useEffect(() => {
    if (hasAnalyticsConsent()) {
      trackPageView(pathname, document.title)
    }
  }, [pathname])

  return <>{children}</>
}
