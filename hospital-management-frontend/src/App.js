
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/header/Header";

import Admin from "./pages/AdminEmployeeDetails";
import PatientDetails from "./pages/pateintDetails";
import ReceptionistHome from "./pages/receptionist";
import ResetPassword from "./pages/resetPassword";
import SignIn from "./pages/signIn";
import "./App.css";
import DoctorHome from "./pages/doctor/doctor";
import PatientDetailsDoctor from "./pages/doctor/component/PatientDetailsDoctor";
import PatientDetailsReception from "./components/patient/PatientDetailsReception";
import Accountant from "./pages/accountant/Accountant";
import PatientDetailsAccountant from "./pages/accountant/patientDetailsAccountant";
import ErrorHandle, { Error } from "./pages/errorHandling/ErrorHandle";
import InvalidPage from "./pages/errorHandling/InvalidPage";
import PaymentGateway from "./components/payment/PaymentGateway";
function App() {


  return (
    <div style={{ width: "100%" }} className="appJS">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<SignIn />} />

          <Route path="/admin" element={<Admin />} />
        
        
          <Route path="/resetPassword" element={<ResetPassword />} />
         
          <Route path="/patientDetails" element={<PatientDetails />} />
          <Route path="/reception" element={<ReceptionistHome />} />
          <Route path="/doctor" element={<DoctorHome />} />
          <Route path="/accountant" element={<Accountant />} />
          <Route path="/error" element={<ErrorHandle />} />

          <Route
            path="/doctor/patientDetails"
            element={<PatientDetailsDoctor />}
          />
          <Route
            path="/reception/patientDetails"
            element={<PatientDetailsReception />}
          />
          <Route
            path="/accountant/patientDetails"
            element={<PatientDetailsAccountant />}
          />
          <Route path='*' element={<InvalidPage/>} />

          <Route path="/patientDetails/payment" element={<PaymentGateway/>}/>
        </Routes>
        <ToastContainer theme="colored" />
      </BrowserRouter>

    
      <div class="copyright">
                <pre>C o p y r i g h t    ©    2 0 2 4    M a d e    B y    S a t y a j e e t  M o h i t e  </pre>
            </div>
     
      
    </div>
  );
}

export default App;
