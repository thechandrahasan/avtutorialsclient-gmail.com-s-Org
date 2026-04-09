import { useState, useEffect } from 'react';
import { X, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '@/lib/supabase';
import { Event } from '@/types';
import { Link } from 'react-router-dom';

export default function EventPopup() {
  const [event, setEvent] = useState<Event | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchLatestEvent = async () => {
      const today = new Date().toISOString();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .gte('expiry_date', today)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        const dismissedEvents = JSON.parse(localStorage.getItem('dismissed_events') || '[]');
        if (!dismissedEvents.includes(data.id)) {
          setEvent(data);
          // Show after a short delay
          setTimeout(() => setIsVisible(true), 1500);
        }
      }
    };

    fetchLatestEvent();
  }, []);

  const handleDismiss = () => {
    if (event) {
      const dismissedEvents = JSON.parse(localStorage.getItem('dismissed_events') || '[]');
      localStorage.setItem('dismissed_events', JSON.stringify([...dismissedEvents, event.id]));
    }
    setIsVisible(false);
  };

  if (!event) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neumo-bg/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg neumo-card overflow-hidden"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-6 right-6 w-12 h-12 neumo-well text-neumo-muted hover:text-neumo-fg hover:shadow-neumo-inset z-10 transition-all"
            >
              <X size={20} />
            </button>

            {event.image_url && (
              <div className="h-48 sm:h-64 w-full p-4">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-neumo-inset">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}

            <div className="p-8 sm:p-10 pt-4">
              <div className="flex items-center space-x-3 text-neumo-accent text-xs font-black uppercase tracking-widest mb-4">
                <div className="w-8 h-8 neumo-well">
                  <Calendar size={14} />
                </div>
                <span>Upcoming Event</span>
              </div>
              
              <h2 className="text-3xl font-display font-extrabold text-neumo-fg mb-4">
                {event.title}
              </h2>
              
              <p className="text-neumo-muted font-medium mb-8 line-clamp-3 leading-relaxed">
                {event.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link
                  to="/events"
                  onClick={handleDismiss}
                  className="flex-1 neumo-button-primary flex items-center justify-center space-x-3 py-4"
                >
                  <span>View Details</span>
                  <ArrowRight size={18} />
                </Link>
                <button
                  onClick={handleDismiss}
                  className="neumo-button px-8 py-4 font-bold"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
