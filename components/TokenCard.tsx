"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface TokenCardProps {
  id: string;
  name: string;
  image: string;
  symbol: string;
  price: number;
  priceChange: number;
}

export const TokenCard = ({
  id,
  name,
  image,
  symbol,
  price,
  priceChange,
}: TokenCardProps) => {
  const isPositive = priceChange >= 0;

  return (
    <Link href={`/token/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        whileHover={{
          scale: 1.05,
          y: -4,
          boxShadow: "0px 12px 20px rgba(0,0,0,0.25)",
        }}
        className="bg-gradient-to-br from-gray-900/80 to-gray-800/90 border border-gray-700 rounded-xl p-4 backdrop-blur-md shadow-md cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <img src={image} alt={name} className="w-9 h-9 rounded-full" />
          <div className="text-sm">
            <h2 className="font-semibold text-white">{name}</h2>
            <p className="text-gray-400 text-xs uppercase">{symbol}</p>
            <p className="text-white text-sm">${price.toFixed(2)}</p>
            <p
              className={`text-xs ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {isPositive ? "▲" : "▼"} {priceChange.toFixed(2)}%
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
