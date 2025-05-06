"use client";

import { notFound } from "next/navigation";
import { fetchTokenDetails, fetchTokenChart } from "@/lib/api";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function TokenPage({ params }: { params: { id: string } }) {
  const tokenId = params.id;
  const [token, setToken] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTokenData = async () => {
      setLoading(true);
      try {
        const tokenDetails = await fetchTokenDetails(tokenId);
        const tokenChart = await fetchTokenChart(tokenId);
        setToken(tokenDetails);
        setChartData(tokenChart);
      } catch (error) {
        console.error("Error fetching token data or chart:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadTokenData();
  }, [tokenId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
        <div className="animate-spin h-10 w-10 border-4 border-lime-400 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!token || !chartData) {
    return notFound();
  }

  const chartConfig = {
    labels: chartData.prices.map((price: number[]) => {
      const date = new Date(price[0]);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        label: `${token.name} Price (7d)`,
        data: chartData.prices.map((price: number[]) => price[1]),
        borderColor: "rgba(34, 197, 94, 1)", // lime-green border
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        pointRadius: 2,
        tension: 0.2,
      },
    ],
  };

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

        <div className="rounded-2xl p-4 bg-gray-900 shadow-xl hover:shadow-lime-500/20 transition-all duration-300">
          <Line data={chartConfig} options={{ responsive: true }} />
        </div>
      </div>
    </main>
  );
}
