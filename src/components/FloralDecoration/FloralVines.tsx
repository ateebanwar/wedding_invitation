import React from 'react';

interface FloralVinesProps {
  glowProgress?: number; // 0 to 1
  isAnimating?: boolean;
}

export const FloralVines: React.FC<FloralVinesProps> = ({
  glowProgress = 0,
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      <svg
        viewBox="0 0 800 1000"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Golden glow filter */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Golden linear gradients */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dfba73" />
            <stop offset="50%" stopColor="#f7e7b4" />
            <stop offset="100%" stopColor="#c59b27" />
          </linearGradient>

          <linearGradient id="vineGlowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe89e" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e5be5a" />
          </linearGradient>
        </defs>

        {/* ================= BACKGROUND EMBOSSED BASE VINES ================= */}
        <g stroke="#c59b27" strokeWidth="1.2" opacity="0.4" strokeLinecap="round">
          {/* Top-Left Branching Vine */}
          <path d="M400 500 C360 460, 320 420, 260 400 C200 380, 150 340, 100 280 C60 230, 80 160, 120 120 C160 80, 240 80, 300 140" />
          <path d="M260 400 C240 330, 200 290, 160 270" />
          <path d="M150 340 C130 380, 90 400, 50 390" />
          <path d="M300 140 C340 100, 370 60, 400 40" />

          {/* Top-Right Branching Vine */}
          <path d="M400 500 C440 460, 480 420, 540 400 C600 380, 650 340, 700 280 C740 230, 720 160, 680 120 C640 80, 560 80, 500 140" />
          <path d="M540 400 C560 330, 600 290, 640 270" />
          <path d="M650 340 C670 380, 710 400, 750 390" />
          <path d="M500 140 C460 100, 430 60, 400 40" />

          {/* Bottom-Left Branching Vine */}
          <path d="M400 500 C360 540, 320 580, 260 600 C200 620, 150 660, 100 720 C60 770, 80 840, 120 880 C160 920, 240 920, 300 860" />
          <path d="M260 600 C240 670, 200 710, 160 730" />
          <path d="M150 660 C130 620, 90 600, 50 610" />
          <path d="M300 860 C340 900, 370 940, 400 960" />

          {/* Bottom-Right Branching Vine */}
          <path d="M400 500 C440 540, 480 580, 540 600 C600 620, 650 660, 700 720 C740 770, 720 840, 680 880 C640 920, 560 920, 500 860" />
          <path d="M540 600 C560 670, 600 710, 640 730" />
          <path d="M650 660 C670 620, 710 600, 750 610" />
          <path d="M500 860 C460 900, 430 940, 400 960" />
        </g>

        {/* Embossed Leaves Base */}
        <g fill="#dfba73" opacity="0.35">
          {/* Top-left leaves */}
          <path d="M260 400 C250 380, 240 370, 220 380 C235 395, 250 400, 260 400 Z" />
          <path d="M150 340 C140 320, 125 320, 120 335 C135 345, 145 345, 150 340 Z" />
          <path d="M100 280 C80 270, 60 280, 70 300 C85 295, 95 290, 100 280 Z" />
          <path d="M120 120 C110 90, 80 90, 90 115 C105 120, 115 120, 120 120 Z" />
          <path d="M300 140 C320 130, 335 140, 330 160 C315 155, 305 150, 300 140 Z" />

          {/* Top-right leaves */}
          <path d="M540 400 C550 380, 560 370, 580 380 C565 395, 550 400, 540 400 Z" />
          <path d="M650 340 C660 320, 675 320, 680 335 C665 345, 655 345, 650 340 Z" />
          <path d="M700 280 C720 270, 740 280, 730 300 C715 295, 705 290, 700 280 Z" />
          <path d="M680 120 C690 90, 720 90, 710 115 C695 120, 685 120, 680 120 Z" />
          <path d="M500 140 C480 130, 465 140, 470 160 C485 155, 495 150, 500 140 Z" />

          {/* Bottom-left leaves */}
          <path d="M260 600 C250 620, 240 630, 220 620 C235 605, 250 600, 260 600 Z" />
          <path d="M150 660 C140 680, 125 680, 120 665 C135 655, 145 655, 150 660 Z" />
          <path d="M100 720 C80 730, 60 720, 70 700 C85 705, 95 710, 100 720 Z" />
          <path d="M120 880 C110 910, 80 910, 90 885 C105 880, 115 880, 120 880 Z" />

          {/* Bottom-right leaves */}
          <path d="M540 600 C550 620, 560 630, 580 620 C565 605, 550 600, 540 600 Z" />
          <path d="M650 660 C660 680, 675 680, 680 665 C665 655, 655 655, 650 660 Z" />
          <path d="M700 720 C720 730, 740 720, 730 700 C715 705, 705 710, 700 720 Z" />
          <path d="M680 880 C690 910, 720 910, 710 885 C695 880, 685 880, 680 880 Z" />
        </g>

        {/* ================= ILLUMINATED GOLD LIGHT PATHS (Controlled by glowProgress) ================= */}
        {glowProgress > 0 && (
          <g
            stroke="url(#vineGlowGradient)"
            strokeWidth="3"
            filter="url(#goldGlow)"
            strokeLinecap="round"
            className="transition-all duration-75"
          >
            {/* Top-Left Illuminated Vine */}
            <path
              id="illuminated-vine-tl"
              d="M400 500 C360 460, 320 420, 260 400 C200 380, 150 340, 100 280 C60 230, 80 160, 120 120 C160 80, 240 80, 300 140"
              strokeDasharray="800"
              strokeDashoffset={800 * (1 - glowProgress)}
            />
            {/* Top-Right Illuminated Vine */}
            <path
              id="illuminated-vine-tr"
              d="M400 500 C440 460, 480 420, 540 400 C600 380, 650 340, 700 280 C740 230, 720 160, 680 120 C640 80, 560 80, 500 140"
              strokeDasharray="800"
              strokeDashoffset={800 * (1 - glowProgress)}
            />
            {/* Bottom-Left Illuminated Vine */}
            <path
              id="illuminated-vine-bl"
              d="M400 500 C360 540, 320 580, 260 600 C200 620, 150 660, 100 720 C60 770, 80 840, 120 880 C160 920, 240 920, 300 860"
              strokeDasharray="800"
              strokeDashoffset={800 * (1 - glowProgress)}
            />
            {/* Bottom-Right Illuminated Vine */}
            <path
              id="illuminated-vine-br"
              d="M400 500 C440 540, 480 580, 540 600 C600 620, 650 660, 700 720 C740 770, 720 840, 680 880 C640 920, 560 920, 500 860"
              strokeDasharray="800"
              strokeDashoffset={800 * (1 - glowProgress)}
            />
          </g>
        )}

        {/* Illuminated Leaves - fade in with gold glow as progress increases */}
        {glowProgress > 0.25 && (
          <g
            fill="#ffffff"
            filter="url(#goldGlow)"
            opacity={Math.min(1, (glowProgress - 0.25) * 2)}
            className="transition-opacity duration-300"
          >
            <path d="M260 400 C250 380, 240 370, 220 380 C235 395, 250 400, 260 400 Z" />
            <path d="M540 400 C550 380, 560 370, 580 380 C565 395, 550 400, 540 400 Z" />
            <path d="M260 600 C250 620, 240 630, 220 620 C235 605, 250 600, 260 600 Z" />
            <path d="M540 600 C550 620, 560 630, 580 620 C565 605, 550 600, 540 600 Z" />

            {glowProgress > 0.6 && (
              <>
                <path d="M150 340 C140 320, 125 320, 120 335 C135 345, 145 345, 150 340 Z" />
                <path d="M650 340 C660 320, 675 320, 680 335 C665 345, 655 345, 650 340 Z" />
                <path d="M150 660 C140 680, 125 680, 120 665 C135 655, 145 655, 150 660 Z" />
                <path d="M650 660 C660 680, 675 680, 680 665 C665 655, 655 655, 650 660 Z" />
              </>
            )}

            {glowProgress > 0.85 && (
              <>
                <path d="M100 280 C80 270, 60 280, 70 300 C85 295, 95 290, 100 280 Z" />
                <path d="M700 280 C720 270, 740 280, 730 300 C715 295, 705 290, 700 280 Z" />
                <path d="M120 120 C110 90, 80 90, 90 115 C105 120, 115 120, 120 120 Z" />
                <path d="M680 120 C690 90, 720 90, 710 115 C695 120, 685 120, 680 120 Z" />
              </>
            )}
          </g>
        )}
      </svg>
    </div>
  );
};
