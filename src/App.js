import React, { useState } from "react";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";

// Simple routing without external dependencies
const routes = {
  "/": Home,
  "/search": ComingSoon,
};

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Listen for browser navigation
  React.useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const CurrentComponent = routes[currentPath] || Home;

  return <CurrentComponent navigate={navigate} />;
}