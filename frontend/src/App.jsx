import { BrowserRouter, Routes, Route } from "react-router-dom";
import GroupProject from "./pages/GroupProject";
import LandingPage from "./pages/LandingPage";
import GroupAuthPage from "./pages/GroupAuthPage";

export default function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/workspace/:roomId" element={<GroupProject />} />
        <Route path="/" element={<LandingPage />} />

        <Route path="/workspace" element={<GroupAuthPage />} />

      </Routes>

    </BrowserRouter>
  );
}