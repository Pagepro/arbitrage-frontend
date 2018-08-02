import * as React from 'react';
import TableRow from './TableRow';

interface IProps {
    exchanges: string[],
    pair: string
}

class PairTable extends React.Component <IProps, {}> {

  constructor(props: any) {
    super(props);
  }

  public generateExchangePair(exchanges: string[]): object[] {
    const exchangesPairs = [];
    for (const firstExchange of exchanges) {
        for (const secondExchange of exchanges) {
            if (firstExchange !== secondExchange) {
                exchangesPairs.push({buyExchange: firstExchange, sellExchange: secondExchange});
                exchangesPairs.push({buyExchange: secondExchange, sellExchange: firstExchange});
            }
        }
    }
    return exchangesPairs;
  }

  public render() {
    const {
        exchanges
    } = this.props
    const exchangesPairs = this.generateExchangePair(exchanges);
    const exchangesRows = exchangesPairs.map((item: any, index: any)=>{
        const tableRowKey = `${this.props.pair}${item.buyExchange}${item.sellExchange}`;
        return(
            <TableRow 
                pair={this.props.pair} 
                buyExchange={item.buyExchange} 
                sellExchange={item.sellExchange} 
                key={tableRowKey} 
            />
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
