"use client";
import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
  Unsubscribe,
} from "firebase/firestore";
import { auth, firestore } from "@/lib/firebase/config";
import { UserProfile, Transaction } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { onAuthStateChanged, User, signOut } from "firebase/auth";

// --- Icon Components (unchanged) ---
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
const RupeeIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M6 3h12" />
    <path d="M6 8h12" />
    <path d="M6 13h12" />
    <path d="M6 18h12" />
    <path d="M18 13c0 4-4 4-4 4h-1" />
    <path d="M8 13c0 4 4 4 4 4h1" />
  </svg>
);
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const ShoppingCartIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const LoadingScreen = () => (
  <div className="flex-grow flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const { uid } = params as { uid?: string };

  useEffect(() => {
    let unsubscribeTransactions: Unsubscribe | null = null;
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      // Reset error/loading state every auth change
      setError(null);
      setTransactions([]);
      setUserProfile(null);
      setLoading(true);

      // cleanup any previous transactions listener
      if (unsubscribeTransactions) {
        unsubscribeTransactions();
        unsubscribeTransactions = null;
      }

      if (!currentUser) {
        // not logged in
        router.push("/login");
        return;
      }

      setUser(currentUser);

      if (!uid || typeof uid !== "string") {
        setError("Invalid profile id.");
        setLoading(false);
        return;
      }

      if (currentUser.uid !== uid) {
        setError("You are not authorized to view this profile.");
        setLoading(false);
        return;
      }

      try {
        // Fetch profile document
        const profileRef = doc(firestore, "profiles", uid);
        const profileSnap = await getDoc(profileRef);
        if (!profileSnap.exists()) {
          setError("Profile not found. Please complete onboarding.");
          setLoading(false);
          return;
        }
        const profileData = profileSnap.data() as UserProfile;
        setUserProfile({ ...profileData, id: profileSnap.id } as UserProfile);

        // Build month range using Firestore Timestamp for comparisons
        const now = new Date();
        const startDate = new Date(
          now.getFullYear(),
          now.getMonth(),
          1,
          0,
          0,
          0,
          0
        );
        const endDate = new Date(
          now.getFullYear(),
          now.getMonth() + 1,
          1,
          0,
          0,
          0,
          0
        );

        const transactionsQuery = query(
          collection(firestore, "transactions"),
          where("userId", "==", uid),
          where("date", ">=", Timestamp.fromDate(startDate)),
          where("date", "<", Timestamp.fromDate(endDate))
        );

        // Realtime listener for monthly transactions
        unsubscribeTransactions = onSnapshot(
          transactionsQuery,
          (snapshot) => {
            const monthlyTransactions = snapshot.docs.map((d) => {
              const data = d.data() as any;

              // parse date robustly
              let dateObj: Date;
              if (data.date instanceof Timestamp) {
                dateObj = data.date.toDate();
              } else if (typeof data.date === "number") {
                dateObj = new Date(data.date);
              } else if (typeof data.date === "string") {
                const parsed = Date.parse(data.date);
                dateObj = isNaN(parsed) ? new Date() : new Date(parsed);
              } else {
                dateObj = new Date();
              }

              // parse amount robustly
              const amt =
                typeof data.amount === "number"
                  ? data.amount
                  : parseFloat(data.amount) || 0;

              // ensure type is either 'debit' or 'credit'
              const type = data.type === "credit" ? "credit" : "debit";

              return {
                id: d.id,
                userId: data.userId,
                description: data.description || "",
                amount: amt,
                category: data.category || "Other",
                date: dateObj,
                type,
              } as Transaction;
            });

            // sort descending by date to be explicit
            monthlyTransactions.sort(
              (a, b) => b.date.getTime() - a.date.getTime()
            );
            setTransactions(monthlyTransactions);
            setLoading(false);
          },
          (err) => {
            console.error("Transactions snapshot error:", err);
            setError(
              "Could not fetch transactions. You may need to create a Firestore index."
            );
            setLoading(false);
          }
        );
      } catch (err) {
        console.error("Profile page error:", err);
        setError("An unexpected error occurred while loading the profile.");
        setLoading(false);
      }
    });

    return () => {
      // cleanup both listeners on unmount
      if (unsubscribeTransactions) unsubscribeTransactions();
      unsubscribeAuth();
    };
  }, [uid, router]);

  // Sum only debit transactions for actual expenditure
  const totalMonthlyExpenditure = useMemo(() => {
    return transactions
      .filter((t) => t.type === "debit")
      .reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
  }, [transactions]);

  const formatCurrency = (value: number) =>
    `₹${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  // defensive defaults for profile fields
  const fixed = userProfile?.fixedExpenses ?? {
    rent: 0,
    loans: 0,
    subscriptions: 0,
  };
  const variable = userProfile?.variableExpenses ?? {
    food: 0,
    groceries: 0,
    transport: 0,
    entertainment: 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-200 flex flex-col">
      <Header user={user} handleLogout={() => signOut(auth)} />

      <main className="container mx-auto p-6 md:p-8 flex-grow">
        {loading ? (
          <LoadingScreen />
        ) : error ? (
          <div className="text-center text-red-400 bg-red-900/20 border border-red-800 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          userProfile && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <UserIcon className="w-12 h-12 text-white" />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-white">
                    {userProfile.displayName}
                  </h1>
                  <p className="text-gray-400">{user?.email}</p>
                </div>
                <button className="ml-auto flex items-center space-x-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-700/50 transition">
                  <EditIcon className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              </div>

              <div className="mt-8 bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Financial Snapshot (This Month)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 p-6 rounded-lg">
                    <h3 className="text-gray-400 font-semibold">
                      Monthly Income
                    </h3>
                    <p className="text-4xl font-bold text-emerald-400 mt-2">
                      {formatCurrency(userProfile.monthlyIncome ?? 0)}
                    </p>
                  </div>
                  <div className="bg-slate-800/50 p-6 rounded-lg">
                    <h3 className="text-gray-400 font-semibold">
                      Actual Monthly Expenditure
                    </h3>
                    <p className="text-4xl font-bold text-red-400 mt-2">
                      {formatCurrency(totalMonthlyExpenditure)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <HomeIcon className="h-6 w-6 text-indigo-400" />
                    <h3 className="text-xl font-bold text-white">
                      Fixed Expenses (Estimates)
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-300">Rent / Mortgage</span>{" "}
                      <span className="font-semibold">
                        {formatCurrency(fixed.rent ?? 0)}
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-300">Loan EMIs</span>{" "}
                      <span className="font-semibold">
                        {formatCurrency(fixed.loans ?? 0)}
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-300">Subscriptions</span>{" "}
                      <span className="font-semibold">
                        {formatCurrency(fixed.subscriptions ?? 0)}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center space-x-3 mb-4">
                    <ShoppingCartIcon className="h-6 w-6 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">
                      Variable Expenses (Estimates)
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex justify-between items-center">
                      <span className="text-gray-300">Food / Dining Out</span>{" "}
                      <span className="font-semibold">
                        {formatCurrency(variable.food ?? 0)}
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-300">Groceries</span>{" "}
                      <span className="font-semibold">
                        {formatCurrency(variable.groceries ?? 0)}
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-300">Transport</span>{" "}
                      <span className="font-semibold">
                        {formatCurrency(variable.transport ?? 0)}
                      </span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="text-gray-300">Entertainment</span>{" "}
                      <span className="font-semibold">
                        {formatCurrency(variable.entertainment ?? 0)}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )
        )}
      </main>
      <Footer />
    </div>
  );
}
