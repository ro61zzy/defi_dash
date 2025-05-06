import { fetchTopTokens } from "@/lib/api";
import { TokenCard } from "@/components/TokenCard";

export default async function HomePage() {
  const tokens = await fetchTopTokens();

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Top Tokens</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tokens.map((token: any) => (
          <TokenCard
            key={token.id}
            name={token.name}
            image={token.image}
            symbol={token.symbol}
            price={token.current_price}
            priceChange={token.price_change_percentage_24h}
          />
        ))}
      </div>
    </main>
  );
}
