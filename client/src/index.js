import './index.css';
import './css/style.scss';
import './css/layout.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
const cache = new InMemoryCache({
      dataIdFromObject: object => `${object.__typename}:${object._id}`,
      typePolicies: {  
      }
})
const BACKEND_LOCATION = 'http://localhost:4000/graphql';

const client = new ApolloClient({
  uri: BACKEND_LOCATION,
  connectToDevTools: true,
  credentials: 'include',
  cache: cache,
});

ReactDOM.render(
  <React.StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

