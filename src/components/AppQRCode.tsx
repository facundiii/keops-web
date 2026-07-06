"use client";

import { QRCodeSVG } from "qrcode.react";

interface AppQRCodeProps {
  value: string;
  label: string;
}

export function AppQRCode({ value, label }: AppQRCodeProps) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[260px]">
      <div className="p-2 bg-white rounded-xl w-full flex items-center justify-center">
        <QRCodeSVG
          value={value}
          size={172}
          bgColor="#ffffff"
          fgColor="#0a0a0a"
          level="M"
        />
      </div>
      <p className="text-white/30 text-[11px] tracking-widest uppercase">{label}</p>
    </div>
  );
}
