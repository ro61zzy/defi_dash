import axios from "axios";

export const fetchTopTokens = async () => {
  const res = await axios.get(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    }
  );

  return res.data;
};

export const fetchTokenDetails = async (id: string) => {
  const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
  return res.data;
};

export const fetchTokenChart = async (id: string) => {
  const res = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days: 7,
      },
    }
  );
  return res.data;
};
