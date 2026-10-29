import os

content = r'''import { useEffect, useState } from "react";
import { Button } from "@/components/ui";

// ============================================
// Scroll Progress Bar
// ============================================
export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-[9999] pointer-events-none">
      <div
        className="h-full bg-[#D4AF37] transition-[width] duration-150 ease-linear"
        style={{ width: \`\${scrollProgress}%\` }}
      />
    </div>
  );
}

// ============================================
// Hero Scroll Reveal
// ============================================
export function HeroScrollReveal({ children, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px" }
    );
    const element = document.getElementById("hero-reveal");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="hero-reveal"
      className={`transition-all duration-1000 ease-out \${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } \${className}`}
    >
      {children}
    </div>
  );
}

// ============================================
// Animated Stats Counter
// ============================================
export function AnimatedStats({ stats, className = "" }) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            stats.forEach((stat) => {
              const el = document.getElementById(\`stat-\${stat.value}\`);
              if (el) {
                const start = 0;
                const duration = 2000;
                const step = Math.ceil(duration / 100);
                let current = start;

                const timer = setInterval(() => {
                  current += Math.ceil(stat.value / (duration / 100));
                  setCounts((prev) => ({
                    ...prev,
                    [stat.value]: Math.min(current, stat.value),
                  }));
                  if (current >= stat.value) {
                    clearInterval(timer);
                  }
                }, 100);
              }
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    const element = document.getElementById("stats-container");
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, [stats]);

  return (
    <div id="stats-container" className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 \${className}`}>
      {stats.map((stat) => (
        <div key={stat.value} id={\`stat-\${stat.value}\`} className="text-center">
          <div className="text-3xl sm:text-4xl font-bold text-[#D4AF37] mb-1">
            {\`\${counts[stat.value]}\`}
            <span className="text-2xl">+</span>
          </div>
          <div className="text-sm text-white/60 font-medium">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// Animated Crane (CSS-only animated crane)
// ============================================
export function AnimatedCrane({ className = "", isRotating = true, speed = 12 }) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={\`w-full h-auto \${className}\`}
      style={{ animationDuration: \`\${speed}s\`, animationIterationCount: "infinite" }}
    >
      {/* Ground / Site */}
      <rect x="0" y="340" width="400" height="60" fill="#2A3F5F" rx="4" />
      <rect x="0" y="340" width="400" height="4" fill="#D4AF37" opacity="0.4" />

      {/* Tower Base */}
      <rect x="180" y="300" width="40" height="40" fill="#0A192F" rx="2" />
      <rect x="170" y="295" width="60" height="10" fill="#D4AF37" opacity="0.3" />

      {/* Tower Body */}
      <rect x="185" y="255" width="30" height="45" fill="#14263F" rx="2" />
      <rect x="175" y="250" width="50" height="10" fill="#D4AF37" opacity="0.2" />

      {/* Tower Diagonal Braces */}
      <line x1="200" y1="300" x2="185" y2="255" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4,3" opacity="0.5" />
      <line x1="200" y1="300" x2="215" y2="255" stroke="#D4AF37" strokeWidth="2" strokeDasharray="4,3" opacity="0.5" />

      {/* Cross Sections */}
      <line x1="170" y1="265" x2="230" y2="375" stroke="#D4AF37" strokeWidth="1.5" opacity="0.2" />
      <line x1="190" y1="280" x2="210" y2="370" stroke="#D4AF37" strokeWidth="1" opacity="0.15" />

      {/* Main Spider Trunk (left side) */}
      <g>
        <line x1="185" y1="255" x2="170" y2="400" stroke="#14263F" strokeWidth="8" strokeLinecap="round" />
        <line x1="185" y1="255" x2="175" y2="400" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

        {/* Left jib (horizontal arm) */}
        <line x1="170" y1="395" x2="110" y2="395" stroke="#14263F" strokeWidth="7" strokeLinecap="round" />
        <line x1="170" y1="395" x2="115" y2="395" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

        {/* Left counterweight (bottom) */}
        <rect x="90" y="390" width="50" height="10" fill="#0A192F" rx="2" />
        <rect x="90" y="390" width="50" height="4" fill="#D4AF37" opacity="0.3" />

        {/* Left diagonal brace */}
        <line x1="100" y1="388" x2="170" y2="395" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
      </g>

      {/* Main Spider Trunk (right side) */}
      <g>
        <line x1="215" y1="255" x2="230" y2="400" stroke="#14263F" strokeWidth="8" strokeLinecap="round" />
        <line x1="215" y1="255" x2="225" y2="400" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

        {/* Right jib (horizontal arm) */}
        <line x1="230" y1="395" x2="330" y2="395" stroke="#14263F" strokeWidth="7" strokeLinecap="round" />
        <line x1="230" y1="395" x2="325" y2="395" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

        {/* Right counterweight (bottom) */}
        <rect x="310" y="390" width="55" height="10" fill="#0A192F" rx="2" />
        <rect x="310" y="390" width="55" height="4" fill="#D4AF37" opacity="0.3" />

        {/* Right counterweight cable */}
        <line x1="315" y1="390" x2="315" y2="400" stroke="#D4AF37" strokeWidth="1" opacity="0.3" />
      </g>

      {/* Rotating cab (right side) */}
      <g>
        <ellipse cx="225" cy="390" rx="22" ry="14" fill="#0A192F" />
        <rect x="223" y="400" width="26" height="10" rx="2" fill="#14263F" />
        <circle cx="235" cy="405" r="4" fill="#D4AF37" opacity="0.6" />
        <circle cx="235" cy="402" r="3" fill="#D4AF37" opacity="0.3" />
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 225 395"
          to="360 225 395"
          dur="6s"
          repeatCount="indefinite"
        />
      </g>

      {/* Building under construction */}
      <rect x="80" y="120" width="140" height="220" rx="4" fill="#14263F" />
      <rect x="80" y="120" width="140" height="12" rx="4" fill="#D4AF37" opacity="0.3" />
      <rect x="80" y="120" width="12" height="220" fill="#D4AF37" opacity="0.2" />
      <rect x="134" y="120" width="12" height="220" fill="#D4AF37" opacity="0.2" />

      {/* Floor lines */}
      {[60, 100, 140, 180, 220].map((y) => (
        <line key={y} x1="70" y1={y} x2="150" y2={y} stroke="#14263F" strokeWidth="1.5" opacity="0.4" />
      ))}

      {/* Floor decks */}
      {[60, 100, 140, 180, 220].map((y, i) => (
        <rect key={y} x="82" y={y - 12} width="136" height="24" fill={\`url(#floorGrad\${i})\`} opacity="0.3" rx="2" />
      ))}

      {/* Windows */}
      {[60, 100, 140, 180, 220].map((y, i) => (
        <rect key={y} x="88" y={y} width="18" height="18" rx="2" fill="#D4AF37" opacity="0.2" />
      ))}

      {/* Building facade plates */}
      <rect x="75" y="125" width="10" height="210" fill="#D4AF37" opacity="0.15" rx="2" />
      <rect x="150" y="125" width="10" height="210" fill="#D4AF37" opacity="0.15" rx="2" />

      {/* Crane hook and cable */}
      <g>
        <line x1="224" y1="255" x2="225" y2="200" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="225" y1="200" x2="225" y2="180" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M215 180 L235 180 L238 170 L220 170 Z" fill="#D4AF37" opacity="0.9" />
        <line x1="225" y1="170" x2="225" y2="130" stroke="#D4AF37" strokeWidth="1.5" opacity="0.7" />
        <line x1="225" y1="130" x2="225" y2="90" stroke="#D4AF37" strokeWidth="1.5" opacity="0.5" />
      </g>

      {/* Lifting cable (right side) */}
      <g>
        <line x1="220" y1="255" x2="220" y2="190" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        <line x1="220" y1="190" x2="220" y2="160" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
        <path d="M213 160 L227 160 L229 154 L221 154 Z" fill="#D4AF37" opacity="0.9" />
      </g>

      {/* Diagonal support beams to building */}
      <line x1="75" y1="120" x2="80" y2="125" stroke="#14263F" strokeWidth="2" opacity="0.5" />
      <line x1="150" y1="120" x2="155" y2="125" stroke="#14263F" strokeWidth="2" opacity="0.5" />

      {/* Foundation pads */}
      <ellipse cx="155" cy="390" rx="80" ry="15" fill="#0A192F" opacity="0.4" />
      <ellipse cx="155" cy="388" rx="65" ry="10" fill="#D4AF37" opacity="0.1" />

      {/* Concrete pouring animation */}
      <rect x="280" y="250" width="100" height="140" rx="8" fill="#14263F" />
      <rect x="280" y="250" width="100" height="4" rx="4" fill="#D4AF37" opacity="0.3" />
      <line x1="320" y1="400" x2="320" y2="350" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
      <animate
        attributeName="y"
        values="350;140;350"
        dur="3s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
      />

      {/* Construction site sign */}
      <rect x="25" y="320" width="90" height="15" rx="3" fill="#D4AF37" opacity="0.2" />
      <text x="70" y="330" fill="#D4AF37" fontSize="8" fontFamily="sans-serif" textAnchor="middle" opacity="0.7">
        SITE DE TRABALO
      </text>

      <defs>
        {[...Array(5)].map((_, i) => (
          <linearGradient key={i} id={\`floorGrad\${i}\`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.05" />
          </linearGradient>
        ))}
      </defs>
    </svg>
  );
}

// ============================================
// Camera Focus Animation (fast camera zoom effect)
// ============================================
export function CameraFocusAnimation({ children, className = "" }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseEnter = () => setIsFocused(true);
  const handleMouseLeave = () => setIsFocused(false);

  return (
    <div
      className={\`relative overflow-hidden rounded-xl \${className}\`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`transition-all duration-500 ease-out \${
          isFocused ? "scale-[1.03] opacity-80" : "scale-100 opacity-100"
        }`}
      >
        {children}
      </div>
      <div className="absolute inset-0 rounded-xl border-2 border-[#D4AF37]/5 pointer-events-none" />
      <div className="absolute inset-0 rounded-xl border-2 border-[#D4AF37] opacity-0 group-hover:opacity-40 pointer-events-none" style={{ borderWidth: "2px" }} />
      <div className="absolute inset-0 rounded-xl pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="none">
          <rect
            x="0" y="0" width="400" height="300"
            fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="8,4"
            opacity="0.3" rx="4"
          />
          <circle cx="200" cy="150" r="60" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="4,4" opacity="0.4" rx="3" />
        </svg>
      </div>
    </div>
  );
}

// ============================================
// Stagger Fade (stagger children animation)
// ============================================
export function StaggerFade({ children, className = "", delay = 100, startOffset = 0 }: { children: React.ReactNode; className?: string; delay?: number; startOffset?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), startOffset);
    return () => clearTimeout(timer);
  }, [startOffset]);

  if (!Array.isArray(children)) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`transition-all duration-700 ease-out \${\`opacity-100 translate-y-0\` : \`opacity-0 translate-y-8\`} \${className}`}>
      {children.map((child: React.ReactElement, index: number) => {
        const childKey = child.key || index;
        const style = child.props?.style || {};
        return React.cloneElement(child, {
          key: childKey,
          className: child.props?.className || "",
          style: { ...style, transitionDelay: \`\${delay * (index + 1)}ms\` },
        });
      })}
    </div>
  );
}

// ============================================
// SkillBar (animated progress bar)
// ============================================
export function SkillBar({ label, percentage, className = "" }: { label: string; percentage: number; className?: string }) {
  return (
    <div className={\`mb-4 \${className}\`}>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-white/80 font-medium text-sm">{label}</span>
        <span className="text-[#D4AF37] font-medium">{percentage}%</span>
      </div>
      <div className="h-2 bg-[#14263F] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#D4AF37] rounded-full transition-all duration-1000 ease-out"
          style={{ width: \`\${percentage}%\` }}
        />
      </div>
    </div>
  );
}

// ============================================
// AnimatedCTA (hover animation)
// ============================================
export function AnimatedCTA({ children, className = "", ...props }: { children: React.ReactNode; className?: string } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      {...props}
      className={\`relative overflow-hidden transition-all duration-300 \${className}\`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] transition-all duration-300 origin-left" style={{ width: isHovered ? "100%" : "0%" }} />
    </Button>
  );
}
'''

with open("/c/Users/elielb/alfaconstructions/src/components/animation/index.tsx", "w") as f:
    f.write(content)

print("File written successfully")
print(f"Lines: {len(content.splitlines())}")
