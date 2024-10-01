import { useEffect, useState } from "react";

interface Memecoin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
}

export default function MemecoinTable() {
  const [memecoins, setMemecoins] = useState<Memecoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = `/api/memecoins`

  useEffect(() => {
    const fetchMemecoins = async () => {
      try {
        const response = await fetch(
          apiUrl
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMemecoins(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch memecoin data');
        setLoading(false);
      }
    };

    fetchMemecoins();
  }, []);

  if (loading) return <p>Loading memecoin data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (USD)</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {memecoins.length > 0 ? memecoins.map((coin) => (
            <tr key={coin.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img className="h-8 w-8 rounded-full mr-3" src={coin.image} alt={coin.name} />
                  <div className="text-sm font-medium text-gray-900">{coin.name}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{coin.symbol.toUpperCase()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${coin.current_price.toFixed(6)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${coin.market_cap.toLocaleString()}</td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm ${coin.price_change_percentage_24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
}
