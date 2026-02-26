'use client';

import '@/i18n';
import React from 'react';
import { CustomProvider } from 'rsuite';
import { Inter, Outfit, Orbitron } from 'next/font/google';
import './globals.css';
import 'rsuite/dist/rsuite.min.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

import Preloader from '@/components/common/Preloader';
import CustomCursor from '@/components/common/CustomCursor';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${orbitron.variable}`} suppressHydrationWarning={true}>
      <body className="antialiased font-sans">
        <CustomProvider theme="dark">
          <CustomCursor />
          <Preloader />
          {children}
        </CustomProvider>
      </body>
    </html>
  );
}
