import Head from 'next/head';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import React from 'react';
import { Normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import createStore from '@redux/store';
import useLocation from 'src/hooks/geolocation';
import { colors, spaces } from '@styles/index';

const queryCache = new QueryCache();

const GlobalStyle = createGlobalStyle`
  html{
      font-size:14px;
      font-family: 'Roboto', sans-serif;
  }
  h1{
      margin:0px;
      font-size: 4rem;
  }
  h2{
      margin:0px;
      font-size: 3rem;
  }
  h3{
      font-size: 1rem;
  }
  .contrast_text{
      color: ${colors.white}
  }
  input{
    font-size:18px;
    padding:10px 10px 10px 5px;
    display:block;
    border:none;
    border-bottom:1px solid #757575;
  }
  button{
    position: relative;

    display: block;
    padding: ${spaces.small}px 0px;

    overflow: hidden;

    border-width: 0;
    outline: none;
    border-radius: 6px;

    background-color: ${colors.yellow};
    color: #ecf0f1;

    transition: background-color .3s;
  }
`;

const { persistor, store } = createStore();

export default function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <ReactQueryCacheProvider queryCache={queryCache}>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="manifest" href="/manifest.json" />
                </Head>
                <Normalize />
                <GlobalStyle />
                <PersistGate loading={null} persistor={persistor}>
                    <Component {...pageProps} />
                </PersistGate>
            </ReactQueryCacheProvider>
        </Provider>
    );
}
