import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Home, Compass, ShoppingBag, Users2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DockItemProps {
  icon: React.ComponentType<any>;
  label: string;
  active: boolean;
  onClick: () => void;
  key?: string;
}

const DockItem = ({ icon: Icon, label, active, onClick }: DockItemProps) => {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center p-3 transition-all duration-300"
    >
      <div className={cn(
        "relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
        active 
          ? "bg-volt text-black shadow-[0_0_20px_rgba(192,255,0,0.4)] scale-110 -translate-y-2" 
          : "text-zinc-500 hover:text-white hover:bg-zinc-800/50"
      )}>
        <Icon className="w-6 h-6" />
        
        {/* Label tooltip */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-900 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          {label}
        </div>
      </div>
      
      {/* Active Indicator Dot */}
      {active && (
        <motion.div 
          layoutId="dock-dot"
          className="absolute bottom-1 w-1 h-1 bg-volt rounded-full"
        />
      )}
    </button>
  );
};

interface DockProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Dock = ({ activeTab, onTabChange }: DockProps) => {
  const items = [
    { label: 'Home', icon: Home },
    { label: 'Explore', icon: Compass },
    { label: 'Merch', icon: ShoppingBag },
    { label: 'Community', icon: Users2 },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100]">
      <div className="flex items-center gap-2 p-2 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {items.map((item) => (
          <DockItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.label}
            onClick={() => onTabChange(item.label)}
          />
        ))}
      </div>
    </div>
  );
};
