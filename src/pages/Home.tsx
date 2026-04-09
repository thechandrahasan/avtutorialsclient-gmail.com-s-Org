import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Instagram, Youtube, Facebook, MessageCircle, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Event } from '@/types';
import { BRAND, SOCIAL_LINKS } from '@/constants';
import { cn } from '@/lib/utils';
import InstagramWidget from '@/components/InstagramWidget';
import YouTubeWidget from '@/components/YouTubeWidget';

export default function Home() {
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastEvents = async () => {
      const today = new Date().toISOString();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .lt('expiry_date', today)
        .order('expiry_date', { ascending: false })
        .limit(10);

      if (data && !error) {
        setPastEvents(data);
      }
      setLoading(false);
    };

    fetchPastEvents();
  }, []);

  return (
    <div className="space-y-32 pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="flex items-center space-x-6 mb-10">
                <div className="w-24 h-24 neumo-well animate-float">
                  <img src={BRAND.logo} alt="Logo" className="h-16 w-auto" referrerPolicy="no-referrer" />
                </div>
                <h1 className="text-4xl sm:text-7xl font-display font-extrabold text-neumo-fg tracking-tighter">
                  {BRAND.name}
                </h1>
              </div>
              <p className="text-lg sm:text-2xl text-neumo-muted mb-8 sm:mb-12 leading-relaxed font-medium">
                {BRAND.tagline}. We provide personalized attention and innovative teaching methods to help every student reach their full potential.
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <Link
                  to="/contact"
                  className="neumo-button-primary px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg"
                >
                  Enroll Now
                </Link>
                <Link
                  to="/about"
                  className="neumo-button px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative block"
            >
              <div className="w-full aspect-square neumo-card p-4 sm:p-8 rotate-3 flex items-center justify-center">
                <div className="w-full h-full rounded-[24px] overflow-hidden shadow-neumo-inset bg-neumo-bg/50">
                  <img 
                    src="https://i.ibb.co/dJMtdF6M/Screenshot-2026-04-09-142002.jpg" 
                    alt="Vijay Sir" 
                    className="w-full h-full object-cover transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 sm:-bottom-10 sm:-left-10 w-32 h-32 sm:w-48 sm:h-48 neumo-card p-4 -rotate-6 animate-float">
                <div className="w-full h-full rounded-2xl bg-neumo-accent/10 flex items-center justify-center text-neumo-accent">
                  <Calendar size={32} className="sm:hidden" />
                  <Calendar size={48} className="hidden sm:block" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Past Events Slider */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-display font-extrabold text-neumo-fg mb-3">Past Events</h2>
            <p className="text-neumo-muted font-medium">Glimpses of our recent activities and achievements</p>
          </div>
          <Link to="/events" className="neumo-button px-6 py-3 text-sm flex items-center space-x-2">
            <span>View All</span>
            <ChevronRight size={18} />
          </Link>
        </div>

        {loading ? (
          <div className="flex space-x-8 overflow-hidden">
            {[1, 2, 3].map(i => (
              <div key={i} className="min-w-[350px] h-[450px] neumo-card animate-pulse" />
            ))}
          </div>
        ) : pastEvents.length > 0 ? (
          <div className="relative group">
            <div className="flex space-x-8 overflow-x-auto pb-12 pt-4 px-4 -mx-4 scrollbar-hide snap-x">
              {pastEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ y: -12 }}
                  className="min-w-[320px] sm:min-w-[380px] neumo-card overflow-hidden snap-start"
                >
                  <div className="h-56 p-4">
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-neumo-inset">
                      <img 
                        src={event.image_url || `https://picsum.photos/seed/${event.id}/600/400`} 
                        alt={event.title}
                        className="w-full h-full object-cover transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  <div className="p-8 pt-2">
                    <h3 className="text-2xl font-display font-bold text-neumo-fg mb-3 line-clamp-1">{event.title}</h3>
                    <p className="text-neumo-muted text-sm mb-6 line-clamp-2 font-medium leading-relaxed">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-neumo-accent text-xs font-bold uppercase tracking-widest">
                        <Calendar size={14} className="mr-2" />
                        {new Date(event.expiry_date).toLocaleDateString()}
                      </div>
                      <Link to="/gallery" className="w-10 h-10 neumo-well text-neumo-muted hover:text-neumo-accent transition-all">
                        <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-24 neumo-card border-none shadow-neumo-inset">
            <p className="text-neumo-muted font-bold">No past events to show yet.</p>
          </div>
        )}
      </section>

      {/* Social Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Instagram Section */}
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 neumo-well text-[#E4405F]">
              <Instagram size={28} />
            </div>
            <h2 className="text-3xl font-display font-extrabold text-neumo-fg">Instagram Feed</h2>
          </div>
          <InstagramWidget 
            type="elfsight" 
            widgetId="a5a8c8a4-8384-4a8d-8c74-fae1dd5d3861" 
            className="w-full" 
          />
        </div>

        {/* YouTube Section */}
        <div className="space-y-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 neumo-well text-[#FF0000]">
              <Youtube size={28} />
            </div>
            <h2 className="text-3xl font-display font-extrabold text-neumo-fg">YouTube Gallery</h2>
          </div>
          <YouTubeWidget 
            widgetId="4621fb7e-97f1-4e38-8ee2-f3591719af0e" 
            className="min-h-[400px]" 
          />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="p-12 neumo-card flex flex-col items-center text-center group">
          <div className="w-20 h-20 neumo-well text-[#1877F2] mb-8 group-hover:shadow-neumo-inset transition-all">
            <Facebook size={40} />
          </div>
          <h3 className="text-3xl font-display font-extrabold text-neumo-fg mb-6">Connect on Facebook</h3>
          <p className="text-neumo-muted font-medium mb-10 leading-relaxed">Join our community on Facebook for more updates and discussions.</p>
          <a 
            href={SOCIAL_LINKS.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="neumo-button w-full py-5 text-lg"
          >
            Visit Facebook Page
          </a>
        </div>

        <div className="p-12 neumo-card flex flex-col items-center text-center group">
          <div className="w-20 h-20 neumo-well text-[#25D366] mb-8 group-hover:shadow-neumo-inset transition-all">
            <MessageCircle size={40} />
          </div>
          <h3 className="text-3xl font-display font-extrabold text-neumo-fg mb-6">WhatsApp Channel</h3>
          <p className="text-neumo-muted font-medium mb-10 leading-relaxed">Get instant updates and announcements directly on your phone.</p>
          <a 
            href={SOCIAL_LINKS.whatsappChannel}
            target="_blank"
            rel="noopener noreferrer"
            className="neumo-button-primary w-full py-5 text-lg"
          >
            Join WhatsApp Channel
          </a>
        </div>
      </section>
    </div>
  );
}
