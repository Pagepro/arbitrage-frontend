const config: any = {
    get websocketBase () {
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
    
        return `${protocol}//${window.location.host}`
    }
}

const apiConfig = {
    config: '/api/config',
    history: '/api/history'
}

const websocketsConfig = {
    exchanges: `${config.websocketBase}/ws/exchanges`
}

const marketsConfig = {
    Binance: {
        marketLink (pair: string) {
            return `https://www.binance.com/trade.html?symbol=${pair.replace("/", "_")}`;
        }
    },
    Bitfinex: {
        marketLink (pair: string) {
            return `https://cryptowat.ch/markets/bitfinex/${pair.split("/")[0]}/${pair.split("/")[1]}`;
        }
    },
    Bitstamp: {
        marketLink (pair: string) {
            return `https://cryptowat.ch/markets/bitstamp/${pair.split("/")[0]}/${pair.split("/")[1]}`;
        }
    },
    Bittrex: {
        marketLink (pair: string) {
            return `https://bittrex.com/Market/Index?MarketName=${pair.split("/")[1]}-${pair.split("/")[0]}`;
        }
    },
    GDAX: {
        marketLink (pair: string) {
            return `https://pro.coinbase.com/trade/${pair.replace("/", "-")}`;
        }
    },
    OKEx: {
        marketLink (pair: string) {
            return `https://www.okex.com/market?product=${pair.split("/")[0].toLowerCase()}-${pair.split("/")[1].toLowerCase()}`;
        }
    },
    Poloniex: {
        marketLink (pair: string) {
            return `https://poloniex.com/exchange#${pair.split("/")[1]}_${pair.split("/")[0]}`;
        }
    },

}

export {
    apiConfig,
    marketsConfig,
    websocketsConfig
};