import * as React from 'react';
import { websocketsConfig } from './config/config';
import calculateSpread from './utils/spreadCalculator';

class TableRow extends React.Component <any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
        buyValue: 0,
        sellValue: 0,
        spreadValue: 0
    }
    this.updateSpread = this.updateSpread.bind(this);
  }

  public componentDidMount() {
    const ws = new WebSocket(websocketsConfig.exchanges);
    ws.onmessage = (response) => {
        const {
            ask: buyValue,
            bid: sellValue,
            pairName,
            exchangeName
        } = JSON.parse(response.data);

        if (pairName === this.props.pair) {
            if (exchangeName === this.props.buyExchange) {
                this.setState({
                    buyValue
                }, this.updateSpread)
            } else if (exchangeName === this.props.sellExchange) {
                this.setState({
                    sellValue
                }, this.updateSpread)
            }
        }
    };
  }

  public updateSpread() {
      if (this.state.buyValue && this.state.sellValue) {
        const spreadValue = calculateSpread(this.state.buyValue, this.state.sellValue);
        this.setState({
            spreadValue
        });
      }
  }

  public render() {
        const buyExchangeLink = `http://google.com/search?q=${this.props.buyExchange}`;
        const sellExchangeLink = `http://google.com/search?q=${this.props.sellExchange}`;
        return (
            <tr>
                <td>
                    <a target="_blank" href={buyExchangeLink}>
                        {this.props.buyExchange}
                    </a>
                </td>
                <td>
                    <a target="_blank" href={sellExchangeLink}>
                        {this.props.sellExchange}
                    </a>
                </td>
                <td>
                    {this.state.buyValue}
                </td>
                <td>
                    {this.state.sellValue}
                </td>
                <td>
                    {this.state.spreadValue}
                </td>
            </tr>
        );
    }
  
}

export default TableRow;
