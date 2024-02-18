import { BrowserRouter, Routes, Route } from "react-router-dom";
import CattleDashboard from "./pages/CattleDashboard";
import DiseaseChain from "./pages/DiseaseChain";
import Detail from "./pages/Detail";
import Government from "./pages/Government";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MemberShip from "./pages/MemberShip";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Government />} />
          <Route path="/dashboard/:id" element={<CattleDashboard />} />
          <Route path="/disease" element={<DiseaseChain />} />
          <Route path="/membership" element={<MemberShip />} />
          <Route path="/detail/:ranchId/:animalId" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
