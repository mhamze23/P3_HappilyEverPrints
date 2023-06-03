import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Layout from './components/Layout';
import Home from './pages/Home';
import Help from './pages/Help/Help';
import Login from './pages/Login/Login';
import Logout from './pages/Login/Logout';
import Signup from './pages/Login/Signup';
import Cart from './pages/Cart/Cart';
import Profile from './pages/Profile/Profile';

import { StoreProvider } from './utils/GlobalState';
import './App.scss';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <ScrollToTop />
        <>
          <StoreProvider>
            <Routes>

              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="*" element={<Home />} />
                <Route path="/help" element={<Help />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

            </Routes>
          </StoreProvider>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
