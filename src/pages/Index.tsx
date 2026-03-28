import { Suspense } from "react";
import { motion } from "framer-motion";
import Scene3D from "@/components/Scene3D";
import CursorEffect from "@/components/CursorEffect";
import AuthForm from "@/components/AuthForm";

const Index = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Brightened Base Background */}
      <div className="fixed inset-0 -z-[20] bg-[#0a0a1a]" />
      
      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Vibrant Atmospheric Glows */}
      <div className="fixed top-[-5%] left-[-5%] w-[60%] h-[60%] rounded-full bg-cyan-400/20 blur-[130px] animate-pulse -z-[15]" />
      <div className="fixed bottom-[-5%] right-[-5%] w-[70%] h-[70%] rounded-full bg-purple-500/20 blur-[130px] animate-pulse [animation-delay:2s] -z-[15]" />
      <div className="fixed top-[30%] left-[20%] w-[40%] h-[40%] rounded-full bg-blue-500/15 blur-[100px] animate-pulse [animation-delay:4s] -z-[15]" />

      {/* Brighter Gradient overlays */}
      <div className="fixed inset-0 -z-[5] bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10" />
      <div className="fixed inset-0 -z-[5] bg-gradient-to-b from-transparent via-transparent to-[#0a0a1a]/60" />

      {/* Grid pattern with better visibility */}
      <div
        className="fixed inset-0 -z-[4] opacity-[0.1]"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Custom Cursor */}
      <CursorEffect />

      {/* Content */}
      <div className="relative z-10 w-full px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <AuthForm />
        </motion.div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center text-xs text-muted-foreground/50 mt-8"
        >
          Secured with end-to-end encryption
        </motion.p>
      </div>
    </div>
  );
};

export default Index;
