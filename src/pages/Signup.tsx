import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { UserPlus, Mail, Lock, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { BRAND } from '@/constants';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) throw signupError;

      setSuccess(true);
      toast.success('Signup successful! Please check your email for verification.');
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
      toast.error(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center bg-white dark:bg-slate-900 p-12 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Check Your Email</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            We've sent a verification link to <span className="font-bold text-slate-900 dark:text-white">{email}</span>. Please verify your email to complete the signup.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-colors"
          >
            <span>Go to Login</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src={BRAND.logo} alt="Logo" className="h-16 w-auto mx-auto" referrerPolicy="no-referrer" />
          </Link>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Create Admin Account</h1>
          <p className="text-slate-600 dark:text-slate-400">Temporary signup for initial setup</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl">
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 dark:focus:ring-orange-500 transition-all outline-none text-slate-900 dark:text-white"
                  placeholder="admin@avtutorial.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 dark:focus:ring-orange-500 transition-all outline-none text-slate-900 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center space-x-2 transition-all hover:bg-blue-700 shadow-lg shadow-blue-600/20",
                loading && "opacity-70 cursor-not-allowed"
              )}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign Up</span>
                  <UserPlus size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-500">
              Already have an account?
            </p>
            <Link to="/login" className="inline-flex items-center space-x-1 text-blue-600 dark:text-orange-400 text-sm font-bold mt-4 hover:underline">
              <span>Login instead</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
