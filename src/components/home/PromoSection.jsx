import { ShieldCheckIcon, LockClosedIcon, CreditCardIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

function useCountdown() {
  const getTimeLeft = () => {
    const now = new Date();
    const end = new Date();
    end.setHours(23, 59, 59, 0);
    const diff = end - now;
    return {
      hours: Math.floor((diff / 1000 / 60 / 60) % 24).toString().padStart(2, "0"),
      minutes: Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, "0"),
      seconds: Math.floor((diff / 1000) % 60).toString().padStart(2, "0"),
    };
  };

  const [time, setTime] = useState(getTimeLeft());
  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function PromoSection() {
  const { hours, minutes, seconds } = useCountdown();

  return (
    <div className="w-full">
      {/* Commitments Bar */}
       <div className="bg-[#008ecf] text-white py-3 px-4">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <ShieldCheckIcon className="w-5 h-5" />
            <span>InspireUplift Commitments</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <LockClosedIcon className="w-4 h-4" />
              <span>Secure privacy</span>
            </div>
            <span className="text-white/50">|</span>
            <div className="flex items-center gap-1.5">
              <CreditCardIcon className="w-4 h-4" />
              <span>Safe payments</span>
            </div>
            <span className="text-white/50">|</span>
            <div className="flex items-center gap-1.5 font-bold cursor-pointer hover:underline">
              <span>Site-wide deals</span>
              <ChevronRightIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Flash Deals Bar */}
        <div className="bg-[#006a99] text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <span className="text-2xl font-bold italic">Flash Deals</span>
          <span className="text-sm font-medium text-white/80">Ends in</span>
          <div className="flex items-center gap-1">
            {[hours, minutes, seconds].map((unit, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="bg-green-500 text-white font-bold text-sm px-2 py-1 rounded">
                  {unit}
                </span>
                {i < 2 && <span className="font-bold text-white">:</span>}
              </div>
            ))}
          </div>
          <ChevronRightIcon className="w-5 h-5 ml-2 cursor-pointer hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
}