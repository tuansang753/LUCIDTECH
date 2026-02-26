'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { mockData } from '@/data/mockData';
import { usePathname } from 'next/navigation';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-dark"
        >
          <div className="relative flex flex-col items-center">
            {/* Animated Logo "L" */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                rotate: 0,
                transition: { 
                  duration: 0.8, 
                  ease: "easeOut" 
                }
              }}
              className="w-55 h-55 flex items-center justify-center mb-8"
            >
              <img 
                src="/images/logo-05-none-text-removebg-preview.png" 
                alt="Logo" 
                className="w-full h-full object-contain p-2 filter 
           drop-shadow-[0_0_14px_rgba(255,255,255,0.7)]"
              />
            </motion.div> 

            {/* Vertical Brand Text */}
            <div className="flex flex-col items-center gap-1 text-center">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ 
                    y: 0,
                    transition: { 
                      duration: 0.6, 
                      delay: 0.5,
                      ease: [0.33, 1, 0.68, 1]
                    }
                  }}
                  className="block font-['Orbitron',sans-serif] font-bold text-8xl tracking-tight text-[#4FA3D1]"
                >
                  LUCID
                </motion.span>
              </div>

              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ 
                    y: 0,
                    transition: { 
                      duration: 0.6, 
                      delay: 0.7,
                      ease: [0.33, 1, 0.68, 1]
                    }
                  }}
                  className="block font-['Orbitron',sans-serif] font-bold text-4xl text-[#F7941D]"
                >
                  TECHNOLOGY
                </motion.span>
              </div>

              <div className="overflow-hidden mt-2">
                <motion.span
                  initial={{ opacity: 0, letterSpacing: "0.5em" }}
                  animate={{ 
                    opacity: 1,
                    letterSpacing: "0.15em",
                    transition: { 
                      duration: 0.8, 
                      delay: 1.0,
                      ease: "easeOut"
                    }
                  }}
                  className="block text-xl font-['Orbitron',sans-serif] font-bold uppercase text-[#8DC63F]"
                >
                  MAKE DIGITAL BETTER
                </motion.span>
              </div>
            </div>

            {/* Decorative Line Underneath */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ 
                width: "100%", 
                opacity: 1,
                transition: { 
                  duration: 1, 
                  delay: 1.2,
                  ease: "easeInOut"
                }
              }}
              className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-4"
            />
          </div>
          
          {/* Background Pulse Effect */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1.2, 
              opacity: 0.15,
              transition: { 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }
            }}
            className="absolute w-[500px] h-[500px] bg-primary rounded-full blur-[120px] -z-10"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
