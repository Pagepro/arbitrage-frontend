import * as React from 'react';
import { marketsConfig, websocketsConfig } from '../config/config';
import calculateSpread from '../utils/spreadCalculator';

interface IProps {
    buyExchange: string,
    sellExchange: string,
    pair: string
}

interface IState {
    buyValue: number,
    justUpdated: boolean,
    sellValue: number,
    spreadValue: number
}

class TableRow extends React.Component <IProps, IState> {

    private ws: WebSocket;
    private timeout: any;

  constructor(props: any) {
    super(props);

    this.state = {
        buyValue: 0,
        justUpdated: false,
        sellValue: 0,
        spreadValue: 0
    }
    
    this.clearState = this.clearState.bind(this);
    this.updateSpread = this.updateSpread.bind(this);
  }

  public componentDidMount() {
    this.createWebsocket();
  }

  public componentWillUnmount() {
    this.ws.close();
  }

  public createWebsocket = () => {
    this.ws = new WebSocket(websocketsConfig.exchanges);
    this.ws.onmessage = (response) => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(this.clearState, 10000);

        const {
            ask: buyValue,
            bid: sellValue,
            pairName,
            exchangeName
        } = JSON.parse(response.data);

        if (pairName === this.props.pair) {

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
                        setTimeout(() => {
                            this.setState({
                                justUpdated: false
                            });
                        }, 3000);
                    }
                );
            }
        }
    };
    this.ws.onclose = () => {
        this.createWebsocket();
    };
  }

  public clearState() {
    this.setState({
        buyValue: 0,
        justUpdated: false,
        sellValue: 0,
        spreadValue: 0
    });
  }

  public updateSpread() {
      if (this.state.buyValue && this.state.sellValue) {
        const spreadValue = calculateSpread(this.state.buyValue, this.state.sellValue);
        this.setState({
            spreadValue
        });
      }
  }

  public getSpreadValueCellClass () {
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
        return (
            <tr className={this.state.justUpdated ? 'updated' : ''}>
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
                    {this.state.buyValue}
                </td>
                <td>
                    {this.state.sellValue}
                </td>
                <td className={this.getSpreadValueCellClass()}>
                    {this.state.spreadValue}%
                </td>
            </tr>
        );
    }
  
}

export default TableRow;
