import styled from 'styled-components';

export const DashboardDiv = styled.div`
    box-sizing: border-box;
    background-color: #ddd;
    overflow-x: hidden;
    padding: 10px;
    width: 100vw;
`;

export const HistoryDiv = styled.div`
    box-sizing: border-box;
    background-color: #ddd;
    overflow-x: hidden;
    padding: 10px;
    width: 100vw;
    height: 100vh
`;

export const HeaderDiv = styled.div`
    align-items: center;
    display: flex;
`;

export const HeaderHeader = styled.header`
    color: #000;
    cursor: pointer;
    display: inline-block;
    font-size: 48px;
    font-weight: bold;
`;

export const HeaderNav = styled.span`
    color: #337ab7;
    font-style: italic;
    margin-left: 20px;
    text-decoration: none;
`;

export const PairTableHeader = styled.h1`
    margin: 20px 0 5px;
    color: #333;
    font-size: 28px;
`;

export const Table = styled.table`
    border-collapse: collapse;
    border: 2px solid #000;
    font-size: 16px;
`;

export const DashboardTableRow = styled.tr`
    width: 50vw;
`;

export const TableHeader = styled.th`
    background-color: #bbb;
    width: 10vw;
    border: 2px solid #000;
    margin: 0;
    padding: 5px;
`;

export const TableData = styled.td`
    text-align: center;
    font-size: 14px;
    width: 10vw;
    margin: 0;
    padding: 5px;
    border-style: solid;
    border-color: #000;
    border-width: 1px 2px;
`;

export const HistoryHeader = styled.header`
    margin: 20px;
`;

export const HistoryTablePair = styled.td`
    font-weight: bold;
    text-align: center;
    font-size: 16px;
    width: 10vw;
    margin: 0;
    padding: 5px;
    border-style: solid;
    border-color: #000;
    border-width: 1px 2px;
`;

export const Input = styled.input`
    text-align: center;
    margin: 5px;
    padding: 5px;
    width: 100px;
`;

export const TableLink = styled.a`
    color: #003673;
    text-decoration: none;
    font-style: italic;
`