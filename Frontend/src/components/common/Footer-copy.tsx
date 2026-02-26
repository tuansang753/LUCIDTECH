'use client';

import React, { useState } from 'react';
import { Grid, Row, Col, Divider, Button } from 'rsuite';
import Link from 'next/link';
import { mockData } from '@/data/mockData';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Twitter, Github, MessageCircle, Linkedin, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import ContactModal from './ContactModal';

const FooterCopy = () => {  
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="relative z-10 bg-bg-dark border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-10 md:gap-0">
          {/* Left: Logo and Description */}
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-6">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 flex items-center justify-center "
              >
                <img
                  src="/images/logo-05-none-text-removebg-preview.png"
                  alt="Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_14px_rgba(255,255,255,0.7)]"
                />
              </motion.div>
              <div className="leading-tight hidden sm:block">
                <span className="block font-['Orbitron',sans-serif]  font-bold text-xl tracking-tight">
                  <span className="text-[#4FA3D1]">LUCID</span> {" "}
                  <span className="text-[#F7941D]">TECHNOLOGY</span>
                </span> 
                <span className="block text-xs font-['Orbitron',sans-serif] font-bold uppercase tracking-widest text-gray-400">
                  <span className="text-[#8DC63F]">MAKE DIGITAL BETTER</span>
                </span>
              </div>
            </div>
            <p className="text-text-muted max-w-xs leading-relaxed">
              {t('footer.description')}
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex gap-6 items-center flex-wrap md:justify-end">
            <Link href="https://www.linkedin.com/company/lucidtechvn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Linkedin size={35} /></Link>
            <Link href="https://github.com/lucidtechnology" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><Github size={35} /></Link>
            <Link href="#" className="hover:text-white transition-colors"><FaWhatsapp size={35} /></Link>
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsModalOpen(true)}
              className="text-[#4FA3D5] hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Mail size={35} />
            </motion.div>
          </div>
        </div>

        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <Divider className="my-10 bg-white/5!" />

        <div className="flex items-center justify-center text-text-muted text-sm">
          <p className="text-center">
            © {new Date().getFullYear()} {mockData.company.name}. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterCopy;
