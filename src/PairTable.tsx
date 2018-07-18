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
        return(
            <TableRow pair={this.props.pair} buyExchange={item.buyExchange} sellExchange={item.sellExchange} key={index} />
        );
    });
    return (
        <div>
            <h1>{this.props.pair}</h1>
            <table>
                <tr>
                    <th>Buy</th>
                    <th>Sell</th>
                    <th>Buy</th>
                    <th>Sell</th>
                    <th>Spread</th>
                </tr>
                {exchangesRows}
            </table>
        </div>
    );
  }
  
}

export default PairTable;
