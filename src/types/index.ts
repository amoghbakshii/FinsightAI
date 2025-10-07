export interface Transaction {
  id?: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
  userId: string;
  type: 'debit' | 'credit';
}

export interface UserProfile {
  id?: string;
  userId: string;
  displayName: string;
  monthlyIncome: number;
  fixedExpenses: {
    rent: number;
    loans: number;
    subscriptions: number;
  };
  variableExpenses: {
    food: number;
    groceries: number;
    transport: number;
    entertainment: number;
  };
  onboardingComplete: boolean;
}

