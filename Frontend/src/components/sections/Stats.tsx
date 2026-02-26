'use client';

import React from 'react';
import { Grid, Row, Col } from 'rsuite';
import { mockData } from '@/data/mockData';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

const Stats = () => {  
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const scaleLine = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  const lStats = [
    { key: 'assets', val: mockData.bigStats[0].value },
    { key: 'nodes', val: mockData.bigStats[1].value },
    { key: 'speed', val: mockData.bigStats[2].value },
    { key: 'uptime', val: mockData.bigStats[3].value },
  ];

  const detailKeys = ['moM', 'distributed', 'industryLeading', 'enterpriseGrade'];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-bg-dark to-bg-card/20 relative overflow-hidden" id="stats">
      {/* Background Decorative Element */}
      <motion.div style={{ scaleX: scaleLine }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <Grid fluid className="p-0!">
          <Row gutter={40}>
            {lStats.map((stat, i) => (
              <Col key={i} xs={12} sm={12} md={6} lg={6} className="mb-8 sm:mb-10 lg:mb-0">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ amount: 0.5 }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                  className="text-center group"
                >
                  <div className="mb-3 sm:mb-4 inline-block w-8 sm:w-10 md:w-12 h-[2px] bg-primary group-hover:w-14 sm:group-hover:w-16 md:group-hover:w-20 transition-all duration-500" />
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-3 sm:mb-4 tracking-tighter">
                    {stat.val}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg font-bold text-primary mb-2 uppercase tracking-wide">
                    {t(`stats.${stat.key}`)}
                  </p>
                  <p className="text-xs sm:text-sm text-text-muted uppercase tracking-[0.2em]">
                    {t(`stats.${detailKeys[i]}`)}
                  </p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Grid>
      </div>
    </section>
  );
};

export default Stats;
