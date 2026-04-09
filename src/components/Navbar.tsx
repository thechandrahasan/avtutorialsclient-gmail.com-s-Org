import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, 
  Instagram, Youtube, Facebook, MessageCircle,
  LogIn, LogOut, User,
  Home, Calendar, Image as ImageIcon, Info, Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { SOCIAL_LINKS, BRAND } from '@/constants';
import { supabase } from '@/lib/supabase';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Gallery', href: '/gallery', icon: ImageIcon },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const socialIcons = [
    { icon: Instagram, href: SOCIAL_LINKS.instagram, color: 'text-[#E4405F]' },
    { icon: Youtube, href: SOCIAL_LINKS.youtube, color: 'text-[#FF0000]' },
    { icon: Facebook, href: SOCIAL_LINKS.facebook, color: 'text-[#1877F2]' },
    { icon: MessageCircle, href: SOCIAL_LINKS.whatsappChannel, color: 'text-[#25D366]' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className={cn(
      "sticky top-0 z-50 w-full bg-neumo-bg/95 backdrop-blur-md transition-all duration-500",
      scrolled ? "h-14 shadow-neumo-extruded-sm" : "h-16 sm:h-20"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <div className={cn(
              "neumo-well group-hover:shadow-neumo-inset transition-all duration-500 flex items-center justify-center",
              scrolled ? "w-8 h-8 sm:w-10 sm:h-10" : "w-10 h-10 sm:w-12 sm:h-12"
            )}>
              <img src={BRAND.logo} alt="AV Tutorial" className={cn("transition-all duration-500", scrolled ? "h-5 sm:h-6" : "h-6 sm:h-8")} referrerPolicy="no-referrer" />
            </div>
            <AnimatePresence>
              {!scrolled && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-xl font-display font-extrabold text-neumo-fg tracking-tight hidden sm:block"
                >
                  {BRAND.name}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "h-10 flex items-center justify-center rounded-xl transition-all duration-500 group relative overflow-hidden",
                  scrolled ? "w-10" : "px-4",
                  location.pathname === link.href 
                    ? "shadow-neumo-inset text-neumo-accent" 
                    : "neumo-well text-neumo-muted hover:text-neumo-fg hover:shadow-neumo-inset"
                )}
                title={scrolled ? link.name : ""}
              >
                <link.icon size={18} className={cn("shrink-0 transition-transform duration-500", !scrolled && "mr-2")} />
                <AnimatePresence mode="wait">
                  {!scrolled && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm font-bold whitespace-nowrap overflow-hidden"
                    >
                      {link.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                {scrolled && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neumo-fg text-neumo-bg text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {link.name}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3 pr-4 border-r border-neumo-fg/10">
              {socialIcons.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-10 h-10 neumo-well hover:shadow-neumo-inset transition-all duration-300 flex items-center justify-center rounded-xl",
                    social.color
                  )}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/admin" 
                  className={cn(
                    "h-10 flex items-center justify-center rounded-xl transition-all duration-500 group relative overflow-hidden",
                    scrolled ? "w-10" : "px-4",
                    "neumo-well text-neumo-muted hover:text-neumo-fg hover:shadow-neumo-inset"
                  )}
                  title={scrolled ? "Admin Dashboard" : ""}
                >
                  <User size={18} className={cn("shrink-0 transition-transform duration-500", !scrolled && "mr-2")} />
                  <AnimatePresence mode="wait">
                    {!scrolled && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm font-bold whitespace-nowrap overflow-hidden"
                      >
                        Admin
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {scrolled && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neumo-fg text-neumo-bg text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      Admin
                    </span>
                  )}
                </Link>
                <button
                  onClick={handleLogout}
                  className={cn(
                    "h-10 flex items-center justify-center rounded-xl transition-all duration-500 group relative overflow-hidden",
                    scrolled ? "w-10" : "px-4",
                    "neumo-well text-red-500 hover:shadow-neumo-inset"
                  )}
                  title={scrolled ? "Logout" : ""}
                >
                  <LogOut size={18} className={cn("shrink-0 transition-transform duration-500", !scrolled && "mr-2")} />
                  <AnimatePresence mode="wait">
                    {!scrolled && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm font-bold whitespace-nowrap overflow-hidden"
                      >
                        Logout
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {scrolled && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neumo-fg text-neumo-bg text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      Logout
                    </span>
                  )}
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className={cn(
                  "h-10 flex items-center justify-center rounded-xl transition-all duration-500 group relative overflow-hidden",
                  scrolled ? "w-10" : "px-6",
                  "neumo-button-primary"
                )}
                title={scrolled ? "Login" : ""}
              >
                <LogIn size={18} className={cn("shrink-0 transition-transform duration-500", !scrolled && "mr-2")} />
                <AnimatePresence mode="wait">
                  {!scrolled && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-sm font-bold whitespace-nowrap overflow-hidden"
                    >
                      Login
                    </motion.span>
                  )}
                </AnimatePresence>
                {scrolled && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neumo-fg text-neumo-bg text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    Login
                  </span>
                )}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center shrink-0">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 neumo-well text-neumo-fg hover:shadow-neumo-inset transition-all duration-300 flex items-center justify-center rounded-xl"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-neumo-bg border-t border-neumo-fg/5 overflow-hidden shadow-neumo-extruded"
          >
            <div className="px-4 pt-4 pb-8 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-4 px-6 py-4 rounded-2xl text-base font-bold transition-all",
                    location.pathname === link.href
                      ? "shadow-neumo-inset text-neumo-accent"
                      : "neumo-well text-neumo-muted hover:shadow-neumo-inset"
                  )}
                >
                  <link.icon size={20} />
                  <span>{link.name}</span>
                </Link>
              ))}
              <div className="pt-4 flex items-center justify-around border-t border-neumo-fg/5">
                {socialIcons.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-10 h-10 neumo-well flex items-center justify-center rounded-xl",
                      social.color
                    )}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
              <div className="pt-4">
                {user ? (
                  <div className="space-y-3">
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center space-x-2 w-full neumo-button py-4"
                    >
                      <User size={20} />
                      <span>Admin Dashboard</span>
                    </Link>
                    <button
                      onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="flex items-center justify-center space-x-2 w-full neumo-button py-4 text-red-500"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full neumo-button-primary py-4"
                  >
                    <LogIn size={20} />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
