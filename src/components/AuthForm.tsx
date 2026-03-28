import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Sparkles, User, Mail, Lock } from "lucide-react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  
  // Form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  // 3D Tilt State
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Dodging button state
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const [lastMoveTime, setLastMoveTime] = useState(0);

  const isFormValid = isLogin 
    ? email.trim().length > 0 && password.trim().length > 0 
    : name.trim().length > 0 && email.trim().length > 0 && password.trim().length > 0;

  const handleDodging = useCallback(() => {
    const now = Date.now();
    if (!isFormValid && now - lastMoveTime > 200) {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      
      const randomX = (Math.random() - 0.5) * screenWidth * 0.7;
      const randomY = (Math.random() - 0.5) * screenHeight * 0.7;
      
      setButtonPos({ x: randomX, y: randomY });
      setLastMoveTime(now);
    }
  }, [isFormValid, lastMoveTime]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      // Tilt logic
      const xPct = e.clientX / window.innerWidth - 0.5;
      const yPct = e.clientY / window.innerHeight - 0.5;
      x.set(xPct);
      y.set(yPct);

      // Dodging logic
      if (!isFormValid && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        if (distance < 120) {
          handleDodging();
        }
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [handleDodging, isFormValid, x, y]);

  const resetPosition = () => {
    setButtonPos({ x: 0, y: 0 });
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.98, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 },
    },
    exit: { opacity: 0, scale: 1.02, filter: "blur(4px)", transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div className="flex items-center justify-center w-full perspective-[1500px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        style={{ 
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full max-w-md mx-auto"
      >
        <div 
          className="relative glass rounded-[2.5rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.08)] border-white/80"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-10" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
            style={{ transform: "translateZ(50px)" }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 border border-orange-200 mb-6"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,237,213,0.95)" }}
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-600" />
              <span className="text-[10px] font-bold text-orange-900/80 tracking-[0.2em] uppercase">
                {isLogin ? "Welcome Back" : "Start Journey"}
              </span>
            </motion.div>
            <h1 className="font-heading text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              {isLogin ? "Sign In" : "Sign Up"}
            </h1>
            <p className="text-slate-500 text-sm mt-3 font-medium">
              {isLogin ? "Enter your elegant workspace" : "Join our serene community"}
            </p>
          </motion.div>

          {/* Tab Toggle - Liquid Style */}
          <div 
            className="relative flex rounded-2xl bg-slate-100/50 p-1.5 mb-10 border border-slate-200/50"
            style={{ transform: "translateZ(40px)" }}
          >
            <motion.div
              className="absolute top-1.5 bottom-1.5 rounded-xl bg-white shadow-md shadow-orange-500/10"
              layout
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                layout: { duration: 0.4 } 
              }}
              style={{ 
                width: "calc(50% - 6px)", 
                left: isLogin ? 6 : "calc(50%)",
              }}
            />
            {["Sign In", "Sign Up"].map((tab, i) => (
              <button
                key={tab}
                data-hover
                onClick={() => {
                  setIsLogin(i === 0);
                  resetPosition();
                }}
                className={`relative z-10 flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors duration-500 ${
                  (i === 0 ? isLogin : !isLogin) ? "text-slate-900" : "text-slate-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "signup"}
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
              onSubmit={(e) => e.preventDefault()}
              style={{ transform: "translateZ(30px)" }}
            >
              {!isLogin && (
                <motion.div variants={itemVariants}>
                  <InputField
                    icon={<User className="w-4 h-4" />}
                    placeholder="Full Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(val) => {
                      setName(val);
                      resetPosition();
                    }}
                    focused={focused}
                    onFocus={setFocused}
                  />
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <InputField
                  icon={<Mail className="w-4 h-4" />}
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(val) => {
                    setEmail(val);
                    resetPosition();
                  }}
                  focused={focused}
                  onFocus={setFocused}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="relative">
                  <InputField
                    icon={<Lock className="w-4 h-4" />}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(val) => {
                      setPassword(val);
                      resetPosition();
                    }}
                    focused={focused}
                    onFocus={setFocused}
                  />
                  <button
                    type="button"
                    data-hover
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>

              {isLogin && (
                <motion.div variants={itemVariants} className="flex justify-end">
                  <button data-hover className="text-xs font-bold text-slate-400 hover:text-orange-600 tracking-wide transition-colors uppercase">
                    Forgot password?
                  </button>
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <motion.button
                  ref={buttonRef}
                  data-hover
                  type="submit"
                  animate={isFormValid ? { x: 0, y: 0, scale: 1 } : { x: buttonPos.x, y: buttonPos.y }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 18,
                    mass: 0.8
                  }}
                  onMouseEnter={handleDodging}
                  onFocus={handleDodging}
                  onClick={(e) => {
                    if (!isFormValid) {
                      e.preventDefault();
                      handleDodging();
                    }
                  }}
                  className="group relative w-full py-4 rounded-2xl font-bold text-white overflow-hidden shadow-lg shadow-orange-500/20 transition-all duration-300"
                  whileHover={isFormValid ? { scale: 1.02, y: -2 } : {}}
                  whileTap={isFormValid ? { scale: 0.98 } : {}}
                  style={{ transform: "translateZ(60px)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 group-hover:from-orange-600 group-hover:to-amber-600 transition-all duration-500" />
                  <span className="relative flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em]">
                    {isLogin ? "Sign In" : "Sign Up"}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </motion.div>

              {/* Divider */}
              <motion.div variants={itemVariants} className="flex items-center gap-4 py-2">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">or join with</span>
                <div className="flex-1 h-px bg-slate-100" />
              </motion.div>

              {/* Social */}
              <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                {["Google", "GitHub"].map((provider) => (
                  <motion.button
                    key={provider}
                    data-hover
                    type="button"
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,1)", borderColor: "rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2 py-3 rounded-2xl border border-slate-200/60 bg-slate-50/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-slate-900 transition-all duration-300"
                  >
                    {provider}
                  </motion.button>
                ))}
              </motion.div>
            </motion.form>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

function InputField({
  icon,
  placeholder,
  type,
  name,
  value,
  onChange,
  focused,
  onFocus,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (val: string) => void;
  focused: string | null;
  onFocus: (name: string | null) => void;
}) {
  const isActive = focused === name;
  return (
    <motion.div
      className={`relative flex items-center gap-4 rounded-2xl border px-5 py-4 transition-all duration-500 ${
        isActive
          ? "border-orange-400 bg-white shadow-md shadow-orange-500/5"
          : "border-slate-200/60 bg-slate-50/50 hover:border-slate-300"
      }`}
      animate={isActive ? { scale: 1.01 } : { scale: 1 }}
    >
      <span className={`transition-colors duration-500 ${isActive ? "text-orange-500" : "text-slate-300"}`}>
        {icon}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => onFocus(name)}
        onBlur={() => onFocus(null)}
        className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-300 outline-none font-medium"
        style={{ cursor: "none" }}
      />
    </motion.div>
  );
}
