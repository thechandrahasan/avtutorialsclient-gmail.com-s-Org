import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { LogIn, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { BRAND } from '@/constants';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) throw loginError;

      toast.success('Logged in successfully!');
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-neumo-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-12">
          <Link to="/" className="inline-block mb-8 p-4 neumo-card rounded-3xl">
            <img src={BRAND.logo} alt="Logo" className="h-12 w-auto mx-auto" referrerPolicy="no-referrer" />
          </Link>
          <h1 className="text-4xl font-display font-extrabold text-neumo-fg mb-3 tracking-tight">Welcome Back</h1>
          <p className="text-neumo-muted font-medium">Login to access the admin dashboard</p>
        </div>

        <div className="neumo-card p-10">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-sm font-black text-neumo-fg uppercase tracking-widest ml-2">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 neumo-well text-neumo-muted group-focus-within:text-neumo-accent transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="neumo-input w-full pl-16 pr-6 py-4 font-bold"
                  placeholder="admin@avtutorial.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-black text-neumo-fg uppercase tracking-widest ml-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 neumo-well text-neumo-muted group-focus-within:text-neumo-accent transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="neumo-input w-full pl-16 pr-6 py-4 font-bold"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-3 p-4 neumo-well text-red-500 rounded-2xl text-sm font-bold">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "neumo-button-primary w-full py-5 text-lg flex items-center justify-center space-x-3",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Login</span>
                  <LogIn size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-neumo-fg/5 text-center space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-neumo-muted font-medium">
                Need an admin account?
              </p>
              <Link to="/signup" className="inline-flex items-center space-x-2 text-neumo-accent text-sm font-black hover:underline uppercase tracking-widest">
                <span>Sign Up</span>
                <ArrowRight size={14} />
              </Link>
            </div>
            
            <div>
              <Link to="/" className="inline-flex items-center space-x-2 text-neumo-muted text-xs font-bold hover:text-neumo-fg transition-colors">
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
