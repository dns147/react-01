import Header from '../components/header/header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/footer';

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
