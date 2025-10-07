"use client";

// --- Icon Components ---
const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
);

const Footer = () => {
    return (
        <footer className="relative bg-slate-950 border-t border-slate-800 py-12 sm:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <LogoIcon className="h-8 w-8 text-white"/>
                            <h4 className="text-xl font-black text-white">Finsight AI</h4>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Empowering your financial future with AI-driven insights and intelligent tracking.
                        </p>
                    </div>
                    <div>
                        <h5 className="text-white font-bold mb-4">Product</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-white font-bold mb-4">Company</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-white font-bold mb-4">Legal</h5>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 text-center">
                    <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Finsight AI. All rights reserved. Crafted with precision.</p>
                </div>
            </div>
      </footer>
    );
};

export default Footer;

