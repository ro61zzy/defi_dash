// app/token/[id]/page.tsx
import { notFound } from "next/navigation";
import { fetchTokenDetails, fetchTokenChart } from "@/lib/api";
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

export default async function TokenPage({ params }: { params: { id: string } }) {
  const tokenId = params.id;

  try {
    const [token, chart] = await Promise.all([
      fetchTokenDetails(tokenId),
      fetchTokenChart(tokenId),
    ]);

    const chartData = {
      labels: chart.prices.map((p: number[]) => {
        const date = new Date(p[0]);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }),
      datasets: [
        {
          label: `${token.name} Price (7d)`,
          data: chart.prices.map((p: number[]) => p[1]),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
        },
      ],
    };

    return (
      <main className="p-6 text-white min-h-screen bg-gray-950">
        <div className="flex items-center gap-4 mb-6">
          <img src={token.image.small} alt={token.name} className="w-10 h-10" />
          <h1 className="text-2xl font-bold">{token.name} ({token.symbol.toUpperCase()})</h1>
        </div>

        <p className="text-xl mb-4">
          Current Price: <span className="text-green-400">${token.market_data.current_price.usd}</span>
        </p>

        <div className="bg-gray-900 p-4 rounded-xl">
          <Line data={chartData} />
        </div>
      </main>
    );
  } catch (error) {
    return notFound();
  }
}
