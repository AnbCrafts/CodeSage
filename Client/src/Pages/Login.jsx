import React, { useContext, useState } from "react";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Zap,
  Github,
  Chrome,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import HomeHeader from "../Components/HomeHeader";
import { CodeContext } from "../ContextAPI/CodeContext";
import { toast } from "react-toastify";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { register, currUserData } = useContext(CodeContext);

  const [registrationForm, setRegistrationForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginForm,setLoginForm] = useState({
    identifier:"",
    password:""
  }) 

 const submitHandler = async (e) => {
  e.preventDefault();

  if (isLogin) {
    const hasEmptyField = Object.values(loginForm).some(
      (value) => value.trim() === ""
    );

    if (hasEmptyField) {
      toast.warn("Please fill all fields");
      return;
    }

    await register(loginForm, "login");
    return; // 🔴 IMPORTANT
  }

  // Register flow
  const hasEmptyField = Object.values(registrationForm).some(
    (value) => value.trim() === ""
  );

  if (hasEmptyField) {
    toast.warn("Please fill all fields");
    return;
  }

  await register(registrationForm, "register");
};


  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      <div className="pt-32 pb-20 px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* LEFT: FORM SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {isLogin ? "Welcome back" : "Create an account"}
              </h1>
              <p className="text-slate-400">
                {isLogin
                  ? "Enter your details to access your workspace."
                  : "Start analyzing your code smarter, faster, and easier."}
              </p>
            </div>

            <div className="space-y-4">
              {/* OAuth Buttons */}
              <button className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 font-semibold py-3 rounded-xl hover:bg-slate-200 transition-colors">
                <Chrome size={20} /> Continue with Google
              </button>
              <button className="w-full flex items-center justify-center gap-3 bg-slate-800 text-white font-semibold py-3 rounded-xl hover:bg-slate-700 transition-colors border border-white/5">
                <Github size={20} /> Continue with GitHub
              </button>

              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink-0 mx-4 text-slate-500 text-sm">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              {/* Input Fields */}
              <form onSubmit={submitHandler} className="space-y-4">
                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="relative">
                        <User
                          className="absolute left-4 top-3.5 text-slate-500"
                          size={20}
                        />
                        <input
                          type="text"
                          placeholder="Username"
                          value={registrationForm.username}
                          onChange={(e) => {
                            setRegistrationForm({
                              ...registrationForm,
                              username: e.target.value,
                            });
                          }}
                          className="w-full bg-slate-900 border border-slate-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>

                      <div className="relative">
                  <Mail
                    className="absolute left-4 top-3.5 text-slate-500"
                    size={20}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={registrationForm.email}
                    onChange={(e) => {
                      setRegistrationForm({
                        ...registrationForm,
                        email: e.target.value,
                      });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                 <div className="relative">
                  <Lock
                    className="absolute left-4 top-3.5 text-slate-500"
                    size={20}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={registrationForm.password}
                    onChange={(e) => {
                      setRegistrationForm({
                        ...registrationForm,
                        password: e.target.value,
                      });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                    </motion.div>

                    
                  )}
                </AnimatePresence>

                <div className="relative">
                  <Mail
                    className="absolute left-4 top-3.5 text-slate-500"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Email Address or Username"
                    value={loginForm.identifier}
                    onChange={(e) => {
                      setLoginForm({
                        ...loginForm,
                        identifier: e.target.value,
                      });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div className="relative">
                  <Lock
                    className="absolute left-4 top-3.5 text-slate-500"
                    size={20}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => {
                      setLoginForm({
                        ...loginForm,
                        password: e.target.value,
                      });
                    }}
                    className="w-full bg-slate-900 border border-slate-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                {isLogin && (
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="text-sm text-purple-400 hover:text-purple-300"
                    >
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-purple-900/20 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  {isLogin ? "Sign In" : "Create Account"}{" "}
                  <ArrowRight size={18} />
                </button>
              </form>

              <div className="text-center mt-6">
                <p className="text-slate-400">
                  {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-white font-semibold hover:underline"
                  >
                    {isLogin ? "Sign up" : "Log in"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: FEATURE SHOWCASE */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] -z-10" />

            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <Zap size={120} className="text-purple-500" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-6">
                  {isLogin ? "Welcome back, Coder." : "Join the AI Revolution"}
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      title: "Smart Analysis",
                      desc: "Get instant feedback on complexity and logic.",
                    },
                    {
                      title: "Secure & Private",
                      desc: "Your code is processed in-memory and never stored.",
                    },
                    {
                      title: "Multi-Language",
                      desc: "Support for Python, JS, C++, Java, and more.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0 text-indigo-400">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">
                          {item.title}
                        </h4>
                        <p className="text-slate-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 p-4 bg-slate-950 rounded-xl border border-white/5">
                  <p className="text-slate-400 text-sm italic">
                    "CodeSage saved me hours of debugging on my last project.
                    The explanations are spot on."
                  </p>
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-8 h-8 rounded-full bg-slate-700" />
                    <div className="text-xs text-slate-500">
                      <span className="text-white font-semibold">Alex D.</span>{" "}
                      — Senior Dev
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
