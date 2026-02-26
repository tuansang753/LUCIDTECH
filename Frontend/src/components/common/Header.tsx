'use client';

import React, { useState } from 'react';
import { Nav, Navbar, Drawer } from 'rsuite';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { mockData } from '@/data/mockData';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const { t } = useTranslation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150 && !mobileOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setScrolled(latest > 50);
  });

  const menuItems = [
    { label: t('nav.services'), href: '/#services' },
    { label: t('nav.portfolio'), href: '/#portfolio' },
    { label: t('nav.team'), href: '/#team' },
    { label: t('nav.about'), href: '/#about' },
    { label: t('nav.impact'), href: '/#stats' },
  ];

  return (
    <>
      <motion.header 
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled || mobileOpen ? 'bg-bg-dark/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-6 py-2">
          <Navbar appearance="subtle" className="bg-transparent! flex items-center">
            <div className="flex-1">
              <Navbar.Brand as={Link} href="/" className="p-0!">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 2.2 }}
                  className="flex items-center gap-3"
                >
                  {/* Logo */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 flex items-center justify-center"
                  >
                    <img 
                      src="/images/logo-05-none-text-removebg-preview.png" 
                      alt="Logo" 
                      className="w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(255,255,255,0.7)]"
                    />
                  </motion.div>

                  {/* Brand Text */}
                  <div className="leading-none hidden sm:block">
                    {/* Brand Name */}
                    <div className="font-['Orbitron',sans-serif] font-bold text-2xl tracking-tighter">
                      <span className="text-[#4FA3D1] ">LUCID</span>
                      <span className="text-[#F7941D]"> TECHNOLOGY</span>
                    </div>
                    {/* Tagline */}
                    <div className="font-['Orbitron',sans-serif] font-bold text-xs uppercase tracking-[0.2em] text-[#8DC63F] mt-0.5">
                      MAKE DIGITAL BETTER
                    </div>
                  </div>

                </motion.div>
              </Navbar.Brand>

            </div>
            
            <div className="hidden md:flex justify-center flex-2">
              <Nav className="flex items-center">
                <Nav.Item as={Link} href="/#services">{t('nav.services')}</Nav.Item>
                <Nav.Item as={Link} href="/#portfolio">{t('nav.portfolio')}</Nav.Item>
                <Nav.Item as={Link} href="/#team">{t('nav.team')}</Nav.Item>
                <Nav.Menu title={t('nav.company')}>
                  <Nav.Item as={Link} href="/#about">{t('nav.about')}</Nav.Item>
                  <Nav.Item as={Link} href="/#stats">{t('nav.impact')}</Nav.Item>
                </Nav.Menu>
              </Nav>
            </div>
            
            <div className="flex-1 flex justify-end items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                <LanguageSwitcher />
                <Link href="/contact" className="rs-btn rs-btn-primary rs-btn-md font-bold px-6 rounded-full transition-transform active:scale-95">
                  {t('nav.contact')}
                </Link>
              </div>
              <button 
                className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </Navbar>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <Drawer 
        placement="right" 
        open={mobileOpen} 
        onClose={() => setMobileOpen(false)} 
        className="bg-bg-dark! text-white! md:hidden"
        size="full"
      >
        <Drawer.Header className="border-b border-white/5! p-6!">
          <Drawer.Title className="text-white! font-display font-bold">{t('nav.menu')}</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body className="p-6! bg-bg-dark">
          <div className="flex flex-col gap-6 mt-8">
            <div className="flex justify-between items-center mb-4">
               <span className="text-text-muted text-sm font-bold uppercase tracking-widest">Select Language</span>
               <LanguageSwitcher />
            </div>
            {menuItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                className="text-2xl font-display font-medium text-text-muted hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8 pt-8 border-t border-white/5">
              <Link 
                href="/contact" 
                className="rs-btn rs-btn-primary rs-btn-lg w-full font-bold rounded-xl"
                onClick={() => setMobileOpen(false)}
              >
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
    </>
  );
};

export default Header;
