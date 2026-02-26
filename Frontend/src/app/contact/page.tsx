'use client';

import React, { useState } from 'react';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Grid, Row, Col, Form, Button, Input, Message, useToaster } from 'rsuite';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { mockData } from '@/data/mockData';
import { useTranslation } from 'react-i18next';
import SmoothScroll from '@/components/common/SmoothScroll';
import { useRef } from 'react';
import FooterCopy from '@/components/common/Footer-copy';

const ContactPage = () => {
  const { t } = useTranslation();
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const toaster = useToaster();

  const handleSubmit = async () => {
    if (!formValue.name || !formValue.email || !formValue.message) {
      toaster.push(
        <Message showIcon type="error" closable>
          {t('contact.form.required_error')}
        </Message>,
        { placement: 'topCenter' }
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValue),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormValue({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        toaster.push(
          <Message showIcon type="error" closable>
            {data.error || 'Failed to send email'}
          </Message>,
          { placement: 'topCenter' }
        );
      }
    } catch (error) {
      console.error('Error:', error);
      toaster.push(
        <Message showIcon type="error" closable>
          Failed to send message. Please try again.
        </Message>,
        { placement: 'topCenter' }
      );
    } finally {
      setLoading(false);
    }
  };

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yForm = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <SmoothScroll>
      <div ref={ref} className="flex flex-col min-h-screen bg-bg-dark">
        <Header />
        
        <main className="flex-grow pt-32 pb-24 overflow-hidden">
          <div className="container mx-auto px-6">
            <Row gutter={40}>
              {/* Contact Info */}
              <Col xs={24} lg={10} className="mb-16 lg:mb-0">
                <motion.div
                  style={{ 
                    y: yTitle,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transformStyle: 'preserve-3d'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <h1 className="text-5xl md:text-6xl mb-8 font-display font-bold">
                    {t('contact.title')} <span className="text-primary">{t('contact.highlight')}</span>
                  </h1>
                  <p className="text-xl text-text-muted mb-12 leading-relaxed">
                    {t('contact.subtitle')}
                  </p>

                  <div className="space-y-8">
                    {[
                      { icon: Mail, label: 'contact.info.email', value: mockData.company.email },
                      { icon: Phone, label: 'contact.info.phone', value: mockData.company.phone },
                      { icon: MapPin, label: 'contact.info.visit', value: mockData.company.address }
                    ].map((item, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                        className="flex items-start gap-6"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <item.icon size={24} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-1">{t(item.label)}</h4>
                          <p className="text-text-muted">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* WhatsApp Button */}
                  <motion.a
                    href={`https://wa.me/${mockData.company.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-8 inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#25D366]/30"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Chat on WhatsApp
                  </motion.a>
                </motion.div>
              </Col>

              {/* Contact Form */}
              <Col xs={24} lg={14}>
                <motion.div
                  style={{ y: yForm }}
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="bg-bg-card/50 border border-white/5 rounded-3xl p-8 md:p-12 relative overflow-hidden"
                >
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <h3 className="text-2xl font-bold mb-8">{t('contact.form.title')}</h3>
                      <Form 
                        fluid 
                        formValue={formValue} 
                        onChange={(formValue) => setFormValue(formValue as any)}
                        className="space-y-6"
                      >
                        <Row gutter={20} className="w-full">
                          <Col xs={24} md={12} className="mb-6 md:mb-0!">
                            <Form.Group>
                              <Form.ControlLabel className="text-text-muted font-bold mb-2 block uppercase text-xs tracking-widest">{t('contact.form.name')}</Form.ControlLabel>
                              <Input 
                                name="name" 
                                value={formValue.name}
                                onChange={(value) => setFormValue({ ...formValue, name: value })}
                                placeholder={t('contact.form.namePlaceholder')}
                                className="bg-white/5! border-white/10! rounded-xl! py-3! px-4! w-full!"
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Group>
                              <Form.ControlLabel className="text-text-muted font-bold mb-2 block uppercase text-xs tracking-widest">{t('contact.form.email')}</Form.ControlLabel>
                              <Input 
                                name="email" 
                                type="email"
                                value={formValue.email}
                                onChange={(value) => setFormValue({ ...formValue, email: value })}
                                placeholder={t('contact.form.emailPlaceholder')}
                                className="bg-white/5! border-white/10! rounded-xl! py-3! px-4! w-full!"
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row gutter={20} className="w-full">
                          <Col xs={24} md={12} className="mb-6 md:mb-0!">
                             <Form.Group>
                              <Form.ControlLabel className="text-text-muted font-bold mb-2 block uppercase text-xs tracking-widest">{t('contact.form.phone')}</Form.ControlLabel>
                              <Input 
                                name="phone" 
                                type="text"
                                value={formValue.phone}
                                onChange={(value) => setFormValue({ ...formValue, phone: value })}
                                placeholder={t('contact.form.phonePlaceholder')}
                                className="bg-white/5! border-white/10! rounded-xl! py-3! px-4! w-full!"
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Group>
                              <Form.ControlLabel className="text-text-muted font-bold mb-2 block uppercase text-xs tracking-widest">{t('contact.form.subject')}</Form.ControlLabel>
                              <Input 
                                name="subject" 
                                value={formValue.subject}
                                onChange={(value) => setFormValue({ ...formValue, subject: value })}
                                placeholder={t('contact.form.subjectPlaceholder')}
                                className="bg-white/5! border-white/10! rounded-xl! py-3! px-4! w-full!"
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Form.Group>
                          <Form.ControlLabel className="text-text-muted font-bold mb-2 block uppercase text-xs tracking-widest">{t('contact.form.message')}</Form.ControlLabel>
                          <Input 
                            name="message" 
                            as="textarea" 
                            rows={5} 
                            value={formValue.message}
                            onChange={(value) => setFormValue({ ...formValue, message: value })}
                            placeholder={t('contact.form.messagePlaceholder')}
                            className="bg-white/5! border-white/10! rounded-xl! py-3! px-4!"
                          />
                        </Form.Group>

                        <Button 
                          appearance="primary" 
                          block 
                          size="lg" 
                          onClick={handleSubmit}
                          loading={loading}
                          className="rounded-xl font-bold flex items-center justify-center gap-2 py-4!"
                        >
                          <Send size={18} />
                          {t('contact.form.submit')}
                        </Button>
                      </Form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-20 text-center"
                    >
                      <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle size={48} />
                      </div>
                      <h2 className="text-3xl font-bold mb-4">{t('contact.success.title')}</h2>
                      <p className="text-text-muted text-lg mb-8 max-w-sm mx-auto">
                        {t('contact.success.message')}
                      </p>
                      <Button 
                        appearance="ghost" 
                        onClick={() => setSubmitted(false)}
                        className="rounded-xl font-bold border-primary! text-primary!"
                      >
                        {t('contact.success.another')}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Col>
          </Row>
        </div>
        </main>

        <FooterCopy />
      </div>
    </SmoothScroll>
  );
};

export default ContactPage;
