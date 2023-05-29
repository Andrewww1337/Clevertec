import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Footer } from './components/footer';
import { Header } from './components/header';
import { Layout } from './components/layout';
import { LayoutMenu } from './components/layout-menu-component';
import { Auth } from './pages/auth';
import { BookPage } from './pages/book';
import { ContractPage } from './pages/contract-page';
import { ForgotPass } from './pages/forgot-pass';
import { MainPage } from './pages/main';
import { Register } from './pages/register';
import { RulesPage } from './pages/rules-page';
import { store } from './redux/store';

import './index.css';
import { Profile } from './pages/profile';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HashRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route element={<LayoutMenu />}>
            <Route path='/' element={<Navigate to='/books/all' />} />
            <Route path='/books/:category' element={<MainPage />} />
            <Route path='/rules' element={<RulesPage />} />
            <Route path='/contract' element={<ContractPage />} />
          </Route>
          <Route path='/books/:category/:bookId' element={<BookPage />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/auth' element={<Auth />} />
        <Route path='/registration' element={<Register />} />
        <Route path='/forgot-pass' element={<ForgotPass />} />
      </Routes>
    </Provider>
  </HashRouter>
);
