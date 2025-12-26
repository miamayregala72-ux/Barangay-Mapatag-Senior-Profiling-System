
import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Stethoscope, 
  Gift, 
  ShieldAlert, 
  ClipboardList, 
  LogOut,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'registry', label: 'Registry', icon: Users },
    { id: 'registration', label: 'Registration', icon: UserPlus },
    { id: 'medical', label: 'Health Care', icon: Stethoscope },
    { id: 'benefits', label: 'Benefits', icon: Gift },
    { id: 'emergency', label: 'Emergency', icon: ShieldAlert },
    { id: 'audit', label: 'Audit Logs', icon: ClipboardList },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-white h-screen fixed left-0 top-0 flex flex-col z-30 overflow-hidden border-r border-white/5 shadow-2xl">
      {/* Branding */}
      <div className="p-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400/20">
            <span className="font-black text-xl italic">M</span>
          </div>
          <h1 className="text-lg font-bold tracking-tight">Brgy. Mapatag</h1>
        </div>
        <div className="space-y-1">
          <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.15em] leading-tight">
            Senior Citizen Information
          </p>
          <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.15em] leading-tight">
            & Profiling System
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
              activeTab === item.id 
                ? 'bg-indigo-600/10 text-white shadow-xl translate-x-1' 
                : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
            }`}
          >
            <item.icon size={20} className={activeTab === item.id ? 'text-indigo-400' : 'group-hover:text-indigo-400 transition-colors'} />
            <span className="font-semibold text-sm">{item.label}</span>
            {activeTab === item.id && (
              <div className="ml-auto w-1 h-5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer Actions */}
      <div className="p-6 space-y-2 mt-auto border-t border-white/5 bg-slate-950/50 backdrop-blur-sm">
        <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all text-sm font-medium">
          <Settings size={18} />
          <span>System Settings</span>
        </button>
        <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-rose-400/80 hover:bg-rose-500/10 hover:text-rose-400 rounded-xl transition-all text-sm font-medium group">
          <LogOut size={18} className="group-hover:-translate-x-0.5 transition-transform" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/10 blur-[90px] rounded-full pointer-events-none"></div>
    </aside>
  );
};

export default Sidebar;
