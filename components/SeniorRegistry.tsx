
import React, { useState, useMemo } from 'react';
/* Added missing Users import */
import { Search, Filter, MoreHorizontal, Eye, Edit2, Trash2, ChevronRight, Download, Users } from 'lucide-react';
import { SeniorCitizen } from '../types';

interface SeniorRegistryProps {
  seniors: SeniorCitizen[];
  onView: (senior: SeniorCitizen) => void;
  onEdit: (senior: SeniorCitizen) => void;
}

const SeniorRegistry: React.FC<SeniorRegistryProps> = ({ seniors, onView, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [purokFilter, setPurokFilter] = useState('All');
  const [medicalFilter, setMedicalFilter] = useState('All');

  const filteredSeniors = useMemo(() => {
    return seniors.filter(s => {
      const matchesSearch = `${s.firstName} ${s.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPurok = purokFilter === 'All' || s.purok === purokFilter;
      const matchesMedical = medicalFilter === 'All' || s.medicalInfo.conditions.some(c => c.toLowerCase().includes(medicalFilter.toLowerCase()));
      return matchesSearch && matchesPurok && matchesMedical;
    });
  }, [seniors, searchTerm, purokFilter, medicalFilter]);

  const quickFilters = [
    { label: 'All Records', value: 'All' },
    { label: 'Hypertension', value: 'Hypertension' },
    { label: 'Diabetes', value: 'Diabetes' },
    { label: 'Arthritis', value: 'Osteoarthritis' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-indigo-600 mb-2">
            {/* Fixed missing Users icon usage */}
            <Users size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Data Repository</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Citizen Registry</h2>
          <p className="text-slate-500 font-medium">Browse and search through Mapatag's official senior citizen records.</p>
        </div>
        
        <div className="flex space-x-3">
          <button className="px-5 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-xs text-slate-600 hover:bg-slate-50 flex items-center shadow-sm transition-all">
            <Download size={16} className="mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, SCID, or details..."
            className="w-full pl-12 pr-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500/20 font-medium text-slate-700 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-3 w-full lg:w-auto">
          <select 
            className="px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold text-slate-600 text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none cursor-pointer min-w-[140px]"
            value={purokFilter}
            onChange={(e) => setPurokFilter(e.target.value)}
          >
            <option value="All">All Puroks</option>
            {[1, 2, 3, 4, 5].map(n => <option key={n} value={`Purok ${n}`}>Purok {n}</option>)}
          </select>

          <div className="h-10 w-px bg-slate-100 hidden lg:block"></div>

          <div className="flex space-x-2 overflow-x-auto no-scrollbar">
            {quickFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setMedicalFilter(filter.value)}
                className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-wider border transition-all whitespace-nowrap ${
                  medicalFilter === filter.value 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : 'bg-white border-slate-200 text-slate-500 hover:border-indigo-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modern Data Table */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name & Identification</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Demographics</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</th>
                <th className="px-6 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Health Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredSeniors.map((senior) => (
                <tr key={senior.id} className="group hover:bg-slate-50/80 transition-all cursor-pointer" onClick={() => onView(senior)}>
                  <td className="px-8 py-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img src={senior.photoUrl} alt="" className="w-14 h-14 rounded-2xl bg-slate-200 object-cover shadow-sm group-hover:scale-110 transition-transform duration-300" />
                        {senior.medicalInfo.conditions.length > 2 && (
                          <div className="absolute -top-1 -right-1 bg-rose-500 w-4 h-4 rounded-full border-2 border-white shadow-sm"></div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 tracking-tight">{senior.firstName} {senior.lastName}</p>
                        <p className="text-[10px] font-mono text-indigo-500 font-bold bg-indigo-50 px-1.5 py-0.5 rounded w-fit mt-1 uppercase">{senior.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm font-bold text-slate-600">{senior.age} Y/O</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase mt-0.5">{senior.gender} • {senior.maritalStatus}</p>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-sm font-bold text-slate-700">{senior.purok}</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex flex-wrap gap-1.5">
                      {senior.medicalInfo.conditions.length > 0 ? (
                        senior.medicalInfo.conditions.slice(0, 2).map((c, i) => (
                          <span key={i} className="px-2.5 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black border border-rose-100 uppercase tracking-tighter">
                            {c}
                          </span>
                        ))
                      ) : (
                        <span className="text-[10px] font-black text-slate-300 uppercase italic">Cleared</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                      <button onClick={(e) => { e.stopPropagation(); onView(senior); }} className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-2xl shadow-sm border border-transparent hover:border-slate-100 transition-all">
                        <Eye size={18} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); onEdit(senior); }} className="p-3 text-slate-400 hover:text-amber-600 hover:bg-white rounded-2xl shadow-sm border border-transparent hover:border-slate-100 transition-all">
                        <Edit2 size={18} />
                      </button>
                    </div>
                    <div className="group-hover:hidden text-slate-300">
                      <ChevronRight size={20} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeniorRegistry;
