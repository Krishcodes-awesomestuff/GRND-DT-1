import React, { useState } from 'react';
import { InputField, CTAButton, IconMail, IconLock, IconUser, TermsNote } from './shared';

interface SignupProps {
  onSuccess: (userData: { firstName: string }) => void;
}

export const SignupForm = ({ onSuccess }: SignupProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      onSuccess({ firstName });
    }, 600);
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4 animate-fade-slide-in">
      <div className="grid grid-cols-2 gap-4">
        <InputField
          icon={<IconUser />}
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputField
          icon={<IconUser />}
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <InputField
        icon={<IconMail />}
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        icon={<IconLock />}
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputField
        icon={<IconLock />}
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      
      {error && <p className="text-xs text-red-500 mt-1 font-sans">{error}</p>}

      <div className="mt-4">
        <CTAButton 
          label={loading ? "Joining..." : "Join the Squad"} 
          loading={loading}
          disabled={!firstName || !lastName || !email || !password || !confirmPassword}
        />
      </div>
      <TermsNote />
    </form>
  );
};
