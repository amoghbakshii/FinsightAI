"use client";

import { useState } from 'react';
import { User } from 'firebase/auth';
import { UserProfile } from '@/types';

// --- Icon Components ---
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>);
const RupeeIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12"/><path d="M6 8h12"/><path d="M6 13h12"/><path d="M6 18h12"/><path d="M18 13c0 4-4 4-4 4h-1"/><path d="M8 13c0 4 4 4 4 4h1"/></svg>);
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>);
const ShoppingCartIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>);


const steps = [
    { title: "Welcome", icon: <UserIcon className="h-6 w-6" /> },
    { title: "Income", icon: <RupeeIcon className="h-6 w-6" /> },
    { title: "Fixed Expenses", icon: <HomeIcon className="h-6 w-6" /> },
    { title: "Variable Expenses", icon: <ShoppingCartIcon className="h-6 w-6" /> }
];

interface OnboardingFormProps {
    user: User;
    onComplete: (profileData: Omit<UserProfile, 'id' | 'userId'>) => void;
}

export const OnboardingForm = ({ user, onComplete }: OnboardingFormProps) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [profileData, setProfileData] = useState({
        displayName: user.displayName || '',
        monthlyIncome: 0,
        fixedExpenses: { rent: 0, loans: 0, subscriptions: 0 },
        variableExpenses: { food: 0, groceries: 0, transport: 0, entertainment: 0 }
    });

    const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete({ ...profileData, onboardingComplete: true });
    };

    const progressPercentage = ((currentStep + 1) / steps.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 text-white">
            <div className="w-full max-w-2xl bg-slate-900/50 border border-slate-800 rounded-2xl shadow-2xl p-8 backdrop-blur-lg">
                <div className="mb-8">
                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-2.5 mb-4">
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">{steps[currentStep].title}</h2>
                        <span className="text-sm text-gray-400">Step {currentStep + 1} of {steps.length}</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {currentStep === 0 && (
                        <section>
                            <h3 className="text-lg text-gray-300 mb-4">Let's get to know you. What should we call you?</h3>
                            <input type="text" placeholder="Your Name" value={profileData.displayName} onChange={e => setProfileData(p => ({ ...p, displayName: e.target.value }))} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </section>
                    )}
                    {currentStep === 1 && (
                        <section>
                            <h3 className="text-lg text-gray-300 mb-4">What is your approximate monthly income after taxes?</h3>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                                <input type="number" placeholder="50000" value={profileData.monthlyIncome || ''} onChange={e => setProfileData(p => ({ ...p, monthlyIncome: Number(e.target.value) }))} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 pl-8 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </section>
                    )}
                    {currentStep === 2 && (
                        <section>
                            <h3 className="text-lg text-gray-300 mb-4">Enter your fixed monthly expenses (what you pay every month).</h3>
                            <div className="space-y-4">
                                <input type="number" placeholder="₹ Rent / Mortgage" value={profileData.fixedExpenses.rent || ''} onChange={e => setProfileData(p => ({ ...p, fixedExpenses: { ...p.fixedExpenses, rent: Number(e.target.value) } }))} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                <input type="number" placeholder="₹ Loan EMIs" value={profileData.fixedExpenses.loans || ''} onChange={e => setProfileData(p => ({ ...p, fixedExpenses: { ...p.fixedExpenses, loans: Number(e.target.value) } }))} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                <input type="number" placeholder="₹ Subscriptions (Netflix, etc.)" value={profileData.fixedExpenses.subscriptions || ''} onChange={e => setProfileData(p => ({ ...p, fixedExpenses: { ...p.fixedExpenses, subscriptions: Number(e.target.value) } }))} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </section>
                    )}
                     {currentStep === 3 && (
                        <section>
                            <h3 className="text-lg text-gray-300 mb-4">Finally, estimate your average monthly spending on essentials.</h3>
                            <div className="space-y-4">
                                <input type="number" placeholder="₹ Food / Dining Out" value={profileData.variableExpenses.food || ''} onChange={e => setProfileData(p => ({ ...p, variableExpenses: { ...p.variableExpenses, food: Number(e.target.value) } }))} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                <input type="number" placeholder="₹ Groceries" value={profileData.variableExpenses.groceries || ''} onChange={e => setProfileData(p => ({ ...p, variableExpenses: { ...p.variableExpenses, groceries: Number(e.target.value) } }))} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                <input type="number" placeholder="₹ Transport" value={profileData.variableExpenses.transport || ''} onChange={e => setProfileData(p => ({ ...p, variableExpenses: { ...p.variableExpenses, transport: Number(e.target.value) } }))} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none" />
                                <input type="number" placeholder="₹ Entertainment / Shopping" value={profileData.variableExpenses.entertainment || ''} onChange={e => setProfileData(p => ({ ...p, variableExpenses: { ...p.variableExpenses, entertainment: Number(e.target.value) } }))} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </section>
                    )}

                    <div className="mt-8 flex justify-between">
                        <button type="button" onClick={handleBack} disabled={currentStep === 0} className="px-6 py-2 bg-slate-700 rounded-lg disabled:opacity-50">Back</button>
                        {currentStep < steps.length - 1 ? (
                            <button type="button" onClick={handleNext} className="px-6 py-2 bg-indigo-600 rounded-lg">Next</button>
                        ) : (
                            <button type="submit" className="px-6 py-2 bg-emerald-600 rounded-lg">Finish</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};