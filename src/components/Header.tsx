"use client";
import { User } from "firebase/auth";
import { useState } from "react";
import Link from "next/link";

// --- Icon Components ---
const LogoIcon = (props: React.SVGProps<SVGSVGElement>) => (
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

const LogOutIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

interface HeaderProps {
  user: User | null;
  handleLogout: () => void;
}

const Header = ({ user, handleLogout }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const displayName = user?.displayName || user?.email?.split("@")[0];

  return (
    <header className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/dashboard">
          <div className="flex items-center space-x-3">
            <LogoIcon className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-black text-white">Finsight AI</h1>
          </div>
        </a>

        {/* Right Section */}
        <div className="flex items-center space-x-4 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-700/50 hover:border-slate-600 transition"
              >
                <UserIcon className="h-5 w-5 text-gray-300" />
                <span className="text-sm font-semibold text-white">
                  {displayName}
                </span>
              </button>

              {/* Dropdown */}
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-lg py-1">
                  <Link
                    href={`/profile/${user.uid}`}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-slate-800"
                  >
                    <UserIcon className="h-4 w-4 mr-2 text-gray-400" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-slate-800"
                  >
                    <LogOutIcon className="h-4 w-4 mr-2 text-gray-400" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <span className="text-sm text-gray-400">Not signed in</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
