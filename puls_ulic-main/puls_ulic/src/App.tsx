import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import AcceptedOrder from './components/DriverProfile/AcceptedOrder';
import OrderStatusContainer from './components/CustomerProfile/OrderStatusContainer';

function App() {
  return (
    <AuthProvider>
      <div className="page-wrapper">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainpage />} />
            <Route path="/login" element={<AuthorizationForm />} />
            <Route path="/registration" element={<RegistrationForm />} />

            {/* Protected Routes - общий компонент для всех ролей */}
            <Route element={<ProtectedRoute />}> {/* Без allowedRoles */}
              <Route path="/profileuser" element={<CustomerProfile />} />
              <Route path="/neworderclient" element={<NewOrder />} />
              <Route path="/profiledriver" element={<DriverProfile />} />
              <Route path="/profiledispatcher" element={<Dispatcher />} />
              <Route path="/acceptedorder" element={<AcceptedOrder />} />
              <Route path="/orderstatus" element={<OrderStatusContainer />} />
            </Route>

            {/* Catch-all route for unauthorized access */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;