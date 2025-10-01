"use client";
import { useEffect, useState } from "react";

export default function PromoBanner() {
  const getEndTime = () => {
    const now = new Date();
    const endDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 2,
      0, 0, 0, 0
    );
    return endDate.getTime();
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = getEndTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeBox = ({ value, label } : any ) => (
    <div className="flex flex-col items-center">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white font-bold text-sm px-2 py-1 rounded-lg min-w-[40px] flex items-center justify-center shadow-inner border border-gray-700">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-[9px] text-gray-300 mt-1 font-medium uppercase">{label}</span>
    </div>
  );

  const Separator = () => (
    <div className="flex flex-col items-center justify-center h-10">
      <div className="w-1 h-1 bg-gray-400 rounded-full mb-0.5"></div>
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
    </div>
  );

  return (
    <div className="transform transition-all duration-500 translate-y-0 opacity-100">
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl p-2 shadow-md border border-white/10 backdrop-blur-sm">
        {/* Header */}
        <div className="text-center mb-2">
          <h3 className="text-white font-bold text-xs flex items-center justify-center gap-1">
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
            FLASH SALE ENDS IN
            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
          </h3>
          <p className="text-gray-300 text-[9px]">Limited time offer!</p>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center gap-1.5">
          <TimeBox value={timeLeft.days} label="Days" />
          <Separator />
          <TimeBox value={timeLeft.hours} label="Hours" />
          <Separator />
          <TimeBox value={timeLeft.minutes} label="Minutes" />
          <Separator />
          <TimeBox value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  );
}
