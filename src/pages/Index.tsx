import { Suspense } from "react";
import { motion } from "framer-motion";
import Scene3D from "@/components/Scene3D";
import CursorEffect from "@/components/CursorEffect";
import AuthForm from "@/components/AuthForm";

const Index = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* 3D Background - High performance container */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-[#fff7ed]" />}>
          <Scene3D />
        </Suspense>
      </div>

      {/* Atmospheric Overlays - Moved to z-1 to be between 3D and UI */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        {/* Warm, sun-drenched ambient glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-orange-200/30 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-amber-100/30 blur-[120px] animate-pulse [animation-delay:2s]" />
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-white/20" />
        
        {/* Soft grain texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />
      </div>

      {/* Custom Cursor */}
      <CursorEffect />

      {/* Content - Z-10 to be on top of everything */}
      <div className="relative z-10 w-full px-4 py-12">
        <AuthForm />

        {/* Minimal Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-center text-[10px] font-bold text-orange-950/20 mt-12 uppercase tracking-[0.4em]"
        >
          Curated & Minimalist Design
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
