import { Route, Routes as Router } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import NoPage from "./pages/NoPage"
import EmployeePage from "./pages/EmployeePage"
import { AdminLayout } from "./layouts/AdminLayout"
import ConfirmingEmployeePage from "./pages/ConfirmingEmployeePage"
import { EmployeePayheadPage } from "./pages/EmployeePayheadsPage"
import PayrollPage from "./pages/PayrollPage"
import SalarySlipPage from "./pages/SalarySlipPage"
import ViewEmployee from "./pages/ViewEmployee"
import RequireAuth from "./context/RequireAuth"
import { SignatoryPage } from "./pages/SignatoryPage"
import { EmployeeLayout } from "./layouts/EmployeeLayout"
import LeaveRequestPage from "./pages/LeaveRequestPage"
import PayHeadsPage from "./pages/PayheadPage"
import UnauthorizedPage from "./pages/UnauthorizedPage"



export default function Routes(){
    
    return(
        <Router>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
             
            <Route element={<RequireAuth allowedRoles={'ADMIN'} />}>
                {/* HR Routes */}
                <Route path="/admin" element={<AdminLayout/>}>
                    <Route index path="employee" element={<EmployeePage/>} />
                    {/* View Employee ID */}
                    <Route path="employee/:id" element={<ViewEmployee/>} />
                    {/* View Payroll */}
                    <Route path="employee/payroll/:id" element={<PayrollPage/>}/>
                    {/* View newhired */}
                    <Route path="employee/new" element={<ConfirmingEmployeePage/>} />
                    {/* Configure Payheads */}
                    <Route path="employee/:id/payheads" element={<EmployeePayheadPage/>} />
                    {/* View Salary Slips */}
                    <Route path="salaryslips" element={<SalarySlipPage/>} />
                    <Route path="leave" element={<LeaveRequestPage/>} />
                    <Route path="payheads" element={<PayHeadsPage/>} />
                    <Route path="signatory" element={<SignatoryPage/>} />
                </Route>
            </Route>


            <Route element={<RequireAuth allowedRoles={'MANAGER'} />}>
                <Route path="/" element={<EmployeeLayout/>}>
                    {/* TODO: Edit what can Marketing view */}
                    <Route index path="employee" element={<EmployeePage/>} />
                    {/* View Employee ID */}
                    <Route path="employee/:id" element={<ViewEmployee/>} />
                    {/* View Payroll */}
                    <Route path="employee/payroll/:id" element={<PayrollPage/>}/>
                    {/* View ENewhired */}
                    <Route path="employee/new" element={<ConfirmingEmployeePage/>} />
                    {/* Configure Payheads */}
                    <Route path="employee/:id/payheads" element={<EmployeePayheadPage/>} />
                    {/* View Salary Slips */}
                    <Route path="salaryslips" element={<SalarySlipPage/>} />
                </Route>
            </Route>

            <Route path="unauthorized" element={<UnauthorizedPage/>}/>
            <Route path="*" element={<NoPage/>}/>
        </Router>
    )
}
