import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Subject from "./pages/Subject";
import Quiz from "./pages/Quiz";
import Answer from "./pages/Answer";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";

function AppLayout() {
  const location = useLocation();

  // Hide sidebar on the login page
  const hideSidebar = location.pathname === "/";

  return (
    <div className="flex min-h-screen">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subject" element={<Subject />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/answer" element={<Answer />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
