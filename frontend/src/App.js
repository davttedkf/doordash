import React from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import HomePage from './components/HomePage';
import RestaurantPage from './components/RestaurantPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import OrderTrackingPage from './components/OrderTrackingPage';
import OrdersPage from './components/OrdersPage';
import LoginPage from './components/LoginPage';
import DasherPage from './components/DasherPage';
import SearchPage from './components/SearchPage';
import AccountPage from './components/AccountPage';
import CategoriesPage from './components/CategoriesPage';
import { Toaster } from './components/ui/toaster';

// Layout component that conditionally shows header
const Layout = ({ children }) => {
  const location = useLocation();
  const noHeaderRoutes = ['/login', '/cart', '/checkout', '/dasher', '/account'];
  const hideHeader = noHeaderRoutes.some(route => location.pathname.startsWith(route)) || 
                     location.pathname.startsWith('/order/') ||
                     location.pathname.startsWith('/restaurant/');

  return (
    <>
      {!hideHeader && <Header />}
      {children}
      <Toaster />
    </>
  );
};

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="App">
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/restaurant/:id" element={<RestaurantPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order/:orderId" element={<OrderTrackingPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dasher" element={<DasherPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/pickup" element={<HomePage />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;