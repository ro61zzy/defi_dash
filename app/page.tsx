import { fetchTopTokens } from "@/lib/api";
import { TokenCard } from "@/components/TokenCard";

export default async function HomePage() {
  let tokens = [];
  let errorMessage = "";

  try {
    tokens = await fetchTopTokens();
  } catch (error) {
    console.error("Failed to fetch tokens:", error);
    errorMessage = "Unable to fetch token data at the moment.";
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="relative text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-500 to-lime-400">
            Top Tokens
            <span className="absolute left-0 -bottom-1 h-1 w-10 bg-lime-400 animate-pulse rounded"></span>
          </h1>

          <span className="text-sm text-gray-400 hidden sm:inline">
            Updated every 5 minutes
          </span>
        </div>

        {errorMessage ? (
          <div className="text-red-500 text-lg">{errorMessage}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {tokens.map((token: any) => (
              <TokenCard
                key={token.id}
                id={token.id}
                name={token.name}
                image={token.image}
                symbol={token.symbol}
                price={token.current_price}
                priceChange={token.price_change_percentage_24h}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
