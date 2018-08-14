import axios from 'axios';
import * as React from 'react';
import { apiConfig } from '../config/config';
import { websocketsConfig } from '../config/config';
import dispatchGlobalEvent from '../utils/dispatchGlobalEvent';
import Header from './Header';
import PairTable from './PairTable';

interface IState {
  config: object[],
  BTCtoPLN: number,
  ETHtoPLN: number
}

class Dashboard extends React.Component <{}, IState> {

  private webSocket: WebSocket;
  private isComponentMounted: boolean;

  constructor(props: any) {
    super(props);

    this.state = {
      BTCtoPLN: 27000,
      ETHtoPLN: 1600,
      config: []
    };

    this.createWebsocket = this.createWebsocket.bind(this);

    this.updateBTCValue = this.updateBTCValue.bind(this);
    this.updateETHValue = this.updateETHValue.bind(this);
  }

  public componentDidMount() {
    this.isComponentMounted = true;

    axios.get(apiConfig.config)
    .then(({ data }: { data: any }) => data)
    .then((exchangesConfig: any) => {
        this.setState({
            config: exchangesConfig
        });
    });

    this.createWebsocket();
  }

  public componentWillUnmount() {
    this.isComponentMounted = false;
    this.webSocket.close();
  }

  public createWebsocket = () => {
    this.webSocket = new WebSocket(websocketsConfig.exchanges);

    this.webSocket.onmessage = (response) => {
        const ticker = JSON.parse(response.data);
        dispatchGlobalEvent('websocketMessage', {
          detail: ticker
        });
    };

    this.webSocket.onclose = () => {
        if (this.isComponentMounted) {
            this.createWebsocket();
        }
    };
  }

  public updateBTCValue(event: any) {
    this.setState({
      BTCtoPLN: event.target.value
    });
  }

  public updateETHValue(event: any) {
    this.setState({
      ETHtoPLN: event.target.value
    });
  }

  public render() {
    const {
        config
    } = this.state;
    const tables = config.map(({ pair, exchanges }: { pair: string, exchanges: any }) =>
        <PairTable
          key={pair}
          pair={pair}
          exchanges={exchanges}
          btcValue={this.state.BTCtoPLN}
          ethValue={this.state.ETHtoPLN}
        />
    );
    return (
      <div>
        <Header section="dashboard" />
        <span>
          <strong>BTC/PLN price:</strong><input type="number" min="1" step="1" value={this.state.BTCtoPLN} onChange={this.updateBTCValue} />
        </span>
        <span className="ethValue">
          <strong>ETH/PLN price:</strong><input type="number" min="1" step="1" value={this.state.ETHtoPLN} onChange={this.updateETHValue} />
        </span>
        {tables}
      </div>
    );
  }
  
}

export default Dashboard;