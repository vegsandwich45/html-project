import React, { useState } from 'react';
import { 
  Activity, AlertTriangle, CheckCircle2, 
  Search, Clock, ArrowRight 
} from 'lucide-react';

const INITIAL_BOARD = {
  triage: [
    { id: 'PAT-90341', name: 'Eleanor Vance', age: 62, condition: 'Type 2 Diabetes / Crisis BP', risk: 'High', bp: '185/110', hba1c: '12.5%', time: '10m ago' },
    { id: 'PAT-88219', name: 'Marcus Brody', age: 54, condition: 'Type 2 Diabetes', risk: 'Medium', bp: '130/85', hba1c: '8.8%', time: '25m ago' }
  ],
  review: [
    { id: 'PAT-77102', name: 'Sarah Connor', age: 69, condition: 'Renal CKD Stage 3', risk: 'High', bp: '142/88', hba1c: '9.1%', time: '1h ago' },
    { id: 'PAT-65420', name: 'Arthur Pendelton', age: 48, condition: 'Hypertension', risk: 'Low', bp: '138/86', hba1c: '6.4%', time: '2h ago' }
  ],
  treatment: [
    { id: 'PAT-54109', name: 'Diana Prince', age: 39, condition: 'Gestational Diabetes', risk: 'Medium', bp: '124/80', hba1c: '7.2%', time: '3h ago' }
  ],
  discharged: [
    { id: 'PAT-32091', name: 'Robert Bruce', age: 71, condition: 'Post-Op Observation', risk: 'Low', bp: '118/75', hba1c: '5.9%', time: '5h ago' }
  ]
};

const COLUMNS = [
  { id: 'triage', title: 'Triage & Intake', border: 'border-rose-500/40', badge: 'bg-rose-500/20 text-rose-300' },
  { id: 'review', title: 'Under Clinical Review', border: 'border-amber-500/40', badge: 'bg-amber-500/20 text-amber-300' },
  { id: 'treatment', title: 'Active Treatment Plan', border: 'border-blue-500/40', badge: 'bg-blue-500/20 text-blue-300' },
  { id: 'discharged', title: 'Cleared / Discharged', border: 'border-emerald-500/40', badge: 'bg-emerald-500/20 text-emerald-300' }
];

export default function ClinicalBoard() {
  const [boardData, setBoardData] = useState(INITIAL_BOARD);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRisk, setSelectedRisk] = useState('All');

  const moveCard = (currentCol, targetCol, cardId) => {
    const cardToMove = boardData[currentCol].find(c => c.id === cardId);
    if (!cardToMove) return;

    setBoardData(prev => ({
      ...prev,
      [currentCol]: prev[currentCol].filter(c => c.id !== cardId),
      [targetCol]: [...prev[targetCol], cardToMove]
    }));
  };

  const getRiskBadge = (risk) => {
    switch (risk) {
      case 'High':
        return <span className="flex items-center gap-1 bg-rose-950/80 text-rose-300 border border-rose-800 text-[10px] font-bold px-2 py-0.5 rounded"><AlertTriangle className="w-3 h-3" /> HIGH RISK</span>;
      case 'Medium':
        return <span className="flex items-center gap-1 bg-amber-950/80 text-amber-300 border border-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">MEDIUM RISK</span>;
      default:
        return <span className="flex items-center gap-1 bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded"><CheckCircle2 className="w-3 h-3" /> LOW RISK</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white leading-none">Patient Workflow Board</h1>
            <p className="text-xs text-slate-400 mt-1">Real-time Patient Triage & Clinical Status Tracker</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              placeholder="Search patient or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 w-64"
            />
          </div>

          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-700 rounded-lg p-1 text-xs">
            {['All', 'High', 'Medium', 'Low'].map(r => (
              <button
                key={r}
                onClick={() => setSelectedRisk(r)}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  selectedRisk === r ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto">
        {COLUMNS.map((col, colIdx) => {
          const cards = boardData[col.id].filter(c => {
            const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRisk = selectedRisk === 'All' || c.risk === selectedRisk;
            return matchesSearch && matchesRisk;
          });

          const nextCol = COLUMNS[colIdx + 1]?.id;

          return (
            <div key={col.id} className="bg-slate-800/60 border border-slate-700/80 rounded-xl flex flex-col h-full max-h-[calc(100vh-140px)]">
              <div className={`p-4 border-b border-slate-700 flex items-center justify-between border-t-4 ${col.border} rounded-t-xl bg-slate-800`}>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">{col.title}</h3>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${col.badge}`}>
                  {cards.length}
                </span>
              </div>

              <div className="p-3 space-y-3 overflow-y-auto flex-1">
                {cards.length === 0 ? (
                  <div className="text-center py-8 border border-dashed border-slate-700/60 rounded-lg text-slate-500 text-xs">
                    No active patients
                  </div>
                ) : (
                  cards.map(patient => (
                    <div 
                      key={patient.id} 
                      className="bg-slate-900 border border-slate-700/80 hover:border-slate-500 rounded-lg p-4 space-y-3 transition-all shadow-md group"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400">{patient.id}</span>
                          <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors">{patient.name} ({patient.age}y)</h4>
                        </div>
                        {getRiskBadge(patient.risk)}
                      </div>

                      <div className="text-xs text-slate-300 font-medium bg-slate-800/50 p-2 rounded border border-slate-700/40">
                        {patient.condition}
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                        <div>BP: <span className="text-slate-200 font-mono font-semibold">{patient.bp}</span></div>
                        <div>HbA1c: <span className="text-slate-200 font-mono font-semibold">{patient.hba1c}</span></div>
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {patient.time}</span>
                        
                        {nextCol && (
                          <button
                            onClick={() => moveCard(col.id, nextCol, patient.id)}
                            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 font-bold transition-colors"
                          >
                            Advance <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}