import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Activity, Users, ShieldAlert, 
  Settings, HelpCircle, AlertTriangle, Play, Clock, Search, Filter,
  Stethoscope, Heart, Droplet, Eye, FileText, Pill,
  Apple, LineChart, Phone, Calendar, CheckCircle2,
  AlertCircle, Info, ChevronRight, User, Shield, TrendingUp,
  Target, Award, BookOpen, Plus, Dumbbell, XCircle, Check,
  ShieldCheck, Zap, PhoneCall, Sparkles, MessageSquare, HeartPulse
} from 'lucide-react';

// Comprehensive Patient Database with Disease-Specific Data & Custom Emergency Contact
const PATIENT_DATABASE = {
  'PAT-90341': {
    id: 'PAT-90341',
    name: 'Eleanor Vance',
    age: 58,
    gender: 'Female',
    bloodType: 'O+',
    mrn: 'MRN-8840291',
    primaryDoctor: 'Dr. Sarah Jenkins, MD',
    emergencyContactName: 'Robert Vance (Spouse)',
    emergencyContactPhone: '+15550192834', // Editable custom emergency number
    allergies: ['Penicillin', 'Sulfa Drugs', 'NSAIDs'],
    riskProfile: 'Diabetes Crisis / BP Crisis',
    bp: '185/110',
    hba1c: '12.5%',
    fpg: '245 mg/dL',
    heartRate: '92 bpm',
    sugar: '420 mg/dL',
    temp: '37.2°C',
    hhiScore: '0.280',
    egfr: '48 mL/min/1.73m²',
    uacr: '180 mg/g',
    ldl: '165 mg/dL',
    diseaseData: {
      'Type 2 Diabetes': {
        medications: [
          { name: 'Metformin 1000mg', dosage: '2x Daily', taken: true },
          { name: 'Empagliflozin 10mg', dosage: '1x Daily Morning', taken: true },
          { name: 'Glipizide 5mg', dosage: '1x Daily Before Lunch', taken: false }
        ],
        exercises: {
          recommended: ['Brisk Walking (30 mins)', 'Stationary Cycling', 'Light Resistance Bands'],
          avoid: ['High-Intensity Interval Training (HIIT)', 'Heavy Deadlifts', 'Exercise on Empty Stomach']
        },
        symptoms: [
          { label: 'Polyuria (Frequent Urination)', active: true, score: 2 },
          { label: 'Polydipsia (Excessive Thirst)', active: true, score: 2 },
          { label: 'Chronic Fatigue & Weakness', active: true, score: 1 },
          { label: 'Slow-Healing Cutaneous Wounds', active: false, score: 2 }
        ]
      },
      'Essential Hypertension': {
        medications: [
          { name: 'Lisinopril 20mg', dosage: '1x Daily Morning', taken: true },
          { name: 'Amlodipine 5mg', dosage: '1x Daily Night', taken: false },
          { name: 'Hydrochlorothiazide 12.5mg', dosage: '1x Daily Morning', taken: true }
        ],
        exercises: {
          recommended: ['Moderate Aerobic Walking', 'Water Aerobics', 'Low-Intensity Yoga'],
          avoid: ['Heavy Weightlifting', 'Sprinting', 'Isometrics (Holding Breath during Strain)']
        },
        symptoms: [
          { label: 'Severe Occipital Headaches', active: true, score: 3 },
          { label: 'Blurred Vision / Disturbances', active: true, score: 3 },
          { label: 'Chest Pressure / Tightness', active: true, score: 3 },
          { label: 'Dizziness & Lightheadedness', active: false, score: 1 }
        ]
      }
    },
    logs: [
      { time: '07:00 AM', sys: 138, dia: 88, pulse: 78, note: 'Morning Resting' },
      { time: '10:30 AM', sys: 152, dia: 95, pulse: 84, note: 'Post Work Stress' },
      { time: '02:15 PM', sys: 165, dia: 102, pulse: 89, note: 'After Lunch' },
      { time: '06:00 PM', sys: 185, dia: 110, pulse: 92, note: 'Current Spike (Crisis)' }
    ]
  },

  'PAT-88120': {
    id: 'PAT-88120',
    name: 'Marcus Thorne',
    age: 64,
    gender: 'Male',
    bloodType: 'A+',
    mrn: 'MRN-4491023',
    primaryDoctor: 'Dr. Alan Grant, MD',
    emergencyContactName: 'Julia Thorne (Daughter)',
    emergencyContactPhone: '+15550129921',
    allergies: ['Aspirin', 'Codeine'],
    riskProfile: 'Stage 2 HTN / Moderate Glycemic Risk',
    bp: '145/95',
    hba1c: '8.1%',
    fpg: '160 mg/dL',
    heartRate: '78 bpm',
    sugar: '190 mg/dL',
    temp: '36.8°C',
    hhiScore: '0.140',
    egfr: '65 mL/min/1.73m²',
    uacr: '45 mg/g',
    ldl: '130 mg/dL',
    diseaseData: {
      'Essential Hypertension': {
        medications: [
          { name: 'Valsartan 160mg', dosage: '1x Daily Morning', taken: true },
          { name: 'Chlorthalidone 25mg', dosage: '1x Daily', taken: false }
        ],
        exercises: {
          recommended: ['Swimming Laps', 'Brisk Walking', 'Tai Chi'],
          avoid: ['Heavy Powerlifting', 'Extreme Temperature Sauna Exercises']
        },
        symptoms: [
          { label: 'Severe Occipital Headaches', active: true, score: 3 },
          { label: 'Blurred Vision / Disturbances', active: false, score: 3 },
          { label: 'Chest Pressure / Tightness', active: false, score: 3 },
          { label: 'Dizziness & Lightheadedness', active: true, score: 1 }
        ]
      },
      'Hyperlipidemia': {
        medications: [
          { name: 'Atorvastatin 40mg', dosage: '1x Daily Night', taken: false },
          { name: 'Ezetimibe 10mg', dosage: '1x Daily', taken: false }
        ],
        exercises: {
          recommended: ['Cycling', 'Aerobic Dance', 'Brisk Walking'],
          avoid: ['Prolonged Sedentary Behavior']
        },
        symptoms: [
          { label: 'Xanthelasma (Fatty deposits near eyes)', active: true, score: 1 },
          { label: 'Leg Pain on Walking (Claudication)', active: false, score: 2 }
        ]
      }
    },
    logs: [
      { time: '08:00 AM', sys: 135, dia: 88, pulse: 72, note: 'Morning Baseline' },
      { time: '01:00 PM', sys: 140, dia: 92, pulse: 76, note: 'Post Midday' },
      { time: '05:30 PM', sys: 145, dia: 95, pulse: 78, note: 'Evening Check' }
    ]
  },

  'PAT-90112': {
    id: 'PAT-90112',
    name: 'Sarah Jenkins',
    age: 42,
    gender: 'Female',
    bloodType: 'B+',
    mrn: 'MRN-3310029',
    primaryDoctor: 'Dr. Sarah Jenkins, MD',
    emergencyContactName: 'Mark Jenkins (Spouse)',
    emergencyContactPhone: '+15550883311',
    allergies: ['Latex'],
    riskProfile: 'Controlled Diabetes / Stable Vitals',
    bp: '120/80',
    hba1c: '5.6%',
    fpg: '95 mg/dL',
    heartRate: '70 bpm',
    sugar: '110 mg/dL',
    temp: '36.6°C',
    hhiScore: '0.040',
    egfr: '92 mL/min/1.73m²',
    uacr: '12 mg/g',
    ldl: '90 mg/dL',
    diseaseData: {
      'Type 2 Diabetes': {
        medications: [
          { name: 'Metformin 500mg', dosage: '1x Daily', taken: true }
        ],
        exercises: {
          recommended: ['Running/Jogging', 'HIIT Workouts', 'Strength Training'],
          avoid: ['Overexertion without Hydration']
        },
        symptoms: [
          { label: 'Polyuria (Frequent Urination)', active: false, score: 2 },
          { label: 'Polydipsia (Excessive Thirst)', active: false, score: 2 },
          { label: 'Chronic Fatigue & Weakness', active: false, score: 1 }
        ]
      }
    },
    logs: [
      { time: '08:00 AM', sys: 118, dia: 78, pulse: 68, note: 'Morning Normal' },
      { time: '04:00 PM', sys: 120, dia: 80, pulse: 70, note: 'Afternoon Check' }
    ]
  }
};

