
"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function TokenChart({ chartData, tokenName }: { chartData: any; tokenName: string }) {
  const chartConfig = {
    labels: chartData.prices.map((price: number[]) => {
      const date = new Date(price[0]);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        label: `${tokenName} Price (7d)`,
        data: chartData.prices.map((price: number[]) => price[1]),
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        pointRadius: 2,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="rounded-2xl p-4 bg-gray-900 shadow-xl hover:shadow-lime-500/20 transition-all duration-300">
      <Line data={chartConfig} options={{ responsive: true }} />
    </div>
  );
}
