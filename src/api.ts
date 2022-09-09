const BASE_URL = "https://api.coinpaprika.com/v1"
const NICO_URL = "https://ohlcv-api.nomadcoders.workers.dev?coinId="

export async function fetchCoins() {
    return await (await fetch(`${BASE_URL}/coins`)).json();
}

export async function fetchCoinInfo(coinId?: string) {
    const infoData = await (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
    const tickerData = await (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
    return {infoData, tickerData};
}

export async function fetchCoinHistory(coinId?: string) {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - (60 * 60 * 24 * 7);

    return await (await fetch(`${NICO_URL}${coinId}`)).json();

}