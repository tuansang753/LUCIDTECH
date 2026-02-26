'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { mockData } from '@/data/mockData';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Grid, Row, Col, Button } from 'rsuite';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import SmoothScroll from '@/components/common/SmoothScroll';
import { useRef } from 'react';

import { useTranslation } from 'react-i18next';

const PortfolioPage = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('All');
  
  const projectKeyMap: Record<number, string> = {
    1: 'nebula',
    2: 'vortex',
    3: 'titan'
  };

  const categories = ['All', ...Array.from(new Set(mockData.portfolio.map(p => p.category)))];
  
  const filteredProjects = filter === 'All' 
    ? mockData.portfolio 
    : mockData.portfolio.filter(p => p.category === filter);


  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yHeader = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <SmoothScroll>
      <div ref={ref} className="flex flex-col min-h-screen bg-bg-dark">
        <Header />
        
        <main className="flex-grow pt-32 pb-24 overflow-hidden">
          {/* Header Section */}
          <div className="container mx-auto px-6 mb-16 text-center">
            <motion.div
              style={{ 
                y: yHeader,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl mb-6">{t('portfolio.page.title')} <span className="text-primary">{t('portfolio.page.highlight')}</span></h1>
              <p className="text-xl text-text-muted max-w-2xl mx-auto">
                {t('portfolio.page.subtitle')}
              </p>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="container mx-auto px-6 mb-12 flex flex-wrap justify-center gap-4">
            {categories.map((cat, i) => (
              <motion.button
                key={cat}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-bold transition-all ${
                  filter === cat 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' 
                    : 'bg-white/5 text-text-muted hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat === 'All' ? t('portfolio.page.filterAll') : cat}
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="container mx-auto px-6">
            <Grid fluid className="p-0!">
              <Row gutter={40}>
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, i) => (
                    <Col key={project.id} xs={24} md={12} lg={8} className="mb-12">
                      <motion.div
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transformStyle: 'preserve-3d',
                          willChange: 'opacity, transform'
                        }}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                        transition={{ duration: 0.5, ease: "easeOut" }} // Removed stagger delay on scroll settles
                        className="group cursor-pointer"
                      >
                        <Link href={`/portfolio/${project.id}`} className="block">
                          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-bg-card border border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/20">
                            <img 
                              src={project.image} 
                              alt={t(`portfolio.${projectKeyMap[project.id]}.title`)}
                              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                            />
                            
                            {/* Modern Overlay */}
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <ArrowUpRight className="text-white w-8 h-8" />
                              </div>
                            </div>
                          </div>
                        </Link>

                        <div className="px-2">
                          <div className="flex items-center justify-between mb-3">
                             <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs uppercase font-bold tracking-wider">{project.category}</span>
                          </div>
                          <Link href={`/portfolio/${project.id}`}>
                            <h3 className="text-2xl font-display font-medium mb-3 text-white group-hover:text-primary transition-colors flex items-center gap-2">
                              {t(`portfolio.${projectKeyMap[project.id]}.title`)}
                              <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                            </h3>
                          </Link>
                          <p className="text-text-muted leading-relaxed line-clamp-2">
                            {t(`portfolio.${projectKeyMap[project.id]}.description`)}
                          </p>
                        </div>
                      </motion.div>
                    </Col>
                  ))}
                </AnimatePresence>
              </Row>
            </Grid>
          </div>
        </main>
        
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default PortfolioPage;
