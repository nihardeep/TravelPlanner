import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import { enforceSessionValidityOrRefresh } from "./lib/session";

export default function App() {
  React.useEffect(() => {
    const checkSession = () => {
      enforceSessionValidityOrRefresh();
    };

    checkSession();
    const interval = setInterval(checkSession, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}