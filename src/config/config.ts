const envWebsocketDomain = process.env.REACT_APP_WEBSOCKET_DOMAIN
const envWebsocketProcotcol = process.env.REACT_APP_WEBSOCKET_PROTOCOL

const config: any = {
    get websocketBase () {
        const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"

        return `${envWebsocketProcotcol || protocol}//${envWebsocketDomain || window.location.host}`
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
        makerFee: 0.001,
        marketLink: (pair: string) => `https://www.binance.com/trade.html?symbol=${pair.replace("/", "_")}`,
        takerFee: 0.001,
        upfrontFee: false,
        withdrawals: {
            BTC: 0.0005,
            EOS: 0.05,
            ETH: 0.01,
            NEO: 0,
            XLM: 0.01
        }
    },
    Bitfinex: {
        makerFee: 0.001,
        marketLink: (pair: string) => `https://www.bitfinex.com/`,
        takerFee: 0.002,
        upfrontFee: false,
        withdrawals: {
            BTC: 0.0004,
            EOS: 0,
            ETH: 0.0027,
            NEO: 0,
            XLM: 0
        }
    },
    Bitstamp: {
        makerFee: 0.0025,
        marketLink: (pair: string) => `https://www.bitstamp.net/`,
        takerFee: 0.0025,
        upfrontFee: false,
        withdrawals: {
            BTC: 0,
            EOS: 0,
            ETH: 0,
            NEO: 0,
            XLM: 0
        }
    },
    Bittrex: {
        makerFee: 0.0025,
        marketLink: (pair: string) => `https://bittrex.com/Market/Index?MarketName=${pair.split("/")[1]}-${pair.split("/")[0]}`,
        takerFee: 0.0025,
        upfrontFee: true,
        withdrawals: {
            BTC: 0.0005,
            EOS: 0,
            ETH: 0.006,
            NEO: 0.025,
            XLM: 0.01
        }
    },
    GDAX: {
        makerFee: 0,
        marketLink: (pair: string) => `https://pro.coinbase.com/trade/${pair.replace("/", "-")}`,
        takerFee: 0.003,
        upfrontFee: false,
        withdrawals: {
            BTC: 0,
            EOS: 0,
            ETH: 0,
            NEO: 0,
            XLM: 0
        }
    },
    OKEx: {
        makerFee: 0.0015,
        marketLink: (pair: string) => `https://www.okex.com/market?product=${pair.split("/")[0].toLowerCase()}-${pair.split("/")[1].toLowerCase()}`,
        takerFee: 0.002,
        upfrontFee: false,
        withdrawals: {
            BTC: 0.0005,
            EOS: 0,
            ETH: 0.01,
            NEO: 0,
            XLM: 0
        }
    },
    Poloniex: {
        makerFee: 0.001,
        marketLink: (pair: string) => `https://poloniex.com/exchange#${pair.split("/")[1]}_${pair.split("/")[0]}`,
        takerFee: 0.002,
        upfrontFee: false,
        withdrawals: {
            BTC: 0.0005,
            EOS: 0,
            ETH: 0.01,
            NEO: 0,
            XLM: 0.00001
        }
    },

}

export {
    apiConfig,
    marketsConfig,
    websocketsConfig
};