import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PersonalData } from '@/types';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { useTheme } from '@/hooks/useTheme';

interface ContactProps {
  data: PersonalData;
}

export const Contact: React.FC<ContactProps> = ({ data }) => {
  const { colors } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission integration
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      className="py-20"
      style={{ backgroundColor: colors.background }}
      aria-label="Contact section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: colors.foreground }}
            >
              Get In Touch
            </h2>
            <p
              className="text-lg"
              style={{ color: colors.foreground, opacity: 0.7 }}
            >
              Let's discuss your next project
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <AnimatedSection>
            <div className="space-y-8" style={{ color: colors.foreground }}>
              <ContactInfoItem
                icon={FiMail}
                iconBg={colors.badgeBackground}
                iconColor={colors.primary}
                title="Email"
                content={data.contact.email}
                link={`mailto:${data.contact.email}`}
                linkColor={colors.accent}
                isLink
              />
              <ContactInfoItem
                icon={FiMapPin}
                iconBg={colors.badgeBackground}
                iconColor={colors.primary}
                title="Location"
                content={data.contact.location}
                isLink={false}
              />
              {data.contact.phone && (
                <ContactInfoItem
                  icon={FiPhone}
                  iconBg={colors.badgeBackground}
                  iconColor={colors.primary}
                  title="Phone"
                  content={data.contact.phone}
                  link={`tel:${data.contact.phone}`}
                  linkColor={colors.accent}
                  isLink
                />
              )}
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <FormField
                label="Name"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                colors={colors}
              />
              <FormField
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                colors={colors}
              />
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium"
                  style={{ color: colors.foreground }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: colors.card,
                    color: colors.foreground,
                    border: `1px solid ${colors.border}`,
                    resize: 'vertical',
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = colors.primary}
                  onBlur={e => e.currentTarget.style.borderColor = colors.border}
                ></textarea>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.badgeText,
                }}
                aria-label="Send message"
              >
                Send Message
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

interface ContactInfoItemProps {
  icon: React.ComponentType<any>;
  iconBg: string;
  iconColor: string;
  title: string;
  content: string;
  link?: string;
  linkColor?: string;
  isLink?: boolean;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  content,
  link,
  linkColor,
  isLink = false,
}) => (
  <div className="flex items-center space-x-4">
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
      style={{ backgroundColor: iconBg }}
    >
      <Icon style={{ color: iconColor }} className="text-xl" aria-hidden="true" />
    </div>
    <div style={{ color: 'inherit' }}>
      <h3 className="text-lg font-semibold" style={{ marginBottom: 2, color: 'inherit' }}>
        {title}
      </h3>
      {isLink && link ? (
        <a
          href={link}
          style={{ color: linkColor }}
          className="hover:underline transition-colors"
        >
          {content}
        </a>
      ) : (
        <span style={{ color: 'inherit' }}>{content}</span>
      )}
    </div>
  </div>
);

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  type: string;
  value: string;
  onChange:
  | React.ChangeEventHandler<HTMLInputElement>
  | React.ChangeEventHandler<HTMLTextAreaElement>;
  required?: boolean;
  colors: {
    background: string;
    foreground: string;
    border: string;
    primary: string;
    badgeText: string;
    card: string;
  };
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  name,
  type,
  value,
  onChange,
  required = false,
  colors,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium"
      style={{ color: colors.foreground }}
    >
      {label}
    </label>
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 rounded-lg transition-colors"
      style={{
        backgroundColor: colors.card,
        color: colors.foreground,
        border: `1px solid ${colors.border}`,
      }}
      onFocus={e => (e.currentTarget.style.borderColor = colors.primary)}
      onBlur={e => (e.currentTarget.style.borderColor = colors.border)}
      aria-required={required}
    />
  </div>
);
