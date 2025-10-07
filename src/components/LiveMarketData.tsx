"use client";

import { useState, useEffect } from "react";

// --- Icon Components ---
const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);
const ArrowDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);
const AlertTriangleIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

// --- Data Types for API response ---
interface MarketData {
  symbol: string;
  price: number;
  change: number;
  percentChange: number;
}

const MarketDataItem = ({ item }: { item: MarketData }) => {
  const isPositive = item.change >= 0;
  return (
    <div className="bg-slate-800/50 p-4 rounded-lg flex justify-between items-center hover:bg-slate-800 transition-colors">
      <div>
        <p className="font-bold text-white">{item.symbol}</p>
        <p className="text-xl font-semibold text-gray-300">
          {item.price.toLocaleString("en-IN")}
        </p>
      </div>
      <div
        className={`text-right px-3 py-1 rounded-md ${
          isPositive ? "bg-emerald-500/10" : "bg-red-500/10"
        }`}
      >
        <div
          className={`flex items-center justify-end gap-1 font-semibold ${
            isPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4" />
          ) : (
            <ArrowDownIcon className="h-4 w-4" />
          )}
          <span>{item.change.toFixed(2)}</span>
        </div>
        <p
          className={`text-sm font-medium ${
            isPositive ? "text-emerald-500" : "text-red-500"
          }`}
        >
          ({item.percentChange.toFixed(2)}%)
        </p>
      </div>
    </div>
  );
};

export const LiveMarketData = () => {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

  useEffect(() => {
    if (!apiKey) {
      setError("API key is missing. Please add it to your .env.local file.");
      setLoading(false);
      return;
    }

    const fetchMarketData = async () => {
      setLoading(true);
      setError(null);
      // Symbols for key Indian indices
      const symbols = ["%5ENSEI", "%5EBSESN", "%5ECNXBANK"]; // NIFTY 50, SENSEX, NIFTY BANK
      const url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=IN&symbols=${symbols.join(
        ","
      )}`;
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const result = await response.json();

        const formattedData =
          result?.quoteResponse?.result?.map((item: any) => ({
            symbol: item.shortName || item.symbol,
            price: item.regularMarketPrice,
            change: item.regularMarketChange,
            percentChange: item.regularMarketChangePercent,
          })) || [];

        setData(formattedData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch market data. Check API key and network.");
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [apiKey]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-yellow-900/20 border border-yellow-800 text-yellow-300 text-sm p-4 rounded-lg">
        <AlertTriangleIcon className="h-5 w-5 mr-3 flex-shrink-0" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.length > 0 ? (
        data.map((item) => <MarketDataItem key={item.symbol} item={item} />)
      ) : (
        <p className="text-gray-500">No market data available at the moment.</p>
      )}
    </div>
  );
};
