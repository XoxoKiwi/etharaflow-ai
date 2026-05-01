import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="animated-bg">

      <svg
        className="animated-lines"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
      >

        {/* BLUE LINE */}

        <path
          d="
            M 0 560
            C 280 420, 520 470, 760 610
            S 1260 760, 1920 520
          "
          stroke="url(#blueGradient)"
          strokeWidth="3"
          fill="none"
          opacity="0.9"
        />

        {/* PURPLE LINE */}

        <path
          d="
            M 0 670
            C 380 760, 760 760, 1120 690
            S 1600 610, 1920 740
          "
          stroke="url(#purpleGradient)"
          strokeWidth="3"
          fill="none"
          opacity="0.75"
        />

        <defs>

          <linearGradient
            id="blueGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>

          <linearGradient
            id="purpleGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>

        </defs>

      </svg>

    </div>
  );
};

export default AnimatedBackground;