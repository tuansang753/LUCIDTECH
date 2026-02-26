'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'vn', label: 'Tiếng Việt', flag: 'https://flagcdn.com/w40/vn.png' },
    { code: 'zh', label: '中文', flag: 'https://flagcdn.com/w40/cn.png' },
  ];

  const currentLang = languages.find(l => l.code === (i18n.language?.split('-')[0] || 'en')) || languages[0];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
      >
        <img src={currentLang.flag} alt={currentLang.label} className="w-5 h-3.5 object-cover rounded-[2px]" />
        <span className="hidden sm:inline uppercase">{currentLang.code}</span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-40 bg-bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 z-50 shadow-2xl"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-xl transition-all text-sm ${
                    i18n.language?.startsWith(lang.code)
                      ? 'bg-primary/20 text-primary font-bold' 
                      : 'hover:bg-white/5 text-text-muted hover:text-white'
                  }`}
                >
                  <img src={lang.flag} alt={lang.label} className="w-5 h-3.5 object-cover rounded-[2px]" />
                  <span>{lang.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
