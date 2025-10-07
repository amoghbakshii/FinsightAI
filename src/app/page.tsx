"use client";
import { useState, useEffect, useRef } from "react";
import Footer from "@/components/Footer";
import header from "@/components/Header";

// --- Icon Components ---
const LogoIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
  </svg>
);
const MenuIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);
const XIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ArrowRightIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);
const LinkIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
  </svg>
);
const LightbulbIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);
const TargetIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const SparklesIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);
const TrendingUpIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);
const ShieldIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const CheckIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// --- Animated Counter Component ---
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// --- Main Landing Page Component ---
export default function LandingPage() {
  const [activeTab, setActiveTab] = useState("track");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = {
    track: {
      title: "Track Every Rupee, Effortlessly",
      description:
        "Connect your accounts or add expenses manually in seconds. Our smart categorization automatically organizes your spending so you can see exactly where your money goes.",
      icon: <TrendingUpIcon className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    visualize: {
      title: "Visualize Your Financial Story",
      description:
        "Go beyond numbers with beautiful, interactive charts. Understand your spending habits, identify trends, and discover opportunities to save with powerful visualizations.",
      icon: <SparklesIcon className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
    },
    ai: {
      title: "Get Hyper-Personalized AI Insights",
      description:
        "Our advanced AI analyzes your spending and market data to provide actionable advice on budget improvements, investment opportunities, and strategies to reach your goals faster.",
      icon: <LightbulbIcon className="h-6 w-6" />,
      color: "from-amber-500 to-orange-500",
    },
  };

  const stats = [
    { value: 50000, suffix: "+", label: "Active Users" },
    { value: 2, suffix: "M+", label: "Transactions Tracked" },
    { value: 40, suffix: "%", label: "Avg. Savings Increase" },
    { value: 4.9, suffix: "/5", label: "User Rating" },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-200 antialiased scroll-smooth overflow-x-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] bg-indigo-500/20 rounded-full filter blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
            left: "10%",
            top: "10%",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full filter blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${
              mousePosition.y * -0.015
            }px)`,
            right: "10%",
            top: "30%",
          }}
        />
        <div
          className="absolute w-[700px] h-[700px] bg-pink-500/15 rounded-full filter blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${
              mousePosition.y * 0.01
            }px)`,
            left: "50%",
            bottom: "10%",
          }}
        />
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <LogoIcon className="h-8 w-8 sm:h-10 sm:w-10 text-white transition-transform group-hover:rotate-12 duration-300" />
                <div className="absolute inset-0 bg-indigo-500/30 rounded-full filter blur-xl group-hover:bg-indigo-400/40 transition-all"></div>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Finsight AI
              </h1>
            </div>
            <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
              <a
                href="#features"
                className="relative text-gray-300 hover:text-white transition-colors group"
              >
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#how-it-works"
                className="relative text-gray-300 hover:text-white transition-colors group"
              >
                How It Works
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="#testimonials"
                className="relative text-gray-300 hover:text-white transition-colors group"
              >
                Testimonials
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
              <a
                href="/login"
                className="relative text-gray-300 hover:text-white transition-colors group"
              >
                <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300">
                  Sign In
                </button>
              </a>
            </nav>
            <button
              className="lg:hidden relative z-50 p-2 hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <XIcon className="h-6 w-6 text-white" />
              ) : (
                <MenuIcon className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-slate-950/98 backdrop-blur-xl z-40 transition-all duration-500 ${
            mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            className={`flex flex-col items-center justify-center h-full space-y-8 transition-all duration-500 delay-100 ${
              mobileMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-semibold text-white hover:text-indigo-400 transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-semibold text-white hover:text-indigo-400 transition-colors"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-semibold text-white hover:text-indigo-400 transition-colors"
            >
              Testimonials
            </a>
            <button className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300 text-lg">
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative pt-24 sm:pt-32 md:pt-20 lg:pt-30 pb-16 sm:pb-20 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-8 backdrop-blur-sm animate-fade-in">
            <SparklesIcon className="h-4 w-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">
              AI-Powered Financial Intelligence
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight text-white tracking-tighter mb-6 animate-fade-in-up">
            Clarity for Your Cashflow.
            <br />
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-x">
                Intelligence for Your Investments.
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400/20 via-purple-400/20 to-pink-400/20 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
            Finsight AI is the first platform that connects how you spend to how
            you invest, using powerful AI to illuminate the path to your
            financial goals.
          </p>

          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-400">
            <button className="group relative inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 text-base sm:text-lg overflow-hidden w-full sm:w-auto">
              <span className="relative z-10 flex items-center justify-center w-full">
                Get Started for Free{" "}
                <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button className="inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white font-semibold rounded-xl sm:rounded-2xl hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 text-base sm:text-lg w-full sm:w-auto">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 sm:mt-20 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 sm:p-6 hover:border-indigo-500/50 transition-all duration-300">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-500/20 rounded-full filter blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full filter blur-2xl animate-float animation-delay-2000"></div>
      </main>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="relative py-16 sm:py-20 md:py-24 lg:py-20"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6 backdrop-blur-sm">
              <TargetIcon className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">
                Simple Process
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Get Started in 3 Simple Steps
            </h3>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Your journey to financial clarity is easier than you think.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 lg:gap-16 relative max-w-6xl mx-auto">
            {/* Connection Line - Desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5">
              <div className="h-full bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
            </div>

            {/* Connection Line - Mobile */}
            <div className="md:hidden absolute top-0 bottom-0 left-12 w-0.5">
              <div className="h-full bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent"></div>
            </div>

            {[
              {
                icon: LinkIcon,
                color: "indigo",
                title: "Link Your Accounts",
                desc: "Securely connect your bank accounts, credit cards, and investments for a complete financial overview.",
              },
              {
                icon: LightbulbIcon,
                color: "purple",
                title: "Get AI Insights",
                desc: "Our AI analyzes your data to provide personalized tips, find savings, and suggest investment opportunities.",
              },
              {
                icon: TargetIcon,
                color: "pink",
                title: "Achieve Your Goals",
                desc: "Set financial goals and track your progress with a clear, actionable plan powered by your own data.",
              },
            ].map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative z-10 group">
                  <div className="flex flex-col items-center md:items-center text-center">
                    <div
                      className={`relative flex items-center justify-center h-20 w-20 sm:h-24 sm:w-24 bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-${step.color}-500 rounded-2xl sm:rounded-3xl mb-6 shadow-2xl group-hover:scale-110 group-hover:shadow-${step.color}-500/50 transition-all duration-300`}
                    >
                      <Icon
                        className={`h-8 w-8 sm:h-10 sm:w-10 text-${step.color}-400`}
                      />
                      <div className="absolute -top-3 -right-3 flex items-center justify-center h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full text-white text-sm font-bold shadow-lg">
                        {i + 1}
                      </div>
                      <div
                        className={`absolute inset-0 bg-${step.color}-500/20 rounded-2xl sm:rounded-3xl filter blur-xl group-hover:blur-2xl transition-all duration-300`}
                      ></div>
                    </div>
                    <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h4>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section
        id="features"
        className="relative py-16 sm:py-20 md:py-24 lg:py-32"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-6 backdrop-blur-sm">
              <SparklesIcon className="h-4 w-4 text-indigo-400" />
              <span className="text-sm font-medium text-indigo-300">
                Powerful Features
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Your Financial Co-Pilot
            </h3>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Everything you need, all in one intelligent platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="lg:col-span-5 space-y-4">
              {Object.entries(features).map(([key, feature]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`group relative w-full p-6 sm:p-8 rounded-2xl text-left transition-all duration-500 overflow-hidden ${
                    activeTab === key
                      ? "bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-indigo-500/50 shadow-2xl shadow-indigo-500/20"
                      : "bg-slate-900/30 border-2 border-slate-800 hover:border-slate-700 hover:bg-slate-900/50"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>
                  <div className="relative z-10">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg sm:text-xl text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 transition-all duration-300">
                          {key === "track"
                            ? "Expense Tracking"
                            : key === "visualize"
                            ? "Spending Analysis"
                            : "AI-Powered Advice"}
                        </h4>
                        <p className="text-gray-400 text-sm sm:text-base">
                          {key === "track"
                            ? "See the full picture of your spending automatically."
                            : key === "visualize"
                            ? "Understand your habits with powerful charts."
                            : "Get custom investment & saving strategies."}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Feature Display */}
            <div className="lg:col-span-7">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full filter blur-3xl"></div>
                  <h4 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
                    {features[activeTab].title}
                  </h4>
                  <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed min-h-[80px]">
                    {features[activeTab].description}
                  </p>
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div
                          className={`inline-flex p-6 rounded-2xl bg-gradient-to-br ${features[activeTab].color} shadow-2xl animate-pulse`}
                        >
                          {features[activeTab].icon}
                        </div>
                        <p className="text-gray-400 font-medium">
                          Feature Visualization
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
            <div>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6 backdrop-blur-sm">
                <ShieldIcon className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-300">
                  Bank-Level Security
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6">
                Your Data, Your Control
              </h3>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-8">
                We use 256-bit encryption and never store your banking
                credentials. Your financial data is yours alone, protected by
                the same security banks use.
              </p>
              <div className="space-y-4">
                {[
                  "End-to-end encryption for all data",
                  "Multi-factor authentication",
                  "Read-only access to accounts",
                  "Regular security audits",
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <CheckIcon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: ShieldIcon, label: "Secure", color: "emerald" },
                    {
                      icon: SparklesIcon,
                      label: "AI-Powered",
                      color: "purple",
                    },
                    { icon: TrendingUpIcon, label: "Real-time", color: "blue" },
                    { icon: CheckIcon, label: "Verified", color: "pink" },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="relative group">
                        <div
                          className={`absolute inset-0 bg-${item.color}-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all`}
                        ></div>
                        <div className="relative bg-slate-800/50 rounded-2xl p-6 text-center border border-slate-700 group-hover:border-slate-600 transition-all">
                          <Icon
                            className={`h-8 w-8 text-${item.color}-400 mx-auto mb-3`}
                          />
                          <p className="text-white font-semibold">
                            {item.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="relative py-16 sm:py-20 md:py-24 lg:py-32"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6 backdrop-blur-sm">
              <SparklesIcon className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-300">
                Loved by Users
              </span>
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
              Trusted by Smart Spenders & Investors
            </h3>
            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Join thousands who've transformed their financial future
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {[
              {
                name: "Sarah J",
                location: "Bengaluru",
                avatar: "https://i.pravatar.cc/150?u=sarah",
                quote:
                  "For the first time, I actually know where my money is going. The AI investment tips are pure gold. A total game-changer.",
                color: "indigo",
              },
              {
                name: "Rohan M",
                location: "Delhi",
                avatar: "https://i.pravatar.cc/150?u=rohan",
                quote:
                  "This is the app I've been waiting for. It connected my spending habits to my investment goals in a way I never thought possible.",
                color: "purple",
              },
              {
                name: "Priya K",
                location: "Mumbai",
                avatar: "https://i.pravatar.cc/150?u=priya",
                quote:
                  "Finally, a finance app that doesn't just show you data, it gives you a plan. The interface is stunning and so easy to use.",
                color: "pink",
              },
            ].map((testimonial, i) => (
              <div key={i} className="group relative">
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-${testimonial.color}-500/20 to-purple-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500`}
                ></div>
                <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl hover:border-slate-700 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <img
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mr-4 ring-2 ring-slate-700"
                        src={testimonial.avatar}
                        alt={`Avatar of ${testimonial.name}`}
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-${testimonial.color}-500 to-purple-500 rounded-full border-2 border-slate-900`}
                      ></div>
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic leading-relaxed flex-grow text-sm sm:text-base">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex mt-6 space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-amber-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMC02YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJzLTUuMzczIDEyLTEyIDEyLTEyLTUuMzczLTEyLTEyIDUuMzczLTEyIDEyLTEyeiIgZmlsbD0iIzMzMyIgb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl sm:rounded-[2rem] blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-60"></div>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-3xl sm:rounded-[2rem] p-8 sm:p-12 md:p-16 text-center shadow-2xl">
                <SparklesIcon className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-400 mx-auto mb-6 animate-pulse" />
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                  Ready to Unlock Your Financial Potential?
                </h3>
                <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                  Join Finsight AI today and transform your financial future.
                  Get personalized insights, track every expense, and invest
                  smarter.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <button className="group relative inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 text-lg overflow-hidden w-full sm:w-auto">
                    <span className="relative z-10 flex items-center">
                      Start Your Journey{" "}
                      <ArrowRightIcon className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  <p className="text-gray-400 text-sm">
                    Free forever • No credit card required
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-950 border-t border-slate-800 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <LogoIcon className="h-8 w-8 text-white" />
                <h4 className="text-xl font-black text-white">Finsight AI</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Empowering your financial future with AI-driven insights and
                intelligent tracking.
              </p>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Product</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-bold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Finsight AI. All rights
              reserved. Crafted with precision.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: backwards;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: backwards;
        }
      `}</style>
    </div>
  );
}
