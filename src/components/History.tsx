import axios from 'axios';
import * as React from 'react';
import { apiConfig } from '../config/config';
import { StyledContainer, StyledHeader, StyledRow, StyledTable, StyledTableBody, StyledTitle } from '../styled-components/History';
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
        <Header section="history" />
        <StyledTitle>
          Last 24 hours best opportunities
        </StyledTitle>
        <StyledTable>
            <StyledTableBody>
                <StyledRow>
                    <StyledHeader>Pair name</StyledHeader>
                    <StyledHeader>Buy exchange</StyledHeader>
                    <StyledHeader>Sell exchange</StyledHeader>
                    <StyledHeader>Spread</StyledHeader>
                    <StyledHeader>Date & time</StyledHeader>
                </StyledRow>
                {rows}
            </StyledTableBody>
        </StyledTable>
      </StyledContainer>
    );
  }
  
}

export default History;