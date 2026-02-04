import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import BusinessList from './components/BusinessList';
import BusinessDetail from './components/BusinessDetail';
import { BUSINESS_DATA } from './data';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<BusinessList data={BUSINESS_DATA} />} />
          <Route path="/business/:id" element={<BusinessDetail data={BUSINESS_DATA} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
