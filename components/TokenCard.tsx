"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface TokenCardProps {
  name: string;
  image: string;
  symbol: string;
  price: number;
  priceChange: number;
}

export const TokenCard = ({
  name,
  image,
  symbol,
  price,
  priceChange,
}: TokenCardProps) => {
  return (
    <Link href={`/token/${symbol.toLowerCase()}`}>
    <motion.div
      className="bg-gray-900 p-4 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-4">
        <img src={image} alt={name} className="w-10 h-10" />
        <div>
          <h2 className="text-lg font-bold">{name} <span className="text-sm text-gray-400 uppercase">({symbol})</span></h2>
          <p className="text-green-400">${price.toFixed(2)}</p>
          <p className={priceChange >= 0 ? "text-green-500" : "text-red-500"}>
            {priceChange >= 0 ? "+" : ""}
            {priceChange.toFixed(2)}%
          </p>
        </div>
      </div>
    </motion.div>
    </Link>
  );
};
