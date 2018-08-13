import { marketsConfig } from "../config/config";

const getBuyOrderQuantity = (pair: string, exchange: string, coins: number) => {

    const currency = pair.split("/")[0];
    const withdrawal = marketsConfig[exchange].withdrawals[currency];
    const takerFee = marketsConfig[exchange].takerFee;

    const value = takerFee ? coins : (1 + takerFee) * coins;

    return value + withdrawal;
}

const getSellOrderValue = (sellPrice: number, coins: number, exchange: string) => {
    const sellValue = sellPrice * coins;
    const takerFee = marketsConfig[exchange].takerFee;
    const sellFee = sellValue * takerFee;
    return sellValue - sellFee;
}

const getBuyOrderValue = (pair: string, exchange: string, coins: number, buyPrice: number) => {
    const buyOrderQuantity = getBuyOrderQuantity(pair, exchange, coins);
    return buyOrderQuantity * buyPrice;
}

export {
    getBuyOrderQuantity,
    getSellOrderValue,
    getBuyOrderValue
};