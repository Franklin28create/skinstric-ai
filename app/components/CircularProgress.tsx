import { CircularProgressProps } from "@/types";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CircularProgress = ({
  percentage = 0,
  color = "#4CAF50",
}: CircularProgressProps) => {
  const size = 100;
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (percentage / 100) * circumference;
  const strokeOffset =
    percentage === 0 ? circumference - 1 : circumference - progress;
  const circleRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    if (circleRef.current) {
      gsap.to(circleRef.current, {
        strokeDashoffset: circumference - progress,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [percentage, progress, circumference]);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#ddd"
        strokeWidth={1}
        fill="none"
      />

      <circle
        cx={size / 2}
        ref={circleRef}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={1}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeOffset || 0}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
};

export default CircularProgress;
