'use client';

import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import { mockData } from '@/data/mockData';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const OurTeam = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, 50]); 
  const yContent = useTransform(scrollYProgress, [0, 1], [25, -25]);

  return (
    <section ref={ref} className="py-24 bg-bg-dark overflow-hidden" id="about">
      <div className="container mx-auto px-4 sm:px-6">
          <Grid fluid className="p-0!">
            <Row gutter={40} className="items-center">
              {/* Text Section (Wider) */}
              <Col xs={24} lg={14} className="mb-10 lg:mb-0">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="lg:pr-12"
                >
                   {/* Decorative Line */}
                   <div className="w-20 h-1 bg-primary mb-6 md:mb-8 rounded-full"></div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight font-display">
                    {t('ourTeam.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t('ourTeam.highlight')}</span>
                  </h2>
                  <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-6">
                    {t('ourTeam.description')}
                  </p>
                </motion.div>
              </Col>

              {/* Image Section (Smaller & Styled) */}
              <Col xs={24} lg={10}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                  className="relative mx-auto max-w-[500px] lg:max-w-none"
                >
                  {/* Backdrop Decoration */}
                  <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent rounded-[2rem] blur-xl opacity-50"></div>
                  
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/3] group">
                    <motion.div 
                      style={{ 
                        y: yContent, 
                        scale: 1.1 
                      }} 
                      className="absolute inset-0 w-full h-full"
                    >
                       <img 
                         src={mockData.company.images.team} 
                         alt="Lucid Technology Team" 
                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                       />
                       <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                    </motion.div>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </Grid>
      </div>
    </section>
  );
};

export default OurTeam;
