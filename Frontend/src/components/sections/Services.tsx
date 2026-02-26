'use client';

import React from 'react';
import { Grid, Row, Col, Panel } from 'rsuite';
import { mockData } from '@/data/mockData';
import { Code, Fuel, TrendingUp, Users } from 'lucide-react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

const iconMap: Record<string, any> = {
  blockchain: <Fuel className="w-10 h-10 text-primary" />,
  ai: <TrendingUp className="w-10 h-10 text-primary" />,
  cloud: <Code className="w-10 h-10 text-primary" />,
  design: <Users className="w-10 h-10 text-primary" />,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const Services = () => {
  const { t } = useTranslation();
  const serviceKeys = ['blockchain', 'ai', 'cloud', 'design'];
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yHeader = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="py-24 bg-bg-card/30 overflow-hidden" id="services">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ amount: 0.3, once: false }}
        transition={{ duration: 0.8 }}
        style={{ 
          y: yHeader,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d'
        }}
        className="container mx-auto px-4 sm:px-6 text-center mb-12 sm:mb-16"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6">{t('services.title')} <span className="text-primary">{t('services.highlight')}</span></h2>
        <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl mx-auto">
          {t('services.description')}
        </p>
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6">
        <Grid fluid className="p-0!">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1, once: false }}
          >
            <Row gutter={30}>
              {mockData.services.map((service, i) => (
                <Col key={service.id} xs={24} md={12} lg={6} className="mb-6 sm:mb-8">
                  <motion.div 
                    variants={itemVariants}
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <Panel 
                      className="h-[470px] flex flex-col 
                                bg-bg-card border border-white/5! 
                                transition-all duration-300 
                                hover:-translate-y-2 hover:border-primary/50! 
                                group cursor-default"
                    >
                      {/* Icon */}
                      <div className="mb-6 p-4 inline-block bg-primary/5 rounded-2xl group-hover:bg-primary/10 transition-colors self-start">
                        {iconMap[serviceKeys[i]] || <Code className="w-10 h-10 text-primary" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col">
                        <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 group-hover:text-primary transition-colors ">
                          {t(`services.${serviceKeys[i]}.title`)}
                        </h3>

                        <p className="text-sm sm:text-base text-text-muted mt-auto">
                          {t(`services.${serviceKeys[i]}.description`)}
                        </p>
                      </div>
                    </Panel>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </motion.div>
        </Grid>
      </div>
    </section>
  );
};

export default Services;
