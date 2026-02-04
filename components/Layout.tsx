import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center group">
              <i className="fa-solid fa-hotel text-primary text-2xl mr-3 group-hover:scale-110 transition-transform"></i>
              <span className="text-xl font-bold text-slate-800 tracking-tight">Coimbatore Hotels</span>
            </Link>
            <nav className="flex space-x-4">
               <Link to="/" className="text-sm font-medium text-slate-500 hover:text-primary transition-colors">
                  All Hotels
               </Link>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-grow bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Coimbatore Hotels. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;