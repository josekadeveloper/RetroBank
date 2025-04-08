import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/login";
import Register from "./pages/Register/register";
import Home from "./pages/Home/home";
import History from "./pages/History/history";
import UserList from "./pages/Users/user-list";

import "./index.scss";

function App() {
  const [user, setUser] = useState<string | null>(null);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register onRegister={setUser} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<Home user={user} onLogout={() => setUser(null)} />}
      />
      <Route path="/users" element={<UserList />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;
