import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconBolt } from './components/auth/shared';
import { LoginForm } from './components/auth/Login';
import { SignupForm } from './components/auth/Signup';
import { Onboarding } from './components/onboarding/Onboarding';
import { Dashboard } from './components/dashboard/Dashboard';
import { OwnerDashboard } from './components/dashboard/OwnerDashboard';

type View = 'auth' | 'onboarding' | 'dashboard';
type AuthTab = 'login' | 'signup';
type UserRole = 'player' | 'owner';

export default function App() {
  const [view, setView] = useState<View>(() => {
    const saved = localStorage.getItem('grnd_view');
    return (saved as View) || 'auth';
  });
  const [authTab, setAuthTab] = useState<AuthTab>('signup');
  const [user, setUser] = useState<{ firstName: string; location?: string; role?: UserRole } | null>(() => {
    const saved = localStorage.getItem('grnd_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/user');
        const data = await res.json();
        if (data.firstName) {
          setUser(data);
          localStorage.setItem('grnd_user', JSON.stringify(data));
        }
      } catch (err) {
        console.error('Failed to fetch user from backend:', err);
      }
    };
    
    if (!user) {
      fetchUser();
    }
  }, [user]);

  const handleAuthSuccess = async (userData: { firstName: string; email: string }) => {
    const role: UserRole = userData.email === 'onwer.futsal@grnd.com' ? 'owner' : 'player';
    const newUser = { ...user, ...userData, role };
    setUser(newUser);
    localStorage.setItem('grnd_user', JSON.stringify(newUser));
    
    // Sync with backend
    try {
      await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
    } catch (err) {
      console.error('Failed to sync with backend:', err);
    }
    
    if (authTab === 'login') {
      setView('dashboard');
      localStorage.setItem('grnd_view', 'dashboard');
    } else {
      setView('onboarding');
      localStorage.setItem('grnd_view', 'onboarding');
    }
  };

  const handleLogout = async () => {
    setUser(null);
    setView('auth');
    localStorage.removeItem('grnd_user');
    localStorage.removeItem('grnd_view');
    
    // Clear backend session (mock)
    try {
      await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: '', location: '', role: 'player' }),
      });
    } catch (err) {
      console.error('Failed to clear backend session:', err);
    }
  };

  const handleOnboardingComplete = async (data: { location: string }) => {
    const newUser = { ...user, firstName: user?.firstName || '', location: data.location, role: 'player' as UserRole };
    setUser(newUser);
    localStorage.setItem('grnd_user', JSON.stringify(newUser));

    // Sync with backend
    try {
      await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
    } catch (err) {
      console.error('Failed to sync location with backend:', err);
    }

    setView('dashboard');
    localStorage.setItem('grnd_view', 'dashboard');
  };

  const handleUpdateProfile = async (data: { firstName: string; location: string }) => {
    const newUser = { ...user, ...data };
    setUser(newUser);
    localStorage.setItem('grnd_user', JSON.stringify(newUser));

    // Sync with backend
    try {
      await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
    } catch (err) {
      console.error('Failed to update profile on backend:', err);
    }
  };

  if (view === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  if (view === 'dashboard') {
    if (user?.role === 'owner') {
      return <OwnerDashboard onLogout={handleLogout} />;
    }
    return (
      <Dashboard 
        onLogout={handleLogout} 
        onUpdateProfile={handleUpdateProfile}
        firstName={user?.firstName} 
        location={user?.location} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-[432px] flex flex-col items-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-10"
        >
          <div className="w-10 h-10 bg-volt rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(192,255,0,0.2)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="font-display text-3xl tracking-tighter text-white">GRND</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-display text-[clamp(2.6rem,6vw,3.4rem)] leading-[0.9] text-center mb-10 uppercase tracking-tight text-white"
        >
          UNLEASH<br />YOUR GAME.
        </motion.h1>

        {/* Tab Switcher */}
        <div className="relative w-full bg-surface p-1 rounded-2xl flex mb-8 overflow-hidden">
          <motion.div 
            className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-zinc-800 rounded-xl"
            animate={{ left: authTab === 'login' ? '4px' : 'calc(50%)' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
          <button 
            onClick={() => setAuthTab('login')}
            className={`relative z-10 flex-1 py-3 text-sm font-bold font-sans transition-colors duration-300 ${authTab === 'login' ? 'text-white' : 'text-muted hover:text-zinc-300'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setAuthTab('signup')}
            className={`relative z-10 flex-1 py-3 text-sm font-bold font-sans transition-colors duration-300 ${authTab === 'signup' ? 'text-white' : 'text-muted hover:text-zinc-300'}`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Slot */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {authTab === 'login' ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <LoginForm onSuccess={handleAuthSuccess} />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <SignupForm onSuccess={handleAuthSuccess} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
