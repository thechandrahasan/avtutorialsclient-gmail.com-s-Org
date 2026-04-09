import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook, MessageCircle, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS, CONTACT_INFO } from '@/constants';
import { cn } from '@/lib/utils';

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 sm:pt-32 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-neumo-fg mb-6 sm:mb-8 tracking-tight">Get in Touch</h1>
          <p className="text-lg sm:text-xl text-neumo-muted leading-relaxed font-medium max-w-2xl mx-auto">
            We're here to help you on your educational journey. Reach out to us through any of these channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Contact Info Cards */}
          <div className="lg:col-span-2 space-y-8">
            <div className="neumo-card p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center space-y-6 sm:space-y-0 sm:space-x-8 group">
              <div className="w-20 h-20 neumo-well shrink-0 text-neumo-accent group-hover:shadow-neumo-inset transition-all duration-300">
                <MessageCircle size={36} />
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-display font-bold text-neumo-fg mb-2">Direct WhatsApp Chat</h3>
                <p className="text-neumo-muted font-medium mb-6">Chat with us directly for quick queries and admissions.</p>
                <a 
                  href={SOCIAL_LINKS.whatsappChat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neumo-button-primary inline-flex items-center space-x-3 px-10 py-5 text-lg w-full sm:w-auto justify-center"
                >
                  <MessageCircle size={24} />
                  <span>Start Chat Now</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="neumo-card p-8 group">
                <div className="w-14 h-14 neumo-well text-neumo-accent mb-6 group-hover:shadow-neumo-inset transition-all">
                  <Phone size={24} />
                </div>
                <h3 className="text-xl font-display font-bold text-neumo-fg mb-2">Call Us</h3>
                <p className="text-neumo-muted font-medium">+91 {CONTACT_INFO.phone}</p>
              </div>

              <div className="neumo-card p-8 group">
                <div className="w-14 h-14 neumo-well text-neumo-accent mb-6 group-hover:shadow-neumo-inset transition-all">
                  <Mail size={24} />
                </div>
                <h3 className="text-xl font-display font-bold text-neumo-fg mb-2">Email Us</h3>
                <p className="text-neumo-muted font-medium break-all">{CONTACT_INFO.email}</p>
              </div>
            </div>

            <div className="neumo-card p-8 sm:p-10 group">
              <div className="flex items-start space-x-6">
                <div className="w-14 h-14 neumo-well text-neumo-accent shrink-0 group-hover:shadow-neumo-inset transition-all">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-neumo-fg mb-2">Our Location</h3>
                  <p className="text-neumo-muted font-medium mb-6">{CONTACT_INFO.address}</p>
                  <a 
                    href={CONTACT_INFO.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-neumo-accent font-black text-xs uppercase tracking-widest hover:underline"
                  >
                    <span>Get Directions</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Map Preview */}
          <div className="space-y-8">
            <div className="neumo-card p-8">
              <h3 className="text-xl font-display font-bold text-neumo-fg mb-8">Follow Us</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram', color: 'text-[#E4405F]' },
                  { icon: Youtube, href: SOCIAL_LINKS.youtube, label: 'YouTube', color: 'text-[#FF0000]' },
                  { icon: Facebook, href: SOCIAL_LINKS.facebook, label: 'Facebook', color: 'text-[#1877F2]' },
                  { icon: MessageCircle, href: SOCIAL_LINKS.whatsappChannel, label: 'WhatsApp', color: 'text-[#25D366]' },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex flex-col items-center justify-center p-4 neumo-well hover:shadow-neumo-inset transition-all duration-300 group",
                      social.color
                    )}
                  >
                    <social.icon size={24} className="mb-2" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-center text-neumo-muted group-hover:text-neumo-fg">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="neumo-card p-4 h-64 overflow-hidden">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-neumo-inset transition-all duration-500">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.561574515254!2d78.5005888!3d17.3934722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99c0f3333333%3A0x3333333333333333!2sVidyanagar%2C%20Padma%20Colony%2C%20New%20Nallakunta%2C%20Hyderabad%2C%20Telangana%20500044!5e0!3m2!1sen!2sin!4v1712640000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
