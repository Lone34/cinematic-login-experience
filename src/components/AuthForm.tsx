import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Sparkles, User, Mail, Lock } from "lucide-react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? -30 : 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 },
    },
    exit: { opacity: 0, x: isLogin ? 30 : -30, filter: "blur(10px)", transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md mx-auto"
    >
      {/* Ambient glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl animate-pulse-glow" />

      <div className="relative glass glow-border rounded-2xl p-8 overflow-hidden">
        {/* Scan line effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan-line" />
        </div>

        {/* Header */}
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 mb-4"
            whileHover={{ scale: 1.05, borderColor: "hsl(175 80% 50% / 0.6)" }}
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-primary tracking-wider uppercase">
              {isLogin ? "Welcome Back" : "Join Us"}
            </span>
          </motion.div>
          <h1 className="font-heading text-3xl font-bold text-foreground glow-text">
            {isLogin ? "Sign In" : "Create Account"}
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            {isLogin ? "Enter your credentials to continue" : "Start your journey with us"}
          </p>
        </motion.div>

        {/* Tab Toggle */}
        <div className="relative flex rounded-xl bg-secondary/50 p-1 mb-8">
          <motion.div
            className="absolute top-1 bottom-1 rounded-lg bg-primary/20 border border-primary/30"
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{ width: "calc(50% - 4px)", left: isLogin ? 4 : "calc(50%)" }}
          />
          {["Sign In", "Sign Up"].map((tab, i) => (
            <button
              key={tab}
              data-hover
              onClick={() => setIsLogin(i === 0)}
              className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                (i === 0 ? isLogin : !isLogin) ? "text-primary" : "text-muted-foreground"
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
            className="space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            {!isLogin && (
              <motion.div variants={itemVariants}>
                <InputField
                  icon={<User className="w-4 h-4" />}
                  placeholder="Full Name"
                  type="text"
                  name="name"
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
                  focused={focused}
                  onFocus={setFocused}
                />
                <button
                  type="button"
                  data-hover
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>

            {isLogin && (
              <motion.div variants={itemVariants} className="flex justify-end">
                <button data-hover className="text-xs text-primary/70 hover:text-primary transition-colors">
                  Forgot password?
                </button>
              </motion.div>
            )}

            <motion.div variants={itemVariants}>
              <motion.button
                data-hover
                type="submit"
                className="group relative w-full py-3 rounded-xl font-medium text-primary-foreground overflow-hidden"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-accent transition-all duration-500 group-hover:opacity-90" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-accent via-primary to-primary" />
                <span className="relative flex items-center justify-center gap-2 text-sm">
                  {isLogin ? "Sign In" : "Create Account"}
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            {/* Divider */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-border" />
            </motion.div>

            {/* Social */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
              {["Google", "GitHub"].map((provider) => (
                <motion.button
                  key={provider}
                  data-hover
                  type="button"
                  whileHover={{ scale: 1.03, borderColor: "hsl(175 80% 50% / 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border/50 bg-secondary/30 text-sm text-foreground/80 hover:text-foreground transition-colors"
                >
                  {provider}
                </motion.button>
              ))}
            </motion.div>
          </motion.form>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function InputField({
  icon,
  placeholder,
  type,
  name,
  focused,
  onFocus,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type: string;
  name: string;
  focused: string | null;
  onFocus: (name: string | null) => void;
}) {
  const isActive = focused === name;
  return (
    <motion.div
      className={`relative flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-300 ${
        isActive
          ? "border-primary/50 bg-primary/5 glow-border"
          : "border-border/50 bg-secondary/20 hover:border-border"
      }`}
      animate={isActive ? { scale: 1.01 } : { scale: 1 }}
    >
      <span className={`transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => onFocus(name)}
        onBlur={() => onFocus(null)}
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none"
        style={{ cursor: "none" }}
      />
    </motion.div>
  );
}
