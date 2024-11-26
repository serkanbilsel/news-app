// src/App.tsx

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NewsList from "./pages/NewsList";
import ArticleDetail from "./pages/ArticleDetail";
import CategorySelector from "./components/CategorySelector";
import Footer from "./components/Footer";
import HeaderBar from "./components/HeaderBar";
import LivePage from "./pages/LivePage";
import { requestPermissionAndGetToken } from "./services/firebaseMessaging"; // Import ettik

const App: React.FC = () => {
  const [category, setCategory] = useState<string>("technology");

  useEffect(() => {
    // Bildirim izni alınıyor ve token alınıyor
    requestPermissionAndGetToken();
  }, []);

  return (
    <Router>
      <HeaderBar />
      <CategorySelector onSelect={setCategory} />
      <Routes>
        <Route path="/" element={<NewsList selectedCategory={category} />} />
        <Route path="/article/:id" element={<ArticleDetail />} />
        <Route path="/live" element={<LivePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
