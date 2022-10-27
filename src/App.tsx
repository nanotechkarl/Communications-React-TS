import './styles/App.scss';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Welcome, Login, LoginSuccess, Register, RegisterSuccess, Users, GroupChat
} from "./pages";
import Navbar from './components/navbar/Navbar';
import {PrivateRoutes, PublicRoutes} from './utils/RouteGuard'

function App() {
   return (
    <BrowserRouter>
    <Routes>
      <Route element={<PublicRoutes/>}>
        <Route index element={<Welcome logout={false} />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="register-success" element={<RegisterSuccess />} />
        <Route path="logout" element={<Welcome logout={true}/>} />
      </Route>
      <Route element={<><PrivateRoutes/><Navbar/></>}>
        <Route path="login-success" element={<LoginSuccess/>} />
        <Route path="users" element={<Users />} />
        <Route path="groupchat" element={<GroupChat />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
