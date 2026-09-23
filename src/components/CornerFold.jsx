import React, { useId } from 'react';

export default function CornerFold({ side = 'right', hidden = false, flipping = false }) {
  const uid = useId().replace(/:/g, '');
  const paperId = `paper-${uid}`;
  const shadowId = `shadow-${uid}`;
  const isLeft = side === 'left';

  return (
    <div
      className={`cornerFold cornerFold--${side}${hidden ? ' is-hidden' : ''}${flipping ? ' is-flipping' : ''}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 58 74"
        role="presentation"
        focusable="false"
        style={isLeft ? { transform: 'scaleX(-1)' } : undefined}
      >
        <defs>
          <linearGradient id={paperId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fffaf0" />
            <stop offset="48%" stopColor="#f5e8cb" />
            <stop offset="78%" stopColor="#dfcba5" />
            <stop offset="100%" stopColor="#c5aa7c" />
          </linearGradient>
          <linearGradient id={shadowId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5b452b" stopOpacity="0" />
            <stop offset="42%" stopColor="#5b452b" stopOpacity=".22" />
            <stop offset="72%" stopColor="#49351f" stopOpacity=".42" />
            <stop offset="100%" stopColor="#49351f" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* lifted paper: long and narrow rather than a square sticker */}
        <path
          d="M58 0H19C30 7 39 17 45 29C51 41 55 56 58 74V0Z"
          fill={`url(#${paperId})`}
        />

        {/* crease/shadow where the lifted paper meets the page */}
        <path
          d="M19 0C31 8 40 18 46 31C51 42 55 56 58 74"
          fill="none"
          stroke={`url(#${shadowId})`}
          strokeWidth="2.1"
          strokeLinecap="round"
        />

        {/* tiny highlight on the lifted edge */}
        <path
          d="M56.7 4C53 23 54 45 58 68"
          fill="none"
          stroke="#fffdf6"
          strokeOpacity=".48"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
