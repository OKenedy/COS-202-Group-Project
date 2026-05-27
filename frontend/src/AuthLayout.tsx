import { ReactNode } from "react";
import notebooks from "./assets/notebooks.jpg";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-sm rounded-md overflow-hidden min-h-[640px] border border-gray-100">
        {/* Left brand panel */}
        <div
          className="relative hidden md:flex flex-col justify-between p-12 text-white bg-indigo-600"
        >
          <img
            src={notebooks}
            alt=""
            aria-hidden="true"
            width={1024}
            height={1280}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay"
          />
          <div className="relative z-10">
            <p className="text-base font-medium tracking-tight">Curated thought.</p>
            <p className="mt-6 italic text-sm text-indigo-50 max-w-sm leading-relaxed">
              "Writing is the only way I have to explain things to myself."
            </p>
            <p className="mt-3 text-xs tracking-[0.2em] text-indigo-200">
              MUSK EDITORIAL
            </p>
          </div>
          <div className="relative z-10" />
        </div>

        {/* Right form panel */}
        <div className="flex items-center justify-center p-8 sm:p-12 lg:p-16">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
