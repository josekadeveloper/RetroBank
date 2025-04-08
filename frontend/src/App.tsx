// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Home from "./pages/Home/home";

import "./index.scss";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </QueryClientProvider>
    // <Routes>
    //   <Route
    //     path="/"
    //     element={<Home user={user} onLogout={() => setUser(null)} />}
    //   />
    //   <Route path="/users" element={<UserList />} />
    //   <Route path="/history" element={<History />} />
    // </Routes>
  );
}

export default App;
