// app/token/[id]/page.tsx
import { notFound } from "next/navigation";
import { use } from "react";
import { fetchTokenDetails, fetchTokenChart } from "@/lib/api";
import TokenChart from "@/components/TokenChart";

type Params = Promise<{ id: string }>;

export default function TokenPage({ params }: { params: Params }) {
  // Use the 'use' hook to handle async params
  const { id } = use(params);

  // Fetch data asynchronously inside the component
  const token = use(fetchTokenDetails(id));
  const chartData = use(fetchTokenChart(id));

  if (!token || !chartData) {
    notFound();
  }

  return (
    <main className="p-6 text-white min-h-screen bg-gradient-to-br from-black via-gray-950 to-black">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <img src={token.image.small} alt={token.name} className="w-12 h-12" />
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">
            {token.name} <span className="uppercase text-gray-400">({token.symbol})</span>
          </h1>
        </div>

        <p className="text-2xl mb-6">
          Current Price:{" "}
          <span className="text-lime-400 font-semibold">
            ${token.market_data.current_price.usd}
          </span>
        </p>

        <TokenChart chartData={chartData} tokenName={token.name} />
      </div>
    </main>
  );
}
