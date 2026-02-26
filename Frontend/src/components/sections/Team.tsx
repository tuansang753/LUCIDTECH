'use client';

import React from 'react';
import { Grid, Row, Col, Panel } from 'rsuite';
import { mockData } from '@/data/mockData';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useRef } from 'react';

const Team = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yCards = useTransform(scrollYProgress, [0, 1], [30, -30]);
  
  // Categorize members
  const technicalLeaders = [
    { ...mockData.team[1], role: t('team.roles.technicalLeader'), key: "Henry", name: t('team.members.henry') }
  ];
  
  const leaders = [
    { ...mockData.team[0], role: t('team.roles.leader'), key: "Steven", name: t('team.members.steven') }
  ];
  
  const devs = [
    { ...mockData.team[2], role: t('team.roles.developer'), key: "JohnB", name: t('team.members.johnb') },
    { ...mockData.team[1], role: t('team.roles.developer'), key: "Rinyal", name: t('team.members.rinyal') },
    { ...mockData.team[0], role: t('team.roles.devops'), key: "Dora Ho", name: t('team.members.dora') },
    { ...mockData.team[2], role: t('team.roles.tester'), key: "Emily", name: t('team.members.emily') },
    { ...mockData.team[2], role: t('team.roles.devops'), key: "Jayden Ngo", name: t('team.members.jayden') },
    { ...mockData.team[2], role: t('team.roles.developer'), key: "Mat", name: t('team.members.mat') },
  ];

  const renderMemberCard = (member: any, index: number) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ amount: 0.1, once: false }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      style={{ 
        y: yCards,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d',
        willChange: 'opacity, transform'
      }}
      className="h-full"
    >
      <div className="group relative aspect-square bg-bg-card border border-white/10 hover:border-primary/50 transition-colors duration-300">
        {/* Corner Borders (Decoration) */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/30 group-hover:border-primary transition-colors" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/30 group-hover:border-primary transition-colors" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/30 group-hover:border-primary transition-colors" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/30 group-hover:border-primary transition-colors" />

        <div className="h-full w-full p-4 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Image */}
          <div className="w-24 h-24 mb-4 relative rounded-full overflow-hidden border-2 border-white/5 group-hover:border-primary/50 transition-all duration-500 group-hover:scale-110">
            <img 
              src={member.avatar} 
              alt={member.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Info */}
          <div className="text-center z-10">
            <h3 className="text-lg font-display font-bold text-white mb-1 group-hover:text-primary transition-colors">
              {member.name}
            </h3>
            <p className="text-xs uppercase tracking-widest text-text-muted group-hover:text-white transition-colors">
              {member.role}
            </p>
          </div>

          {/* Hover Overlay Background */}
          <div className="absolute inset-0 bg-bg-dark/90 opacity-0 group-hover:opacity-10 translate-y-4 group-hover:translate-y-0 transition-all duration-300 -z-0" />
          
          {/* Social Icons (Appear on Hover) */}
          <div className="absolute bottom-4 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
               <span className="text-[10px] font-bold">TW</span>
             </div>
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer">
               <span className="text-[10px] font-bold">LI</span>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section ref={ref} className="py-24 bg-bg-dark overflow-hidden" id="team">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 font-display font-bold">
            {t('team.title')} <span className="text-primary">{t('team.highlight')}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            {t('team.subtitle')}
          </p>
        </div>

        {/* Technical Leaders */}
        <div className="mb-16">
          <div className="flex justify-center mb-8">
             <span className="px-4 py-1 rounded-full border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest bg-primary/5">
               {t('team.sections.technical')}
             </span>
          </div>
          <div className="flex justify-center flex-wrap gap-8 max-w-4xl mx-auto">
             {technicalLeaders.map((member, i) => (
                <div key={i} className="w-full sm:w-64">
                   {renderMemberCard(member, i)}
                </div>
             ))}
          </div>
        </div>

        {/* Leaders */}
        <div className="mb-16">
          <div className="flex justify-center mb-8">
             <span className="px-4 py-1 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-widest bg-white/5">
               {t('team.sections.leadership')}
             </span>
          </div>
           <div className="flex justify-center flex-wrap gap-8 max-w-4xl mx-auto">
             {leaders.map((member, i) => (
                <div key={i} className="w-full sm:w-64">
                   {renderMemberCard(member, i)}
                </div>
             ))}
          </div>
        </div>

        {/* Devs */}
        <div>
          <div className="flex justify-center mb-8">
             <span className="px-4 py-1 rounded-full border border-white/20 text-text-muted text-xs font-bold uppercase tracking-widest bg-white/5">
               {t('team.sections.development')}
             </span>
          </div>
          <div className="flex justify-center flex-wrap gap-6 max-w-7xl mx-auto">
             {devs.map((member, i) => (
                <div key={i} className="w-full sm:w-48 md:w-56 lg:w-64"> 
                   {renderMemberCard(member, i)}
                </div>
             ))}
          </div>
        </div>

      </div>
    </section>

  );
};

export default Team;
