"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../lib/firebase/config';

// --- Icon Components ---
const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
);
const AtSignIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>
);
const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.19,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.19,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.19,22C17.6,22 21.54,18.33 21.54,12.81C21.54,11.89 21.45,11.45 21.35,11.1Z"/></svg>
);


// --- Login Page Component ---
export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const router = useRouter();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleAuthAction = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                if (password.length < 6) throw new Error("Password should be at least 6 characters.");
                await createUserWithEmailAndPassword(auth, email, password);
            }
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message.replace('Firebase: ', '').replace(/ \(auth\/.*\)\.$/, ''));
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        setError(null);
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push('/dashboard');
        } catch (err: any) {
             setError(err.message.replace('Firebase: ', '').replace(/ \(auth\/.*\)\.$/, ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-200 flex items-center justify-center p-4 overflow-hidden relative">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                 <div className="absolute w-[600px] h-[600px] bg-indigo-500/15 rounded-full filter blur-3xl transition-transform duration-1000 ease-out" style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`, left: '10%', top: '10%' }} />
                <div className="absolute w-[500px] h-[500px] bg-purple-500/15 rounded-full filter blur-3xl transition-transform duration-1000 ease-out" style={{ transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`, right: '10%', top: '30%' }}/>
                <div className="absolute w-[700px] h-[700px] bg-pink-500/10 rounded-full filter blur-3xl transition-transform duration-1000 ease-out" style={{ transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`, left: '50%', bottom: '10%' }} />
            </div>

            <div className="w-full max-w-md relative z-10 animate-fade-in-up">
                <Link href="/" className="flex items-center justify-center mb-8 space-x-3 group">
                    <div className="relative">
                      <LogoIcon className="h-10 w-10 text-white transition-transform group-hover:rotate-12 duration-300"/>
                      <div className="absolute inset-0 bg-indigo-500/30 rounded-full filter blur-xl group-hover:bg-indigo-400/40 transition-all"></div>
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Finsight AI</h1>
                </Link>

                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-slate-950/80 backdrop-blur-xl border border-slate-800/50 rounded-3xl p-8 shadow-2xl">
                        <h2 className="text-2xl font-bold text-center text-white mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Your Account'}
                        </h2>
                        <p className="text-center text-gray-400 mb-6">
                            {isLogin ? 'Sign in to access your dashboard' : 'Get started on your financial journey'}
                        </p>

                        {error && <p className="bg-red-500/20 text-red-400 p-3 rounded-lg text-center mb-4 text-sm">{error}</p>}
                        
                        <form onSubmit={handleAuthAction} className="space-y-5">
                            <div className="relative">
                                <AtSignIcon className="absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
                            </div>
                            <div className="relative">
                                <LockIcon className="absolute top-1/2 left-4 -translate-y-1/2 h-5 w-5 text-gray-500" />
                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
                            </div>

                            <button type="submit" disabled={loading} className="group relative w-full inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-300 overflow-hidden disabled:opacity-50">
                                <span className="relative z-10">{loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>
                        </form>
                        
                        <div className="flex items-center my-6">
                            <hr className="flex-grow border-slate-700"/>
                            <span className="mx-4 text-xs text-gray-500">OR</span>
                            <hr className="flex-grow border-slate-700"/>
                        </div>

                        <button onClick={handleGoogleSignIn} disabled={loading} className="w-full flex items-center justify-center space-x-3 py-3 bg-slate-800/80 border border-slate-700 rounded-xl hover:bg-slate-800 transition disabled:opacity-50">
                            <GoogleIcon className="h-5 w-5 text-white" />
                            <span className="font-semibold text-sm">Sign in with Google</span>
                        </button>

                        <div className="text-center mt-6">
                            <button onClick={() => { setIsLogin(!isLogin); setError(null); }} className="text-sm text-indigo-400 hover:text-indigo-300 transition">
                                {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
             <style jsx>{`        
                @keyframes fade-in-up {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up { 
                    animation: fade-in-up 0.8s ease-out;
                    animation-fill-mode: backwards;
                }
            `}</style>
        </div>
    );
}

