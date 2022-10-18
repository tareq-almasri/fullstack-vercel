import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Orders from "./components/Orders/Orders";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>header</header>
        <NavLink to="/register">register</NavLink>
        <br/>
        <NavLink to="login">login</NavLink>
      </div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
