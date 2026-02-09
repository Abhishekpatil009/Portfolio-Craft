'use client'

import { cn } from '@/app/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiDownload } from 'react-icons/hi'

type NavItemProps = {
  label: string
  href: string
  external?: boolean
  download?: boolean
  onClick?: () => void
}

export const NavItem = ({
  label,
  href,
  external,
  download,
  onClick
}: NavItemProps) => {
  const pathname = usePathname()
  const isActive = !external && pathname === href

  // 🔹 External links (Resume / GitHub)
  if (external) {
    return (
      <div className="flex items-center gap-2">
        {/* Preview link */}
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClick}
          className="text-gray-400 hover:text-gray-50 transition flex items-center gap-2 font-medium font-mono"
        >
          <span className="text-emerald-400">#</span>
          {label}
        </a>

        {/* Download icon */}
        {download && (
          <a
            href={href}
            download
            className="text-gray-400 hover:text-emerald-400 transition"
            title="Download Resume"
            onClick={onClick}
          >
            <HiDownload size={16} />
          </a>
        )}
      </div>
    )
  }

  // 🔹 Internal links
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'text-gray-400 hover:text-gray-50 transition flex items-center gap-2 font-medium font-mono',
        isActive && 'text-gray-50'
      )}
    >
      <span className="text-emerald-400">#</span>
      {label}
    </Link>
  )
}
