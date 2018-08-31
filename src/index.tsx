import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import App from './App';
import './index.css';

export const globalStyles = injectGlobal`
  body {
    overflow-x: hidden;
  }
`;

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
