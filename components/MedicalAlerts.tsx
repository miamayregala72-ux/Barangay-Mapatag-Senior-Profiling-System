
import React from 'react';
import { ShieldAlert, AlertCircle, PhoneCall, ChevronRight } from 'lucide-react';
import { SeniorCitizen } from '../types';

interface MedicalAlertsProps {
  seniors: SeniorCitizen[];
}

const MedicalAlerts: React.FC<MedicalAlertsProps> = ({ seniors }) => {
  const alerts = seniors.filter(s => s.medicalInfo.conditions.length > 1).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Emergency & Health Alerts</h2>
          <p className="text-slate-500">Immediate attention required for high-risk individuals</p>
        </div>
        <div className="bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-bold flex items-center animate-pulse">
          <ShieldAlert size={18} className="mr-2" />
          5 High Risk Flagged
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {alerts.map((senior) => (
            <div key={senior.id} className="bg-white p-5 rounded-xl border-l-4 border-rose-500 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full overflow-hidden">
                  <img src={senior.photoUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{senior.firstName} {senior.lastName}</h3>
                  <div className="flex items-center space-x-2 text-xs text-slate-400">
                    <span>{senior.id}</span>
                    <span>•</span>
                    <span className="text-rose-500 font-semibold">{senior.medicalInfo.conditions.join(", ")}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <a 
                  href={`tel:${senior.emergencyContact.phone}`}
                  className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors text-sm font-medium"
                >
                  <PhoneCall size={16} />
                  <span>Call Emergency</span>
                </a>
                <button className="p-2 text-slate-400 hover:text-indigo-600">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-900 text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-2">Emergency Protocols</h3>
              <p className="text-indigo-200 text-sm mb-4">In case of a medical emergency in Barangay Mapatag, please contact the municipal health office immediately.</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center bg-indigo-800/50 p-3 rounded-lg border border-indigo-700">
                  <span className="text-xs font-semibold uppercase opacity-60">Ambulance</span>
                  <span className="font-mono text-sm">911 / (036) 123-4567</span>
                </div>
                <div className="flex justify-between items-center bg-indigo-800/50 p-3 rounded-lg border border-indigo-700">
                  <span className="text-xs font-semibold uppercase opacity-60">Barangay Captain</span>
                  <span className="font-mono text-sm">0917-000-0000</span>
                </div>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10">
              <ShieldAlert size={150} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center">
              <AlertCircle size={16} className="mr-2 text-amber-500" /> Pending Checkups
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center space-x-3 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                    <AlertCircle size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Purok {i} Health Mission</p>
                    <p className="text-xs text-slate-400">Scheduled for Jan 25, 2026</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalAlerts;
