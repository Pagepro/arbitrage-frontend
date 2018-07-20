const calculateSpread = (buyValue: number, sellValue: number): number => {
    if (buyValue <= 0 || sellValue <= 0) {
        return 0;
    }
    const spread = Math.round(((sellValue * 100 / buyValue) - 100) * 100) / 100;
    return spread;
};

export default calculateSpread;