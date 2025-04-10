import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Home from "./pages/Home/home";
import History from "./pages/History/history";

import "./index.scss";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history/:username" element={<History />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
