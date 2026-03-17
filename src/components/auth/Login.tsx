import React, { useState } from 'react';
import { InputField, CTAButton, IconMail, IconLock } from './shared';

const VALID_CREDENTIALS = [
  { email: 'user1@gmail.com', password: 'user@#1' },
  { email: 'developer@gmail.com', password: 'dev@#1' },
  { email: 'admin@gmail.com', password: 'admin@#1' },
  { email: 'onwer.futsal@grnd.com', password: 'futsal@$adayar' },
];

interface LoginProps {
  onSuccess: (userData: { firstName: string; email: string }) => void;
}

export const LoginForm = ({ onSuccess }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const user = VALID_CREDENTIALS.find(u => u.email === email && u.password === password);

    if (user) {
      setLoading(true);
      setTimeout(() => {
        // Mocking a first name based on email for demo purposes
        const name = email.split('@')[0];
        const firstName = name.charAt(0).toUpperCase() + name.slice(1);
        onSuccess({ firstName, email });
      }, 600);
    } else {
      setError('Invalid email or password. Try again.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 animate-fade-slide-in">
      <InputField
        icon={<IconMail />}
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex flex-col gap-1">
        <InputField
          icon={<IconLock />}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-xs text-red-500 mt-1 font-sans">{error}</p>}
      </div>
      <div className="mt-4">
        <CTAButton 
          label={loading ? "Entering..." : "Enter"} 
          loading={loading}
          disabled={!email || !password}
        />
      </div>
    </form>
  );
};
