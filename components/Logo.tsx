import { PiggyBank } from 'lucide-react';
import React from 'react';

function Logo() {
  return (
    <a href="/dashboard" className="flex items-center gap-2">
        <PiggyBank className="stroke h-11 w-11 stroke-blue-500 stroke-[1.5" />
        <p className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
            PennyPilot
        </p>
    </a>
  );
}

export function LogoMobile() {
  return (
    <a href="/dashboard" className="flex items-center gap-2">
        <p className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
            PennyPilot
        </p>
    </a>
  );
}

export default Logo;
