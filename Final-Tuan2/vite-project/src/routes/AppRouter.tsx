import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserDetailPage from "../pages/UserDetailPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users/:id" element={<UserDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
