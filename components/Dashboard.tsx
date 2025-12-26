
import React, { useMemo } from 'react';
import { 
  Users, 
  HeartPulse, 
  Award, 
  AlertTriangle,
  PlusCircle,
  PhoneForwarded,
  FileText,
  Search,
  ArrowUpRight,
  TrendingUp,
  Activity,
  ClipboardList,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { SeniorCitizen } from '../types';

interface DashboardProps {
  seniors: SeniorCitizen[];
  onQuickAction: (action: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ seniors, onQuickAction }) => {
  const stats = useMemo(() => {
    const totalSeniors = seniors.length;
    const maleCount = seniors.filter(s => s.gender === 'Male').length;
    const femaleCount = seniors.filter(s => s.gender === 'Female').length;
    const highAlertCount = seniors.filter(s => s.medicalInfo.conditions.length > 2).length;
    
    const purokDataMap: Record<string, number> = {};
    seniors.forEach(s => {
      purokDataMap[s.purok] = (purokDataMap[s.purok] || 0) + 1;
    });

    const chartData = Object.entries(purokDataMap).map(([name, count]) => ({ name, count }));
    const genderData = [
      { name: 'Male', value: maleCount, color: '#4f46e5' },
      { name: 'Female', value: femaleCount, color: '#ec4899' }
    ];

    return { totalSeniors, maleCount, femaleCount, highAlertCount, chartData, genderData };
  }, [seniors]);

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Hero Header - Official System Title */}
      <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/10 border border-white/5">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center space-x-2 bg-indigo-500/20 w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-indigo-500/30">
            <Activity size={12} className="text-indigo-400" />
            <span>Mapatag Operations Hub</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-[1.1]">
            Senior Citizen Information <br/>
            <span className="text-indigo-400">& Profiling System</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed mb-10">
            Providing a centralized, reliable, and accessible repository for the elderly community of Barangay Mapatag.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onQuickAction('registration')}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-2xl shadow-indigo-600/40 flex items-center group active:scale-95"
            >
              <PlusCircle size={20} className="mr-3 group-hover:rotate-90 transition-transform" />
              Begin Enrollment
            </button>
            <button 
              onClick={() => onQuickAction('registry')}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all flex items-center border border-white/10 backdrop-blur-sm active:scale-95"
            >
              <Search size={20} className="mr-3" />
              Citizen Registry
            </button>
          </div>
        </div>
        
        {/* Abstract Architectural Background */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-24 right-48 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 right-10 opacity-10 hidden lg:block transform scale-150 origin-bottom-right">
           <Activity size={300} strokeWidth={0.5} className="text-indigo-400" />
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Total Registered', value: stats.totalSeniors, icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50', trend: 'Community Population' },
              { label: 'Health Flagged', value: stats.highAlertCount, icon: HeartPulse, color: 'text-rose-600', bg: 'bg-rose-50', trend: 'High Priority Monitoring' },
              { label: 'Benefits Claimed', value: 142, icon: Award, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: 'Program Participation' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl shadow-inner`}>
                    <stat.icon size={26} />
                  </div>
                  <TrendingUp size={16} className="text-slate-200" />
                </div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-4xl font-black text-slate-800 mb-3 tracking-tighter">{stat.value}</p>
                <div className="flex items-center text-[11px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full w-fit">
                   <Activity size={12} className="mr-2 text-indigo-400" />
                  {stat.trend}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center">
                  <MapPin size={20} className="mr-3 text-indigo-600" />
                  Population Density
                </h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">By Purok</span>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 800}} />
                    <Tooltip cursor={{fill: '#f8fafc', radius: 12}} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', fontWeight: 'bold' }} />
                    <Bar dataKey="count" fill="#4f46e5" radius={[12, 12, 12, 12]} barSize={36} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center">
                  <Users size={20} className="mr-3 text-pink-500" />
                  Demographics
                </h3>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-lg shadow-indigo-200"></div>
                    <span className="text-[9px] font-black text-slate-400 uppercase">M</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-500 shadow-lg shadow-pink-200"></div>
                    <span className="text-[9px] font-black text-slate-400 uppercase">F</span>
                  </div>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.genderData}
                      cx="50%"
                      cy="50%"
                      innerRadius={75}
                      outerRadius={95}
                      paddingAngle={10}
                      dataKey="value"
                      stroke="none"
                    >
                      {stats.genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', fontWeight: 'bold' }} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-8">
          <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-indigo-200 border border-indigo-500 relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-xl font-black mb-8 flex items-center tracking-tight">
                <PhoneForwarded size={22} className="mr-3" />
                Administrative Tasks
              </h3>
              <div className="space-y-4">
                {[
                  { id: 'emergency', label: 'Safety Protocol', icon: ShieldAlert, color: 'bg-white/10 hover:bg-white/20' },
                  { id: 'registry', label: 'Data Management', icon: ClipboardList, color: 'bg-white/10 hover:bg-white/20' },
                  { id: 'audit', label: 'System Logs', icon: FileText, color: 'bg-white/10 hover:bg-white/20' },
                ].map((action) => (
                  <button
                    key={action.id}
                    onClick={() => onQuickAction(action.id)}
                    className={`w-full flex items-center p-5 rounded-2xl ${action.color} transition-all font-black text-xs uppercase tracking-widest active:scale-95 group/btn`}
                  >
                    <action.icon size={18} className="mr-4 group-hover/btn:scale-110 transition-transform" />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm relative overflow-hidden">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 border-b border-slate-50 pb-4">Latest Enrollments</h3>
            <div className="space-y-8">
              {seniors.slice(0, 3).map((senior) => (
                <div key={senior.id} className="flex items-center space-x-4 group cursor-pointer" onClick={() => onQuickAction('registry')}>
                  <div className="relative">
                    <img src={senior.photoUrl} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-50 shadow-md group-hover:scale-110 transition-transform" alt="" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-black text-slate-800 tracking-tight leading-none mb-1">{senior.firstName} {senior.lastName}</p>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{senior.purok} • {senior.id}</p>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => onQuickAction('registry')}
              className="w-full mt-10 py-4 bg-slate-50 hover:bg-slate-100 text-indigo-600 font-black text-xs uppercase tracking-widest rounded-2xl transition-all active:scale-95"
            >
              Master Registry →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simplified icon helper
const MapPin = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const ShieldAlert = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default Dashboard;
