import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import EventPopup from './EventPopup';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-neumo-bg">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <EventPopup />
    </div>
  );
}
