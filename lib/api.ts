import axios from "axios";


// Caching the token market data
export const fetchTopTokens = async () => {
    const retryLimit = 3;
    let attempt = 0;
    while (attempt < retryLimit) {
      try {
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        return res.data;
      } catch (error) {
        if (attempt === retryLimit - 1) {
          throw error; // Give up after reaching the retry limit
        }
        attempt++;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
      }
    }
  };

// Fetch token details with retry and cache
export const fetchTokenDetails = async (id: string) => {
    const retryLimit = 3;
    let attempt = 0;
    while (attempt < retryLimit) {
      try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        return res.data; // Return the data received from the API
      } catch (error) {
        if (attempt === retryLimit - 1) {
          throw error; // Give up after reaching the retry limit
        }
        attempt++;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
      }
    }
    throw new Error("Too many requests, try again later");
  };
  

  // Fetch token chart data with retry and cache
export const fetchTokenChart = async (id: string) => {
    const retryLimit = 3;
    let attempt = 0;
    while (attempt < retryLimit) {
      try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
          params: {
            vs_currency: "usd",
            days: "7", // 7 days of data
            interval: "daily", // daily intervals
          },
        });
        return res.data; // Return the chart data (prices)
      } catch (error) {
        if (attempt === retryLimit - 1) {
          throw error; // Give up after reaching the retry limit
        }
        attempt++;
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
      }
    }
    throw new Error("Too many requests, try again later");
  };

