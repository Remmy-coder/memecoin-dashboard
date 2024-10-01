export default async function handler(req, res) {
  const COINGECKO_API = "https://api.coingecko.com/api/v3";

  try {
    const response = await fetch(
      `${COINGECKO_API}/coins/markets?vs_currency=usd&category=meme-token&order=market_cap_desc&per_page=10&page=1&sparkline=false`,
    );
    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from CoinGecko" });
  }
}
