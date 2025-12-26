
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SeniorRegistry from './components/SeniorRegistry';
import NewRegistration from './components/NewRegistration';
import MedicalAlerts from './components/MedicalAlerts';
import SeniorDetailModal from './components/SeniorDetailModal';
import AuditLogs from './components/AuditLogs';
import BenefitsManagement from './components/BenefitsManagement';
import { SeniorCitizen, AuditLog } from './types';
import { mockSeniors } from './services/mockData';
import { Bell, Command } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [seniors, setSeniors] = useState<SeniorCitizen[]>([]);
  const [selectedSenior, setSelectedSenior] = useState<SeniorCitizen | null>(null);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Load initial data
  useEffect(() => {
    const savedSeniors = localStorage.getItem('seniors');
    const savedLogs = localStorage.getItem('auditLogs');
    
    if (savedSeniors) {
      setSeniors(JSON.parse(savedSeniors));
    } else {
      setSeniors(mockSeniors);
      localStorage.setItem('seniors', JSON.stringify(mockSeniors));
    }

    if (savedLogs) {
      setAuditLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleSaveSenior = (newSenior: Partial<SeniorCitizen>) => {
    const scid = `SC-2026-${String(seniors.length + 1).padStart(3, '0')}`;
    const fullSenior: SeniorCitizen = {
      ...(newSenior as SeniorCitizen),
      id: scid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const updated = [...seniors, fullSenior];
    setSeniors(updated);
    localStorage.setItem('seniors', JSON.stringify(updated));
    setActiveTab('registry');
    
    // Log action
    const log: AuditLog = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      userId: 'staff-01',
      userName: 'Municipal Operator',
      action: 'Registration',
      targetId: scid,
      details: `New Profile Created: ${fullSenior.firstName} ${fullSenior.lastName}`
    };
    const newLogs = [log, ...auditLogs];
    setAuditLogs(newLogs);
    localStorage.setItem('auditLogs', JSON.stringify(newLogs));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard seniors={seniors} onQuickAction={setActiveTab} />;
      case 'registry':
        return (
          <SeniorRegistry 
            seniors={seniors} 
            onView={(s) => setSelectedSenior(s)}
            onEdit={(s) => setSelectedSenior(s)}
          />
        );
      case 'registration':
        return <NewRegistration onSave={handleSaveSenior} onCancel={() => setActiveTab('dashboard')} />;
      case 'medical':
      case 'emergency':
        return <MedicalAlerts seniors={seniors} />;
      case 'audit':
        return <AuditLogs logs={auditLogs} />;
      case 'benefits':
        return <BenefitsManagement />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-48 animate-fadeIn">
             <div className="bg-white p-20 rounded-[4.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col items-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl"></div>
                <Command size={72} className="text-indigo-200 mb-8 relative z-10" />
                <h3 className="text-3xl font-black text-slate-800 tracking-tight relative z-10">Advanced Service</h3>
                <p className="text-slate-500 font-semibold text-center max-w-xs mt-3 relative z-10">The {activeTab.toUpperCase()} infrastructure is currently undergoing maintenance and security upgrades.</p>
                <button 
                  onClick={() => setActiveTab('dashboard')}
                  className="mt-10 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95 z-10"
                >
                  Return to Hub
                </button>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] flex selection:bg-indigo-600 selection:text-white">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-12 transition-all duration-500">
        <header className="mb-12 flex justify-between items-center glass-header px-10 py-6 rounded-[3rem] border border-white/80 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] sticky top-8 z-20">
          <div className="flex items-center space-x-6">
            <div className="bg-indigo-600 w-3 h-3 rounded-full animate-pulse shadow-[0_0_15px_rgba(79,70,229,0.8)]"></div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5">Official Network</p>
               <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">Brgy. Mapatag • Profiling System</p>
            </div>
          </div>

          <div className="flex items-center space-x-10">
            <div className="relative group cursor-pointer p-4 hover:bg-slate-100 rounded-[1.5rem] transition-all duration-300">
               <Bell size={22} className="text-slate-400 group-hover:text-indigo-600 group-hover:rotate-12 transition-all" />
               <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white shadow-sm ring-4 ring-rose-500/10"></div>
            </div>
            
            <div className="flex items-center space-x-5 pl-10 border-l border-slate-100">
               <div className="text-right hidden lg:block">
                  <p className="text-xs font-black text-slate-900 uppercase tracking-tighter">Admin Session</p>
                  <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Hamtic Municipality</p>
               </div>
               <div className="relative cursor-pointer group">
                 <img src="https://picsum.photos/seed/admin/100/100" className="w-14 h-14 rounded-[1.5rem] border-2 border-white shadow-2xl group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-indigo-200 transition-all duration-300" alt="User Avatar" />
                 <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-white w-5 h-5 rounded-full shadow-lg shadow-emerald-500/20"></div>
               </div>
            </div>
          </div>
        </header>

        <div className="relative">
          {renderContent()}
        </div>
      </main>

      {selectedSenior && (
        <SeniorDetailModal 
          senior={selectedSenior} 
          onClose={() => setSelectedSenior(null)} 
        />
      )}
    </div>
  );
};

export default App;
