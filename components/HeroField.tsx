export function HeroField({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width: '100%', height: 'auto', maxHeight: '520px' }}
      aria-hidden="true"
    >
      <defs>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="centreGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="fieldGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="var(--hero-glow)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--hero-glow)" stopOpacity="0" />
        </radialGradient>
        <style>{`
          .qmm-node { transition: opacity 0.3s ease; }
          .qmm-pulse-1 { animation: qmm-pulse 4s ease-in-out infinite; }
          .qmm-pulse-2 { animation: qmm-pulse 4s ease-in-out 1.3s infinite; }
          .qmm-pulse-3 { animation: qmm-pulse 4s ease-in-out 2.6s infinite; }
          .qmm-line { animation: qmm-flow 6s ease-in-out infinite; }
          .qmm-line-2 { animation: qmm-flow 6s ease-in-out 2s infinite; }
          .qmm-line-3 { animation: qmm-flow 6s ease-in-out 4s infinite; }
          @keyframes qmm-pulse {
            0%, 100% { opacity: 0.4; r: 6; }
            50% { opacity: 0.9; r: 8; }
          }
          @keyframes qmm-flow {
            0%, 100% { opacity: 0.15; }
            50% { opacity: 0.4; }
          }
          @media (prefers-reduced-motion: reduce) {
            .qmm-pulse-1, .qmm-pulse-2, .qmm-pulse-3,
            .qmm-line, .qmm-line-2, .qmm-line-3 {
              animation: none; opacity: 0.4;
            }
          }
        `}</style>
      </defs>

      <rect width="800" height="500" fill="url(#fieldGrad)" />

      {/* CONNECTION LINES */}
      <line x1="400" y1="250" x2="160" y2="130" stroke="var(--hero-line)" strokeWidth="1" className="qmm-line" />
      <line x1="400" y1="250" x2="280" y2="80" stroke="var(--hero-line)" strokeWidth="1" className="qmm-line-2" />
      <line x1="400" y1="250" x2="580" y2="100" stroke="var(--hero-line)" strokeWidth="1" className="qmm-line" />
      <line x1="400" y1="250" x2="660" y2="180" stroke="var(--hero-line)" strokeWidth="1" className="qmm-line-3" />
      <line x1="400" y1="250" x2="680" y2="350" stroke="var(--hero-line)" strokeWidth="1" className="qmm-line-2" />
      <line x1="400" y1="250" x2="560" y2="420" stroke="var(--hero-line)" strokeWidth="1" className="qmm-line" />
      <line x1="400" y1="250" x2="240" y2="390" stroke="var(--hero-line)" strokeWidth="1" className="qmm-line-3" />
      <line x1="400" y1="250" x2="130" y2="320" stroke="var(--hero-line)" strokeWidth="1" className="qmm-line-2" />
      {/* Secondary connections */}
      <line x1="160" y1="130" x2="280" y2="80" stroke="var(--hero-line)" strokeWidth="0.5" className="qmm-line" />
      <line x1="280" y1="80" x2="580" y2="100" stroke="var(--hero-line)" strokeWidth="0.5" className="qmm-line-3" />
      <line x1="580" y1="100" x2="660" y2="180" stroke="var(--hero-line)" strokeWidth="0.5" className="qmm-line-2" />
      <line x1="660" y1="180" x2="680" y2="350" stroke="var(--hero-line)" strokeWidth="0.5" className="qmm-line" />
      <line x1="680" y1="350" x2="560" y2="420" stroke="var(--hero-line)" strokeWidth="0.5" className="qmm-line-3" />
      <line x1="560" y1="420" x2="240" y2="390" stroke="var(--hero-line)" strokeWidth="0.5" className="qmm-line-2" />
      <line x1="240" y1="390" x2="130" y2="320" stroke="var(--hero-line)" strokeWidth="0.5" className="qmm-line" />
      <line x1="130" y1="320" x2="160" y2="130" stroke="var(--hero-line)" strokeWidth="0.5" className="qmm-line-3" />

      {/* OUTER NODES */}
      <circle cx="160" cy="130" r="6" fill="var(--hero-node)" opacity="0.5" filter="url(#glow)" className="qmm-pulse-1" />
      <circle cx="280" cy="80"  r="5" fill="var(--hero-node)" opacity="0.4" filter="url(#glow)" className="qmm-pulse-2" />
      <circle cx="500" cy="60"  r="4" fill="var(--hero-node)" opacity="0.35" className="qmm-pulse-3" />
      <circle cx="580" cy="100" r="6" fill="var(--hero-node)" opacity="0.5" filter="url(#glow)" className="qmm-pulse-1" />
      <circle cx="660" cy="180" r="5" fill="var(--hero-node)" opacity="0.45" className="qmm-pulse-2" />
      <circle cx="700" cy="270" r="4" fill="var(--hero-node)" opacity="0.35" className="qmm-pulse-3" />
      <circle cx="680" cy="350" r="6" fill="var(--hero-node)" opacity="0.5" filter="url(#glow)" className="qmm-pulse-1" />
      <circle cx="600" cy="430" r="4" fill="var(--hero-node)" opacity="0.4" className="qmm-pulse-2" />
      <circle cx="560" cy="420" r="6" fill="var(--hero-node)" opacity="0.5" filter="url(#glow)" className="qmm-pulse-3" />
      <circle cx="400" cy="440" r="4" fill="var(--hero-node)" opacity="0.35" className="qmm-pulse-1" />
      <circle cx="240" cy="390" r="6" fill="var(--hero-node)" opacity="0.5" filter="url(#glow)" className="qmm-pulse-2" />
      <circle cx="130" cy="320" r="5" fill="var(--hero-node)" opacity="0.45" className="qmm-pulse-3" />
      <circle cx="100" cy="220" r="4" fill="var(--hero-node)" opacity="0.35" className="qmm-pulse-1" />

      {/* KNOWN WINNER NODES — gold */}
      <circle cx="340" cy="140" r="5" fill="#C9A94E" opacity="0.7" filter="url(#glow)" className="qmm-pulse-2" />
      <circle cx="520" cy="330" r="5" fill="#C9A94E" opacity="0.7" filter="url(#glow)" className="qmm-pulse-3" />
      <line x1="400" y1="250" x2="340" y2="140" stroke="#C9A94E" strokeWidth="0.8" opacity="0.4" />
      <line x1="400" y1="250" x2="520" y2="330" stroke="#C9A94E" strokeWidth="0.8" opacity="0.4" />

      {/* CENTRAL NODE — The Diagnosis */}
      <circle cx="400" cy="250" r="28" fill="none" stroke="var(--hero-accent)" strokeWidth="1" opacity="0.2" />
      <circle cx="400" cy="250" r="20" fill="none" stroke="var(--hero-accent)" strokeWidth="1" opacity="0.35" />
      <circle cx="400" cy="250" r="12" fill="var(--hero-accent)" opacity="0.9" filter="url(#centreGlow)" />
      <circle cx="400" cy="250" r="5"  fill="white" opacity="0.9" />

      {/* LABEL */}
      <text x="400" y="290" textAnchor="middle" fill="var(--hero-label)"
        fontFamily="Inter, Arial, sans-serif" fontSize="11" fontWeight="500" opacity="0.6">
        THE DIAGNOSIS
      </text>

      {/* LAW ANNOTATIONS */}
      <text x="740" y="30" textAnchor="end" fill="var(--hero-label)"
        fontFamily="Inter, Arial, sans-serif" fontSize="9" opacity="0.35">
        Law 1: Superposition
      </text>
      <text x="740" y="44" textAnchor="end" fill="var(--hero-label)"
        fontFamily="Inter, Arial, sans-serif" fontSize="9" opacity="0.35">
        Law 3: Intrication
      </text>
      <text x="740" y="58" textAnchor="end" fill="var(--hero-label)"
        fontFamily="Inter, Arial, sans-serif" fontSize="9" opacity="0.35">
        Law 4: Quantification
      </text>
    </svg>
  );
}
