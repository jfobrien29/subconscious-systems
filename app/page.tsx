import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] relative">
      <div className="absolute inset-0 bg-[url('/frf2_nobg.png')] bg-[length:120px_120px] [background-repeat:space_space] opacity-10 z-0"></div>
      <div className="relative z-10">
        <h1 className="font-bold text-center mt-12 ">
          <span className="md:text-8xl text-6xl">Subconscious Systems</span>
        </h1>
      </div>
    </div>
  );
}
