import React, { useState, useEffect } from 'react';

// ============================================
// Animated Construction Tools (animated icons)
// ============================================
export function AnimatedConstructionTools() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {[
        { icon: '🔨', title: 'Cammaire', desc: 'Niveau et fixation', animation: 'pulse' },
        { icon: '🔧', title: 'Tournevis', desc: 'Vis et boulons', animation: 'pulse' },
        { icon: '🪵', title: 'Plan de bois', desc: 'Structure en bois', animation: 'float' },
        { icon: '🗡️', title: 'Roues & pneus', desc: 'Mobilité sur chantier', animation: 'pulse' },
      ].map((tool, i) => (
        <div key={i} className="text-center p-3 rounded-lg bg-[#14263F] hover:bg-[#1a2a3a] transition-all duration-300 cursor-pointer animate__animated animate__pulse">
          <div className="text-2xl mb-1">{tool.icon}</div>
          <div className="text-sm font-semibold text-white">{tool.title}</div>
          <div className="text-xs text-white/60">{tool.desc}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// Animated Apprentice (trainer animation)
// ============================================
export function AnimatedApprentice() {
  return (
    <div className="relative p-6 rounded-xl bg-[#14263F] overflow-hidden">
      <svg viewBox="0 0 600 300" className="w-full h-auto">
        <rect x="0" y="0" width="600" height="300" fill="#14263F" />
        <rect x="0" y="270" width="600" height="30" fill="#0A192F" />
        <rect x="100" y="200" width="400" height="20" rx="3" fill="#D4AF37" opacity="0.1" />
        <g>
          {/* Student */}
          <rect x="200" y="250" width="60" height="25" rx="10" fill="#0A192F" />
          <rect x="175" y="245" width="75" height="8" rx="4" fill="#14263F" />
          <circle cx="210" cy="220" r="8" fill="#D4AF37" />
          <circle cx="225" cy="215" r="5" fill="#D4AF37" opacity="0.3" />
          <path d="M195 255 L200 250 L205 255" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
          {/* Instructor / trainer */}
          <g>
            <rect x="300" y="250" width="50" height="25" rx="10" fill="#0A192F" />
            <rect x="275" y="245" width="65" height="8" rx="4" fill="#D4AF37" />
            <circle cx="305" cy="220" r="8" fill="#D4AF37" />
            <circle cx="320" cy="215" r="5" fill="#D4AF37" opacity="0.3" />
            <path d="M290 255 L295 250 L300 255" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            <rect x="295" y="220" width="20" height="10" rx="5" fill="#14263F" />
            <rect x="298" y="200" width="14" height="22" rx="7" fill="#D4AF37" opacity="0.8" />
          </g>
          {/* Tools */}
          <rect x="400" y="260" width="25" height="20" rx="5" fill="#14263F" />
          <rect x="395" y="280" width="18" height="8" rx="3" fill="#D4AF37" opacity="0.3" />
        </g>
      </svg>
      <div className="absolute bottom-3 left-0 right-0 text-center">
        <p className="text-sm text-white/80">
          Formation et certification des techniciens en bâtiment
        </p>
      </div>
    </div>
  );
}

// ============================================
// Animated Building Construction (2D stage-by-stage)
// ============================================
export function AnimatedBuildingConstruction({ className = '', speed = 4 }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stages = [
    { title: 'Terrain préparé', desc: 'Terrain battu et niveaux fixés', color: '#D4AF37', bg: '#14263F' },
    { title: 'Fondations', desc: 'Piliers de béton installés', color: '#D4AF37', bg: '#14263F' },
    { title: 'Murs en construction', desc: 'Parpaings et enduit en cours', color: '#D4AF37', bg: '#14263F' },
    { title: 'Toiture', desc: 'Charpente et couverture posée', color: '#D4AF37', bg: '#14263F' },
    { title: 'Terminé', desc: 'Projet conformé livré', color: '#18F37A', bg: '#0A192F' },
  ];
  const currentStage = (stages[stage % stages.length] || stages[0]) as { title: string; desc: string };

  return (
    <div className={`relative overflow-hidden rounded-xl bg-[#0A192F] ${className}`}>
      <svg viewBox="0 0 800 350" className="w-full h-auto" style={{ animationDuration: `${speed}s`, animationIterationCount: 'infinite' }}>
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A192F" />
            <stop offset="100%" stopColor="#14263F" />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14263F" />
            <stop offset="100%" stopColor="#2A3F5F" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="800" height="350" fill="url(#sky)" />
        <rect x="0" y="280" width="800" height="70" fill="url(#ground)" />
        <rect x="0" y="280" width="800" height="4" fill="#D4AF37" opacity="0.4" />

        <g>
          <rect x="150" y="275" width="500" height="5" fill="#D4AF37" opacity="0.3" rx="2" />
          <rect x="160" y="100" width="300" height="175" rx="4" fill="#14263F" />
          <rect x="460" y="100" width="240" height="175" rx="4" fill="#14263F" />
          <rect x="170" y="110" width="280" height="3" rx="1" fill="#D4AF37" opacity="0.2" />
          <rect x="170" y="130" width="280" height="3" rx="1" fill="#D4AF37" opacity="0.15" />
          <rect x="170" y="150" width="280" height="3" rx="1" fill="#D4AF37" opacity="0.1" />

          {stage === 0 && (
            <rect x="170" y="240" width="280" height="35" rx="2" fill="#0A192F" />
          )}
          {stage === 1 && (
            <>
              <rect x="170" y="220" width="280" height="20" rx="2" fill="#0A192F" />
              <rect x="470" y="215" width="220" height="25" rx="2" fill="#0A192F" />
              <line x1="180" y1="250" x2="450" y2="220" stroke="#D4AF37" strokeWidth="1.5" opacity="0.3" />
              <circle cx="300" cy="230" r="10" fill="#D4AF37" opacity="0.5" />
              <rect x="180" y="245" width="10" height="50" fill="#D4AF37" opacity="0.2" />
              <rect x="220" y="245" width="10" height="50" fill="#D4AF37" opacity="0.2" />
              <rect x="260" y="245" width="10" height="50" fill="#D4AF37" opacity="0.2" />
            </>
          )}
          {stage === 2 && (
            <>
              <rect x="180" y="200" width="260" height="20" rx="1" fill="#14263F" />
              <rect x="180" y="220" width="260" height="20" rx="1" fill="#14263F" />
              <rect x="180" y="240" width="260" height="20" rx="1" fill="#14263F" />
              <rect x="180" y="260" width="260" height="15" rx="1" fill="#14263F" />
              <line x1="180" y1="270" x2="440" y2="270" stroke="#14263F" strokeWidth="1.5" />
              {[...Array(15)].map((_, i) => (
                <rect key={i} x={185 + (i % 5) * 18} y={220 + Math.floor(i / 5) * 20} width="14" height="30" fill="#D4AF37" opacity="0.1" rx="2" />
              ))}
            </>
          )}
          {stage === 3 && (
            <>
              <rect x="190" y="190" width="240" height="20" rx="1" fill="#14263F" />
              <rect x="200" y="170" width="220" height="20" rx="1" fill="#14263F" />
              <polygon points="220,150 400,150 310,120" fill="#D4AF37" opacity="0.3" />
              <rect x="190" y="188" width="240" height="12" fill="#14263F" />
              <line x1="220" y1="145" x2="400" y2="145" stroke="#D4AF37" strokeWidth="1" opacity="0.4" />
              <line x1="220" y1="160" x2="400" y2="160" stroke="#D4AF37" strokeWidth="1" opacity="0.2" />
              {[...Array(12)].map((_, i) => (
                <rect key={i} x={225 + (i % 4) * 40} y={135 + Math.floor(i / 4) * 25} width="30" height="15" rx="2" fill="#D4AF37" opacity="0.2" />
              ))}
            </>
          )}
          {stage === 4 && (
            <>
              <rect x="190" y="190" width="240" height="20" rx="1" fill="#14263F" />
              <rect x="200" y="170" width="220" height="20" rx="1" fill="#14263F" />
              <polygon points="220,140 400,140 310,100" fill="#18F37A" opacity="0.6" />
              <rect x="190" y="188" width="240" height="12" fill="#14263F" />
              <rect x="190" y="210" width="240" height="8" fill="#D4AF37" opacity="0.4" />
              <polygon points="220,120 400,120 310,80" fill="#18F37A" opacity="0.8" />
              <rect x="190" y="195" width="240" height="8" fill="#18F37A" opacity="0.3" />
            </>
          )}

          {[stage, stage + 1, stage + 2].map((s, i) => (
            <g key={i} opacity={s >= 2 ? 1 : 0}>
              <rect x={180 + ((s - 2) % 3) * 50} y={190 + ((s - 2) % 3) * 35} width="20" height="18" rx="2" fill="#D4AF37" opacity="0.2" />
              <rect x={220 + ((s - 2) % 3) * 50} y={225 + ((s - 2) % 3) * 35} width="20" height="18" rx="2" fill="#D4AF37" opacity="0.2" />
              <rect x={260 + ((s - 2) % 3) * 50} y={190 + ((s - 2) % 3) * 35} width="20" height="18" rx="2" fill="#D4AF37" opacity="0.2" />
            </g>
          ))}

          <g>
            <rect x="300" y="285" width="30" height="20" rx="5" fill="#0A192F" />
            <rect x="280" y="275" width="50" height="8" rx="2" fill="#14263F" />
            <circle cx="315" cy="260" r="6" fill="#D4AF37" opacity="0.8" />
            <circle cx="315" cy="258" r="3" fill="#D4AF37" opacity="0.3" />
            <path d="M300 280 L305 275 L310 280" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          <g opacity="0.3">
            <circle cx="350" cy="140" r="50" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="8,4" />
            <animateTransform attributeName="transform" type="rotate" from="0 350 140" to="360 350 140" dur="10s" repeatCount="indefinite" />
          </g>
        </g>

        <text x="400" y="365" fill="#D4AF37" fontSize="18" fontFamily="Inter" textAnchor="middle" fontWeight="bold">
          {currentStage.title}
        </text>
        <text x="400" y="385" fill="#ffffff" fontSize="12" fontFamily="Inter" textAnchor="middle" opacity="0.7">
          {stages[stage].desc}
        </text>
      </svg>

      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {stages.map((s, i) => (
          <button
            key={i}
            className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-300"
            style={{
              background: i === stage ? '#D4AF37' : '#14263F',
              color: i === stage ? '#0A192F' : '#D4AF37',
              border: i === stage ? 'none' : '1px solid #D4AF37',
            }}
            onClick={() => setStage(i)}
          >
            {s.title}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Animated Excavator (3D-style digging)
// ============================================
export function AnimatedExcavator({ className = '', speed = 3 }) {
  return (
    <svg viewBox="0 0 500 400" className={`w-full h-auto ${className}`} style={{ animationDuration: `${speed}s`, animationIterationCount: 'infinite' }}>
      <rect x="0" y="350" width="500" height="50" fill="#2A3F5F" rx="4" />
      <rect x="0" y="350" width="500" height="4" fill="#D4AF37" opacity="0.4" />

      <rect x="100" y="330" width="50" height="20" rx="5" fill="#0A192F" />
      <rect x="85" y="320" width="35" height="12" rx="2" fill="#D4AF37" opacity="0.15" />
      <rect x="70" y="340" width="40" height="12" rx="3" fill="#0A192F" />
      <rect x="60" y="340" width="25" height="15" fill="#888" opacity="0.3" />
      <rect x="75" y="340" width="25" height="15" fill="#888" opacity="0.3" />
      <animateTransform attributeName="transform" type="translate" values="0 0; 2 0; 0 0" dur="1.5s" repeatCount="indefinite" />

      <g>
        <line x1="120" y1="310" x2="130" y2="220" stroke="#14263F" strokeWidth="10" strokeLinecap="round" />
        <line x1="125" y1="220" x2="130" y2="200" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <animateTransform attributeName="transform" type="rotate" from="0 125 310" to="20 125 310" dur="3s" repeatCount="indefinite" />
      </g>

      <g>
        <line x1="130" y1="195" x2="130" y2="130" stroke="#14263F" strokeWidth="7" strokeLinecap="round" />
        <line x1="130" y1="130" x2="130" y2="90" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <animateTransform attributeName="transform" type="rotate" from="0 135 195" to="-15 135 195" dur="2s" repeatCount="indefinite" />
      </g>

      <path d="M100 80 L115 105 L130 120 L120 75 Z" fill="#D4AF37" opacity="0.9" />
      <path d="M105 90 L115 105 L125 115 L115 90 Z" fill="#888" opacity="0.6" />
      <animateTransform attributeName="transform" type="rotate" from="0 120 80" to="20 120 80" dur="1.2s" repeatCount="indefinite" />

      <g>
        <ellipse cx="125" cy="300" rx="15" ry="10" fill="#0A192F" />
        <rect x="123" y="310" width="20" height="8" rx="2" fill="#14263F" />
        <circle cx="133" cy="315" r="3" fill="#D4AF37" opacity="0.6" />
        <animateTransform attributeName="transform" type="rotate" from="0 130 310" to="360 130 310" dur="6s" repeatCount="indefinite" />
      </g>

      <rect x="200" y="250" width="150" height="12" rx="3" fill="#14263F" />
      <rect x="200" y="250" width="150" height="3" fill="#D4AF37" opacity="0.4" />
      <rect x="300" y="250" width="10" height="12" rx="2" fill="#D4AF37" opacity="0.6" />
      <animateTransform attributeName="transform" type="translate" values="0 0; 10 0; 0 0" dur="3s" repeatCount="indefinite" />

      <rect x="350" y="330" width="100" height="20" rx="4" fill="#0A192F" />
      <text x="400" y="342" fill="#D4AF37" fontSize="10" fontFamily="sans-serif" textAnchor="middle">SITE ALPHA</text>
    </svg>
  );
}

// ============================================
// Animated Dump Truck (3D driving animation)
// ============================================
export function AnimatedDumpTruck({ className = '', speed = 2 }) {
  return (
    <svg viewBox="0 0 500 280" className={`w-full h-auto ${className}`} style={{ animationDuration: `${speed}s`, animationIterationCount: 'infinite' }}>
      <rect x="0" y="250" width="500" height="30" fill="#2A3F5F" rx="4" />
      <rect x="0" y="250" width="500" height="3" fill="#D4AF37" opacity="0.4" />
      <rect x="20" y="270" width="460" height="2" fill="#888" opacity="0.4" />
      <rect x="20" y="270" width="20" height="2" fill="#D4AF37" opacity="0.8" />
      <rect x="80" y="270" width="20" height="2" fill="#D4AF37" opacity="0.8" />
      <rect x="140" y="270" width="20" height="2" fill="#D4AF37" opacity="0.8" />

      <g>
        <rect x="120" y="230" width="120" height="30" rx="4" fill="#14263F" />
        <rect x="120" y="230" width="120" height="4" rx="2" fill="#D4AF37" opacity="0.2" />
        <rect x="100" y="210" width="35" height="25" rx="4" fill="#0A192F" />
        <rect x="98" y="235" width="40" height="6" rx="2" fill="#D4AF37" opacity="0.15" />
        <circle cx="117" cy="218" r="4" fill="#D4AF37" opacity="0.6" />
        <circle cx="117" cy="216" r="2.5" fill="#D4AF37" opacity="0.2" />
        <rect x="230" y="215" width="45" height="20" rx="3" fill="#14263F" />
        <line x1="230" y1="228" x2="230" y2="235" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
        <animateTransform attributeName="transform" type="rotate" from="0 235 215" to="30 235 215" dur="3s" repeatCount="indefinite" />
        <g>
          <ellipse cx="300" cy="242" rx="14" ry="10" fill="#14263F" />
          <ellipse cx="300" cy="242" rx="10" ry="6" fill="#D4AF37" opacity="0.2" />
          <ellipse cx="300" cy="242" rx="8" ry="4" fill="#0A192F" />
          <animateTransform attributeName="transform" type="rotate" from="0 300 242" to="360 300 242" dur="3s" repeatCount="indefinite" />
        </g>
        <rect x="130" y="258" width="16" height="12" rx="3" fill="#0A192F" />
        <rect x="127" y="256" width="4" height="14" fill="#D4AF37" opacity="0.3" />
        <animateTransform attributeName="transform" type="rotate" from="0 138 264" to="360 138 264" dur="1s" repeatCount="indefinite" />
        <rect x="220" y="258" width="16" height="12" rx="3" fill="#0A192F" />
        <rect x="217" y="256" width="4" height="14" fill="#D4AF37" opacity="0.3" />
        <animateTransform attributeName="transform" type="rotate" from="0 228 264" to="360 228 264" dur="1s" repeatCount="indefinite" />
      </g>

      <g>
        <rect x="50" y="240" width="70" height="20" rx="4" fill="#0A192F" />
        <rect x="50" y="240" width="70" height="3" rx="2" fill="#D4AF37" opacity="0.15" />
        <rect x="50" y="255" width="70" height="10" rx="2" fill="#0A192F" />
        <rect x="40" y="225" width="22" height="18" rx="3" fill="#0A192F" />
        <circle cx="51" cy="232" r="3" fill="#D4AF37" opacity="0.6" />
        <circle cx="51" cy="230" r="1.5" fill="#D4AF37" opacity="0.2" />
        <rect x="110" y="215" width="25" height="20" rx="4" fill="#14263F" />
        <rect x="110" y="230" width="25" height="3" rx="2" fill="#D4AF37" opacity="0.3" />
        <rect x="57" y="258" width="14" height="10" rx="3" fill="#0A192F" />
        <rect x="54" y="256" width="4" height="12" fill="#D4AF37" opacity="0.3" />
        <animateTransform attributeName="transform" type="rotate" from="0 64 263" to="360 64 263" dur="1s" repeatCount="indefinite" />
        <rect x="95" y="258" width="14" height="10" rx="3" fill="#0A192F" />
        <rect x="92" y="256" width="4" height="12" fill="#D4AF37" opacity="0.3" />
        <animateTransform attributeName="transform" type="rotate" from="0 102 263" to="360 102 263" dur="1s" repeatCount="indefinite" />
      </g>

      <g>
        <rect x="210" y="240" width="60" height="20" rx="4" fill="#14263F" />
        <rect x="210" y="240" width="60" height="3" rx="2" fill="#D4AF37" opacity="0.15" />
        <rect x="200" y="220" width="22" height="22" rx="4" fill="#0A192F" />
        <rect x="198" y="242" width="28" height="6" rx="2" fill="#D4AF37" opacity="0.15" />
        <circle cx="211" cy="228" r="3" fill="#D4AF37" opacity="0.6" />
        <g>
          <ellipse cx="240" cy="255" rx="16" ry="12" fill="#14263F" />
          <ellipse cx="240" cy="255" rx="12" ry="7" fill="#D4AF37" opacity="0.2" />
          <ellipse cx="240" cy="255" rx="10" ry="5" fill="#0A192F" />
          <animateTransform attributeName="transform" type="rotate" from="0 240 255" to="360 240 255" dur="2.5s" repeatCount="indefinite" />
          <rect x="234" y="250" width="12" height="10" rx="1" fill="#D4AF37" opacity="0.4" />
          <rect x="232" y="248" width="4" height="14" rx="1" fill="#888" opacity="0.3" />
        </g>
        <rect x="217" y="258" width="14" height="10" rx="3" fill="#0A192F" />
        <rect x="214" y="256" width="4" height="12" fill="#D4AF37" opacity="0.3" />
        <animateTransform attributeName="transform" type="rotate" from="0 224 263" to="360 224 263" dur="1s" repeatCount="indefinite" />
        <rect x="247" y="258" width="14" height="10" rx="3" fill="#0A192F" />
        <rect x="244" y="256" width="4" height="12" fill="#D4AF37" opacity="0.3" />
        <animateTransform attributeName="transform" type="rotate" from="0 254 263" to="360 254 263" dur="1s" repeatCount="indefinite" />
      </g>

      <g>
        <rect x="300" y="245" width="25" height="25" rx="12" fill="#0A192F" />
        <rect x="270" y="238" width="65" height="8" rx="4" fill="#14263F" />
        <circle cx="312" cy="218" r="6" fill="#D4AF37" opacity="0.7" />
        <circle cx="312" cy="216" r="3" fill="#D4AF37" opacity="0.3" />
        <rect x="300" y="245" width="25" height="4" rx="2" fill="#0A192F" />
        <rect x="294" y="275" width="14" height="8" rx="2" fill="#D4AF37" opacity="0.5" />
        <rect x="312" y="275" width="14" height="8" rx="2" fill="#D4AF37" opacity="0.5" />
      </g>
    </svg>
  );
}

// ============================================
// Animated Building Progress
// ============================================
export function AnimatedBuildingProgress({ className = '', steps = 5 }) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps);
    }, 2500);
    return () => clearInterval(interval);
  }, [steps]);

  const stageData = [
    { phase: 'Terrain', desc: 'Terrain préparé', color: '#14263F' },
    { phase: 'Fondations', desc: 'Piliers béton', color: '#D4AF37' },
    { phase: 'Murs', desc: 'Enduit & parpaings', color: '#D4AF37' },
    { phase: 'Toiture', desc: 'Charpente & couverture', color: '#18F37A' },
    { phase: 'Terminé', desc: 'Livraison', color: '#18F37A' },
  ];

  return (
    <div className={`rounded-xl overflow-hidden bg-[#0A192F] ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Progression du chantier</h3>
          <span className="text-xs text-white/50">{(stageData[currentStep] || stageData[0]).phase} — {Math.round((currentStep / steps) * 100)}%</span>
        </div>

        <div className="w-full h-2 bg-[#14263F] rounded-full overflow-hidden">
          <div className="h-full bg-[#D4AF37] rounded-full transition-all duration-700 ease-out" style={{ width: `${((currentStep + 1) / steps) * 100}%` }} />
        </div>

        <svg viewBox="0 0 500 200" className="w-full h-auto mt-4">
          <rect x="0" y="0" width="500" height="200" fill="#0A192F" />
          <rect x="0" y="170" width="500" height="30" fill="#14263F" />
          <g>
            {currentStep === 0 && (
              <>
                <rect x="50" y="160" width="400" height="40" rx="2" fill="#14263F" />
                <rect x="50" y="165" width="400" height="3" fill="#D4AF37" opacity="0.3" />
                <rect x="70" y="168" width="370" height="3" fill="#14263F" opacity="0.5" />
                <text x="250" y="185" fill="#D4AF37" fontSize="14" textAnchor="middle" opacity="0.5">📍 Terrain</text>
              </>
            )}
            {currentStep === 1 && (
              <>
                <rect x="50" y="160" width="400" height="40" rx="2" fill="#14263F" />
                <rect x="55" y="150" width="390" height="15" rx="2" fill="#14263F" />
                <rect x="55" y="140" width="390" height="12" rx="2" fill="#D4AF37" opacity="0.3" />
                <rect x="60" y="155" width="180" height="3" rx="1" fill="#D4AF37" opacity="0.4" />
                <rect x="280" y="155" width="180" height="3" rx="1" fill="#D4AF37" opacity="0.4" />
                <text x="250" y="180" fill="#D4AF37" fontSize="14" textAnchor="middle" opacity="0.6">🏗️ Fondations</text>
              </>
            )}
            {currentStep === 2 && (
              <>
                <rect x="50" y="160" width="400" height="40" rx="2" fill="#14263F" />
                <rect x="55" y="140" width="390" height="20" rx="2" fill="#14263F" />
                <rect x="60" y="150" width="380" height="18" rx="1" fill="#14263F" />
                <rect x="65" y="145" width="370" height="3" fill="#D4AF37" opacity="0.2" />
                {[...Array(12)].map((_, i) => (
                  <rect key={i} x={65 + (i % 4) * 30} y={145 + Math.floor(i / 4) * 18} width="22" height="28" rx="2" fill="#D4AF37" opacity="0.1" />
                ))}
                <text x="250" y="180" fill="#D4AF37" fontSize="14" textAnchor="middle" opacity="0.6">🧱 Murs</text>
              </>
            )}
            {currentStep === 3 && (
              <>
                <rect x="55" y="140" width="390" height="20" rx="2" fill="#14263F" />
                <rect x="60" y="120" width="380" height="20" rx="2" fill="#14263F" />
                <polygon points="250,100 375,100 312,60" fill="#D4AF37" opacity="0.3" />
                <rect x="60" y="120" width="380" height="12" fill="#14263F" />
                <line x1="70" y1="95" x2="430" y2="95" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
                <line x1="70" y1="110" x2="430" y2="110" stroke="#D4AF37" strokeWidth="1" opacity="0.15" />
                {[...Array(12)].map((_, i) => (
                  <rect key={i} x={75 + (i % 4) * 35} y={85 + Math.floor(i / 4) * 20} width="25" height="15" rx="2" fill="#D4AF37" opacity="0.2" />
                ))}
                <text x="250" y="180" fill="#D4AF37" fontSize="14" textAnchor="middle" opacity="0.6">🔨 Toiture</text>
              </>
            )}
            {currentStep === 4 && (
              <>
                <rect x="55" y="140" width="390" height="20" rx="2" fill="#14263F" />
                <rect x="60" y="120" width="380" height="20" rx="2" fill="#14263F" />
                <polygon points="250,100 375,100 312,60" fill="#18F37A" opacity="0.6" />
                <rect x="60" y="120" width="380" height="12" fill="#14263F" />
                <rect x="60" y="180" width="380" height="6" fill="#D4AF37" opacity="0.4" />
                <polygon points="250,70 375,70 312,40" fill="#18F37A" opacity="0.6" />
                {[...Array(12)].map((_, i) => (
                  <rect key={i} x={65 + (i % 4) * 30} y={110 + Math.floor(i / 4) * 18} width="22" height="28" rx="2" fill="#18F37A" opacity="0.2" />
                ))}
                <text x="250" y="180" fill="#18F37A" fontSize="14" textAnchor="middle" opacity="0.8">✅ Terminé</text>
              </>
            )}
          </g>
        </svg>

        <div className="flex justify-center gap-2 mt-4">
          {stageData.map((s, i) => (
            <button
              key={i}
              className={`px-2 py-1 rounded-full text-xs transition-all duration-300 ${i === currentStep ? 'bg-[#D4AF37] text-[#0A192F]' : 'bg-[#14263F] text-white/50 hover:text-white'}`}
              onClick={() => setCurrentStep(i)}
            >
              {s.phase}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Animated Construction Site (full scene)
// ============================================
export function AnimatedConstructionSite({ className = '', loop = true }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-[#0A192F] ${className}`}>
      <svg viewBox="0 0 600 400" className="w-full h-auto">
        <defs>
          <linearGradient id="constructionSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0A192F" />
            <stop offset="100%" stopColor="#14263F" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="600" height="400" fill="url(#constructionSky)" />
        <rect x="0" y="300" width="600" height="100" fill="#2A3F5F" />
        <rect x="0" y="300" width="600" height="4" fill="#D4AF37" opacity="0.5" />

        {/* Buildings under construction */}
        <rect x="30" y="80" width="150" height="220" rx="2" fill="#14263F" />
        <rect x="220" y="40" width="180" height="260" rx="2" fill="#14263F" />
        <rect x="440" y="100" width="130" height="200" rx="2" fill="#14263F" />

        {/* Building floors */}
        {[...Array(10)].map((_, i) => (
          <rect key={`fl-${i}`} x="35" y={85 + i * 20} width="140" height="16" rx="1" fill="#D4AF37" opacity="0.1" />
        ))}
        {[...Array(12)].map((_, i) => (
          <rect key={`fl2-${i}`} x={225 + (i % 5) * 32} y={45 + Math.floor(i / 5) * 20} width="24" height="16" rx="1" fill="#D4AF37" opacity="0.08" />
        ))}

        {/* Crane */}
        <g>
          <rect x="180" y="300" width="40" height="40" fill="#0A192F" rx="2" />
          <rect x="170" y="290" width="60" height="12" fill="#D4AF37" opacity="0.3" />
          <rect x="188" y="260" width="24" height="40" fill="#14263F" rx="2" />
          <line x1="200" y1="270" x2="350" y2="270" stroke="#14263F" strokeWidth="8" strokeLinecap="round" />
          <line x1="200" y1="270" x2="345" y2="270" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <rect x="400" y="265" width="25" height="10" fill="#0A192F" rx="2" />
          <rect x="398" y="260" width="31" height="6" fill="#D4AF37" opacity="0.2" />

          <g>
            <ellipse cx="200" cy="258" rx="14" ry="12" fill="#0A192F" />
            <rect x="198" y="268" width="22" height="8" rx="2" fill="#14263F" />
            <circle cx="209" cy="274" r="3" fill="#D4AF37" opacity="0.6" />
            <animateTransform attributeName="transform" type="rotate" from="0 205 270" to="360 205 270" dur="6s" repeatCount="indefinite" />
          </g>

          <g>
            <line x1="200" y1="200" x2="210" y2="140" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            <line x1="210" y1="140" x2="225" y2="90" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
            <path d="M200 90 L225 90 L230 80 L205 80 Z" fill="#D4AF37" opacity="0.9" />
            <animateTransform attributeName="transform" type="translate" values="0 0; -2 -2; 0 0" dur="2s" repeatCount="indefinite" />
          </g>

          <animateTransform attributeName="transform" type="rotate" from="0 205 270" to="360 205 270" dur="7s" repeatCount="indefinite" />
        </g>

        {/* Excavator */}
        <g>
          <rect x="80" y="305" width="40" height="20" rx="5" fill="#0A192F" />
          <rect x="70" y="320" width="25" height="12" rx="2" fill="#D4AF37" opacity="0.15" />
          <rect x="60" y="315" width="30" height="12" rx="3" fill="#0A192F" />
          <rect x="55" y="315" width="20" height="15" fill="#888" opacity="0.3" />
          <rect x="70" y="315" width="20" height="15" fill="#888" opacity="0.3" />
          <line x1="95" y1="300" x2="95" y2="240" stroke="#14263F" strokeWidth="8" strokeLinecap="round" />
          <line x1="95" y1="240" x2="95" y2="215" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          <animateTransform attributeName="transform" type="rotate" from="0 100 300" to="15 100 300" dur="3s" repeatCount="indefinite" />
          <line x1="95" y1="210" x2="95" y2="160" stroke="#14263F" strokeWidth="6" strokeLinecap="round" />
          <line x1="95" y1="160" x2="95" y2="145" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
          <animateTransform attributeName="transform" type="rotate" from="0 105 210" to="-10 105 210" dur="2s" repeatCount="indefinite" />
          <path d="M70 135 L90 160 L100 175 L85 145 Z" fill="#D4AF37" opacity="0.9" />
          <path d="M75 145 L90 165 L98 172 L98 150 Z" fill="#888" opacity="0.6" />
          <animateTransform attributeName="transform" type="rotate" from="0 90 135" to="15 90 135" dur="1.2s" repeatCount="indefinite" />
          <g>
            <ellipse cx="95" cy="250" rx="15" ry="10" fill="#0A192F" />
            <rect x="93" y="260" width="20" height="8" rx="2" fill="#14263F" />
            <circle cx="103" cy="265" r="3" fill="#D4AF37" opacity="0.6" />
            <animateTransform attributeName="transform" type="rotate" from="0 100 260" to="360 100 260" dur="6s" repeatCount="indefinite" />
          </g>
        </g>

        {/* Dump truck */}
        <g>
          <rect x="380" y="310" width="80" height="30" rx="4" fill="#14263F" />
          <rect x="380" y="310" width="80" height="4" rx="2" fill="#D4AF37" opacity="0.2" />
          <rect x="370" y="290" width="30" height="22" rx="4" fill="#0A192F" />
          <rect x="368" y="312" width="36" height="6" rx="2" fill="#D4AF37" opacity="0.15" />
          <circle cx="385" cy="297" r="4" fill="#D4AF37" opacity="0.6" />
          <rect x="395" y="320" width="30" height="15" rx="3" fill="#14263F" />
          <line x1="395" y1="332" x2="395" y2="337" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
          <animateTransform attributeName="transform" type="rotate" from="0 400 320" to="25 400 320" dur="3s" repeatCount="indefinite" />
          <rect x="380" y="335" width="14" height="10" rx="3" fill="#0A192F" />
          <rect x="377" y="333" width="4" height="14" fill="#D4AF37" opacity="0.3" />
          <animateTransform attributeName="transform" type="rotate" from="0 387 340" to="360 387 340" dur="1s" repeatCount="indefinite" />
          <rect x="405" y="335" width="14" height="10" rx="3" fill="#0A192F" />
          <rect x="402" y="333" width="4" height="14" fill="#D4AF37" opacity="0.3" />
          <animateTransform attributeName="transform" type="rotate" from="0 412 340" to="360 412 340" dur="1s" repeatCount="indefinite" />
          <rect x="395" y="300" width="4" height="12" fill="#D4AF37" opacity="0.3" />
          <animateTransform attributeName="transform" type="rotate" from="0 397 305" to="360 397 305" dur="1s" repeatCount="indefinite" />
        </g>

        {/* Concrete mixer truck */}
        <g>
          <rect x="470" y="315" width="50" height="22" rx="3" fill="#14263F" />
          <rect x="470" y="315" width="50" height="3" rx="2" fill="#D4AF37" opacity="0.15" />
          <rect x="465" y="300" width="22" height="20" rx="4" fill="#0A192F" />
          <circle cx="476" cy="307" r="3" fill="#D4AF37" opacity="0.6" />
          <g>
            <ellipse cx="495" cy="330" rx="16" ry="12" fill="#14263F" />
            <ellipse cx="495" cy="330" rx="12" ry="7" fill="#D4AF37" opacity="0.2" />
            <ellipse cx="495" cy="330" rx="10" ry="5" fill="#0A192F" />
            <animateTransform attributeName="transform" type="rotate" from="0 495 330" to="360 495 330" dur="3s" repeatCount="indefinite" />
          </g>
          <rect x="472" y="338" width="14" height="12" rx="3" fill="#0A192F" />
          <rect x="469" y="336" width="4" height="14" fill="#D4AF37" opacity="0.3" />
          <animateTransform attributeName="transform" type="rotate" from="0 476 342" to="360 476 342" dur="1s" repeatCount="indefinite" />
          <rect x="496" y="338" width="14" height="12" rx="3" fill="#0A192F" />
          <rect x="493" y="336" width="4" height="14" fill="#D4AF37" opacity="0.3" />
          <animateTransform attributeName="transform" type="rotate" from="0 499 342" to="360 499 342" dur="1s" repeatCount="indefinite" />
        </g>

        {/* Site sign */}
        <rect x="500" y="310" width="80" height="20" rx="4" fill="#0A192F" />
        <text x="540" y="322" fill="#D4AF37" fontSize="10" fontFamily="sans-serif" textAnchor="middle">ALPHA</text>

        {/* Worker */}
        <g>
          <rect x="340" y="305" width="25" height="25" rx="12" fill="#0A192F" />
          <rect x="315" y="298" width="55" height="8" rx="4" fill="#14263F" />
          <circle cx="332" cy="280" r="6" fill="#D4AF37" opacity="0.7" />
          <circle cx="332" cy="278" r="3" fill="#D4AF37" opacity="0.3" />
          <rect x="325" y="305" width="15" height="6" rx="2" fill="#0A192F" />
          <rect x="322" y="322" width="12" height="6" rx="2" fill="#D4AF37" opacity="0.5" />
          <rect x="338" y="322" width="12" height="6" rx="2" fill="#D4AF37" opacity="0.5" />
        </g>
      </svg>

      {/* Label */}
      <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/60 text-white text-xs backdrop-blur-sm">
        🏗️ Site de construction en direct
      </div>
    </div>
  );
}
