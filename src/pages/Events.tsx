import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Event } from '@/types';
import { cn } from '@/lib/utils';

export default function Events() {
  const [activeEvents, setActiveEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      const today = new Date().toISOString();
      
      const { data: active, error: activeError } = await supabase
        .from('events')
        .select('*')
        .gte('expiry_date', today)
        .order('expiry_date', { ascending: true });
      
      const { data: past, error: pastError } = await supabase
        .from('events')
        .select('*')
        .lt('expiry_date', today)
        .order('expiry_date', { ascending: false });
      
      if (active && !activeError) setActiveEvents(active);
      if (past && !pastError) setPastEvents(past);
      setLoading(false);
    };

    fetchEvents();
  }, []);

  const filteredActive = activeEvents.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPast = pastEvents.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-20">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-display font-extrabold text-neumo-fg mb-4 tracking-tight">Events & Activities</h1>
          <p className="text-neumo-muted font-medium text-lg">Stay updated with our latest workshops, seminars, and celebrations.</p>
        </div>
        
        <div className="relative max-w-md w-full group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 neumo-well text-neumo-muted group-focus-within:text-neumo-accent transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="neumo-input w-full pl-16 pr-6 py-4 text-neumo-fg font-bold"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-[500px] neumo-card animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-32">
          {/* Active Events */}
          <section>
            <div className="flex items-center space-x-4 mb-12">
              <div className="w-3 h-10 neumo-well bg-neumo-accent rounded-full" />
              <h2 className="text-3xl font-display font-extrabold text-neumo-fg">Active Events</h2>
            </div>
            
            {filteredActive.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredActive.map((event) => (
                  <EventCard key={event.id} event={event} isActive />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 neumo-card border-none shadow-neumo-inset">
                <p className="text-neumo-muted font-bold">No active events found.</p>
              </div>
            )}
          </section>

          {/* Past Events */}
          <section>
            <div className="flex items-center space-x-4 mb-12">
              <div className="w-3 h-10 neumo-well bg-neumo-muted rounded-full" />
              <h2 className="text-3xl font-display font-extrabold text-neumo-fg">Past Events</h2>
            </div>
            
            {filteredPast.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredPast.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 neumo-card border-none shadow-neumo-inset">
                <p className="text-neumo-muted font-bold">No past events found.</p>
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

const EventCard: React.FC<{ event: Event; isActive?: boolean }> = ({ event, isActive = false }) => {
  return (
    <motion.div
      whileHover={{ y: -12 }}
      className="group neumo-card overflow-hidden"
    >
      <div className="relative h-64 p-4">
        <div className="w-full h-full rounded-2xl overflow-hidden shadow-neumo-inset">
          <img 
            src={event.image_url || `https://picsum.photos/seed/${event.id}/800/600`} 
            alt={event.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        {isActive && (
          <div className="absolute top-8 left-8 px-4 py-2 bg-neumo-accent text-white text-xs font-black rounded-full uppercase tracking-widest shadow-lg">
            Live
          </div>
        )}
      </div>
      
      <div className="p-8 pt-4">
        <div className="flex items-center space-x-3 text-neumo-accent text-xs font-black uppercase tracking-widest mb-4">
          <div className="w-8 h-8 neumo-well">
            <Calendar size={14} />
          </div>
          <span>{new Date(event.expiry_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        
        <h3 className="text-2xl font-display font-bold text-neumo-fg mb-4 group-hover:text-neumo-accent transition-colors">
          {event.title}
        </h3>
        
        <p className="text-neumo-muted text-sm mb-8 line-clamp-3 leading-relaxed font-medium">
          {event.description}
        </p>
        
        <button className="neumo-button w-full flex items-center justify-center space-x-3 group-hover:shadow-neumo-inset transition-all">
          <span className="font-bold">Learn More</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </motion.div>
  );
}
