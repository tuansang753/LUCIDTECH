'use client';

import React from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { mockData } from '@/data/mockData';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Grid, Row, Col, Button, Divider } from 'rsuite';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Target, Lightbulb } from 'lucide-react';
import SmoothScroll from '@/components/common/SmoothScroll';
import { useRef } from 'react';

import { useTranslation } from 'react-i18next';

const CaseStudyPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const router = useRouter();
  
  const project = mockData.portfolio.find(p => p.id === Number(id));

  if (!project) {
    return (
      <div className="flex flex-col min-h-screen bg-bg-dark items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-display font-bold mb-4">{t('portfolio.detail.notFound.title')}</h1>
        <p className="text-text-muted mb-8">{t('portfolio.detail.notFound.description')}</p>
        <Link href="/portfolio">
            <Button appearance="primary" size="lg" className="rounded-full font-bold">{t('portfolio.detail.notFound.backButton')}</Button>
        </Link>
      </div>
    );
  }

  const resultsList = t('portfolio.detail.results.list', { returnObjects: true }) as string[];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yHero = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <SmoothScroll>
      <div ref={ref} className="flex flex-col min-h-screen bg-bg-dark">
        <Header />
        
        <main className="flex-grow pt-32 pb-24 overflow-hidden">
          {/* Navigation & Header */}
          <div className="container mx-auto px-6 mb-12">
            <button 
              onClick={() => router.back()} 
              className="flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
              <span className="font-bold">{t('portfolio.detail.back')}</span>
            </button>

            <motion.div
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <span className="text-primary text-sm uppercase font-bold tracking-[0.3em] mb-4 block">{project.category} {t('portfolio.detail.caseStudy')}</span>
              <h1 className="text-5xl md:text-8xl mb-12 text-white">{project.title}</h1>
            </motion.div>
          </div>

          {/* Hero Image */}
          <div className="w-full h-[80vh] relative mb-16 px-6">
            <motion.div
              style={{ 
                y: yHero, 
                scale: scaleHero,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
              className="w-full h-full"
            >
              <motion.img 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: "circOut" }}
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover rounded-3xl shadow-2xl border border-white/5"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-dark rounded-3xl mx-6" />
            </motion.div>
          </div>

        {/* Content Section */}
        <div className="container mx-auto px-6">
          <Grid fluid className="p-0!">
            <Row gutter={60}>
              <Col xs={24} lg={16}>
                <div className="mb-20">
                  <h2 className="text-3xl font-display font-bold mb-6 flex items-center gap-4 text-white">
                    <Target className="text-primary" /> {t('portfolio.detail.challenge.title')}
                  </h2>
                  <p className="text-xl text-text-muted leading-relaxed">
                    {t('portfolio.detail.challenge.description', { title: project.title })}
                  </p>
                </div>

                <div className="mb-20">
                  <h2 className="text-3xl font-display font-bold mb-6 flex items-center gap-4 text-white">
                    <Lightbulb className="text-primary" /> {t('portfolio.detail.solution.title')}
                  </h2>
                  <p className="text-xl text-text-muted leading-relaxed">
                    {t('portfolio.detail.solution.description')}
                  </p>
                </div>

                <div>
                  <h2 className="text-3xl font-display font-bold mb-6 flex items-center gap-4 text-white">
                    <CheckCircle2 className="text-primary" /> {t('portfolio.detail.results.title')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resultsList.map((result, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/5">
                        <CheckCircle2 className="text-primary" size={20} />
                        <span className="text-white font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>

              <Col xs={24} lg={8}>
                <div className="bg-bg-card border border-white/5 p-8 rounded-3xl sticky top-32">
                  <h4 className="text-sm uppercase tracking-widest text-text-muted mb-6">{t('portfolio.detail.technologies')}</h4>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {["Next.js", "Three.js", "Tailwind", "Framer Motion", "WebGL"].map(tech => (
                      <span key={tech} className="px-4 py-1.5 bg-white/5 rounded-full text-sm text-white border border-white/10">{tech}</span>
                    ))}
                  </div>

                  <Divider className="bg-white/5! mb-8" />
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-text-muted mb-2">{t('portfolio.detail.duration')}</h4>
                      <p className="text-white font-bold">{t('portfolio.detail.durationValue')}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-text-muted mb-2">{t('portfolio.detail.service')}</h4>
                      <p className="text-white font-bold">{project.category}</p>
                    </div>
                  </div>

                  <Link href="/#contact">
                    <Button appearance="primary" block size="lg" className="rounded-xl font-bold mt-10">{t('portfolio.detail.startProject')}</Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        </main>
      
        <Footer />
      </div>
    </SmoothScroll>
  );
};

export default CaseStudyPage;
