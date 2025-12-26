
import React, { useState } from 'react';
import { Save, User, MapPin, Heart, Phone, Camera, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { SeniorCitizen, Gender, MaritalStatus } from '../types';

interface NewRegistrationProps {
  onSave: (senior: Partial<SeniorCitizen>) => void;
  onCancel: () => void;
}

const NewRegistration: React.FC<NewRegistrationProps> = ({ onSave, onCancel }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    birthDate: '',
    gender: Gender.MALE,
    maritalStatus: MaritalStatus.SINGLE,
    address: '',
    purok: 'Purok 1',
    phoneNumber: '',
    emergencyName: '',
    emergencyRel: '',
    emergencyPhone: '',
    conditions: '',
    allergies: '',
    meds: ''
  });

  const totalSteps = 4;

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const age = new Date().getFullYear() - new Date(formData.birthDate).getFullYear();
    
    onSave({
      firstName: formData.firstName,
      lastName: formData.lastName,
      middleName: formData.middleName,
      birthDate: formData.birthDate,
      age,
      gender: formData.gender,
      maritalStatus: formData.maritalStatus,
      address: formData.address,
      purok: formData.purok,
      phoneNumber: formData.phoneNumber,
      photoUrl: `https://picsum.photos/seed/${formData.firstName}/200/200`,
      emergencyContact: {
        name: formData.emergencyName,
        relationship: formData.emergencyRel,
        phone: formData.emergencyPhone
      },
      medicalInfo: {
        conditions: formData.conditions.split(',').map(s => s.trim()).filter(Boolean),
        allergies: formData.allergies.split(',').map(s => s.trim()).filter(Boolean),
        medications: formData.meds.split(',').map(s => s.trim()).filter(Boolean),
        mobilityIssues: 'None',
        lastCheckup: new Date().toISOString().split('T')[0]
      },
      assistanceHistory: []
    });
  };

  const steps = [
    { id: 1, label: 'Personal', icon: User },
    { id: 2, label: 'Residency', icon: MapPin },
    { id: 3, label: 'Emergency', icon: Phone },
    { id: 4, label: 'Medical', icon: Heart },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">System Enrollment Wizard</h2>
          <p className="text-slate-500 font-medium tracking-tight">Step {step} of {totalSteps}: {steps[step-1].label} Details</p>
        </div>
        <div className="flex items-center bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
          {steps.map((s) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                step === s.id ? 'bg-indigo-600 text-white shadow-lg' : step > s.id ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-50 text-slate-400'
              }`}>
                {step > s.id ? <CheckCircle2 size={20} /> : <s.icon size={20} />}
              </div>
              {s.id !== totalSteps && <div className={`w-8 h-1 mx-1 rounded ${step > s.id ? 'bg-emerald-200' : 'bg-slate-100'}`}></div>}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col items-center mb-8">
                <div className="w-32 h-32 bg-slate-50 rounded-[2rem] flex items-center justify-center border-4 border-dashed border-slate-200 group hover:border-indigo-400 cursor-pointer transition-all">
                  <Camera className="text-slate-300 group-hover:text-indigo-400" size={32} />
                </div>
                <button type="button" className="mt-3 text-xs font-black text-indigo-600 uppercase tracking-widest">Upload Profile Photo</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">First Name</label>
                  <input className="w-full px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="e.g., Juan" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Last Name</label>
                  <input className="w-full px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} placeholder="e.g., Dela Cruz" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Birth Date</label>
                  <input type="date" className="w-full px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" value={formData.birthDate} onChange={e => setFormData({...formData, birthDate: e.target.value})} />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Gender</label>
                  <select className="w-full px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium appearance-none" value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value as Gender})}>
                    <option value={Gender.MALE}>Male</option>
                    <option value={Gender.FEMALE}>Female</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Home Address</label>
                  <textarea className="w-full px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} rows={2} placeholder="House Number, Street Name, etc." />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Purok Location</label>
                  <select className="w-full px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium appearance-none" value={formData.purok} onChange={e => setFormData({...formData, purok: e.target.value})}>
                    <option>Purok 1</option>
                    <option>Purok 2</option>
                    <option>Purok 3</option>
                    <option>Purok 4</option>
                    <option>Purok 5</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Mobile Number</label>
                  <input className="w-full px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" value={formData.phoneNumber} onChange={e => setFormData({...formData, phoneNumber: e.target.value})} placeholder="09XX-XXX-XXXX" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Guardian / Contact Person</label>
                  <input className="w-full px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" value={formData.emergencyName} onChange={e => setFormData({...formData, emergencyName: e.target.value})} placeholder="Full Name" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Relationship</label>
                  <input className="w-full px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" value={formData.emergencyRel} onChange={e => setFormData({...formData, emergencyRel: e.target.value})} placeholder="e.g., Son, Daughter, Spouse" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Emergency Contact Phone</label>
                  <input className="w-full px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" value={formData.emergencyPhone} onChange={e => setFormData({...formData, emergencyPhone: e.target.value})} placeholder="Contact Number" />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Known Medical Conditions</label>
                  <textarea className="w-full px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" value={formData.conditions} onChange={e => setFormData({...formData, conditions: e.target.value})} rows={2} placeholder="e.g., Hypertension, Asthma (Comma separated)" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Maintenance Medications</label>
                  <textarea className="w-full px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" value={formData.meds} onChange={e => setFormData({...formData, meds: e.target.value})} rows={2} placeholder="e.g., Losartan, Metformin (Comma separated)" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Drug Allergies</label>
                  <input className="w-full px-5 py-3 border border-slate-100 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium" value={formData.allergies} onChange={e => setFormData({...formData, allergies: e.target.value})} placeholder="e.g., Penicillin, Sulfas" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-slate-50 p-6 flex items-center justify-between border-t border-slate-100">
          <button
            type="button"
            onClick={step === 1 ? onCancel : prevStep}
            className="flex items-center space-x-2 px-8 py-2.5 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-slate-800 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>{step === 1 ? 'Cancel Entry' : 'Back to Previous'}</span>
          </button>

          {step < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center space-x-2 px-10 py-3 bg-indigo-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all active:scale-95"
            >
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center space-x-2 px-10 py-3 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 transition-all active:scale-95"
            >
              <Save size={16} />
              <span>Finalize Enrollment</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewRegistration;
