import axios from 'axios';
import * as React from 'react';
import { apiConfig } from '../config/config';
import { websocketsConfig } from '../config/config';
import dispatchGlobalEvent from '../utils/dispatchGlobalEvent';
import { DashboardDiv } from '../utils/styledComponents';
import Header from './Header';
import PairTable from './PairTable';

interface IState {
  config: object[]
}

class Dashboard extends React.Component <{}, IState> {

  private webSocket: WebSocket;
  private isComponentMounted: boolean;

  constructor(props: any) {
    super(props);

    this.state = {
      config: []
    };

    this.createWebsocket = this.createWebsocket.bind(this);
    this.updateCurrencyValues = this.updateCurrencyValues.bind(this);
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

  public updateCurrencyValues(fieldName: string) {
    return (event: any) => {
      const stateObject = {};
      stateObject[fieldName] = event.target.value;
      this.setState(stateObject);
    }
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
        />
    );
    return (
      <DashboardDiv>
        <Header section="dashboard" />
        {tables}
      </DashboardDiv>
    );
  }
  
}

export default Dashboard;