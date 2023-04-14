import { Navigate, Route, Routes } from 'react-router-dom';
import Header from '../components/header/header';
import HomePage from '../routes/home-page';
import AboutPage from '../routes/about-page';
import Forms from '../routes/forms';
import ErrorPage from '../routes/error-page';
import Footer from '../components/footer/footer';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="home" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="forms" element={<Forms />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
