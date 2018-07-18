import * as React from 'react';
import PairTable from './PairTable';

import axios from 'axios';

class Dashboard extends React.Component <any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      config: [{"pair":"ETH/BTC","exchanges":["Binance","Bitfinex","Bitstamp","Bittrex","Poloniex","OKEx","GDAX"]},{"pair":"XLM/BTC","exchanges":["Binance","Bitfinex","Bittrex","OKEx"]},{"pair":"NEO/BTC","exchanges":["Binance","Bitfinex","Bittrex","OKEx"]},{"pair":"NEO/ETH","exchanges":["Binance","Bitfinex","Bittrex","OKEx"]},{"pair":"EOS/BTC","exchanges":["Binance","Bitfinex","OKEx"]},{"pair":"EOS/ETH","exchanges":["Binance","Bitfinex","OKEx"]}]
    };
  }

  public componentDidMount() {
    axios.get("/api/config")
    .then(({ data }: { data: any }) => data)
    .then((exchangesConfig: any) => {
        this.setState({
            config: exchangesConfig
        })
    });
  }

  public render() {
    let config = this.state.config;
    config = config.map((item: any, index: any)=>{
        return(
            <PairTable pair={item.pair} exchanges={item.exchanges} key={index} />
        );
    });
    return (
        <div>
            {config}
        </div>
    );
  }
  
}

export default Dashboard;
