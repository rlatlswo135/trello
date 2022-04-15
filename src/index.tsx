import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createGlobalStyle,ThemeProvider} from 'styled-components'
import {defaultTheme} from './theme/index'
import {RecoilRoot} from 'recoil'
const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
  }
  div{
    box-sizing: border-box;
  }
  li{
    list-style: none;
  }
`
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
  <RecoilRoot>
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle/>
      <App/>
    </ThemeProvider>
  </RecoilRoot>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
