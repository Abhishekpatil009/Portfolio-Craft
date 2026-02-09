'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { NavItem } from './nav-item'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Github', href: 'https://github.com/Abhishekpatil009/', external: true },
  { label: 'Projects', href: '/projects' },
  { label: 'Skill', href: '/#skills' },
  { label: 'Experience', href: '/#experiences' },
  { label: 'Contact', href: '/#contact' },
  {
    label: 'Resume',
    href: '/resume/2025ResumeVNA.pdf',
    external: true
  }
]

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const headerBgColor = 'bg-[#020617]'

  return (
    <motion.header
      initial={{ top: -100 }}
      animate={{ top: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-10 h-24 flex items-center justify-center ${headerBgColor} bg-opacity-95 backdrop-blur-sm`}
    >
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <Image
            width={100}
            height={100}
            src='/images/abhi2.png'
            alt='Logo Abhishek Patil'
            className='object-contain'
          />
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='md:hidden text-gray-400 hover:text-gray-50'
          aria-label='Toggle menu'
        >
          <div className='w-6 h-6 flex flex-col justify-center items-center'>
            <span className={`block w-5 h-0.5 bg-current transition-transform ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`} />
            <span className={`block w-5 h-0.5 bg-current transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block w-5 h-0.5 bg-current transition-transform ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`} />
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className='hidden md:flex items-center gap-4 lg:gap-10'>
          {NAV_ITEMS.map(item => (
            <NavItem key={item.label} {...item} />
          ))}
        </nav>

        {/* Mobile Nav */}
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`absolute top-24 left-0 w-full ${headerBgColor} bg-opacity-95 md:hidden`}
          >
            <div className='container py-4 flex flex-col gap-4'>
              {NAV_ITEMS.map(item => (
                <NavItem
                  key={item.label}
                  {...item}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}
