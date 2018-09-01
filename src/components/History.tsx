import axios from 'axios';
import * as React from 'react';
import { apiConfig } from '../config/config';
import { AppInner, Heading, StyledContainer, Table, TableBody, TableHeader } from '../styled-components/Global';
import Header from './Header';
import HistoryTableRow from './HistoryTableRow';

interface IState {
  config: object[]
}

class History extends React.Component <{}, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      config: []
    };
  }

  public componentDidMount() {
    axios.get(apiConfig.config)
    .then(({ data }: { data: any }) => data)
    .then((exchangesConfig: any) => {
        this.setState({
            config: exchangesConfig
        })
    });
  }

  public render() {
    const {
        config
    } = this.state;
    const rows = config.map(({ pair }: { pair: string }) =>
        <HistoryTableRow key={pair+"-history"} pair={pair} />
    );

    return (
      <StyledContainer>
        <AppInner>
          <Header section="history" />
          <Heading>
            Last 24 hours best arbitrage opportunities
          </Heading>
          <Table>
              <TableBody>
                  <tr>
                      <TableHeader>Pair name</TableHeader>
                      <TableHeader>Buy exchange</TableHeader>
                      <TableHeader>Sell exchange</TableHeader>
                      <TableHeader>Spread</TableHeader>
                      <TableHeader>Date & time</TableHeader>
                  </tr>
                  {rows}
              </TableBody>
          </Table>
        </AppInner>
      </StyledContainer>
    );
  }
}

export default History;