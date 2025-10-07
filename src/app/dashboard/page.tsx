"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth, firestore } from "@/lib/firebase/config";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
  orderBy,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  Unsubscribe,
} from "firebase/firestore";
import { Transaction, UserProfile } from "@/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OnboardingForm } from "@/components/OnboardingForm";
import { SpendingChart } from "@/components/SpendingChart";

// --- Icon Components (unchanged) ---
const PlusCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
);
const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);
const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
const TargetIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
const LightbulbIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
const BarChartIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <line x1="12" x2="12" y1="20" y2="10" />
    <line x1="18" x2="18" y1="20" y2="4" />
    <line x1="6" x2="6" y1="20" y2="16" />
  </svg>
);

// --- Loading Screen Component (kept visually similar, minor text change) ---
const LoadingScreen = () => (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center">
    <div className="flex flex-col items-center space-y-6">
      <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
        Deploying your financial intelligence...
      </p>
      <span className="text-sm text-gray-400 animate-fadeIn">
        Preparing your dashboard ✨
      </span>
    </div>
    <style jsx>{`
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      .animate-fadeIn {
        animation: fadeIn 1.5s ease-in-out;
      }
    `}</style>
  </div>
);

// --- Main Dashboard Component ---
export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [transactionType, setTransactionType] = useState<"debit" | "credit">(
    "debit"
  );
  const [formError, setFormError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    let unsubscribeAuth: (() => void) | undefined;
    let unsubscribeSnap: Unsubscribe | null = null;

    unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      // cleanup previous snapshot listener if auth state changes
      if (unsubscribeSnap) {
        unsubscribeSnap();
        unsubscribeSnap = null;
      }

      if (currentUser) {
        setUser(currentUser);
        setLoading(true);
        try {
          const profileRef = doc(firestore, "profiles", currentUser.uid);
          const profileSnap = await getDoc(profileRef);

          if (
            profileSnap.exists() &&
            (profileSnap.data() as any).onboardingComplete
          ) {
            const profileData = profileSnap.data() as UserProfile;
            setUserProfile({ ...profileData, id: profileSnap.id });
            // build query and subscribe to transactions
            const transactionsCol = collection(firestore, "transactions");
            const q = query(
              transactionsCol,
              where("userId", "==", currentUser.uid),
              orderBy("date", "desc")
            );
            unsubscribeSnap = onSnapshot(
              q,
              (snapshot) => {
                const userTransactions = snapshot.docs.map((d) => {
                  const data = d.data() as any;
                  // Robust parsing of date and amount
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

                  const amt =
                    typeof data.amount === "number"
                      ? data.amount
                      : parseFloat(data.amount) || 0;

                  return {
                    id: d.id,
                    userId: data.userId,
                    description: data.description || "",
                    amount: amt,
                    category: data.category || "Other",
                    date: dateObj,
                    type: data.type === "credit" ? "credit" : "debit",
                  } as Transaction;
                });
                setTransactions(userTransactions);
                setLoading(false);
              },
              (err) => {
                console.error("Firestore snapshot error:", err);
                setLoading(false);
              }
            );
            return;
          } else {
            // Profile doesn't exist or onboarding not complete
            setUserProfile({ onboardingComplete: false } as UserProfile);
            setLoading(false);
            return;
          }
        } catch (err) {
          console.error("Error fetching profile or transactions:", err);
          setLoading(false);
        }
      } else {
        setUser(null);
        router.push("/login");
      }
    });

    // cleanup on unmount
    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeSnap) unsubscribeSnap();
    };
  }, [router]);

  const handleOnboardingComplete = async (
    profileData: Omit<UserProfile, "id" | "userId">
  ) => {
    if (!user) return;
    setLoading(true);
    const profileRef = doc(firestore, "profiles", user.uid);
    try {
      // ensure onboardingComplete is recorded
      await setDoc(profileRef, {
        ...profileData,
        userId: user.uid,
        onboardingComplete: true,
      });
      setUserProfile({
        ...profileData,
        userId: user.uid,
        id: user.uid,
        onboardingComplete: true,
      } as UserProfile);
    } catch (error) {
      console.error("Error saving profile: ", error);
    } finally {
      setLoading(false);
    }
  };

  const categorySpendingData = useMemo(() => {
    const spendingMap: { [key: string]: number } = {};
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    transactions
      .filter((t) => t.type === "debit" && t.date > thirtyDaysAgo)
      .forEach((t) => {
        spendingMap[t.category] =
          (spendingMap[t.category] || 0) + (t.amount || 0);
      });
    return Object.entries(spendingMap)
      .map(([name, total]) => ({ name, total }))
      .sort((a, b) => b.total - a.total);
  }, [transactions]);

  const financialScore = useMemo(() => {
    if (!userProfile?.monthlyIncome) return 75;
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentSpending = transactions
      .filter((t) => t.type === "debit" && t.date > thirtyDaysAgo)
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    if (userProfile.monthlyIncome === 0) return 50;
    const spendingRatio = recentSpending / userProfile.monthlyIncome;
    let score = 100 - spendingRatio * 100;
    return Math.round(Math.max(0, Math.min(100, score)));
  }, [transactions, userProfile]);

  const getScoreColor = () => {
    if (financialScore >= 80) return "text-emerald-400";
    if (financialScore >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreFeedback = () => {
    if (financialScore >= 80)
      return "Excellent! You're managing your finances well.";
    if (financialScore >= 60) return "You're on the right track. Keep it up!";
    return "There's room for improvement. Let's review your spending.";
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!description || !amount) {
      setFormError("Description and amount are required.");
      return;
    }
    if (!user) {
      setFormError("You must be logged in.");
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setFormError("Enter a valid amount greater than 0.");
      return;
    }
    try {
      await addDoc(collection(firestore, "transactions"), {
        userId: user.uid,
        description,
        amount: parsedAmount,
        category,
        date: Timestamp.fromDate(new Date()), // store as Firestore Timestamp
        type: transactionType,
      });
      setDescription("");
      setAmount("");
      setCategory("Food");
      setTransactionType("debit");
    } catch (error) {
      console.error("Error adding transaction: ", error);
      setFormError("Failed to add transaction.");
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    if (!id) return;
    try {
      await deleteDoc(doc(firestore, "transactions", id));
    } catch (error) {
      console.error("Error deleting transaction: ", error);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  if (loading) return <LoadingScreen />;
  if (!user) return null;
  if (!userProfile?.onboardingComplete)
    return <OnboardingForm user={user} onComplete={handleOnboardingComplete} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-200 flex flex-col">
      <Header user={user} handleLogout={handleLogout} />

      <main className="container mx-auto p-6 md:p-8 flex-grow">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {getGreeting()},{" "}
            <span className="text-indigo-400">
              {userProfile.displayName ||
                user.displayName ||
                user.email?.split("@")[0]}
            </span>
          </h1>
          <p className="text-gray-400 mt-1">
            Here's your financial overview for today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-1 lg:col-span-1 md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <h3 className="font-bold text-white mb-4">Financial Health</h3>
            <div className="w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center">
              <span className={`text-4xl font-bold ${getScoreColor()}`}>
                {financialScore}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-3">{getScoreFeedback()}</p>
          </div>

          <div className="xl:col-span-3 lg:col-span-2 md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <BarChartIcon className="h-6 w-6 text-indigo-400 mr-2" />
              <h3 className="font-bold text-white">
                Spending Analysis (Last 30 Days)
              </h3>
            </div>
            <div className="h-48">
              <SpendingChart data={categorySpendingData} />
            </div>
          </div>

          <div className="xl:col-span-2 lg:col-span-3 md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Add New Transaction
            </h2>
            <form onSubmit={handleAddTransaction}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setTransactionType("debit")}
                  className={`py-2 rounded-lg text-sm font-bold transition ${
                    transactionType === "debit"
                      ? "bg-red-500/20 text-red-400 ring-2 ring-red-500"
                      : "bg-slate-800/50 hover:bg-slate-700/50"
                  }`}
                >
                  Debit / Expense
                </button>
                <button
                  type="button"
                  onClick={() => setTransactionType("credit")}
                  className={`py-2 rounded-lg text-sm font-bold transition ${
                    transactionType === "credit"
                      ? "bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500"
                      : "bg-slate-800/50 hover:bg-slate-700/50"
                  }`}
                >
                  Credit / Income
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <div className="sm:col-span-1">
                  <label
                    htmlFor="description"
                    className="text-xs font-medium text-gray-400"
                  >
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mt-1 bg-slate-800/50 border border-slate-700 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="amount"
                      className="text-xs font-medium text-gray-400"
                    >
                      Amount (₹)
                    </label>
                    <input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full mt-1 bg-slate-800/50 border border-slate-700 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="category"
                      className="text-xs font-medium text-gray-400"
                    >
                      Category
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full mt-1 bg-slate-800/50 border border-slate-700 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                      <option>Food</option>
                      <option>Transport</option>
                      <option>Bills</option>
                      {transactionType === "credit" && <option>Salary</option>}
                      <option>Shopping</option>
                      <option>Entertainment</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
                >
                  <PlusCircleIcon className="h-5 w-5" />
                  <span>Add</span>
                </button>
              </div>
              {formError && (
                <p className="text-sm text-red-400 mt-2">{formError}</p>
              )}
            </form>
          </div>

          <div className="xl:col-span-2 lg:col-span-3 md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">
              Recent Transactions
            </h2>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {transactions.length > 0 ? (
                transactions.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between items-center bg-slate-800/50 p-3 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-white">
                        {t.description}
                      </p>
                      <p className="text-sm text-gray-400">
                        {t.category} - {t.date.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p
                        className={`font-bold text-lg ${
                          t.type === "debit"
                            ? "text-red-400"
                            : "text-emerald-400"
                        }`}
                      >
                        {t.type === "debit" ? "-" : "+"}₹
                        {(t.amount || 0).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleDeleteTransaction(t.id!)}
                        className="p-2 text-gray-500 hover:text-red-400 transition opacity-50 hover:opacity-100"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No transactions yet.
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <TargetIcon className="h-6 w-6 text-purple-400 mr-2" />
              <h3 className="font-bold text-white">Goal Planning</h3>
            </div>
            <div className="h-24 flex items-center justify-center text-gray-500 bg-slate-800/50 rounded-lg">
              Goal tracking coming soon
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <LightbulbIcon className="h-6 w-6 text-amber-400 mr-2" />
              <h3 className="font-bold text-white">AI Financial Advice</h3>
            </div>
            <div className="h-24 flex items-center justify-center text-gray-500 bg-slate-800/50 rounded-lg">
              AI insights will appear here
            </div>
          </div>

          <div className="xl:col-span-2 lg:col-span-3 md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center mb-4">
              <TrendingUpIcon className="h-6 w-6 text-cyan-400 mr-2" />
              <h3 className="font-bold text-white">Live Market Data</h3>
            </div>
            <div className="h-24 flex items-center justify-center text-gray-500 bg-slate-800/50 rounded-lg">
              Stock & Mutual Fund data will be shown here
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
