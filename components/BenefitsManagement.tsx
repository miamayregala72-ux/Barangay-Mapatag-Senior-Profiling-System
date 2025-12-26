
import React from 'react';
import { Gift, Heart, DollarSign, Package, Activity, Plus, ChevronRight, Download } from 'lucide-react';

const BenefitsManagement: React.FC = () => {
  const programs = [
    { title: 'Social Pension', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50', count: 85, status: 'Active Distribution' },
    { title: 'Relief Packages', icon: Package, color: 'text-amber-600', bg: 'bg-amber-50', count: 120, status: 'Scheduled' },
    { title: 'Medical Mission', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50', count: 42, status: 'In Progress' },
    { title: 'Dental Health', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50', count: 15, status: 'Completed' },
  ];

  return (
    <div className="space-y-10 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 mb-2">
            <Gift size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Entitlements Hub</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Benefits & Assistance</h2>
          <p className="text-slate-500 font-medium">Tracking resource allocation and program participation across Mapatag.</p>
        </div>
        
        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 shadow-xl shadow-slate-900/20 flex items-center">
          <Plus size={18} className="mr-2" />
          Create New Program
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {programs.map((prog, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group">
            <div className={`${prog.bg} ${prog.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner`}>
              <prog.icon size={28} />
            </div>
            <h3 className="text-xl font-black text-slate-800 mb-1 tracking-tight">{prog.title}</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{prog.status}</p>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
               <div>
                  <p className="text-2xl font-black text-slate-800 leading-none">{prog.count}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Beneficiaries</p>
               </div>
               <button className="p-3 bg-slate-50 group-hover:bg-indigo-600 group-hover:text-white rounded-xl transition-all">
                  <ChevronRight size={18} />
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex items-center justify-between">
           <h3 className="text-xl font-black text-slate-800 tracking-tight">Recent Distributions</h3>
           <button className="text-xs font-black text-indigo-600 uppercase tracking-widest flex items-center">
             <Download size={16} className="mr-2" />
             Download Full Ledger
           </button>
        </div>
        <div className="p-4">
           {[
             { name: 'Juan Dela Cruz', type: 'Social Pension', date: 'Oct 12, 2025', amount: '₱1,500.00' },
             { name: 'Maria Santos', type: 'Medical Mission', date: 'Oct 11, 2025', amount: 'Free Checkup' },
             { name: 'Elena Ramos', type: 'Relief Goods', date: 'Oct 10, 2025', amount: '1 Box Items' },
             { name: 'Ricardo Dalisay', type: 'Social Pension', date: 'Oct 09, 2025', amount: '₱1,500.00' },
           ].map((item, i) => (
             <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
                <div className="flex items-center space-x-4">
                   <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:shadow-sm">
                      <Gift size={18} />
                   </div>
                   <div>
                      <p className="text-sm font-black text-slate-800">{item.name}</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.type}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-sm font-black text-indigo-600">{item.amount}</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase">{item.date}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsManagement;
