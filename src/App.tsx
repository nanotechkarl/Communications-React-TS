import './styles/App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Welcome,
} from "./pages/index";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route>
        <Route index element={<Welcome logout={false} />} />
        <Route path="logout" element={<Welcome logout={true}/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
