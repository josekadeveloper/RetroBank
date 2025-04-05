import { useState } from "react";

import Login from "./pages/Login/login";
import Home from "./pages/Home/home";

function App() {
  const [user, setUser] = useState<string | null>(null);

  return user ? (
    <Home user={user} onLogout={() => setUser(null)} />
  ) : (
    <Login onLogin={setUser} />
  );
}

export default App;
