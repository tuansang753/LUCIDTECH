'use client';

import React from 'react';
import { Grid, Row, Col, Divider, Button } from 'rsuite';
import Link from 'next/link';
import { mockData } from '@/data/mockData';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-bg-dark border-t border-white/5 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <Grid fluid className="p-0!">
          <Row gutter={30}>
            <Col xs={24} md={8} className="mb-10 md:mb-0">
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
                    <span className="block font-display font-bold text-xl tracking-tight">
                      <span className="text-[#4FA3D1]">LUCID</span> {" "}
                      <span className="text-[#F7941D] text-lg">Technology</span>
                    </span> 
                    <span className="block text-xs font-bold uppercase tracking-widest text-gray-400">
                      <span className="text-[#8DC63F]">MAKE DIGITAL BETTER</span>
                    </span>
                  </div>
              </div>
              <p className="text-text-muted max-w-xs leading-relaxed">
                {t('footer.description')}
              </p>
            </Col>

            <Col xs={24} sm={12} md={4} className="mb-8 md:mb-0">
              <h4 className="text-sm uppercase tracking-widest text-text-muted mb-6">{t('footer.explore')}</h4>
              <ul className="space-y-4 text-text-muted">
                <li><Link href="/#services" className="hover:text-primary transition-colors">{t('nav.services')}</Link></li>
                <li><Link href="/#portfolio" className="hover:text-primary transition-colors">{t('nav.portfolio')}</Link></li>
                <li><Link href="/#team" className="hover:text-primary transition-colors">{t('nav.team')}</Link></li>
              </ul>
            </Col>

            <Col xs={24} sm={12} md={4} className="mb-8 md:mb-0">
              <h4 className="text-sm uppercase tracking-widest text-text-muted mb-6">{t('footer.resources')}</h4>
              <ul className="space-y-4 text-text-muted">
                <li><Link href="#" className="hover:text-primary transition-colors">{t('footer.documentation')}</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">{t('footer.support')}</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</Link></li>
              </ul>
            </Col>

            <Col xs={24} md={8}>
              <h4 className="text-sm uppercase tracking-widest text-text-muted mb-6">{t('footer.stayUpdated')}</h4>
              <p className="text-text-muted mb-4">{t('footer.newsletter')}</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t('footer.newsletter_placeholder')}
                  className="bg-bg-card border border-white/10 rounded-lg px-4 py-2 flex-grow focus:outline-none focus:border-primary transition-colors"
                />
                <Button appearance="primary" className="rounded-lg px-6 font-bold">{t('footer.newsletter_button')}</Button>
              </div>
            </Col>
          </Row>
        </Grid>

        <Divider className="my-10 bg-white/5!" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-text-muted text-sm">
          <p>© {new Date().getFullYear()} {mockData.company.name}. {t('footer.copyright')}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            <Link href="#" className="hover:text-white transition-colors">LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
