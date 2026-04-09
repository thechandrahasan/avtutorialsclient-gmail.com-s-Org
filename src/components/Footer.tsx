import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { SOCIAL_LINKS, BRAND, CONTACT_INFO } from '@/constants';
import { cn } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neumo-bg pt-24 pb-12 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-8 group">
              <div className="w-14 h-14 neumo-well group-hover:shadow-neumo-inset transition-all duration-300">
                <img src={BRAND.logo} alt="AV Tutorial" className="h-10 w-auto" referrerPolicy="no-referrer" />
              </div>
              <span className="text-2xl font-display font-extrabold text-neumo-fg tracking-tight">
                {BRAND.name}
              </span>
            </Link>
            <p className="text-neumo-muted text-sm leading-relaxed font-medium">
              {BRAND.tagline}. Providing quality education and guidance to help students excel in their academic journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-neumo-fg font-display font-bold text-lg mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {['Home', 'Events', 'Gallery', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-neumo-muted hover:text-neumo-accent transition-all text-sm font-bold"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-neumo-fg font-display font-bold text-lg mb-8">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 text-sm text-neumo-muted font-medium">
                <div className="w-10 h-10 neumo-well shrink-0 text-neumo-accent">
                  <MapPin size={18} />
                </div>
                <span className="pt-2">{CONTACT_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-4 text-sm text-neumo-muted font-medium">
                <div className="w-10 h-10 neumo-well shrink-0 text-neumo-accent">
                  <Phone size={18} />
                </div>
                <span>+91 {CONTACT_INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-4 text-sm text-neumo-muted font-medium">
                <div className="w-10 h-10 neumo-well shrink-0 text-neumo-accent">
                  <Mail size={18} />
                </div>
                <span>{CONTACT_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-neumo-fg font-display font-bold text-lg mb-8">Follow Us</h3>
            <div className="flex space-x-4 mb-10">
              {[
                { icon: Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram', color: 'text-[#E4405F]' },
                { icon: Youtube, href: SOCIAL_LINKS.youtube, label: 'YouTube', color: 'text-[#FF0000]' },
                { icon: Facebook, href: SOCIAL_LINKS.facebook, label: 'Facebook', color: 'text-[#1877F2]' },
                { icon: MessageCircle, href: SOCIAL_LINKS.whatsappChannel, label: 'WhatsApp', color: 'text-[#25D366]' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-12 h-12 neumo-well hover:shadow-neumo-inset transition-all duration-300 flex items-center justify-center rounded-2xl",
                    social.color
                  )}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <div className="p-6 neumo-card">
              <p className="text-xs text-neumo-muted font-bold mb-4 uppercase tracking-wider">Updates</p>
              <a 
                href={SOCIAL_LINKS.whatsappChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="neumo-button-primary w-full flex items-center justify-center space-x-2 text-sm"
              >
                <MessageCircle size={18} />
                <span>Join WhatsApp Channel</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-neumo-fg/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-neumo-muted text-xs font-bold">
            © {currentYear} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex space-x-8 text-xs font-bold text-neumo-muted">
            <Link to="/privacy" className="hover:text-neumo-fg transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-neumo-fg transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
