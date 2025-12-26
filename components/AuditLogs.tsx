
import React from 'react';
import { ClipboardList, Shield, User, Clock, Search, Filter } from 'lucide-react';
import { AuditLog } from '../types';

interface AuditLogsProps {
  logs: AuditLog[];
}

const AuditLogs: React.FC<AuditLogsProps> = ({ logs }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-end">
        <div>
          <div className="flex items-center space-x-2 text-slate-500 mb-2">
            <Shield size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Security & Oversight</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Audit Trail</h2>
          <p className="text-slate-500 font-medium">Monitoring all administrative transactions and record modifications.</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-xs text-slate-600 hover:bg-slate-50 shadow-sm transition-all">
            Download Log Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
          <div className="relative w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Filter by User or Action..."
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/10 outline-none text-sm font-medium"
            />
          </div>
          <div className="flex items-center space-x-2">
             <Filter size={16} className="text-slate-400" />
             <span className="text-xs font-bold text-slate-500">All Time</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operator</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Action Type</th>
                <th className="px-6 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Target ID</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Detailed Event Log</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.length > 0 ? logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center space-x-3">
                      <Clock size={14} className="text-slate-300" />
                      <span className="text-sm font-bold text-slate-600">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <User size={14} />
                      </div>
                      <span className="text-sm font-bold text-slate-800">{log.userName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      log.action === 'Registration' ? 'bg-indigo-50 text-indigo-600' : 
                      log.action === 'Update' ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-600'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-mono font-bold text-slate-400">{log.targetId || 'N/A'}</span>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-500">
                    {log.details}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center opacity-30">
                      <ClipboardList size={48} className="mb-4" />
                      <p className="font-black uppercase tracking-widest text-xs">No Recent Activity Logs</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
