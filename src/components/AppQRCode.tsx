"use client";

import { QRCodeSVG } from "qrcode.react";

interface AppQRCodeProps {
  value: string;
  label: string;
}

export function AppQRCode({ value, label }: AppQRCodeProps) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[260px]">
      <div className="p-2 bg-marfil rounded-xl w-full flex items-center justify-center">
        <QRCodeSVG
          value={value}
          size={172}
          bgColor="var(--marfil)"
          fgColor="var(--negro)"
          level="M"
        />
      </div>
      <p className="antetitulo text-arena">{label}</p>
    </div>
  );
}
