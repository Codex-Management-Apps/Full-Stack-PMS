import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SalarySlipPage from './pages/SalarySlipPage';
import NoPage from './pages/NoPage';
import EmployeePage from './pages/EmployeePage';
import { ThemeProvider } from './components/theme-provider';
import PayHeads from './pages/PayheadPage';
import LeaveRequestPage from './pages/LeaveRequestPage';
import PayrollPage from './pages/PayrollPage';
import {SignatoryPage} from './pages/SignatoryPage';
import { RegisterPage } from './pages/RegisterPage';
import ConfirmingEmployeePage from './pages/ConfirmingEmployeePage';
import ViewEmployee from './pages/ViewEmployee';
import { EmployeePayheadPage } from './pages/EmployeePayheadsPage';


export default function Home() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
          <Routes>
            
            {/* View EmployeePage */}
            <Route index path="/p/admin/employee" element={<EmployeePage/>} />
            {/* View Employee ID */}
            <Route path="/p/admin/employee/:id" element={<ViewEmployee/>} />
            {/* View Payroll */}
            <Route path="/p/admin/employee/payroll/:id" element={<PayrollPage/>}/>
            {/* View ENewhired */}
            <Route path="/p/admin/employee/new" element={<ConfirmingEmployeePage/>} />
            {/* Configure Payheads */}
            <Route path="/p/admin/employee/:id/payheads" element={<EmployeePayheadPage/>} />
            {/* View Salary Slips */}
            <Route path="/p/admin/salaryslips" element={<SalarySlipPage/>} />
            
            {/* View Leave Request */}
            <Route path="/p/admin/leave" element={<LeaveRequestPage/>}/>

            {/* View PayHeads */}
            <Route path="/p/admin/payheads" element={<PayHeads/>}/>

            {/* View Signatory */}
            <Route path="/p/admin/signatory" element={<SignatoryPage/>}/>
            

            {/* TODO: Implement A rolebase Access */}
            {/* Employee Portal Manager */}
            {/* <Route path="/p/employee/" element={<EmployeePortal/>} />}

            {/* View All Leave Request */}
            <Route path="/p/leave" element={<LeaveRequestPage/>} />
            
            {/* Register */}
            <Route path="/register" element={<RegisterPage/>}/>

            {/* Page Not Found */}
            <Route path="*" element={<NoPage/>}/>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
  );
}
