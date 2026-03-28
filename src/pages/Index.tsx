import { Suspense } from "react";
import { motion } from "framer-motion";
import Scene3D from "@/components/Scene3D";
import CursorEffect from "@/components/CursorEffect";
import AuthForm from "@/components/AuthForm";

const Index = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Gradient overlays */}
      <div className="fixed inset-0 -z-[5] bg-gradient-to-b from-background/60 via-transparent to-background/80" />
      <div className="fixed inset-0 -z-[5] bg-gradient-to-r from-background/40 via-transparent to-background/40" />

      {/* Grid pattern */}
      <div
        className="fixed inset-0 -z-[4] opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(175 80% 50% / 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, hsl(175 80% 50% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
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
