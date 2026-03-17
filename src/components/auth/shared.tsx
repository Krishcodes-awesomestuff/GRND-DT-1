import React, { useState } from 'react';
import { motion } from 'motion/react';

export const IconBolt = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

export const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export const IconLock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

export const IconArrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const IconEye = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconEyeOff = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

interface InputFieldProps {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({ icon, placeholder, type = "text", value, onChange }: InputFieldProps) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div 
      className={`group flex items-center gap-3 rounded-xl px-4 py-1 transition-all duration-300 bg-surface border border-transparent
        ${focused ? 'bg-surface-hover border-volt shadow-[0_0_0_3px_rgba(192,255,0,0.08)]' : ''}`}
    >
      <span className={`transition-colors duration-300 ${focused ? 'text-volt' : 'text-muted'}`}>
        {icon}
      </span>
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent py-4 text-sm font-sans outline-none placeholder:text-muted"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-muted hover:text-white transition-colors"
        >
          {showPassword ? <IconEyeOff /> : <IconEye />}
        </button>
      )}
    </div>
  );
};

interface CTAButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  showArrow?: boolean;
  loading?: boolean;
}

export const CTAButton = ({ label, onClick, disabled = false, showArrow = true, loading = false }: CTAButtonProps) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      onClick={onClick}
      disabled={disabled || loading}
      className={`group relative flex w-full items-center justify-center gap-2 rounded-xl py-4 font-sans font-bold text-black transition-all duration-300
        ${disabled ? 'bg-volt-dimmed cursor-not-allowed opacity-70' : 'bg-volt hover:shadow-[0_0_20px_rgba(192,255,0,0.3)]'}`}
    >
      <span>{loading ? "Processing..." : label}</span>
      {showArrow && !loading && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          <IconArrow />
        </span>
      )}
    </motion.button>
  );
};

export const TermsNote = () => (
  <p className="mt-6 text-center text-xs text-subtle font-sans">
    By continuing, you agree to our{' '}
    <a href="#" className="text-volt hover:text-volt-bright transition-colors font-medium">
      Terms of Service
    </a>
  </p>
);
