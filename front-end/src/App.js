import { BrowserRouter, Routes, Route } from "react-router-dom";

// Home.
import Home from "./apps/home/Home";

// Auth.
import Login from "./apps/auth/Login";
import Register from "./apps/auth/Register";
import Reset from "./apps/auth/Reset";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
