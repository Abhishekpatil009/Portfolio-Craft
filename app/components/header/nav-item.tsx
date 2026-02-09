'use client'

import { cn } from '@/app/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type NavItemProps = {
  label: string
  href: string
  external?: boolean
  onClick?: () => void
}

export const NavItem = ({ label, href, external, onClick }: NavItemProps) => {
  const pathname = usePathname()

  // Active state only for internal links
  const isActive = !external && pathname === href

  // 🔹 External link (Resume, GitHub)
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={cn(
          'text-gray-400 flex items-center gap-2 font-medium font-mono hover:text-gray-50 transition'
        )}
      >
        <span className="text-emerald-400">#</span>
        {label}
      </a>
    )
  }

  // 🔹 Internal link
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'text-gray-400 flex items-center gap-2 font-medium font-mono hover:text-gray-50 transition',
        isActive && 'text-gray-50'
      )}
    >
      <span className="text-emerald-400">#</span>
      {label}
    </Link>
  )
}
