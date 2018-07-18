import * as React from 'react';

class TableRow extends React.Component <any, any> {

  constructor(props: any) {
    super(props);

    this.state = {
        buyValue: 0,
        sellValue: 0,
        spreadValue: 0
    }

  }

  public componentDidMount() {
    const ws = new WebSocket('ws://localhost:3000');
    ws.onmessage = (response) => {
        const json = JSON.parse(response.data);
        const spread = (((json.sell * 100 / json.buy) - 100) * 100) / 100;
        this.setState({
            buyValue: json.buy,
            sellValue: json.sell,
            spreadValue: spread
        });
    };
    ws.onopen = () => {
        ws.send(`{ "pair": "${this.props.pair}", "buyExchange": "${this.props.buyExchange}", "sellExchange": "${this.props.sellExchange}" }`);
    }
    /*
    const url = `/api/ticker/${this.props.pair.replace("/", "-")}/${this.props.buyExchange}/${this.props.sellExchange}`;
    axios.get(url)
    .then((ticker: any) => {
        const buy = ticker.data.buy;
        const sell = ticker.data.sell;
        const spread = (((sell * 100 / buy) - 100) * 100) / 100;
        this.setState({
            buyValue: buy,
            sellValue: sell,
            spreadValue: spread
        });
    });
    */
  }

  public render() {
        const buyExchangeLink = `http://google.com/search?q=${this.props.buyExchange}`;
        const sellExchangeLink = `http://google.com/search?q=${this.props.sellExchange}`;
        return (
            <tr>
                <td>
                    <a target="blank" href={buyExchangeLink}>
                        {this.props.buyExchange}
                    </a>
                </td>
                <td>
                    <a target="blank" href={sellExchangeLink}>
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
