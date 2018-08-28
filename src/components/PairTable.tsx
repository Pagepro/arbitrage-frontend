import * as React from 'react';
import TableRow from './TableRow';

interface IProps {
    exchanges: string[],
    pair: string
}

interface IState {
    coins: number;
}

class PairTable extends React.Component<IProps, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            coins: 1000
        }

        this.updateCoins = this.updateCoins.bind(this);
    }

    public generateExchangePair(exchanges: string[]): object[] {
        const exchangesPairs = [];
        for (const firstExchange of exchanges) {
            for (const secondExchange of exchanges) {
                if (firstExchange !== secondExchange) {
                    exchangesPairs.push({ buyExchange: firstExchange, sellExchange: secondExchange });
                }
            }
        }
        return exchangesPairs;
    }

    public updateCoins(event: any) {
        this.setState({
            coins: parseInt(event.target.value, 10)
        });
    }

    public render() {
        const {
            exchanges
        } = this.props
        const exchangesPairs = this.generateExchangePair(exchanges);
        const exchangesRows = exchangesPairs.map((item: any, index: any) => {
            const tableRowKey = `${this.props.pair}${item.buyExchange}${item.sellExchange}`;
            return (
                <TableRow
                    pair={this.props.pair}
                    buyExchange={item.buyExchange}
                    sellExchange={item.sellExchange}
                    coins={this.state.coins}
                    key={tableRowKey}
                    id={tableRowKey}
                />
            );
        });

        return (
            <div>
                <header>
                    <h1>{this.props.pair}</h1><br/>
                    <strong>Coins:</strong> 
                    <input type="number" min="1" step="1" value={this.state.coins} onChange={this.updateCoins} />
                    {this.props.pair.split("/")[0]}
                </header>
                <table>
                    <tbody>
                        <tr>
                            <th colSpan={2}>Exchanges</th>
                            <th colSpan={3}>Prices</th>
                            <th colSpan={3}>Order sizes</th>
                        </tr>
                        <tr>
                            <th>Buy</th>
                            <th>Sell</th>
                            <th>Buy</th>
                            <th>Sell</th>
                            <th>Spread</th>
                            <th>Buy</th>
                            <th>Sell</th>
                            <th>Profit / Loss</th>
                        </tr>
                        {exchangesRows}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default PairTable;
