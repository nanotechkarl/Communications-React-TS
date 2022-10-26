import './styles/App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Welcome, Login
} from "./pages/index";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route>
        <Route index element={<Welcome logout={false} />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Welcome logout={true}/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
