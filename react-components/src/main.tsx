import React from 'react';
import ReactDOM from 'react-dom/client';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.scss';
import ErrorPage from './routes/error-page';
import HomePage from './routes/home-page';
import AboutPage from './routes/about-page';
import Forms from './routes/forms';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import store from './app/store';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="forms" element={<Forms />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
