import * as React from 'react';
import TableRow from './TableRow';

class PairTable extends React.Component <any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    const exchanges = this.props.exchanges;
    const exchangesPairs = [];
    for (let i = 0; i < exchanges.length; i++) {
        for (let j = i + 1; j < exchanges.length; j++) {
            exchangesPairs.push({buyExchange: exchanges[i], sellExchange: exchanges[j]});
            exchangesPairs.push({buyExchange: exchanges[j], sellExchange: exchanges[i]});
        }
    }
    const exchangesRows = exchangesPairs.map((item: any, index: any)=>{
        const tableRowKey = `${this.props.pair}${item.buyExchange}${item.sellExchange}`;
        return(
            <TableRow pair={this.props.pair} buyExchange={item.buyExchange} sellExchange={item.sellExchange} key={tableRowKey} />
        );
    });
    return (
        <div>
            <header>
                <h1>{this.props.pair}</h1>
            </header>
            <table>
                <tbody>
                    <tr>
                        <th colSpan={2}>Exchanges</th>
                        <th colSpan={3}>Prices</th>
                    </tr>
                    <tr>
                        <th>Buy</th>
                        <th>Sell</th>
                        <th>Buy</th>
                        <th>Sell</th>
                        <th>Spread</th>
                    </tr>
                    {exchangesRows}
                </tbody>
            </table>
        </div>
    );
  }
  
}

export default PairTable;