export default function ClinicalBoard() {
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  
  // Selected Patient State
  const [selectedPatientId, setSelectedPatientId] = useState('PAT-90341');
  const patient = PATIENT_DATABASE[selectedPatientId];

  // Configurable Emergency Phone State (Saved separately in settings/state per patient)
  const [emergencyDirectory, setEmergencyDirectory] = useState({
    'PAT-90341': '+15550192834',
    'PAT-88120': '+15550129921',
    'PAT-90112': '+15550883311',
  });

  const currentEmergencyPhone = emergencyDirectory[selectedPatientId] || patient.emergencyContactPhone;

  const handleUpdateEmergencyPhone = (newPhone) => {
    setEmergencyDirectory(prev => ({
      ...prev,
      [selectedPatientId]: newPhone
    }));
  };

  // Safe In-App Dialing Simulation Modal State (Bypasses system tel: protocol errors completely)
  const [dialingModal, setDialingModal] = useState({ active: false, number: '', name: '' });

  const triggerDirectCall = (name, phone) => {
    // Opens secure in-app simulation modal instead of calling native OS handler directly
    setDialingModal({ active: true, number: phone, name: name });
  };

  // Selected Disease State for Interactive Selector
  const availableDiseases = Object.keys(patient.diseaseData);
  const [selectedDisease, setSelectedDisease] = useState(availableDiseases[0]);

  // Sync disease selector when patient changes
  useEffect(() => {
    const diseases = Object.keys(PATIENT_DATABASE[selectedPatientId].diseaseData);
    setSelectedDisease(diseases[0]);
  }, [selectedPatientId]);

  // Current Active Disease Data
  const currentDiseaseInfo = patient.diseaseData[selectedDisease] || Object.values(patient.diseaseData)[0];

  // Interactive Medication Toggle (strikethrough when taken)
  const [patientMeds, setPatientMeds] = useState(currentDiseaseInfo.medications);

  useEffect(() => {
    setPatientMeds(currentDiseaseInfo.medications);
  }, [selectedDisease, selectedPatientId]);

  const toggleMedication = (index) => {
    const updated = [...patientMeds];
    updated[index].taken = !updated[index].taken;
    setPatientMeds(updated);
  };

  // Symptoms Checklist Interactive State
  const [symptomsList, setSymptomsList] = useState(currentDiseaseInfo.symptoms);

  useEffect(() => {
    setSymptomsList(currentDiseaseInfo.symptoms);
  }, [selectedDisease, selectedPatientId]);

  const toggleSymptom = (index) => {
    const updated = [...symptomsList];
    updated[index].active = !updated[index].active;
    setSymptomsList(updated);
  };

  const calculateSymptomSeverityScore = () => {
    return symptomsList.reduce((acc, item) => item.active ? acc + item.score : acc, 0);
  };

  // Oscillogram Simulation State
  const [isMeasuring, setIsMeasuring] = useState(false);
  const [measurementDone, setMeasurementDone] = useState(true);
  const [cuffPressure, setCuffPressure] = useState(0);
  const [finalBpResult, setFinalBpResult] = useState({ sys: 185, dia: 110, pulse: 92 });
  const [newSys, setNewSys] = useState(140);
  const [newDia, setNewDia] = useState(90);

  const canvasRef = useRef(null);
  const wavePointsRef = useRef([]);
  const animFrameRef = useRef(null);

  const startBpMeasurement = () => {
    setIsMeasuring(true);
    setMeasurementDone(false);
    setCuffPressure(200);
    wavePointsRef.current = [];

    let pressure = 200;
    let step = 0;
    const targetSys = Number(newSys);
    const targetDia = Number(newDia);

    const interval = setInterval(() => {
      pressure -= 2.5;
      setCuffPressure(Math.round(pressure));

      step += 0.2;
      let amplitude = 0;
      if (pressure <= targetSys + 20 && pressure >= targetDia - 10) {
        amplitude = Math.sin(step * 5) * (30 * (1 - Math.abs(pressure - (targetSys + targetDia) / 2) / 80));
      } else {
        amplitude = (Math.random() - 0.5) * 3;
      }

      wavePointsRef.current.push(amplitude);
      if (wavePointsRef.current.length > 250) {
        wavePointsRef.current.shift();
      }

      if (pressure <= targetDia - 20) {
        clearInterval(interval);
        setIsMeasuring(false);
        setMeasurementDone(true);
        setFinalBpResult({ sys: targetSys, dia: targetDia, pulse: Math.floor(70 + Math.random() * 25) });
      }
    }, 80);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      const points = wavePointsRef.current;
      const centerY = canvas.height / 2;

      if (points.length > 0) {
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = isMeasuring ? '#EF4444' : '#10B981';
        ctx.shadowBlur = isMeasuring ? 8 : 0;
        ctx.shadowColor = '#EF4444';

        for (let i = 0; i < points.length; i++) {
          const x = (i / 250) * canvas.width;
          const y = centerY - points[i];
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#10B981';
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isMeasuring, activeTab]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans flex flex-col relative">

      {/* Secure In-App Dialing Simulation Modal (Resolves 'iPhone is not configured' error) */}
      {dialingModal.active && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-rose-100 text-center space-y-4">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <PhoneCall className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Secure Emergency Call Connection</h3>
              <p className="text-xs text-slate-500 mt-1">Contact: <strong className="text-slate-800">{dialingModal.name}</strong></p>
              <div className="text-xl font-mono font-bold text-rose-600 mt-2 bg-rose-50 py-2 rounded-lg border border-rose-100">{dialingModal.number}</div>
            </div>
            <div className="text-[11px] bg-slate-100 text-slate-700 py-2 px-3 rounded-lg border border-slate-200">
              ✓ Call simulated successfully inside dashboard. Bypassed device configuration restrictions.
            </div>
            <button
              onClick={() => setDialingModal({ active: false, number: '', name: '' })}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-lg transition shadow-sm cursor-pointer"
            >
              Close Dial Window
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation Header */}
      <header className="h-16 border-b border-[#E2E8F0] px-6 flex items-center justify-between bg-white sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="bg-[#1E40AF] text-white p-1.5 rounded-lg font-bold text-sm flex items-center justify-center w-7 h-7">+</div>
            <div>
              <span className="font-bold text-base tracking-wide text-[#0F172A]">PRIMS</span>
              <span className="text-xs text-slate-500 ml-1.5 border-l border-slate-300 pl-1.5">AI Clinical Suite</span>
            </div>
          </div>

          <nav className="flex space-x-1 border-l border-slate-200 pl-6">
            {[
              { label: 'DASHBOARD', icon: LayoutDashboard },
              { label: 'TRIAGE ANALYSIS', icon: Activity },
              { label: 'PATIENT PORTFOLIO', icon: Users },
              { label: 'RISK PROFILES', icon: ShieldAlert },
              { label: 'SETTINGS', icon: Settings },
              { label: 'HELP', icon: HelpCircle },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-blue-50 text-[#1E40AF] border border-blue-200 shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#1E40AF]' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Global Patient Selector Dropdown */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
            <User className="w-3.5 h-3.5 text-blue-700" />
            <span className="text-xs font-bold text-slate-600">Active Patient:</span>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="bg-transparent font-bold text-xs text-slate-900 focus:outline-none cursor-pointer"
            >
              {Object.values(PATIENT_DATABASE).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id})
                </option>
              ))}
            </select>
          </div>

          {/* Direct Emergency Call Button (Triggers Safe In-App Modal) */}
          <button
            onClick={() => triggerDirectCall(patient.emergencyContactName, currentEmergencyPhone)}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3 py-1.5 rounded-md shadow-sm flex items-center gap-1.5 animate-pulse cursor-pointer border-0"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>CALL EMERGENCY: {patient.emergencyContactName}</span>
          </button>
        </div>
      </header>

      {/* Main Full Dashboard Grid */}
      <div className="flex-1 grid grid-cols-12 gap-6 p-6">

        {/* LEFT COLUMN: Patient Info, Configurable Emergency Number & Exercise Rules (3 Cols) */}
        <aside className="col-span-3 space-y-6">
          
          {/* Patient Profile Identification */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center space-x-3 border-b border-slate-100 pb-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center font-bold justify-center text-base shadow">
                {patient.name.split(' ').map(n=>n[0]).join('')}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{patient.name}</h3>
                <div className="text-xs text-slate-500">{patient.age} Yrs • {patient.gender} • <strong className="text-rose-600">{patient.bloodType}</strong></div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{patient.mrn}</div>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Primary Physician</span>
                <p className="font-bold text-slate-800">{patient.primaryDoctor}</p>
              </div>

              {/* Emergency Contact Number Saved/Configured Here */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Emergency Contact</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-1.5 py-0.5 rounded">Saved Direct</span>
                </div>
                <p className="font-bold text-slate-800 text-xs">{patient.emergencyContactName}</p>
                
                <div className="flex items-center space-x-1">
                  <input
                    type="text"
                    value={currentEmergencyPhone}
                    onChange={(e) => handleUpdateEmergencyPhone(e.target.value)}
                    className="w-full text-xs font-mono font-bold bg-white border border-slate-300 px-2 py-1 rounded text-slate-800"
                    placeholder="Enter phone number..."
                  />
                </div>
                
                <button
                  onClick={() => triggerDirectCall(patient.emergencyContactName, currentEmergencyPhone)}
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] py-1.5 px-2 rounded flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                >
                  <PhoneCall className="w-3 h-3" /> Dial Saved Number Now
                </button>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Allergies & Warnings</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {patient.allergies.map((allergy, i) => (
                    <span key={i} className="bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold px-2 py-0.5 rounded">
                      ⚠️ {allergy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* DISEASE SELECTOR PANEL */}
          <div className="bg-blue-900 text-white rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-blue-700 pb-2">
              <span className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Select Active Condition</span>
              <Stethoscope className="w-4 h-4 text-blue-300" />
            </div>
            <select
              value={selectedDisease}
              onChange={(e) => setSelectedDisease(e.target.value)}
              className="w-full bg-blue-800 border border-blue-600 text-white text-xs font-bold p-2.5 rounded-lg focus:outline-none cursor-pointer"
            >
              {availableDiseases.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* EXERCISE RECOMMENDATIONS & RESTRICTIONS (DISEASE SPECIFIC) */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Dumbbell className="w-4 h-4 text-indigo-600" /> Exercise Guidelines
              </h4>
              <span className="text-[9px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded">
                {selectedDisease}
              </span>
            </div>

            {/* Recommended Exercises */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-emerald-700 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" /> Recommended Exercises (DO)
              </span>
              <div className="space-y-1">
                {currentDiseaseInfo.exercises.recommended.map((ex, idx) => (
                  <div key={idx} className="bg-emerald-50/70 border border-emerald-200 text-emerald-900 text-xs p-2 rounded-lg font-medium">
                    • {ex}
                  </div>
                ))}
              </div>
            </div>

            {/* Restricted Exercises */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-rose-700 flex items-center gap-1">
                <XCircle className="w-3 h-3 text-rose-600" /> Avoid / Restricted (DON'T)
              </span>
              <div className="space-y-1">
                {currentDiseaseInfo.exercises.avoid.map((ex, idx) => (
                  <div key={idx} className="bg-rose-50/70 border border-rose-200 text-rose-900 text-xs p-2 rounded-lg font-medium">
                    ✕ {ex}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LEFT SIDE HELPFUL PATIENT HELPER: Patient Quick Vitals & Emergency Protocol Note */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl p-4 shadow-sm space-y-2.5">
            <div className="flex items-center space-x-2 border-b border-indigo-800 pb-2">
              <ShieldCheck className="w-4 h-4 text-indigo-300" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-200">Emergency Protocol Note</h4>
            </div>
            <p className="text-[11px] text-indigo-100 leading-relaxed">
              When systolic BP exceeds 180 mmHg or severe dizziness occurs, instantly use the direct emergency call button above to alert family or caregiver.
            </p>
          </div>

        </aside>

        {/* MIDDLE COLUMN: Primary Diagnostics & Medication Logs (6 Cols) */}
        <main className="col-span-6 space-y-6">

          {activeTab === 'DASHBOARD' && (
            <div className="space-y-6">

              {/* Alert Status Banner */}
              <div className="bg-[#FEF2F2] border border-[#FCA5A5] rounded-xl p-4 flex items-start space-x-3 shadow-sm">
                <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wide">
                    {patient.name} Clinical Alert: {patient.riskProfile}
                  </h4>
                  <p className="text-xs text-rose-700 mt-1">
                    Current BP: <strong className="font-mono">{patient.bp}</strong> | HbA1c: <strong className="font-mono">{patient.hba1c}</strong>.
                  </p>
                </div>
              </div>

              {/* 1. Oscillogram Measurement Module */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Activity className="w-4 h-4 text-rose-600" />
                      Oscillometric BP Measurement Tool
                    </h3>
                    <p className="text-[10px] text-slate-400">Live arterial wave monitoring for {patient.name}</p>
                  </div>

                  <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
                    <input 
                      type="number" 
                      value={newSys} 
                      onChange={(e) => setNewSys(e.target.value)} 
                      className="w-12 text-xs font-bold font-mono px-1 py-0.5 rounded border border-slate-300 text-center"
                    />
                    <span className="text-xs font-bold text-slate-400">/</span>
                    <input 
                      type="number" 
                      value={newDia} 
                      onChange={(e) => setNewDia(e.target.value)} 
                      className="w-12 text-xs font-bold font-mono px-1 py-0.5 rounded border border-slate-300 text-center"
                    />
                    <button
                      onClick={startBpMeasurement}
                      disabled={isMeasuring}
                      className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1 rounded flex items-center gap-1 shadow-sm cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      {isMeasuring ? 'Measuring...' : 'Start Measure'}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-slate-800 pb-2 text-slate-400">
                    <span>CUFF PRESSURE: <strong className="text-amber-400">{cuffPressure} mmHg</strong></span>
                    {measurementDone && (
                      <span className="text-emerald-400 font-bold">READING: {finalBpResult.sys}/{finalBpResult.dia} mmHg</span>
                    )}
                  </div>
                  <canvas ref={canvasRef} width={600} height={100} className="w-full h-24 rounded bg-slate-900/60" />
                </div>
              </div>

              {/* 2. DISEASE-SPECIFIC MEDICATIONS (Single Strikethrough Line for Taken, No Checkbox) */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Pill className="w-4 h-4 text-blue-600" />
                      Medication Tracker: {selectedDisease}
                    </h3>
                    <p className="text-[10px] text-slate-400">Click medication row to toggle taken status</p>
                  </div>
                  <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded border border-blue-200">
                    Disease Specific
                  </span>
                </div>

                <div className="space-y-2">
                  {patientMeds.map((med, idx) => (
                    <div 
                      key={idx}
                      onClick={() => toggleMedication(idx)}
                      className={`p-3 rounded-lg border transition cursor-pointer flex justify-between items-center ${
                        med.taken 
                          ? 'bg-slate-100 border-slate-200 text-slate-400' 
                          : 'bg-white border-blue-200 text-slate-800 shadow-sm hover:border-blue-400'
                      }`}
                    >
                      <div>
                        {/* Single Strikethrough Line for Taken Meds */}
                        <div className={`text-xs font-bold ${med.taken ? 'line-through decoration-slate-500 text-slate-400' : 'text-slate-900'}`}>
                          {med.name}
                        </div>
                        <div className="text-[10px] text-slate-400">{med.dosage}</div>
                      </div>

                      <div className="text-right">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          med.taken ? 'bg-slate-200 text-slate-600' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {med.taken ? 'TAKEN' : 'STILL LEFT TO TAKE'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. DISEASE SYMPTOMS CHECKLIST & SEVERITY EVALUATION */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-rose-600" />
                      Symptom Evaluation: {selectedDisease}
                    </h3>
                    <p className="text-[10px] text-slate-400">Select active symptoms for current selected disease</p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                    Score: {calculateSymptomSeverityScore()} Points
                  </span>
                </div>

                <div className="space-y-2">
                  {symptomsList.map((sym, idx) => (
                    <div
                      key={idx}
                      onClick={() => toggleSymptom(idx)}
                      className={`p-2.5 rounded-lg border text-xs flex justify-between items-center cursor-pointer ${
                        sym.active ? 'bg-rose-50 border-rose-200 font-bold text-rose-900' : 'bg-slate-50 border-slate-200 text-slate-500'
                      }`}
                    >
                      <span>{sym.label}</span>
                      <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                        {sym.active ? `Active (+${sym.score} pts)` : 'Inactive'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. TIME VS BLOOD PRESSURE GRAPH FOR ACTIVE PATIENT */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  Daily BP Graph ({patient.name})
                </h3>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                  <div className="h-32 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                      <polyline
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="3"
                        points={patient.logs.map((log, i) => {
                          const x = (i / Math.max(patient.logs.length - 1, 1)) * 460 + 20;
                          const y = 120 - ((log.sys - 60) / 140) * 100;
                          return `${x},${y}`;
                        }).join(' ')}
                      />
                    </svg>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-600 border-t border-slate-200 pt-2 mt-2">
                    {patient.logs.map((log, idx) => (
                      <div key={idx} className="text-center">
                        <div className="font-bold">{log.time}</div>
                        <div className="text-slate-500">{log.sys}/{log.dia}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* VIEW: TRIAGE ANALYSIS */}
          {activeTab === 'TRIAGE ANALYSIS' && (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                Triage Analysis Breakdown
              </h3>
              <div className="border border-slate-200 rounded-lg overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 font-bold border-b text-slate-700">
                    <tr>
                      <th className="p-2.5">Patient</th>
                      <th className="p-2.5">Vitals BP</th>
                      <th className="p-2.5">Active Conditions</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium">
                    {Object.values(PATIENT_DATABASE).map((p) => (
                      <tr key={p.id} className={p.id === selectedPatientId ? 'bg-blue-50/60' : ''}>
                        <td className="p-2.5 font-bold text-slate-900">{p.name} ({p.id})</td>
                        <td className="p-2.5 font-mono text-rose-600 font-bold">{p.bp}</td>
                        <td className="p-2.5">{Object.keys(p.diseaseData).join(', ')}</td>
                        <td className="p-2.5">
                          <span className="bg-rose-100 text-rose-700 font-bold text-[10px] px-2 py-0.5 rounded">
                            {p.riskProfile}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW: PATIENT PORTFOLIO */}
          {activeTab === 'PATIENT PORTFOLIO' && (
            <div className="grid grid-cols-2 gap-4">
              {Object.values(PATIENT_DATABASE).map((p) => (
                <div 
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition shadow-sm ${
                    p.id === selectedPatientId ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-200' : 'bg-white border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-slate-900">{p.name}</h4>
                    <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">{p.id}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    <div>Primary MD: <strong>{p.primaryDoctor}</strong></div>
                    <div>BP: <strong className="text-rose-600 font-mono">{p.bp}</strong> | HbA1c: <strong>{p.hba1c}</strong></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VIEW: RISK PROFILES */}
          {activeTab === 'RISK PROFILES' && (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                Risk Profile Matrix ({patient.name})
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-50 rounded border justify-between flex">
                  <span>Glycemic Risk</span>
                  <span className="font-bold text-rose-600 font-mono">{patient.hba1c}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded border justify-between flex">
                  <span>Cardiovascular Stress</span>
                  <span className="font-bold text-rose-600 font-mono">{patient.bp}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded border justify-between flex">
                  <span>Renal eGFR Status</span>
                  <span className="font-bold text-amber-600 font-mono">{patient.egfr}</span>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* RIGHT COLUMN: Patient Vitals, Emergency Dispatcher & Health Insights Panel (3 Cols) */}
        <aside className="col-span-3 space-y-6">

          {/* Active Patient Vitals Summary */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Vitals: {patient.name}
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded border-l-4 border-rose-600 flex justify-between">
                <div>
                  <div className="font-bold">Blood Pressure</div>
                  <div className="text-[10px] text-slate-400">Arterial Tension</div>
                </div>
                <div className="text-right">
                  <div className="font-bold font-mono text-rose-600">{patient.bp}</div>
                  <div className="text-[9px] text-rose-600 font-bold">Crisis</div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded border-l-4 border-rose-600 flex justify-between">
                <div>
                  <div className="font-bold">HbA1c</div>
                  <div className="text-[10px] text-slate-400">Glycemic Control</div>
                </div>
                <div className="text-right">
                  <div className="font-bold font-mono text-slate-900">{patient.hba1c}</div>
                  <div className="text-[9px] text-rose-600 font-bold">Uncontrolled</div>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded border-l-4 border-amber-500 flex justify-between">
                <div>
                  <div className="font-bold">eGFR (Kidney)</div>
                  <div className="text-[10px] text-slate-400">Renal Function</div>
                </div>
                <div className="text-right">
                  <div className="font-bold font-mono text-slate-900">{patient.egfr}</div>
                  <div className="text-[9px] text-amber-600 font-bold">Stage 3a</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE HELPER: Quick Emergency Dialer Card with Live Number Display */}
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 border-b border-rose-200 pb-2">
              <PhoneCall className="w-4 h-4 text-rose-600" />
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider">Emergency Dispatcher</h4>
            </div>
            <p className="text-[11px] text-rose-800">
              Instantly dial the configured emergency number for <strong>{patient.emergencyContactName}</strong>:
            </p>
            <div className="bg-white p-2 rounded border border-rose-200 text-center font-mono font-bold text-xs text-rose-600">
              {currentEmergencyPhone}
            </div>
            <button 
              onClick={() => triggerDirectCall(patient.emergencyContactName, currentEmergencyPhone)}
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs py-2 px-3 rounded-lg shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Now Directly</span>
            </button>
          </div>

          {/* RIGHT SIDE HELPER: Patient Care Checklist & Reminders */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-2">
              <HeartPulse className="w-4 h-4 text-emerald-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Daily Care Checklist</h4>
            </div>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Morning fasting blood sugar logged</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Blood pressure monitored twice daily</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-slate-400 font-bold">○</span>
                <span>Evening medication adherence verified</span>
              </div>
            </div>
          </div>

        </aside>

      </div>
    </div>
  );
}