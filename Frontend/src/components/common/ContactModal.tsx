'use client';

import React, { useState } from 'react';
import { Modal, Form, Button, Input, Message, useToaster, Row, Col } from 'rsuite';
import { Send, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
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

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} size="md" backdrop="static" className="z-[9999]">
      <Modal.Header>
        <Modal.Title className="text-2xl font-bold font-display">
          {!submitted ? t('contact.form.title') : t('contact.success.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-6">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Form 
                fluid 
                formValue={formValue} 
                onChange={(formValue) => setFormValue(formValue as any)}
                className="space-y-4"
              >
                <Row gutter={20} className="w-full!">
                  <Col xs={24} md={12}>
                    <Form.Group>
                      <Form.ControlLabel className="text-text-muted font-bold mb-2 block uppercase text-xs tracking-widest">{t('contact.form.name')}</Form.ControlLabel>
                      <Input 
                        name="name" 
                        value={formValue.name}
                        onChange={(value) => setFormValue({ ...formValue, name: value })}
                        placeholder={t('contact.form.namePlaceholder')}
                        className="!bg-white/5 !border-white/10 !rounded-xl !py-3 !px-4 !w-full"
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
                        className="!bg-white/5 !border-white/10 !rounded-xl !py-3 !px-4 !w-full"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row gutter={20} className="w-full!">
                  <Col xs={24} md={12}>
                    <Form.Group>
                      <Form.ControlLabel className="text-text-muted font-bold mb-2 block uppercase text-xs tracking-widest">{t('contact.form.phone')}</Form.ControlLabel>
                      <Input 
                        name="phone" 
                        value={formValue.phone}
                        onChange={(value) => setFormValue({ ...formValue, phone: value })}
                        placeholder={t('contact.form.phonePlaceholder')}
                        className="!bg-white/5 !border-white/10 !rounded-xl !py-3 !px-4 !w-full"
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
                        className="!bg-white/5 !border-white/10 !rounded-xl !py-3 !px-4 !w-full"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.ControlLabel className="text-text-muted font-bold mb-2 block uppercase text-xs tracking-widest">{t('contact.form.message')}</Form.ControlLabel>
                  <Input 
                    name="message" 
                    as="textarea" 
                    rows={4} 
                    value={formValue.message}
                    onChange={(value) => setFormValue({ ...formValue, message: value })}
                    placeholder={t('contact.form.messagePlaceholder')}
                    className="!bg-white/5 !border-white/10 !rounded-xl !py-3 !px-4 !w-full"
                  />
                </Form.Group>
              </Form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center"
            >
              <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('contact.success.title')}</h3>
              <p className="text-text-muted mb-6">
                {t('contact.success.message')}
              </p>
              <Button 
                appearance="ghost" 
                onClick={handleClose}
                className="rounded-xl font-bold border-primary text-primary"
              >
                Close
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Modal.Body>
      {!submitted && (
        <Modal.Footer className="p-6 pt-0">
          <Button 
            appearance="primary" 
            block 
            size="lg" 
            onClick={handleSubmit}
            loading={loading}
            className="rounded-xl font-bold flex items-center justify-center gap-2 py-3!"
          >
            <Send size={18} />
            {t('contact.form.submit')}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ContactModal;
