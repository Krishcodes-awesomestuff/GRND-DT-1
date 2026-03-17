import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  Users, 
  BookOpen, 
  Bell, 
  MapPin, 
  ChevronRight, 
  X, 
  Calendar, 
  Clock, 
  Map as MapIcon,
  Trophy,
  CheckCircle2,
  UserPlus,
  Mail,
  LogOut,
  User,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  Share2,
  ShoppingBag,
  Heart,
  Star
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Dock } from '../ui/Dock';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DashboardProps {
  onLogout: () => void;
  onUpdateProfile: (data: { firstName: string; location: string }) => void;
  firstName?: string;
  location?: string;
}

type SubView = 'Home' | 'Explore' | 'Merch' | 'Community' | 'Profile' | 'Checkout';

export const Dashboard = ({ onLogout, onUpdateProfile, firstName = 'Player', location = 'Bangalore, India' }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<SubView>('Home');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinTeamModal, setShowJoinTeamModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  const [showGamesSelection, setShowGamesSelection] = useState(false);
  const [editName, setEditName] = useState(firstName);
  const [editLocation, setEditLocation] = useState(location);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [gamesSubmitted, setGamesSubmitted] = useState(false);
  
  const [showTeamsSelection, setShowTeamsSelection] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const [connectedPeople, setConnectedPeople] = useState<Set<number>>(new Set());
  const [joinedEvents, setJoinedEvents] = useState<Set<string>>(new Set());
  const [emailModalEvent, setEmailModalEvent] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState('');
  
  const [bag, setBag] = useState<string[]>([]);
  const [showBagModal, setShowBagModal] = useState(false);

  const [communityPosts, setCommunityPosts] = useState([
    { user: 'CricketFanatic', time: '2h ago', caption: 'Absolute banger of a match today at Lords Turf! The pitch was perfect and the energy was unmatched. 🏏🔥', type: 'Good Experience', votes: 142, comments: 24, img: 'cricket-stadium' },
    { user: 'Runner4Life', time: '5h ago', caption: 'Avoid Cubbon Park for the next few days. The track is muddy and construction is blocking the main loop. Not a great run today. 🏃‍♂️🌧️', type: 'Bad Experience', votes: -12, comments: 8, img: 'muddy-running-track' },
    { user: 'TennisPro', time: '1d ago', caption: 'Finally mastered my backhand! Big thanks to the coach at Jayanagar. If anyone wants to hit some balls, hmu! 🎾', type: 'Good Experience', votes: 89, comments: 15, img: 'tennis-action' },
    { user: 'GoalGetter', time: '2d ago', caption: 'The refereeing at the HSR tournament was questionable at best. Ruined what could have been a great final. ⚽😤', type: 'Bad Experience', votes: 45, comments: 32, img: 'soccer-match-referee' },
    { user: 'YogaSoul', time: '3d ago', caption: 'Sunrise yoga at the beach was the reset I needed. Highly recommend the early morning sessions. 🧘‍♀️✨', type: 'Good Experience', votes: 210, comments: 12, img: 'sunrise-yoga-beach' }
  ]);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [newPostCaption, setNewPostCaption] = useState('');
  const [newPostImg, setNewPostImg] = useState('');
  const [newPostType, setNewPostType] = useState<'Good Experience' | 'Bad Experience'>('Good Experience');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleGameSelection = (gameId: string) => {
    if (gamesSubmitted) return;
    setSelectedGames(prev => {
      if (prev.includes(gameId)) return prev.filter(id => id !== gameId);
      if (prev.length >= 2) return prev;
      return [...prev, gameId];
    });
  };

  const handleConnect = (id: number) => {
    showToast("Connecting...");
    setTimeout(() => {
      setConnectedPeople(prev => new Set(prev).add(id));
      showToast("Will be your friend once they accept your invite");
    }, 1000);
  };

  const handleJoinEvent = (eventId: string) => {
    if (joinedEvents.has(eventId)) return;
    setEmailModalEvent(eventId);
  };

  const addToBag = (item: string) => {
    setBag(prev => [...prev, item]);
    showToast(`${item} added to bag!`);
  };

  const submitEmail = () => {
    if (!emailInput || !emailModalEvent) return;
    setJoinedEvents(prev => new Set(prev).add(emailModalEvent));
    showToast("You will receive invite in inbox");
    setEmailModalEvent(null);
    setEmailInput('');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as SubView);
    setShowProfileMenu(false);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({ firstName: editName, location: editLocation });
    setShowEditProfileModal(false);
    showToast("Profile updated successfully!");
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostCaption) return;
    
    const newPost = {
      user: firstName,
      time: 'Just now',
      caption: newPostCaption,
      type: newPostType,
      votes: 0,
      comments: 0,
      img: newPostImg || 'sports-generic'
    };
    
    setCommunityPosts([newPost, ...communityPosts]);
    setShowCreatePostModal(false);
    setNewPostCaption('');
    setNewPostImg('');
    showToast("Post shared with the squad!");
  };

  if (activeTab === 'Checkout') {
    return (
      <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
        <Trophy className="w-16 h-16 text-volt mb-6" />
        <h1 className="font-display text-6xl mb-4 italic">CHECKOUT</h1>
        <p className="text-zinc-500 mb-8 font-sans">Simulation: Processing your game creation payment...</p>
        <button onClick={() => setActiveTab('Home')} className="px-8 py-3 bg-volt text-black font-bold rounded-full">FINISH</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-volt selection:text-black">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => setActiveTab('Home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-volt rounded-lg flex items-center justify-center text-black shadow-[0_0_15px_rgba(192,255,0,0.3)] group-hover:scale-110 transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="font-display text-2xl tracking-tighter">GRND</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-white/10 rounded-full shadow-[0_0_20px_rgba(192,255,0,0.05)] group cursor-default">
            <MapPin className="w-3.5 h-3.5 text-volt group-hover:animate-bounce" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">{location}</span>
          </div>

          <div className="flex items-center gap-4 relative">
            <button className="p-2 text-zinc-400 hover:text-volt transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-volt rounded-full border-2 border-black" />
            </button>
            <div 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-volt to-emerald-500 p-[2px] cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-[60]"
                >
                  <button 
                    onClick={() => handleTabChange('Profile')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <main className="pt-28 pb-32 px-6 max-w-7xl mx-auto">
        {activeTab === 'Home' && (
          <>
            {/* Hero Section */}
            <section className="mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.85] uppercase tracking-tighter mb-4">
                  HEY <span className="text-volt italic">{firstName}</span>,<br />
                  READY TO PLAY TODAY?
                </h1>
                <p className="text-zinc-500 font-sans text-lg max-w-2xl">
                  <span className="text-white font-bold">12 games</span> happening near you in the next few hours. Don't let the streak break.
                </p>
              </motion.div>
            </section>

            {/* Action Strip */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
              {[
                { id: 'Explore', label: 'Find a Game', icon: Search, desc: 'Join local matches', color: 'volt' },
                { id: 'create', label: 'Create a Game', icon: Plus, desc: 'Host your own arena', color: 'white' },
                { id: 'join', label: 'Join a Team', icon: Users, desc: 'Find your squad', color: 'white' },
                { id: 'Explore', label: 'Learn a Sport', icon: BookOpen, desc: 'Master new skills', color: 'white' }
              ].map((action, i) => (
                <motion.button
                  key={action.id + i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    if (action.id === 'Explore') handleTabChange('Explore');
                    if (action.id === 'create') setShowCreateModal(true);
                    if (action.id === 'join') setShowJoinTeamModal(true);
                  }}
                  className={cn(
                    "group relative p-6 rounded-3xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm text-left transition-all duration-500 hover:border-volt/30 hover:bg-zinc-900/60",
                    action.color === 'volt' && "border-volt/20 bg-volt/5"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                    action.color === 'volt' ? "bg-volt text-black shadow-[0_0_20px_rgba(192,255,0,0.4)]" : "bg-zinc-800 text-white"
                  )}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl uppercase mb-1">{action.label}</h3>
                  <p className="text-zinc-500 text-xs font-sans">{action.desc}</p>
                  <ChevronRight className="absolute bottom-6 right-6 w-5 h-5 text-zinc-700 group-hover:text-volt group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}
            </section>

            {/* Two Column Section: Your Games & Your Team */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
              {/* Your Games */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl uppercase tracking-tight">YOUR GAMES</h2>
                  {showGamesSelection && (
                    <span className="text-[10px] font-bold text-volt uppercase tracking-widest">
                      {selectedGames.length}/2 Selected
                    </span>
                  )}
                </div>
                
                <div className="min-h-[300px] rounded-3xl border border-dashed border-white/10 bg-zinc-900/20 flex flex-col items-center justify-center p-8 overflow-hidden relative">
                  {!showGamesSelection ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-4 mx-auto">
                        <Trophy className="w-6 h-6 text-zinc-700" />
                      </div>
                      <p className="text-zinc-500 text-sm mb-6 font-sans">No active games found. Ready to dominate?</p>
                      <button 
                        onClick={() => setShowGamesSelection(true)}
                        className="px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-volt transition-colors"
                      >
                        Join Game
                      </button>
                    </motion.div>
                  ) : (
                    <div className="w-full flex flex-col gap-3">
                      <div className="grid grid-cols-1 gap-3">
                        {[
                          { id: 'g1', sport: 'Cricket', time: 'Today, 6:00 PM', loc: 'Koramangala Turf' },
                          { id: 'g2', sport: 'Football', time: 'Tomorrow, 7:00 AM', loc: 'HSR Stadium' },
                          { id: 'g3', sport: 'Badminton', time: 'Wed, 8:00 PM', loc: 'Power Play' },
                          { id: 'g4', sport: 'Basketball', time: 'Fri, 5:30 PM', loc: 'Decathlon' }
                        ].map(game => {
                          const isSelected = selectedGames.includes(game.id);
                          const isMax = selectedGames.length >= 2 && !isSelected;
                          return (
                            <button
                              key={game.id}
                              disabled={isMax || gamesSubmitted}
                              onClick={() => handleGameSelection(game.id)}
                              className={cn(
                                "flex items-center justify-between p-4 rounded-2xl border transition-all duration-300",
                                isSelected 
                                  ? "bg-volt border-volt text-black" 
                                  : "bg-zinc-900/80 border-white/5 text-white hover:border-white/20",
                                isMax && "opacity-30 cursor-not-allowed grayscale"
                              )}
                            >
                              <div className="text-left">
                                <p className="font-bold text-sm uppercase">{game.sport}</p>
                                <p className={cn("text-[10px] font-medium", isSelected ? "text-black/60" : "text-zinc-500")}>
                                  {game.time} • {game.loc}
                                </p>
                              </div>
                              {isSelected && <CheckCircle2 className="w-5 h-5" />}
                            </button>
                          );
                        })}
                      </div>
                      {selectedGames.length > 0 && !gamesSubmitted && (
                        <button 
                          onClick={() => { setGamesSubmitted(true); showToast("Games submitted successfully!"); }}
                          className="w-full py-3 bg-volt text-black font-bold text-xs uppercase tracking-widest rounded-xl hover:scale-[1.02] transition-all mt-2"
                        >
                          Submit Selection
                        </button>
                      )}
                      {gamesSubmitted && (
                        <p className="text-center text-[10px] font-bold text-volt uppercase tracking-widest mt-2">Selection Locked</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Your Team */}
              <div className="space-y-6">
                <h2 className="font-display text-2xl uppercase tracking-tight">YOUR TEAM</h2>
                <div className="min-h-[300px] rounded-3xl border border-dashed border-white/10 bg-zinc-900/20 flex flex-col items-center justify-center p-8">
                  {!showTeamsSelection ? (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center mb-4 mx-auto">
                        <Users className="w-6 h-6 text-zinc-700" />
                      </div>
                      <p className="text-zinc-500 text-sm mb-6 font-sans">You haven't joined a squad yet.</p>
                      <button 
                        onClick={() => setShowTeamsSelection(true)}
                        className="px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-volt transition-colors"
                      >
                        Join Team
                      </button>
                    </motion.div>
                  ) : (
                    <div className="w-full grid grid-cols-2 gap-3">
                      {[
                        { id: 't1', name: 'Thunderbolts', level: 'Pro' },
                        { id: 't2', name: 'Apex Predators', level: 'Elite' },
                        { id: 't3', name: 'Shadow Strikers', level: 'Amateur' },
                        { id: 't4', name: 'Volt Warriors', level: 'Pro' }
                      ].map(team => {
                        const isSelected = selectedTeam === team.id;
                        const isBlocked = selectedTeam !== null && !isSelected;
                        return (
                          <button
                            key={team.id}
                            disabled={isBlocked}
                            onClick={() => setSelectedTeam(team.id)}
                            className={cn(
                              "p-5 rounded-2xl border flex flex-col items-center text-center transition-all duration-300",
                              isSelected 
                                ? "bg-volt border-volt text-black scale-105 shadow-[0_0_20px_rgba(192,255,0,0.2)]" 
                                : "bg-zinc-900/80 border-white/5 text-white hover:border-white/20",
                              isBlocked && "opacity-30 cursor-not-allowed grayscale"
                            )}
                          >
                            <div className={cn("w-10 h-10 rounded-full mb-3 flex items-center justify-center", isSelected ? "bg-black/10" : "bg-zinc-800")}>
                              <Users className="w-5 h-5" />
                            </div>
                            <p className="font-bold text-xs uppercase mb-1">{team.name}</p>
                            <p className={cn("text-[8px] font-bold uppercase tracking-widest", isSelected ? "text-black/40" : "text-zinc-600")}>
                              {team.level}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Happening Around You */}
            <section className="mb-20">
              <h2 className="font-display text-2xl uppercase tracking-tight mb-8">HAPPENING AROUND YOU</h2>
              <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar -mx-6 px-6">
                {[
                  { id: 'h1', sport: 'Cricket', loc: 'Indiranagar', time: '6:00 PM', players: '8/12', img: 'cricket' },
                  { id: 'h2', sport: 'Football', loc: 'Koramangala', time: '7:30 PM', players: '14/22', img: 'soccer' },
                  { id: 'h3', sport: 'Tennis', loc: 'Jayanagar', time: '5:00 PM', players: '1/2', img: 'tennis' },
                  { id: 'h4', sport: 'Volleyball', loc: 'Whitefield', time: '8:00 PM', players: '10/12', img: 'volleyball' }
                ].map((game, i) => {
                  const isJoined = joinedEvents.has(game.id);
                  return (
                    <div 
                      key={game.id}
                      className="min-w-[280px] bg-zinc-900/40 border border-white/5 rounded-3xl overflow-hidden group hover:border-volt/30 transition-all duration-500"
                    >
                      <div className="h-32 bg-zinc-800 relative overflow-hidden">
                        <img 
                          src={`https://picsum.photos/seed/${game.img}/400/200`} 
                          alt={game.sport} 
                          className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[10px] font-bold text-volt uppercase tracking-widest">
                          {game.sport}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs mb-4">
                          <MapPin className="w-3 h-3" />
                          <span>{game.loc}</span>
                          <span className="mx-1">•</span>
                          <Clock className="w-3 h-3" />
                          <span>{game.time}</span>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex -space-x-2">
                            {[1,2,3].map(n => (
                              <div key={n} className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center overflow-hidden">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${n+i}`} alt="p" className="w-full h-full" />
                              </div>
                            ))}
                            <div className="w-6 h-6 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[8px] font-bold text-zinc-500">
                              +{game.players.split('/')[0]}
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{game.players} PLAYERS</span>
                        </div>
                        <button 
                          disabled={isJoined}
                          onClick={() => handleJoinEvent(game.id)}
                          className={cn(
                            "w-full py-3 font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all",
                            isJoined 
                              ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                              : "bg-zinc-800 text-white hover:bg-volt hover:text-black"
                          )}
                        >
                          {isJoined ? "Joined" : "Join Game"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* People to Play With */}
            <section>
              <h2 className="font-display text-2xl uppercase tracking-tight mb-8">PEOPLE TO PLAY WITH</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: 1, name: 'Arjun K.', sport: 'Cricket', dist: '1.2 km' },
                  { id: 2, name: 'Sarah M.', sport: 'Tennis', dist: '0.8 km' },
                  { id: 3, name: 'Rahul V.', sport: 'Football', dist: '2.5 km' },
                  { id: 4, name: 'Priya S.', sport: 'Badminton', dist: '1.5 km' }
                ].map((person, i) => {
                  const isConnected = connectedPeople.has(person.id);
                  return (
                    <div 
                      key={person.id}
                      className="p-6 bg-zinc-900/40 border border-white/5 rounded-3xl flex flex-col items-center text-center group hover:border-volt/30 transition-all"
                    >
                      <div className="w-16 h-16 rounded-full bg-zinc-800 mb-4 overflow-hidden border-2 border-transparent group-hover:border-volt transition-all">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.name}`} alt={person.name} className="w-full h-full" />
                      </div>
                      <h4 className="font-bold text-sm mb-1">{person.name}</h4>
                      <p className="text-[10px] text-volt font-bold uppercase tracking-widest mb-4">{person.sport}</p>
                      <div className="flex items-center gap-1 text-zinc-500 text-[10px] mb-6">
                        <MapPin className="w-3 h-3" />
                        <span>{person.dist} away</span>
                      </div>
                      <button 
                        disabled={isConnected}
                        onClick={() => handleConnect(person.id)}
                        className={cn(
                          "w-full py-2 font-bold text-[10px] uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2",
                          isConnected
                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                            : "bg-zinc-800 text-white hover:bg-white hover:text-black"
                        )}
                      >
                        {!isConnected && <UserPlus className="w-3 h-3" />}
                        {isConnected ? "Waiting for approval" : "Connect"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {activeTab === 'Explore' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            <div className="space-y-12">
              <h1 className="font-display text-6xl uppercase italic tracking-tighter">EXPLORE THE <span className="text-volt">ARENA</span></h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: 'e1', title: 'Midnight Cricket Bash', type: 'Open Event', loc: 'Lords Turf', time: '11:00 PM', price: '₹200' },
                  { id: 'e2', title: 'Weekend Football Cup', type: 'Tournament', loc: 'HSR Stadium', time: '9:00 AM', price: '₹500' },
                  { id: 'e3', title: 'Badminton Mixer', type: 'Fun Activity', loc: 'Power Play', time: '6:00 PM', price: '₹150' },
                  { id: 'e4', title: 'Yoga in the Park', type: 'Wellness', loc: 'Cubbon Park', time: '6:30 AM', price: 'Free' },
                  { id: 'e5', title: 'Basketball 3v3', type: 'Open Event', loc: 'Decathlon', time: '5:00 PM', price: '₹100' },
                  { id: 'e6', title: 'Swimming Gala', type: 'Competition', loc: 'Kanteerava', time: '10:00 AM', price: '₹300' }
                ].map(event => {
                  const isJoined = joinedEvents.has(event.id);
                  return (
                    <div key={event.id} className="bg-zinc-900/40 border border-white/5 rounded-[32px] p-8 hover:border-volt/30 transition-all group">
                      <div className="flex justify-between items-start mb-6">
                        <div className="px-3 py-1 bg-volt/10 border border-volt/20 rounded-full text-[8px] font-bold text-volt uppercase tracking-widest">
                          {event.type}
                        </div>
                        <span className="text-white font-display text-xl">{event.price}</span>
                      </div>
                      <h3 className="font-display text-2xl uppercase mb-4 leading-tight">{event.title}</h3>
                      <div className="space-y-2 mb-8">
                        <div className="flex items-center gap-2 text-zinc-500 text-xs">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{event.loc}</span>
                        </div>
                        <div className="flex items-center gap-2 text-zinc-500 text-xs">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <button 
                        disabled={isJoined}
                        onClick={() => handleJoinEvent(event.id)}
                        className={cn(
                          "w-full py-4 font-bold text-xs uppercase tracking-widest rounded-2xl transition-all",
                          isJoined 
                            ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" 
                            : "bg-white text-black hover:bg-volt"
                        )}
                      >
                        {isJoined ? "Joined" : "Join Now"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Learn a Sport Section */}
            <div className="space-y-12">
              <h2 className="font-display text-4xl uppercase tracking-tight border-l-4 border-volt pl-4">LEARN A <span className="text-volt">SPORT</span></h2>
              <p className="text-zinc-500 text-sm font-sans max-w-2xl -mt-8">Master your game with the best academies in Chennai. Professional coaching for all skill levels.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { id: 'a1', name: 'Chennai Cricket Academy', sport: 'Cricket', loc: 'Mylapore', rating: '4.8', img: 'cricket-academy' },
                  { id: 'a2', name: 'Elite Football School', sport: 'Football', loc: 'Adyar', rating: '4.9', img: 'football-academy' },
                  { id: 'a3', name: 'Smashers Badminton Club', sport: 'Badminton', loc: 'Velachery', rating: '4.7', img: 'badminton-academy' },
                  { id: 'a4', name: 'Ace Tennis Academy', sport: 'Tennis', loc: 'Nungambakkam', rating: '4.6', img: 'tennis-academy' },
                  { id: 'a5', name: 'Hoops Basketball Center', sport: 'Basketball', loc: 'Anna Nagar', rating: '4.8', img: 'basketball-academy' },
                  { id: 'a6', name: 'Aqua Swimmers Hub', sport: 'Swimming', loc: 'Besant Nagar', rating: '4.5', img: 'swimming-academy' }
                ].map((academy) => (
                  <div key={academy.id} className="bg-zinc-900/40 border border-white/5 rounded-[32px] overflow-hidden group hover:border-volt/30 transition-all">
                    <div className="h-48 bg-zinc-800 relative overflow-hidden">
                      <img 
                        src={`https://picsum.photos/seed/${academy.img}/600/400`} 
                        alt={academy.name} 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-volt uppercase tracking-widest">
                        {academy.sport}
                      </div>
                      <div className="absolute bottom-4 right-4 px-2 py-1 bg-volt text-black rounded-lg text-[10px] font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {academy.rating}
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="font-display text-2xl uppercase mb-2 leading-tight">{academy.name}</h3>
                      <div className="flex items-center gap-2 text-zinc-500 text-xs mb-8">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{academy.loc}, Chennai</span>
                      </div>
                      <button className="w-full py-4 bg-zinc-800 text-white font-bold text-xs uppercase tracking-widest rounded-2xl hover:bg-volt hover:text-black transition-all">
                        View Programs
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'Merch' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            <div className="flex items-center justify-between">
              <h1 className="font-display text-6xl uppercase italic tracking-tighter">GRND <span className="text-volt">GEAR</span></h1>
              <button 
                onClick={() => setShowBagModal(true)}
                className="relative p-4 bg-zinc-900 border border-white/10 rounded-2xl hover:border-volt transition-all group"
              >
                <ShoppingBag className="w-6 h-6 text-zinc-400 group-hover:text-volt" />
                {bag.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-volt text-black text-[10px] font-bold rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(192,255,0,0.4)]">
                    {bag.length}
                  </span>
                )}
              </button>
            </div>
            
            {[
              { title: 'Apparel', sections: [
                { name: 'Tees', items: [
                  { name: 'Volt Performance Tee', img: 'sport-tee-volt' },
                  { name: 'Classic GRND Black', img: 'sport-tee-black' },
                  { name: 'Mesh Training Top', img: 'sport-tee-mesh' }
                ]},
                { name: 'Shorts', items: [
                  { name: 'Aero-Flow Shorts', img: 'sport-shorts-1' },
                  { name: 'Compression 2-in-1', img: 'sport-shorts-2' },
                  { name: 'Court Shorts', img: 'sport-shorts-3' }
                ]},
                { name: 'Shoes', items: [
                  { name: 'Volt Runner X1', img: 'sport-shoes-1' },
                  { name: 'Court Pro Low', img: 'sport-shoes-2' },
                  { name: 'All-Terrain Boots', img: 'sport-shoes-3' }
                ]}
              ]},
              { title: 'Accessories', sections: [
                { name: 'Training', items: [
                  { name: 'Skipping Rope Pro', img: 'jump-rope' },
                  { name: 'Adjustable Dumbbells', img: 'dumbbells' },
                  { name: 'Yoga Mat Elite', img: 'yoga-mat' }
                ]},
                { name: 'Hydration', items: [
                  { name: 'Insulated Waterbottle', img: 'water-bottle' },
                  { name: 'Shaker Pro', img: 'shaker-bottle' },
                  { name: 'Hydration Pack', img: 'hydration-pack' }
                ]}
              ]}
            ].map((cat, i) => (
              <div key={i} className="space-y-8">
                <h2 className="font-display text-3xl uppercase tracking-tight border-l-4 border-volt pl-4">{cat.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cat.sections.map((sec, j) => (
                    <div key={j} className="space-y-4">
                      <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest ml-1">{sec.name}</h3>
                      <div className="space-y-3">
                        {sec.items.map((item, k) => (
                          <div key={k} className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:border-white/20 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center overflow-hidden">
                                <img 
                                  src={`https://picsum.photos/seed/${item.img}/100/100`} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform"
                                  referrerPolicy="no-referrer"
                                />
                              </div>
                              <span className="text-sm font-bold">{item.name}</span>
                            </div>
                            <button 
                              onClick={() => addToBag(item.name)}
                              className="p-2 text-zinc-700 hover:text-volt transition-colors"
                            >
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'Community' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-8">
            <div className="flex flex-col items-center gap-6 mb-12">
              <h1 className="font-display text-6xl uppercase italic tracking-tighter text-center">THE <span className="text-volt">SQUAD</span></h1>
              <button 
                onClick={() => setShowCreatePostModal(true)}
                className="px-8 py-4 bg-volt text-black font-bold uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(192,255,0,0.2)] flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Share Experience
              </button>
            </div>
            
            {communityPosts.map((post, i) => (
              <div key={i} className="bg-zinc-900/40 border border-white/5 rounded-[32px] overflow-hidden hover:border-white/10 transition-all">
                <div className="p-6 flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1 bg-black/40 rounded-xl p-2 min-w-[40px]">
                    <button className="text-zinc-500 hover:text-volt transition-colors"><ArrowUp className="w-5 h-5" /></button>
                    <span className="text-xs font-bold">{post.votes}</span>
                    <button className="text-zinc-500 hover:text-red-500 transition-colors"><ArrowDown className="w-5 h-5" /></button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user}`} alt="u" />
                        </div>
                        <span className="text-xs font-bold">{post.user}</span>
                        <span className="text-zinc-600 text-[10px]">• {post.time}</span>
                      </div>
                      <div className={cn(
                        "px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest",
                        post.type === 'Good Experience' ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                      )}>
                        {post.type}
                      </div>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">{post.caption}</p>
                    <div className="aspect-video bg-zinc-800 rounded-2xl overflow-hidden">
                      <img src={`https://picsum.photos/seed/${post.img}/800/450`} alt="post" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex items-center gap-6 pt-2">
                      <button className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs">
                        <MessageSquare className="w-4 h-4" />
                        {post.comments} Comments
                      </button>
                      <button className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'Profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto space-y-12">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-volt to-emerald-500 p-1">
                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h1 className="font-display text-4xl uppercase tracking-tighter">{firstName}</h1>
                <p className="text-zinc-500 text-sm font-sans flex items-center justify-center gap-2 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-volt" />
                  {location}
                </p>
              </div>
              <button 
                onClick={() => setShowEditProfileModal(true)}
                className="px-6 py-2 bg-zinc-900 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Edit Profile
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Games Played', value: '24', icon: Trophy },
                { label: 'Connections', value: '152', icon: Users },
                { label: 'GRND Rank', value: '#42', icon: Trophy }
              ].map((stat, i) => (
                <div key={i} className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 text-center">
                  <stat.icon className="w-5 h-5 text-volt mx-auto mb-3" />
                  <p className="text-2xl font-display mb-1">{stat.value}</p>
                  <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest ml-1">Favorite Sports</h3>
              <div className="flex flex-wrap gap-2">
                {['Cricket', 'Football', 'Badminton'].map((sport) => (
                  <span key={sport} className="px-4 py-2 bg-volt/10 border border-volt/20 rounded-full text-xs font-bold text-volt uppercase tracking-widest">
                    {sport}
                  </span>
                ))}
                <button className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-full text-xs font-bold text-zinc-500 hover:text-white transition-all">
                  + Add More
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest ml-1">Settings</h3>
              <div className="bg-zinc-900/40 border border-white/5 rounded-[32px] overflow-hidden">
                {[
                  { label: 'Account Security', icon: User },
                  { label: 'Notifications', icon: Bell },
                  { label: 'Privacy Policy', icon: X },
                  { label: 'Help & Support', icon: MessageSquare }
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-4">
                      <item.icon className="w-5 h-5 text-zinc-600" />
                      <span className="text-sm font-bold">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-800" />
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={onLogout}
              className="w-full py-4 bg-red-500/10 text-red-500 font-bold uppercase tracking-widest rounded-2xl hover:bg-red-500 hover:text-white transition-all"
            >
              Log Out
            </button>
          </motion.div>
        )}
      </main>

      {/* Modals */}
      <AnimatePresence>
        {emailModalEvent && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEmailModalEvent(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-[32px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="w-16 h-16 rounded-2xl bg-volt/10 flex items-center justify-center mb-6 mx-auto">
                <Mail className="w-8 h-8 text-volt" />
              </div>
              <h2 className="font-display text-2xl uppercase text-center mb-2">SECURE YOUR SPOT</h2>
              <p className="text-zinc-500 text-xs text-center mb-8">Enter your email to receive the official invitation and game details.</p>
              
              <div className="space-y-4">
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" 
                />
                <button 
                  onClick={submitEmail}
                  className="w-full py-4 bg-volt text-black font-bold uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  Send Invite
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showEditProfileModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditProfileModal(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-[32px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <button 
                onClick={() => setShowEditProfileModal(false)}
                className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="font-display text-2xl uppercase text-center mb-8 tracking-tight">EDIT PROFILE</h2>
              
              <form className="space-y-6" onSubmit={handleUpdateProfile}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Display Name</label>
                  <input 
                    type="text" 
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Enter your name" 
                    className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Location</label>
                  <input 
                    type="text" 
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="e.g. Bangalore, India" 
                    className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" 
                    required 
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-volt text-black font-bold uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(192,255,0,0.2)]"
                >
                  Save Changes
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {showBagModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBagModal(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-[32px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <button 
                onClick={() => setShowBagModal(false)}
                className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-16 h-16 rounded-2xl bg-volt/10 flex items-center justify-center mb-6 mx-auto">
                <ShoppingBag className="w-8 h-8 text-volt" />
              </div>
              <h2 className="font-display text-2xl uppercase text-center mb-2">YOUR BAG</h2>
              <p className="text-zinc-500 text-xs text-center mb-8">{bag.length} items ready for checkout</p>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar pr-2">
                {bag.length === 0 ? (
                  <p className="text-center text-zinc-600 py-8 italic">Your bag is empty.</p>
                ) : (
                  bag.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                      <span className="text-sm font-bold text-white">{item}</span>
                      <button 
                        onClick={() => setBag(prev => prev.filter((_, i) => i !== idx))}
                        className="text-zinc-600 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {bag.length > 0 && (
                <button 
                  onClick={() => { setShowBagModal(false); showToast("Checkout successful!"); setBag([]); }}
                  className="w-full py-4 bg-volt text-black font-bold uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all mt-8"
                >
                  Checkout Now
                </button>
              )}
            </motion.div>
          </div>
        )}

        {showCreatePostModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreatePostModal(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-[32px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <button 
                onClick={() => setShowCreatePostModal(false)}
                className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="font-display text-2xl uppercase text-center mb-8 tracking-tight">SHARE WITH THE <span className="text-volt">SQUAD</span></h2>
              
              <form className="space-y-6" onSubmit={handleCreatePost}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">What's on your mind?</label>
                  <textarea 
                    value={newPostCaption}
                    onChange={(e) => setNewPostCaption(e.target.value)}
                    placeholder="Share your experience..." 
                    className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all min-h-[120px] resize-none" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button"
                    onClick={() => setNewPostType('Good Experience')}
                    className={cn(
                      "py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                      newPostType === 'Good Experience' 
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-500" 
                        : "bg-black border-white/5 text-zinc-500"
                    )}
                  >
                    Good Experience
                  </button>
                  <button 
                    type="button"
                    onClick={() => setNewPostType('Bad Experience')}
                    className={cn(
                      "py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all",
                      newPostType === 'Bad Experience' 
                        ? "bg-red-500/10 border-red-500 text-red-500" 
                        : "bg-black border-white/5 text-zinc-500"
                    )}
                  >
                    Bad Experience
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Image Keyword (for Picsum)</label>
                  <input 
                    type="text" 
                    value={newPostImg}
                    onChange={(e) => setNewPostImg(e.target.value)}
                    placeholder="e.g. football, stadium, running" 
                    className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" 
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-volt text-black font-bold uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(192,255,0,0.2)]"
                >
                  Post to Squad
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {showCreateModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[32px] p-8 overflow-y-auto max-h-[90vh] no-scrollbar shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <button 
                onClick={() => setShowCreateModal(false)}
                className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="font-display text-3xl uppercase mb-8 tracking-tight">CREATE A GAME</h2>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setActiveTab('Checkout'); setShowCreateModal(false); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Game Name</label>
                  <input type="text" placeholder="Enter game name" className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" required />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Sports Category</label>
                  <select className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all appearance-none" required>
                    <option value="">Select Sport</option>
                    <option value="cricket">Cricket</option>
                    <option value="football">Football</option>
                    <option value="badminton">Badminton</option>
                    <option value="tennis">Tennis</option>
                    <option value="volleyball">Volleyball</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Start Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input type="date" className="w-full bg-black border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-volt outline-none transition-all" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">End Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input type="date" className="w-full bg-black border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-volt outline-none transition-all" required />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Start Time</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input type="time" className="w-full bg-black border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-volt outline-none transition-all" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">End Time</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input type="time" className="w-full bg-black border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-volt outline-none transition-all" required />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Location</label>
                    <input type="text" placeholder="City" className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Ground Name</label>
                    <input type="text" placeholder="Venue" className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Pay</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-volt font-bold">₹</span>
                    <input type="number" placeholder="300" className="w-full bg-black border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm focus:border-volt outline-none transition-all" required />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-volt text-black font-bold uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(192,255,0,0.2)]">
                  Proceed to Checkout
                </button>
              </form>
            </motion.div>
          </div>
        )}

        {showJoinTeamModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowJoinTeamModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-[32px] p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <button 
                onClick={() => setShowJoinTeamModal(false)}
                className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="font-display text-3xl uppercase mb-8 tracking-tight">JOIN A SQUAD</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">What should we call you?</label>
                  <input type="text" placeholder="Enter nickname" className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Enter Team Code</label>
                  <input type="text" placeholder="e.g. GRND-123" className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" />
                </div>

                <button 
                  onClick={() => { setShowJoinTeamModal(false); showToast("Request sent to team captain!"); }}
                  className="w-full py-4 bg-volt text-black font-bold uppercase tracking-widest rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(192,255,0,0.2)]"
                >
                  Submit Request
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Toast Notification */}
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-4 bg-volt text-black font-bold text-xs uppercase tracking-widest rounded-2xl shadow-[0_20px_40px_rgba(192,255,0,0.3)] flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <Dock activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};
