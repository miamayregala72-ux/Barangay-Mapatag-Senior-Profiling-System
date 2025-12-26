
import React, { useEffect, useState } from 'react';
import { 
  X, Calendar, MapPin, Phone, Heart, Clipboard, 
  Sparkles, AlertCircle, Printer, Fingerprint, 
  Share2, ShieldCheck, History, Pill
} from 'lucide-react';
import { SeniorCitizen } from '../types';
import { generateHealthSummary } from '../services/geminiService';

interface SeniorDetailModalProps {
  senior: SeniorCitizen;
  onClose: () => void;
}

const SeniorDetailModal: React.FC<SeniorDetailModalProps> = ({ senior, onClose }) => {
  const [aiSummary, setAiSummary] = useState<string>('Analyzing Citizen Health Profile...');
  const [loadingAi, setLoadingAi] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoadingAi(true);
      const summary = await generateHealthSummary(senior);
      setAiSummary(summary);
      setLoadingAi(false);
    };
    fetchSummary();
  }, [senior]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white w-full max-w-5xl h-[90vh] rounded-[3rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col relative">
        
        {/* Decorative Top Border */}
        <div className="h-2 w-full bg-gradient-to-r from-indigo-600 via-pink-500 to-amber-500"></div>

        {/* Action Header */}
        <div className="px-10 py-6 border-b border-slate-100 flex justify-between items-center bg-white/50 sticky top-0 z-10">
          <div className="flex items-center space-x-3">
             <div className="bg-indigo-50 text-indigo-600 p-2.5 rounded-2xl">
                <Fingerprint size={24} />
             </div>
             <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">Citizen Health Passport</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Digital Authentication ID: {senior.id}</p>
             </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl text-slate-500 transition-all">
              <Share2 size={20} />
            </button>
            <button onClick={onClose} className="p-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl transition-all shadow-xl shadow-slate-900/20">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-12">
          {/* Section 1: Identity Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="space-y-8">
              <div className="relative w-fit mx-auto lg:mx-0">
                <img src={senior.photoUrl} alt="" className="w-56 h-56 rounded-[2.5rem] object-cover shadow-2xl ring-4 ring-slate-50" />
                <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white p-3 rounded-2xl shadow-lg border-4 border-white">
                  <ShieldCheck size={24} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl">
                  <Calendar className="text-indigo-500" size={20} />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Born On</p>
                    <p className="text-sm font-bold text-slate-700">{senior.birthDate} ({senior.age} Years)</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl">
                  <MapPin className="text-emerald-500" size={20} />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Residency</p>
                    <p className="text-sm font-bold text-slate-700">{senior.purok}, Mapatag</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-2xl">
                  <Phone className="text-amber-500" size={20} />
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mobile</p>
                    <p className="text-sm font-bold text-slate-700">{senior.phoneNumber}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Clinical Data */}
            <div className="lg:col-span-2 space-y-10">
              {/* Premium AI Insight */}
              <div className="bg-slate-950 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                   <div className="flex items-center space-x-3 mb-6">
                      <div className="bg-indigo-500/20 p-2.5 rounded-xl text-indigo-400">
                        <Sparkles size={20} />
                      </div>
                      <h4 className="font-black text-sm uppercase tracking-[0.2em] text-indigo-300">Clinical Recommendation Engine</h4>
                   </div>
                   <div className="text-lg leading-relaxed text-slate-300 font-medium italic">
                    {loadingAi ? (
                      <div className="space-y-3">
                        <div className="h-4 bg-white/5 animate-pulse rounded w-full"></div>
                        <div className="h-4 bg-white/5 animate-pulse rounded w-3/4"></div>
                        <div className="h-4 bg-white/5 animate-pulse rounded w-1/2"></div>
                      </div>
                    ) : (
                      `"${aiSummary}"`
                    )}
                   </div>
                   <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Generated via Gemini AI v3-Flash</span>
                      <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors">Refine Assessment →</button>
                   </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full -mr-32 -mt-32"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <Heart size={14} className="mr-2 text-rose-500" /> Chronic Conditions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {senior.medicalInfo.conditions.map((c, i) => (
                      <span key={i} className="px-4 py-2 bg-rose-50 text-rose-700 rounded-xl text-xs font-black border border-rose-100 shadow-sm">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center">
                    <Pill size={14} className="mr-2 text-indigo-500" /> Active Medications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {senior.medicalInfo.medications.map((m, i) => (
                      <span key={i} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-black border border-indigo-100 shadow-sm">{m}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* History Section */}
              <div className="pt-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center">
                  <History size={14} className="mr-2 text-slate-400" /> Program Participation
                </h4>
                <div className="space-y-4">
                  {senior.assistanceHistory.map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] hover:bg-slate-100/50 transition-all">
                       <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                            <Clipboard size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-800">{h.type}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase">{h.date}</p>
                          </div>
                       </div>
                       <div className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                          {h.status}
                       </div>
                    </div>
                  ))}
                  {senior.assistanceHistory.length === 0 && (
                    <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-[2rem]">
                       <p className="text-sm font-bold text-slate-400">No active assistance records found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Footer Actions */}
        <div className="px-10 py-8 bg-slate-50 border-t flex justify-between items-center">
          <div className="flex -space-x-3">
             <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-500 text-white flex items-center justify-center font-bold text-xs">J</div>
             <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-800 text-white flex items-center justify-center font-bold text-xs">A</div>
             <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 text-slate-400 flex items-center justify-center text-xs">+</div>
          </div>
          <div className="flex space-x-4">
            <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all text-sm flex items-center shadow-sm">
              <Printer size={18} className="mr-2" />
              Download Report
            </button>
            <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all text-sm shadow-xl shadow-indigo-600/20">
              Modify Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeniorDetailModal;
