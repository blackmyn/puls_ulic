import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Mainpage from "../src/Mainpage";
import AuthorizationForm from "./components/AuthorizationForm/AuthorizationForm";
import Header from './components/Header/Header';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import { AuthProvider } from './AuthContext';
function App() {
  return (
    <AuthProvider>
      <div className="page-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/login" element={<AuthorizationForm />} />
            <Route path="/registration" element={<RegistrationForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;