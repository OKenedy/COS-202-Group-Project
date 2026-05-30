import type { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
  /** Extra classes on the white content card (e.g. `p-0` for full-bleed sections inside). */
  mainClassName?: string;
};

export function PageLayout({ children, mainClassName = '' }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-[#f5f5f7] py-8 text-[#1f1f1f]">
      <main
        className={`mx-auto w-[92%] max-w-6xl rounded-md bg-white p-6 shadow-sm md:p-10 ${mainClassName}`.trim()}
      >
        {children}
      </main>
    </div>
  );
}
