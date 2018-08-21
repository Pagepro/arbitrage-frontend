import * as React from 'react';
import { marketsConfig } from '../config/config';
import { getBuyOrderQuantity, getBuyOrderValue, getSellOrderValue } from '../utils/ordesValuesCalculator';
import calculateSpread from '../utils/spreadCalculator';

interface IProps {
    buyExchange: string,
    sellExchange: string,
    id: string,
    pair: string,
    coins: number,
    btcValue: number,
    ethValue: number
}

interface IState {
    buyValue: number,
    justUpdated: boolean,
    sellValue: number,
    spreadValue: number,
    orderProfitValue: number
}

class TableRow extends React.Component<IProps, IState> {

    private timeout: any;
    private isComponentMounted: boolean;

    constructor(props: any) {
        super(props);

        this.state = {
            buyValue: 0,
            justUpdated: false,
            orderProfitValue: 0,
            sellValue: 0,
            spreadValue: 0
        }

        this.clearState = this.clearState.bind(this);
        this.updateSpread = this.updateSpread.bind(this);
        this.updateProfitValue = this.updateProfitValue.bind(this);
    }

    public componentDidMount() {
        window.addEventListener('websocketMessage',this.handleWebsocketMessage);
        this.isComponentMounted = true;
    }

    public componentWillUnmount() {
        window.removeEventListener('websocketMessage',this.handleWebsocketMessage);
    }

    public handleWebsocketMessage = (ticker: any) => {

        const {
            ask: buyValue,
            bid: sellValue,
            pairName,
            exchangeName
        } = ticker.detail;

        if (pairName === this.props.pair) {
            
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.clearState, 10000);

            if (exchangeName === this.props.buyExchange || exchangeName === this.props.sellExchange) {

                this.setState(exchangeName === this.props.buyExchange ?
                    {
                        buyValue,
                        justUpdated: true,
                        sellValue: this.state.sellValue,
                        spreadValue: this.state.spreadValue
                    } :
                    {
                        buyValue: this.state.buyValue,
                        justUpdated: true,
                        sellValue,
                        spreadValue: this.state.spreadValue
                    }, () => {
                        this.updateSpread();
                        this.updateProfitValue();
                        setTimeout(() => {
                            if (this.isComponentMounted) {
                                this.setState({
                                    justUpdated: false
                                });
                            }
                        }, 2000);
                    }
                );
            }
        }
    }

    public clearState() {
        if (this.isComponentMounted) {
            this.setState({
                buyValue: 0,
                justUpdated: false,
                sellValue: 0,
                spreadValue: 0
            });
        }
    }

    public updateSpread() {
        if (this.state.buyValue && this.state.sellValue) {
            const spreadValue = calculateSpread(this.state.buyValue, this.state.sellValue);
            this.setState({
                spreadValue
            });
        }
    }

    public updateProfitValue() {
        if (this.state.buyValue <= 0 || this.state.sellValue <= 0) {    
            this.setState({
                orderProfitValue: 0
            });
        } else {
            const sellOrderValue = getSellOrderValue(this.state.sellValue, this.props.coins, this.props.sellExchange);
            const buyOrderValue = getBuyOrderValue(this.props.pair, this.props.buyExchange, this.props.coins, this.state.buyValue);
            const orderProfitValue = sellOrderValue - buyOrderValue;
            this.setState({
                orderProfitValue
            });
        }
    }

    public getSpreadValueCellClass() {
        const {
            spreadValue
        } = this.state

        if (spreadValue === 0) {
            return '';
        }

        return spreadValue > 0 ? 'positive' : 'negative';
    }

    public render() {
        const buyExchangeLink = marketsConfig[this.props.buyExchange].marketLink(this.props.pair);
        const sellExchangeLink = marketsConfig[this.props.sellExchange].marketLink(this.props.pair);
        const [
            firstCurrency,
            secondCurrency
        ] = this.props.pair.split("/");
        
        const {
            orderProfitValue
        } = this.state;
        
        const PLNValue = secondCurrency === 'BTC'
            ? (orderProfitValue * this.props.btcValue).toFixed(2)
            : (orderProfitValue * this.props.ethValue).toFixed(2);
        
        return (
            <tr className={this.state.justUpdated ? 'updated' : ''} id={this.props.id}>
                <td>
                    <a target='_blank' href={buyExchangeLink}>
                        {this.props.buyExchange}
                    </a>
                </td>
                <td>
                    <a target='_blank' href={sellExchangeLink}>
                        {this.props.sellExchange}
                    </a>
                </td>
                <td>
                    {this.state.buyValue} {secondCurrency}
                </td>
                <td>
                    {this.state.sellValue} {secondCurrency}
                </td>
                <td className={this.getSpreadValueCellClass()}>
                    {this.state.spreadValue}%
                </td>
                <td>
                    {getBuyOrderQuantity(this.props.pair, this.props.buyExchange, this.props.coins).toFixed(6)} {firstCurrency}
                </td>
                <td>
                    {this.props.coins.toFixed(6)} {firstCurrency}
                </td>
                <td>
                    { orderProfitValue !== 0
                        ? orderProfitValue > 0
                            ? `${orderProfitValue.toFixed(8)} ${secondCurrency} / ${PLNValue} PLN (PROFIT)`
                            : `${orderProfitValue.toFixed(8)} ${secondCurrency} / ${PLNValue} PLN (LOSS)`
                        : `${orderProfitValue}`
                    }
                </td>
            </tr>
        );
    }

}

export default TableRow;
