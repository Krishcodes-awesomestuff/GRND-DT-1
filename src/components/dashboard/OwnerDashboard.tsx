import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  DollarSign, 
  Tag, 
  ShoppingBag, 
  CreditCard, 
  LogOut, 
  Plus, 
  Clock, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  ChevronRight,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Tab = 'Overview' | 'Schedule' | 'Bookings' | 'Pricing' | 'Merch' | 'Billing';
type ModalType = 'booking' | 'merch' | 'offer' | 'none';

export const OwnerDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState<Tab>('Overview');
  const [toast, setToast] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalType>('none');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  // Dynamic State
  const [balance, setBalance] = useState(8420);
  const [searchQuery, setSearchQuery] = useState('');
  const [merchItems, setMerchItems] = useState([
    { name: 'Goundapadi Jersey', price: '₹899', stock: 24, sales: 142, img: 'jersey' },
    { name: 'Training Bibs (Set)', price: '₹1,200', stock: 8, sales: 45, img: 'bibs' },
    { name: 'Pro Football', price: '₹1,499', stock: 12, sales: 89, img: 'football' },
    { name: 'Turf Socks', price: '₹299', stock: 56, sales: 210, img: 'socks' },
    { name: 'Water Bottle', price: '₹499', stock: 32, sales: 67, img: 'bottle' },
  ]);
  const [offers, setOffers] = useState([
    { title: 'Early Bird Special', desc: '20% off for slots before 8 AM', code: 'EARLY20', active: true },
    { title: 'Weekend Rush', desc: 'Flat ₹200 off on Sunday evenings', code: 'SUN200', active: true },
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handlePayDues = () => {
    if (balance === 0) {
      showToast("No outstanding dues!");
      return;
    }
    showToast("Processing payment via GRND Gateway...");
    setTimeout(() => {
      setBalance(0);
      showToast("Payment Successful! Balance cleared.");
    }, 1500);
  };

  const handleAddMerch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newItem = {
      name: formData.get('name') as string,
      price: `₹${formData.get('price')}`,
      stock: parseInt(formData.get('stock') as string),
      sales: 0,
      img: 'new-item'
    };
    setMerchItems([newItem, ...merchItems]);
    setModal('none');
    showToast("New item added to inventory!");
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Booking created successfully!");
    setModal('none');
  };

  const stats = [
    { label: 'Total Revenue', value: '₹1,42,500', trend: '+12.5%', isUp: true, icon: DollarSign },
    { label: 'Total Bookings', value: '342', trend: '+8.2%', isUp: true, icon: Calendar },
    { label: 'Active Offers', value: offers.length.toString(), trend: '0%', isUp: true, icon: Tag },
    { label: 'Merch Sales', value: '₹24,800', trend: '-2.1%', isUp: false, icon: ShoppingBag },
  ];

  const bookings = [
    { id: 'B001', user: 'Rahul Sharma', time: '18:00 - 19:00', date: 'Today', status: 'Confirmed', amount: '₹1,200' },
    { id: 'B002', user: 'Priya Patel', time: '19:00 - 20:00', date: 'Today', status: 'Pending', amount: '₹1,200' },
    { id: 'B003', user: 'Amit Kumar', time: '20:00 - 21:00', date: 'Today', status: 'Confirmed', amount: '₹1,500' },
    { id: 'B004', user: 'Sneha Reddy', time: '07:00 - 08:00', date: 'Tomorrow', status: 'Confirmed', amount: '₹1,000' },
    { id: 'B005', user: 'Vikram Singh', time: '08:00 - 09:00', date: 'Tomorrow', status: 'Cancelled', amount: '₹0' },
  ];

  const timeSlots = [
    { time: '06:00 AM', status: 'Available', price: '₹800' },
    { time: '07:00 AM', status: 'Booked', price: '₹1,000' },
    { time: '08:00 AM', status: 'Booked', price: '₹1,000' },
    { time: '09:00 AM', status: 'Available', price: '₹1,000' },
    { time: '04:00 PM', status: 'Available', price: '₹1,200' },
    { time: '05:00 PM', status: 'Available', price: '₹1,200' },
    { time: '06:00 PM', status: 'Booked', price: '₹1,500' },
    { time: '07:00 PM', status: 'Booked', price: '₹1,500' },
    { time: '08:00 PM', status: 'Booked', price: '₹1,500' },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col bg-zinc-900/20 backdrop-blur-xl sticky top-0 h-screen">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-volt rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(192,255,0,0.2)]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl tracking-tighter leading-none">GRND</span>
              <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Partner Portal</span>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'Overview', icon: LayoutDashboard },
              { id: 'Schedule', icon: Clock },
              { id: 'Bookings', icon: Users },
              { id: 'Pricing', icon: Tag },
              { id: 'Merch', icon: ShoppingBag },
              { id: 'Billing', icon: CreditCard },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group",
                  activeTab === item.id 
                    ? "bg-volt text-black shadow-[0_10px_20px_rgba(192,255,0,0.1)]" 
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-black" : "text-zinc-500 group-hover:text-white")} />
                {item.id}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Goundapadi" alt="o" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold">Goundapadi Turf</span>
              <span className="text-[10px] text-zinc-500">Adayar, Chennai</span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-display text-4xl uppercase tracking-tight mb-2">Welcome back, <span className="text-volt">Partner</span></h1>
            <p className="text-zinc-500 text-sm">Here's what's happening at Goundapadi Turf today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search bookings..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900/50 border border-white/5 rounded-2xl pl-12 pr-6 py-3 text-sm focus:border-volt outline-none transition-all w-64"
              />
            </div>
            <button 
              onClick={() => setModal('booking')}
              className="p-3 bg-zinc-900 border border-white/5 rounded-2xl hover:border-white/20 transition-all relative"
            >
              <Plus className="w-6 h-6 text-zinc-400" />
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'Bookings' && (
            <motion.div 
              key="bookings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-4xl uppercase tracking-tight">All <span className="text-volt">Bookings</span></h2>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-white/5 rounded-xl text-xs font-bold hover:border-white/20 transition-all">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button onClick={() => setModal('booking')} className="px-6 py-3 bg-volt text-black font-bold uppercase tracking-widest text-xs rounded-xl flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Booking
                  </button>
                </div>
              </div>

              <div className="bg-zinc-900/40 border border-white/5 rounded-[32px] overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-black/20">
                      <th className="px-8 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Booking ID</th>
                      <th className="px-8 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Player</th>
                      <th className="px-8 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Date & Time</th>
                      <th className="px-8 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Amount</th>
                      <th className="px-8 py-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...bookings, ...bookings]
                      .filter(b => b.user.toLowerCase().includes(searchQuery.toLowerCase()) || b.id.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map((booking, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6 text-xs font-mono text-zinc-500">#{booking.id}{i}</td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden border border-white/5">
                              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.user}${i}`} alt="u" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold">{booking.user}</span>
                              <span className="text-[10px] text-zinc-500">+91 98765 43210</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold">{booking.date}</span>
                            <span className="text-[10px] text-zinc-500 uppercase tracking-widest">{booking.time}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={cn(
                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                            booking.status === 'Confirmed' ? "bg-emerald-500/10 text-emerald-500" : 
                            booking.status === 'Pending' ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                          )}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-white">{booking.amount}</td>
                        <td className="px-8 py-6 text-right">
                          <button onClick={() => showToast("Opening booking options...")} className="p-2 text-zinc-600 hover:text-white transition-colors">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'Overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-zinc-900/40 border border-white/5 rounded-[32px] p-8 group hover:border-volt/30 transition-all cursor-pointer" onClick={() => showToast(`Viewing ${stat.label} details...`)}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-black/40 rounded-2xl flex items-center justify-center text-volt group-hover:scale-110 transition-transform">
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg",
                        stat.isUp ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                      )}>
                        {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {stat.trend}
                      </div>
                    </div>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                    <h3 className="text-3xl font-display uppercase tracking-tight">{stat.value}</h3>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Recent Bookings */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-2xl uppercase tracking-tight">Recent <span className="text-volt">Bookings</span></h2>
                    <button onClick={() => setActiveTab('Bookings')} className="text-volt text-xs font-bold uppercase tracking-widest hover:underline">View All</button>
                  </div>
                  <div className="bg-zinc-900/40 border border-white/5 rounded-[32px] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-black/20">
                          <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">User</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Time</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Status</th>
                          <th className="px-8 py-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer" onClick={() => showToast(`Booking ID: ${booking.id}`)}>
                            <td className="px-8 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden">
                                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${booking.user}`} alt="u" />
                                </div>
                                <span className="text-sm font-bold">{booking.user}</span>
                              </div>
                            </td>
                            <td className="px-8 py-4 text-xs text-zinc-400">{booking.time}</td>
                            <td className="px-8 py-4">
                              <span className={cn(
                                "px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest",
                                booking.status === 'Confirmed' ? "bg-emerald-500/10 text-emerald-500" : 
                                booking.status === 'Pending' ? "bg-amber-500/10 text-amber-500" : "bg-red-500/10 text-red-500"
                              )}>
                                {booking.status}
                              </span>
                            </td>
                            <td className="px-8 py-4 text-sm font-bold text-white">{booking.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                  <h2 className="font-display text-2xl uppercase tracking-tight">Quick <span className="text-volt">Actions</span></h2>
                  <div className="space-y-4">
                    {[
                      { label: 'Create New Offer', icon: Tag, color: 'text-volt', bg: 'bg-volt/10', action: () => setModal('offer') },
                      { label: 'Update Pricing', icon: DollarSign, color: 'text-blue-500', bg: 'bg-blue-500/10', action: () => setActiveTab('Pricing') },
                      { label: 'Add Merch Item', icon: ShoppingBag, color: 'text-purple-500', bg: 'bg-purple-500/10', action: () => setModal('merch') },
                      { label: 'View Analytics', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10', action: () => showToast("Analytics report generated!") },
                    ].map((action, i) => (
                      <button 
                        key={i} 
                        onClick={action.action}
                        className="w-full p-6 bg-zinc-900/40 border border-white/5 rounded-3xl flex items-center justify-between group hover:border-white/20 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", action.bg, action.color)}>
                            <action.icon className="w-6 h-6" />
                          </div>
                          <span className="text-sm font-bold">{action.label}</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Schedule' && (
            <motion.div 
              key="schedule"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-4xl uppercase tracking-tight">Daily <span className="text-volt">Schedule</span></h2>
                <div className="flex items-center gap-2 bg-zinc-900 border border-white/5 rounded-2xl p-1">
                  <button className="px-4 py-2 bg-zinc-800 rounded-xl text-xs font-bold">Today</button>
                  <button className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-white">Tomorrow</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {timeSlots.map((slot, i) => (
                  <div 
                    key={i} 
                    onClick={() => {
                      if (slot.status === 'Available') {
                        setSelectedSlot(slot.time);
                        setModal('booking');
                      }
                    }}
                    className={cn(
                      "p-8 rounded-[32px] border transition-all group relative overflow-hidden cursor-pointer",
                      slot.status === 'Booked' 
                        ? "bg-zinc-900/40 border-white/5 opacity-60" 
                        : "bg-black border-white/10 hover:border-volt/50"
                    )}
                  >
                    <div className="flex justify-between items-start mb-8">
                      <div className="space-y-1">
                        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Time Slot</p>
                        <h3 className="text-2xl font-display uppercase">{slot.time}</h3>
                      </div>
                      <div className={cn(
                        "px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest",
                        slot.status === 'Booked' ? "bg-red-500/10 text-red-500" : "bg-volt/10 text-volt"
                      )}>
                        {slot.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-display text-white">{slot.price}</span>
                      {slot.status === 'Available' && (
                        <div className="p-3 bg-volt text-black rounded-xl group-hover:scale-110 transition-transform">
                          <Plus className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'Pricing' && (
            <motion.div 
              key="pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl space-y-12"
            >
              <div className="space-y-6">
                <h2 className="font-display text-4xl uppercase tracking-tight">Set <span className="text-volt">Prices</span></h2>
                <div className="bg-zinc-900/40 border border-white/5 rounded-[32px] p-8 space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Weekday Morning (6am-4pm)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">₹</span>
                        <input type="number" defaultValue={1000} className="w-full bg-black border border-white/5 rounded-xl pl-8 pr-4 py-3 text-sm focus:border-volt outline-none transition-all" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Weekday Evening (4pm-11pm)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">₹</span>
                        <input type="number" defaultValue={1500} className="w-full bg-black border border-white/5 rounded-xl pl-8 pr-4 py-3 text-sm focus:border-volt outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => showToast("Base pricing updated for all slots!")}
                    className="w-full py-4 bg-volt text-black font-bold uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all"
                  >
                    Update Base Pricing
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="font-display text-4xl uppercase tracking-tight">Active <span className="text-volt">Offers</span></h2>
                <div className="grid grid-cols-1 gap-4">
                  {offers.map((offer, i) => (
                    <div key={i} className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-bold text-sm">{offer.title}</h3>
                        <p className="text-xs text-zinc-500">{offer.desc}</p>
                        <code className="text-[10px] bg-black px-2 py-1 rounded text-volt font-mono">{offer.code}</code>
                      </div>
                      <div className="flex items-center gap-4">
                        <div 
                          onClick={() => {
                            const newOffers = [...offers];
                            newOffers[i].active = !newOffers[i].active;
                            setOffers(newOffers);
                            showToast(`Offer ${newOffers[i].active ? 'activated' : 'deactivated'}`);
                          }}
                          className={cn(
                            "w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors",
                            offer.active ? "bg-volt" : "bg-zinc-800"
                          )}
                        >
                          <motion.div 
                            animate={{ x: offer.active ? 24 : 0 }}
                            className="w-4 h-4 bg-black rounded-full" 
                          />
                        </div>
                        <button className="text-zinc-600 hover:text-white transition-colors"><MoreVertical className="w-5 h-5" /></button>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={() => setModal('offer')}
                    className="w-full py-4 border border-dashed border-white/10 rounded-2xl text-zinc-500 font-bold uppercase tracking-widest text-xs hover:border-volt hover:text-volt transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create New Offer
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Billing' && (
            <motion.div 
              key="billing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <h2 className="font-display text-4xl uppercase tracking-tight">Platform <span className="text-volt">Dues</span></h2>
                  <div className="bg-zinc-900/40 border border-white/5 rounded-[32px] p-8 space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-volt/5 blur-3xl rounded-full -mr-16 -mt-16" />
                    <div className="space-y-2">
                      <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Outstanding Balance</p>
                      <h3 className="text-5xl font-display text-volt tracking-tighter">₹{balance.toLocaleString()}</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500">Platform Fee (5%)</span>
                        <span className="font-bold">₹{(balance * 0.85).toFixed(0)}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-500">Marketing Dues</span>
                        <span className="font-bold">₹{(balance * 0.15).toFixed(0)}</span>
                      </div>
                      <div className="h-px bg-white/5" />
                      <div className="flex justify-between text-sm font-bold">
                        <span>Total Due</span>
                        <span className="text-volt">₹{balance.toLocaleString()}</span>
                      </div>
                    </div>
                    <button 
                      onClick={handlePayDues}
                      className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-2xl hover:bg-volt transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={balance === 0}
                    >
                      {balance === 0 ? "All Paid" : "Pay Now"}
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="font-display text-4xl uppercase tracking-tight">Payment <span className="text-volt">History</span></h2>
                  <div className="space-y-4">
                    {[
                      { date: 'Mar 01, 2026', amount: '₹12,400', status: 'Paid', id: 'INV-042' },
                      { date: 'Feb 01, 2026', amount: '₹10,800', status: 'Paid', id: 'INV-041' },
                      { date: 'Jan 01, 2026', amount: '₹9,200', status: 'Paid', id: 'INV-040' },
                    ].map((inv, i) => (
                      <div key={i} className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 flex items-center justify-between group hover:border-white/10 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-zinc-500">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-bold">{inv.amount}</p>
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{inv.date}</p>
                          </div>
                        </div>
                        <button className="p-2 text-zinc-600 hover:text-white transition-colors">
                          <ArrowUpRight className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Merch' && (
            <motion.div 
              key="merch"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-display text-4xl uppercase tracking-tight">Turf <span className="text-volt">Inventory</span></h2>
                <button 
                  onClick={() => setModal('merch')}
                  className="px-6 py-3 bg-volt text-black font-bold uppercase tracking-widest text-xs rounded-xl flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {merchItems.map((item, i) => (
                  <div key={i} className="bg-zinc-900/40 border border-white/5 rounded-[32px] overflow-hidden group hover:border-volt/30 transition-all">
                    <div className="h-48 bg-zinc-800 relative overflow-hidden">
                      <img 
                        src={`https://picsum.photos/seed/${item.img}/600/400`} 
                        alt={item.name} 
                        className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                        {item.stock} in stock
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="font-display text-2xl uppercase leading-tight">{item.name}</h3>
                        <span className="text-volt font-display text-xl">{item.price}</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Total Sales</span>
                          <span className="text-sm font-bold">{item.sales} units</span>
                        </div>
                        <button 
                          onClick={() => showToast(`Managing ${item.name}...`)}
                          className="p-2 text-zinc-500 hover:text-white transition-colors"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {modal !== 'none' && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModal('none')}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[32px] p-10 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-volt/10 blur-3xl rounded-full -mr-16 -mt-16" />
              
              {modal === 'booking' && (
                <form onSubmit={handleCreateBooking} className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-display uppercase tracking-tight">New <span className="text-volt">Booking</span></h2>
                    <p className="text-zinc-500 text-sm">Create a manual booking for {selectedSlot}.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Player Name</label>
                      <input required name="name" type="text" placeholder="e.g. Rahul Sharma" className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Phone Number</label>
                      <input required name="phone" type="tel" placeholder="+91 98765 43210" className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setModal('none')} className="flex-1 py-4 bg-zinc-800 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-zinc-700 transition-all">Cancel</button>
                    <button type="submit" className="flex-1 py-4 bg-volt text-black font-bold uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all">Confirm Booking</button>
                  </div>
                </form>
              )}

              {modal === 'merch' && (
                <form onSubmit={handleAddMerch} className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-display uppercase tracking-tight">Add <span className="text-volt">Inventory</span></h2>
                    <p className="text-zinc-500 text-sm">Add a new item to your turf shop.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Item Name</label>
                      <input required name="name" type="text" placeholder="e.g. Training Bibs" className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Price (₹)</label>
                        <input required name="price" type="number" placeholder="499" className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Initial Stock</label>
                        <input required name="stock" type="number" placeholder="10" className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setModal('none')} className="flex-1 py-4 bg-zinc-800 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-zinc-700 transition-all">Cancel</button>
                    <button type="submit" className="flex-1 py-4 bg-volt text-black font-bold uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all">Add to Shop</button>
                  </div>
                </form>
              )}

              {modal === 'offer' && (
                <form onSubmit={(e) => { e.preventDefault(); showToast("Offer created!"); setModal('none'); }} className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-display uppercase tracking-tight">Create <span className="text-volt">Offer</span></h2>
                    <p className="text-zinc-500 text-sm">Launch a new promotion for your players.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Offer Title</label>
                      <input required type="text" placeholder="e.g. Summer Slam" className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Promo Code</label>
                      <input required type="text" placeholder="SUMMER10" className="w-full bg-black border border-white/5 rounded-xl px-4 py-3 text-sm focus:border-volt outline-none transition-all" />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setModal('none')} className="flex-1 py-4 bg-zinc-800 text-white font-bold uppercase tracking-widest rounded-2xl hover:bg-zinc-700 transition-all">Cancel</button>
                    <button type="submit" className="flex-1 py-4 bg-volt text-black font-bold uppercase tracking-widest rounded-2xl hover:scale-[1.02] transition-all">Launch Offer</button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 bg-volt text-black font-bold rounded-full shadow-[0_10px_30px_rgba(192,255,0,0.3)] flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
