import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./App.css";
import Mainpage from "../src/Mainpage";
import AuthorizationForm from "./components/AuthorizationForm/AuthorizationForm";
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import { AuthProvider } from './AuthContext';
import CustomerProfile from './components/CustomerProfile/CustomerProfile';
import ProtectedRoute from './ProtectedRoute';
import Dispatcher from './components/Dispatcher/Dispatcher';
import DriverProfile from './components/DriverProfile/DriverProfile';
import NewOrder from './components/CustomerProfile/NewOrder';
function App() {
  return (
    <AuthProvider>
      <div className="page-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/login" element={<AuthorizationForm />} />
            <Route path="/registration" element={<RegistrationForm />} />
            <Route path="/profileuser" element={<ProtectedRoute allowedRoles={['Клиент']} />}>
              <Route path="" element={<CustomerProfile />} />
            </Route>
            <Route path="/profiledriver" element={<ProtectedRoute allowedRoles={['Водитель']} />}>
              <Route path="" element={<DriverProfile />} />
            </Route>
            <Route path="/profiledispatcher" element={<ProtectedRoute allowedRoles={['Диспетчер']} />}>
              <Route path="" element={<Dispatcher />} />
            </Route>
            <Route path="/neworderclient" element={<ProtectedRoute allowedRoles={['Клиент']} />}>
              <Route path="" element={<NewOrder />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
