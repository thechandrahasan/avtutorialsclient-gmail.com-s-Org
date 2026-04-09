import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, Calendar, MessageSquare, 
  LogOut, LayoutDashboard, Image as ImageIcon, 
  Check, X, AlertCircle, Save, Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '@/lib/supabase';
import { Event, ContactMessage } from '@/types';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'events' | 'messages'>('events');
  
  const [events, setEvents] = useState<Event[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Partial<Event> | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
        return;
      }

      setUser(session.user);

      const { data: adminData } = await supabase
        .from('admins')
        .select('email')
        .eq('email', session.user.email)
        .single();

      if (!adminData) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);
      fetchData();
    };

    checkUser();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    const [eventsRes, messagesRes] = await Promise.all([
      supabase.from('events').select('*').order('created_at', { ascending: false }),
      supabase.from('contacts').select('*').order('created_at', { ascending: false })
    ]);

    if (eventsRes.data) setEvents(eventsRes.data);
    if (messagesRes.data) setMessages(messagesRes.data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      let image_url = editingEvent?.image_url;

      if (imageFile) {
        try {
          const fileExt = imageFile.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('event-images')
            .upload(filePath, imageFile);

          if (uploadError) {
            console.error('Upload error:', uploadError);
            throw new Error('Failed to upload image. Please ensure the "event-images" bucket exists in Supabase Storage and is public.');
          }

          const { data: { publicUrl } } = supabase.storage
            .from('event-images')
            .getPublicUrl(filePath);
          
          image_url = publicUrl;
        } catch (uploadErr: any) {
          toast.error(uploadErr.message);
          // Don't throw here, allow them to use the URL if they have one
          if (!image_url) throw uploadErr;
        }
      }

      const eventData = {
        title: editingEvent?.title,
        description: editingEvent?.description,
        expiry_date: editingEvent?.expiry_date,
        image_url
      };

      if (editingEvent?.id) {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', editingEvent.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('events')
          .insert([eventData]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      setEditingEvent(null);
      setImageFile(null);
      fetchData();
      toast.success(editingEvent?.id ? 'Event updated successfully' : 'Event created successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save event');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const { error } = await supabase.from('events').delete().eq('id', id);
      if (error) throw error;
      toast.success('Event deleted successfully');
      fetchData();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete event');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neumo-bg">
        <div className="w-16 h-16 neumo-well text-neumo-accent flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-neumo-accent border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-neumo-bg">
        <div className="max-w-md w-full text-center space-y-8 neumo-card p-12">
          <div className="w-24 h-24 neumo-well text-red-500 mx-auto">
            <AlertCircle size={48} />
          </div>
          <h1 className="text-4xl font-display font-extrabold text-neumo-fg">Access Denied</h1>
          <p className="text-neumo-muted font-medium leading-relaxed">
            Your account ({user?.email}) does not have administrative privileges. Please contact the administrator if you believe this is an error.
          </p>
          <button
            onClick={handleLogout}
            className="neumo-button w-full py-4 font-bold"
          >
            Logout & Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neumo-bg pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl font-display font-extrabold text-neumo-fg mb-3 tracking-tight">Admin Dashboard</h1>
            <p className="text-neumo-muted font-medium">Welcome back, <span className="text-neumo-accent font-bold">{user?.email}</span></p>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => { setEditingEvent({}); setIsModalOpen(true); }}
              className="neumo-button-primary flex items-center space-x-3 px-8 py-4"
            >
              <Plus size={20} />
              <span>Add Event</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-14 h-14 neumo-well text-neumo-muted hover:text-red-500 hover:shadow-neumo-inset transition-all"
              title="Logout"
            >
              <LogOut size={24} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex p-2 neumo-well rounded-3xl w-fit mb-12">
          <button
            onClick={() => setActiveTab('events')}
            className={cn(
              "px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all",
              activeTab === 'events' 
                ? "neumo-card text-neumo-accent" 
                : "text-neumo-muted hover:text-neumo-fg"
            )}
          >
            <div className="flex items-center space-x-3">
              <Calendar size={18} />
              <span>Events</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={cn(
              "px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all",
              activeTab === 'messages' 
                ? "neumo-card text-neumo-accent" 
                : "text-neumo-muted hover:text-neumo-fg"
            )}
          >
            <div className="flex items-center space-x-3">
              <MessageSquare size={18} />
              <span>Messages</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'events' ? (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              {events.map((event) => (
                <div key={event.id} className="neumo-card overflow-hidden group">
                  <div className="h-48 relative p-4">
                    <div className="w-full h-full rounded-2xl overflow-hidden shadow-neumo-inset">
                      <img 
                        src={event.image_url || `https://picsum.photos/seed/${event.id}/400/200`} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="absolute inset-4 bg-neumo-bg/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-6 rounded-2xl">
                      <button 
                        onClick={() => { setEditingEvent(event); setIsModalOpen(true); }}
                        className="w-14 h-14 neumo-well text-neumo-accent hover:shadow-neumo-inset transition-all"
                      >
                        <Edit2 size={20} />
                      </button>
                      <button 
                        onClick={() => handleDeleteEvent(event.id)}
                        className="w-14 h-14 neumo-well text-red-500 hover:shadow-neumo-inset transition-all"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="p-8 pt-4">
                    <h3 className="text-xl font-display font-bold text-neumo-fg mb-3 line-clamp-1">{event.title}</h3>
                    <p className="text-neumo-muted text-sm line-clamp-2 mb-6 font-medium leading-relaxed">{event.description}</p>
                    <div className="flex items-center text-xs font-black text-neumo-accent uppercase tracking-widest">
                      <Calendar size={14} className="mr-2" />
                      <span>Expires: {new Date(event.expiry_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              {messages.map((msg) => (
                <div key={msg.id} className="neumo-card p-10">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-display font-bold text-neumo-fg">{msg.name}</h3>
                      <p className="text-neumo-accent font-black text-sm uppercase tracking-widest">{msg.email}</p>
                    </div>
                    <div className="px-4 py-2 neumo-well text-xs font-bold text-neumo-muted rounded-full">
                      {new Date(msg.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div className="neumo-well p-8 rounded-2xl">
                    <p className="text-neumo-fg font-medium leading-relaxed">{msg.message}</p>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center py-32 neumo-card border-none shadow-neumo-inset">
                  <p className="text-neumo-muted font-bold">No messages yet.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-neumo-bg/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="neumo-card w-full max-w-3xl overflow-hidden"
            >
              <div className="p-10 border-b border-neumo-fg/5 flex justify-between items-center">
                <h2 className="text-3xl font-display font-extrabold text-neumo-fg">
                  {editingEvent?.id ? 'Edit Event' : 'Add New Event'}
                </h2>
                <button 
                  onClick={() => { setIsModalOpen(false); setEditingEvent(null); }} 
                  className="w-12 h-12 neumo-well text-neumo-muted hover:text-neumo-fg hover:shadow-neumo-inset transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSaveEvent} className="p-10 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <label className="block text-xs font-black text-neumo-fg uppercase tracking-widest ml-2">Title</label>
                      <input
                        type="text"
                        required
                        value={editingEvent?.title || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                        className="neumo-input w-full px-6 py-4 font-bold"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="block text-xs font-black text-neumo-fg uppercase tracking-widest ml-2">Expiry Date</label>
                      <input
                        type="date"
                        required
                        value={editingEvent?.expiry_date?.split('T')[0] || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, expiry_date: e.target.value })}
                        className="neumo-input w-full px-6 py-4 font-bold"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="block text-xs font-black text-neumo-fg uppercase tracking-widest ml-2">Event Image</label>
                      <div className="relative aspect-video neumo-well rounded-3xl overflow-hidden group">
                        {imageFile || editingEvent?.image_url ? (
                          <img 
                            src={imageFile ? URL.createObjectURL(imageFile) : editingEvent?.image_url} 
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-neumo-muted">
                            <ImageIcon size={40} className="mb-3" />
                            <span className="text-xs font-black uppercase tracking-widest">Upload Image</span>
                          </div>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div className="absolute inset-0 bg-neumo-bg/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <Upload className="text-neumo-accent" size={32} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-xs font-black text-neumo-fg uppercase tracking-widest ml-2">Or Image URL</label>
                      <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={editingEvent?.image_url || ''}
                        onChange={(e) => setEditingEvent({ ...editingEvent, image_url: e.target.value })}
                        className="neumo-input w-full px-6 py-4 font-bold"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-black text-neumo-fg uppercase tracking-widest ml-2">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={editingEvent?.description || ''}
                    onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                    className="neumo-input w-full px-6 py-4 font-bold resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-6 pt-6">
                  <button
                    type="button"
                    onClick={() => { setIsModalOpen(false); setEditingEvent(null); }}
                    className="neumo-button px-10 py-4 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="neumo-button-primary px-10 py-4 flex items-center space-x-3 disabled:opacity-70"
                  >
                    {formLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={20} />}
                    <span>Save Event</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
