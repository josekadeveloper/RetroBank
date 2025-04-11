import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Login = lazy(() => import("./pages/Login/login"));
const Register = lazy(() => import("./pages/Register/register"));
const Home = lazy(() => import("./pages/Home/home"));
const History = lazy(() => import("./pages/History/history"));

import "./index.scss";
import NotFound from "./pages/NotFound/not-found";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="terminal">Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history/:username" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
