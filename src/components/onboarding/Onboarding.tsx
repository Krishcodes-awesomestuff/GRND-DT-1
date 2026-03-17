import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CTAButton, InputField, IconArrow } from '../auth/shared';

const SPORTS = [
  "Basketball", "Football", "Cricket", "Tennis", "Badminton", 
  "Volleyball", "Swimming", "Boxing", "Pickleball", "Rugby"
];

const SKILL_LEVELS = [
  { label: "BEGINNER", sub: "Just warming up" },
  { label: "INTERMEDIATE", sub: "Hitting my stride" },
  { label: "ADVANCED", sub: "Full send mode" }
];

const FREQUENCIES = [
  { label: "RARELY", sub: "Just starting out" },
  { label: "SOMETIMES", sub: "Weekend Warrior" },
  { label: "OFTEN", sub: "Everyday Grind" }
];

interface OnboardingProps {
  onComplete: (data: { location: string }) => void;
}

const StepWrapper = ({ children, title }: { children: React.ReactNode, title: string, key?: string }) => (
  <div className="animate-slide-in flex flex-col items-center text-center">
    <h2 className="font-display text-4xl mb-8 tracking-tight text-white uppercase">{title}</h2>
    <div className="w-full max-w-[432px]">
      {children}
    </div>
  </div>
);

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [skill, setSkill] = useState('');
  const [frequency, setFrequency] = useState('');
  const [location, setLocation] = useState('');
  const [geoStatus, setGeoStatus] = useState<'idle' | 'loading' | 'got'>('idle');

  const nextStep = () => setStep(s => s + 1);

  const handleGeo = () => {
    setGeoStatus('loading');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        setGeoStatus('got');
      },
      () => {
        alert("Permission denied. Please enter location manually.");
        setGeoStatus('idle');
      }
    );
  };

  const renderProgress = () => {
    if (step < 2 || step > 5) return null;
    return (
      <div className="flex justify-center gap-2 mb-8">
        {[2, 3, 4, 5].map((s) => (
          <div 
            key={s}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              step === s ? 'w-8 bg-volt' : step > s ? 'w-5 bg-volt' : 'w-5 bg-zinc-800'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      {renderProgress()}
      
      <AnimatePresence mode="wait">
        {step === 0 && (
          <StepWrapper title="VERIFY YOUR NUMBER." key="step0">
            <div className="flex flex-col gap-6">
              <div className="flex items-center bg-surface rounded-xl border border-transparent focus-within:border-volt focus-within:shadow-[0_0_0_3px_rgba(192,255,0,0.08)] transition-all">
                <span className="pl-4 pr-3 py-4 text-muted font-sans border-r border-zinc-800">+91</span>
                <input 
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-transparent px-3 py-4 text-sm font-sans outline-none"
                />
              </div>
              <CTAButton label="Send OTP" onClick={nextStep} disabled={phone.length < 10} />
            </div>
          </StepWrapper>
        )}

        {step === 1 && (
          <StepWrapper title="ENTER THE CODE." key="step1">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <input 
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="——————"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-surface rounded-xl py-6 text-center text-2xl font-mono tracking-[0.5em] outline-none border border-transparent focus:border-volt transition-all"
                />
                <p className="text-xs text-muted font-sans">Try: 123456</p>
              </div>
              <CTAButton label="Verify" onClick={nextStep} disabled={otp.length < 6} />
            </div>
          </StepWrapper>
        )}

        {step === 2 && (
          <StepWrapper title="CHOOSE YOUR WEAPONS." key="step2">
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-3">
                {SPORTS.map(sport => {
                  const isSelected = selectedSports.includes(sport);
                  return (
                    <button
                      key={sport}
                      onClick={() => {
                        setSelectedSports(prev => 
                          prev.includes(sport) ? prev.filter(s => s !== sport) : [...prev, sport]
                        );
                      }}
                      className={`py-4 px-4 rounded-xl text-sm font-sans font-bold transition-all duration-300 ${
                        isSelected 
                          ? 'bg-volt text-black scale-[1.03] shadow-[0_0_15px_rgba(192,255,0,0.3)]' 
                          : 'bg-zinc-900 text-zinc-500 hover:bg-zinc-800'
                      }`}
                    >
                      {sport}
                    </button>
                  );
                })}
              </div>
              <div className="flex flex-col gap-4">
                {selectedSports.length < 3 && (
                  <p className="text-xs text-subtle font-sans">Select {3 - selectedSports.length} more sports to continue</p>
                )}
                <CTAButton 
                  label={selectedSports.length >= 3 ? `Continue (${selectedSports.length})` : "Select at least 3"} 
                  onClick={nextStep} 
                  disabled={selectedSports.length < 3} 
                />
              </div>
            </div>
          </StepWrapper>
        )}

        {step === 3 && (
          <StepWrapper title="WHAT'S YOUR LEVEL?" key="step3">
            <div className="flex flex-col gap-4">
              {SKILL_LEVELS.map(level => (
                <button
                  key={level.label}
                  onClick={() => setSkill(level.label)}
                  className={`flex items-center justify-between w-full px-5 py-4 rounded-xl border transition-all duration-300 ${
                    skill === level.label 
                      ? 'bg-volt border-volt text-black' 
                      : 'bg-zinc-900 border-transparent text-white hover:bg-zinc-800'
                  }`}
                >
                  <div className="text-left">
                    <p className="font-bold text-sm font-sans">{level.label}</p>
                    <p className={`text-xs font-sans ${skill === level.label ? 'text-black/60' : 'text-subtle'}`}>{level.sub}</p>
                  </div>
                  {skill === level.label && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))}
              <div className="mt-4">
                <CTAButton label="Continue" onClick={nextStep} disabled={!skill} />
              </div>
            </div>
          </StepWrapper>
        )}

        {step === 4 && (
          <StepWrapper title="HOW OFTEN DO YOU SWEAT?" key="step4">
            <div className="flex flex-col gap-4">
              {FREQUENCIES.map(freq => (
                <button
                  key={freq.label}
                  onClick={() => setFrequency(freq.label)}
                  className={`flex items-center justify-between w-full px-5 py-4 rounded-xl border transition-all duration-300 ${
                    frequency === freq.label 
                      ? 'bg-volt border-volt text-black' 
                      : 'bg-zinc-900 border-transparent text-white hover:bg-zinc-800'
                  }`}
                >
                  <div className="text-left">
                    <p className="font-bold text-sm font-sans">{freq.label}</p>
                    <p className={`text-xs font-sans ${frequency === freq.label ? 'text-black/60' : 'text-subtle'}`}>{freq.sub}</p>
                  </div>
                  {frequency === freq.label && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              ))}
              <div className="mt-4">
                <CTAButton label="Continue" onClick={nextStep} disabled={!frequency} />
              </div>
            </div>
          </StepWrapper>
        )}

        {step === 5 && (
          <StepWrapper title="LOCATE YOUR ARENA." key="step5">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <div className={`flex items-center gap-3 rounded-xl px-4 py-1 transition-all duration-300 bg-surface border border-transparent focus-within:border-volt focus-within:shadow-[0_0_0_3px_rgba(192,255,0,0.08)]`}>
                  <input
                    type="text"
                    placeholder="City or Neighborhood"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent py-4 text-sm font-sans outline-none placeholder:text-muted"
                  />
                </div>
                
                <button 
                  onClick={handleGeo}
                  disabled={geoStatus === 'loading'}
                  className={`flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-sans font-bold transition-all ${
                    geoStatus === 'got' 
                      ? 'bg-zinc-900 text-volt' 
                      : 'bg-zinc-900 text-white hover:bg-zinc-800'
                  }`}
                >
                  {geoStatus === 'loading' ? 'Locating...' : geoStatus === 'got' ? 'Location Captured ✓' : 'Use Current Location'}
                </button>
              </div>
              <CTAButton label="Finish & Enter" onClick={nextStep} disabled={!location} />
            </div>
          </StepWrapper>
        )}

        {step === 6 && (
          <div className="animate-pop-in flex flex-col items-center text-center max-w-[432px]" key="step6">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-volt blur-[60px] opacity-40 rounded-full" />
              <div className="relative w-24 h-24 bg-volt rounded-full flex items-center justify-center text-black shadow-[0_0_40px_rgba(192,255,0,0.4)]">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>
            <h2 className="font-display text-4xl mb-4 tracking-tight text-white uppercase">WELCOME TO THE SQUAD.</h2>
            <p className="text-subtle font-sans mb-10">Your profile is ready. It's time to dominate the turf.</p>
            <CTAButton label="Go to Dashboard" onClick={() => onComplete({ location })} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
