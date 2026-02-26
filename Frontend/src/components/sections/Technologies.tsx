'use client';

import React from 'react';
import { Grid, Row, Col, Tag, TagGroup } from 'rsuite';
import { mockData } from '@/data/mockData';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

const Technologies = () => {
  const { t } = useTranslation();
  const categories = Array.from(new Set(mockData.technologies.map(t => t.category)));
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yCards = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} className="py-24 bg-bg-dark overflow-hidden" id="technologies">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ amount: 0.3, once: false }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">
            {t('technologies.title')} <span className="text-primary">{t('technologies.highlight')}</span> {t('technologies.stack')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl leading-relaxed">
            {t('technologies.subtitle')}
          </p>
        </motion.div>

        <Grid fluid className="p-0!">
          <Row gutter={40}>
            {categories.map((category, i) => (
              <Col key={category} xs={24} md={12} lg={8} className="mb-8 sm:mb-10 md:mb-12">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ amount: 0.2, once: false }}
                  transition={{ delay: 0.1, duration: 0.6 }} // Unified delay
                  style={{ 
                    y: yCards,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d',
                    willChange: 'opacity, transform'
                  }}
                  className="bg-bg-card/50 border border-white/5 rounded-2xl p-8 h-full transition-colors hover:border-primary/20"
                >
                  <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-primary mb-4 sm:mb-6 uppercase tracking-widest text-xs sm:text-sm">{t(`technologies.categories.${category}`)}</h3>
                  <TagGroup className="flex flex-wrap gap-3">
                    {mockData.technologies
                      .filter(t => t.category === category)
                      .map((tech, i) => (
                        <Tag 
                          key={i} 
                          size="lg" 
                          className="bg-white/5! text-white! border border-white/10! px-4 py-2 rounded-lg font-medium"
                        >
                          {tech.name}
                        </Tag>
                      ))}
                  </TagGroup>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Grid>

        {/* Marquee-like tech logos */}
        <div className="mt-12 py-10 border-t border-white/5 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-dark to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-dark to-transparent z-10" />
          
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex items-center gap-16 whitespace-nowrap opacity-30 grayscale"
          >
            {[
              'REACT', 'NODE.JS', 'TYPESCRIPT', 'AZURE', 'DOCKER', 'KUBERNETES', 
              '.NET', 'GOLANG', 'NEXT.JS', 'PYTHON', 'PYTORCH',
              'REACT', 'NODE.JS', 'TYPESCRIPT', 'AZURE', 'DOCKER', 'KUBERNETES', 
              '.NET', 'GOLANG', 'NEXT.JS', 'PYTHON', 'PYTORCH',
            ].map((logo, idx) => (
              <span key={`${logo}-${idx}`} className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-display tracking-tighter hover:opacity-100 transition-opacity cursor-default">
                {logo}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
