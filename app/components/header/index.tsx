'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { NavItem } from './nav-item'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Github', href: 'https://github.com/Abhishekpatil009/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Skill', href: '/#skills' },
  { label: 'Experience', href: '/#experiences' },
  { label: 'Contact', href: '/#contact' }
]

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  // This hex code (#020617) corresponds to Slate-950.
  // It is a very dark navy that usually matches these types of logo exports.
  // If the logo block is still visible, try changing this to #000000 (Black) or #111827 (Gray-900).
  const headerBgColor = 'bg-[#020617]' 

  return (
    <motion.header
      initial={{ top: -100 }}
      animate={{ top: 0 }}
      transition={{ duration: 0.5 }}
      // Apply the matching dark background
      className={`fixed top-0 w-full z-10 h-24 flex items-center justify-center ${headerBgColor} bg-opacity-95 backdrop-blur-sm`}
    >
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <Image
            width={100}
            height={100}
            src='/images/abhi2.png'
            alt='Logo Abhishek Patil'
            // REMOVED: 'invert' and 'mix-blend-screen' are removed because 
            // the logo is already the correct color. 
            // 'object-contain' ensures it doesn't stretch.
            className='object-contain'
          />
        </Link>

        {/* Hamburger Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='md:hidden text-gray-400 hover:text-gray-50 focus:outline-none'
          aria-label='Toggle menu'
        >
          <div className='w-6 h-6 flex flex-col justify-center items-center'>
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
            <span className={`block w-5 h-0.5 bg-current transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-5 h-0.5 bg-current transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-4 lg:gap-10'>
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.label} {...item} />
          ))}
        </nav>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            // Ensure mobile menu matches the header background
            className={`absolute top-24 left-0 w-full ${headerBgColor} bg-opacity-95 md:hidden`}
          >
            <div className='container py-4'>
              <div className='flex flex-col gap-4'>
                {NAV_ITEMS.map((item) => (
                  <NavItem key={item.label} {...item} onClick={() => setIsOpen(false)} />
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  )
}