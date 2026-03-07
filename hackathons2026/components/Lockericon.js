import React from "react";
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";

export default function LockerIcon({ size = 180 }) {
  return (
    <Svg width={size} height={size * 1.2} viewBox="0 0 160 220">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#1F3C73" />
          <Stop offset="100%" stopColor="#0D1B2A" />
        </LinearGradient>
      </Defs>

      <Rect x="20" y="10" width="120" height="180" rx="20" fill="url(#grad)" />
      <Rect x="40" y="35" width="80" height="20" rx="4" fill="white" />
      <Rect x="40" y="75" width="80" height="20" rx="4" fill="white" />
      <Rect x="45" y="120" width="25" height="40" rx="4" fill="white" />
      <Rect x="90" y="120" width="25" height="40" rx="4" fill="white" />
      <Rect x="45" y="185" width="20" height="15" fill="#0D1B2A" />
      <Rect x="95" y="185" width="20" height="15" fill="#0D1B2A" />
    </Svg>
  );
}