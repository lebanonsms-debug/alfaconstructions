import React, { useState, useEffect } from 'react';

// ============================================
// Animated Crane 3D (Full construction crane with rotating jib)
// ============================================
export function AnimatedCrane3D({ className = '', speed = 2 }) {
  return (
    <svg viewBox="0 0 600 500" className={`w-full h-auto ${className}`} style={{ animationDuration: `${speed}s`, animationIterationCount: "infinite" }}>
      <rect x="0" y="420" width="600" height="80" fill="#1a2a3a" rx="4" />
      <rect x="0" y="420" width="600" height="4" fill="#D4AF37" opacity="0.5" />
      <rect x="0" y="430" width="600" height="70" fill="#0A192F" rx="4" />

      <rect x="50" y="80" width="120" height="340" rx="2" fill="#14263F" />
      <rect x="200" y="50" width="150" height="370" rx="2" fill="#14263F" />
      <rect x="400" y="100" width="120" height="320" rx="2" fill="#14263F" />
      <rect x="520" y="60" width="80" height="360" rx="2" fill="#14263F" />

      {[80, 240, 380, 460].map((y, i) => (
        <rect key={y} x="50" y={y} width="120" height={20 + i * 10} fill="#D4AF37" opacity="0.15 + i * 0.05" rx="2" />
      ))}
      {[50, 260, 400].map((y, i) => (
        <rect key={y} x="200" y={y} width="150" height={20 + i * 10} fill="#D4AF37" opacity="0.15 + i * 0.05" rx="2" />
      ))}

      {[...Array(12)].map((_, i) => (
        <rect key={`w1-${i}`} x={82 + (i % 4) * 30} y={82 + Math.floor(i / 4) * 28} width="24" height="22" rx="2" fill="#D4AF37" opacity="0.1" />
      ))}
      {[...Array(14)].map((_, i) => (
        <rect key={`w2-${i}`} x={212 + (i % 5) * 28} y={52 + Math.floor(i / 5) * 28} width="26" height="24" rx="2" fill="#D4AF37" opacity="0.1" />
      ))}

      <rect x="180" y="380" width="40" height="40" fill="#0A192F" rx="2" />
      <rect x="170" y="370" width="60" height="12" fill="#D4AF37" opacity="0.3" />
      <rect x="188" y="340" width="24" height="40" fill="#14263F" rx="2" />
      <rect x="178" y="330" width="44" height="10" fill="#D4AF37" opacity="0.15" />

      <line x1="200" y1="340" x2="420" y2="340" stroke="#14263F" strokeWidth="8" strokeLinecap="round" />
      <line x1="200" y1="340" x2="415" y2="340" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <rect x="395" y="335" width="30" height="10" fill="#0A192F" rx="2" />
      <rect x="393" y="330" width="36" height="6" fill="#D4AF37" opacity="0.2" />

      <g>
        <ellipse cx="210" cy="336" rx="14" ry="10" fill="#0A192F" />
        <rect x="208" y="346" width="22" height="8" rx="2" fill="#14263F" />
        <circle cx="219" cy="351" r="3" fill="#D4AF37" opacity="0.6" />
        <animateTransform attributeName="transform" type="rotate" from="0 210 344" to="360 210 344" dur="5s" repeatCount="indefinite" />
      </g>

      <g>
        <line x1="210" y1="280" x2="218" y2="240" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        <line x1="218" y1="240" x2="225" y2="180" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        <path d="M210 180 L225 180 L228 173 L213 173 Z" fill="#D4AF37" opacity="0.9" />
        <animateTransform attributeName="transform" type="translate" values="0 0; 3 2; 0 0" dur="2s" repeatCount="indefinite" />
      </g>

      <g>
        <line x1="390" y1="280" x2="398" y2="250" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        <line x1="398" y1="250" x2="405" y2="190" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        <path d="M388 190 L405 190 L407 183 L390 183 Z" fill="#D4AF37" opacity="0.9" />
      </g>

      <animateTransform attributeName="transform" type="rotate" from="0 210 340" to="360 210 340" dur="6s" repeatCount="indefinite" />

      <rect x="200" y="400" width="180" height="15" rx="3" fill="#D4AF37" opacity="0.2" />
      <text x="290" y="410" fill="#D4AF37" fontSize="8" fontFamily="sans-serif" textAnchor="middle" opacity="0.6">SITE DE CONSTRUCTION</text>

      <g>
        <rect x="60" y="380" width="40" height="20" rx="4" fill="#0A192F" />
        <rect x="50" y="390" width="25" height="12" rx="2" fill="#D4AF37" opacity="0.15" />
        <rect x="50" y="400" width="50" height="15" rx="3" fill="#0A192F" />
        <rect x="45" y="400" width="30" height="15" fill="#888" opacity="0.3" />
        <rect x="55" y="400" width="25" height="15" fill="#888" opacity="0.3" />
        <line x1="95" y1="380" x2="105" y2="300" stroke="#14263F" strokeWidth="8" strokeLinecap="round" />
        <line x1="105" y1="300" x2="108" y2="280" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
        <animateTransform attributeName="transform" type="rotate" from="0 100 380" to="15 100 380" dur="3s" repeatCount="indefinite" />
        <line x1="105" y1="275" x2="108" y2="200" stroke="#14263F" strokeWidth="6" strokeLinecap="round" />
        <line x1="105" y1="200" x2="108" y2="170" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <animateTransform attributeName="transform" type="rotate" from="0 110 275" to="-10 110 275" dur="2s" repeatCount="indefinite" />
        <path d="M80 75 L100 110 L115 125 L105 75 Z" fill="#D4AF37" opacity="0.9" />
        <path d="M85 85 L100 110 L110 120 L110 90 Z" fill="#888" opacity="0.6" />
        <animateTransform attributeName="transform" type="rotate" from="0 100 75" to="15 100 75" dur="1.5s" repeatCount="indefinite" />
        <ellipse cx="100" cy="300" rx="15" ry="10" fill="#0A192F" />
        <rect x="98" y="310" width="20" height="8" rx="2" fill="#14263F" />
        <circle cx="108" cy="315" r="3" fill="#D4AF37" opacity="0.6" />
        <animateTransform attributeName="transform" type="rotate" from="0 115 310" to="360 115 310" dur="6s" repeatCount="indefinite" />
      </g>

      <rect x="420" y="380" width="50" height="20" rx="4" fill="#14263F" />
      <rect x="420" y="380" width="50" height="4" rx="2" fill="#D4AF37" opacity="0.15" />
      <rect x="410" y="365" width="25" height="20" rx="4" fill="#0A192F" />
      <circle cx="422" cy="372" r="3" fill="#D4AF37" opacity="0.6" />
      <rect x="395" y="430" width="45" height="15" rx="3" fill="#14263F" />
      <rect x="395" y="430" width="45" height="3" rx="2" fill="#D4AF37" opacity="0.2" />
      <ellipse cx="417" cy="440" rx="12" ry="9" fill="#14263F" />
      <ellipse cx="417" cy="440" rx="9" ry="5" fill="#D4AF37" opacity="0.2" />
      <animateTransform attributeName="transform" type="rotate" from="0 417 440" to="360 417 440" dur="3s" repeatCount="indefinite" />
      <rect x="403" y="442" width="14" height="12" rx="3" fill="#0A192F" />
      <rect x="400" y="440" width="4" height="14" fill="#D4AF37" opacity="0.3" />
      <animateTransform attributeName="transform" type="rotate" from="0 405 446" to="360 405 446" dur="1s" repeatCount="indefinite" />
      <rect x="428" y="442" width="14" height="12" rx="3" fill="#0A192F" />
      <rect x="425" y="440" width="4" height="14" fill="#D4AF37" opacity="0.3" />
      <animateTransform attributeName="transform" type="rotate" from="0 432 446" to="360 432 446" dur="1s" repeatCount="indefinite" />
      <rect x="350" y="425" width="25" height="25" rx="12" fill="#0A192F" />
      <rect x="325" y="418" width="55" height="8" rx="4" fill="#14263F" />
      <circle cx="345" cy="398" r="6" fill="#D4AF37" opacity="0.7" />
      <circle cx="345" cy="396" r="3" fill="#D4AF37" opacity="0.3" />
      <rect x="335" y="425" width="14" height="8" rx="2" fill="#D4AF37" opacity="0.5" />
      <rect x="351" y="425" width="14" height="8" rx="2" fill="#D4AF37" opacity="0.5" />
    </svg>
  );
}
