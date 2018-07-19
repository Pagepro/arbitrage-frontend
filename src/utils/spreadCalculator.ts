const calculateSpread = (buyValue: number, sellValue: number): number => {
    if (buyValue === 0) {
        return 0;
    }
    let spread = (sellValue * 100 / buyValue) - 100;
    spread = Math.round(spread * 100) / 100;
    return spread;
};

export default calculateSpread;