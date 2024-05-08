import { useContext } from "react"
import { Navigate, Outlet, Route, Routes as Router } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import NoPage from "./pages/NoPage"
import EmployeePage from "./pages/EmployeePage"
import { NormalLayout } from "./layouts/NormalLayout"
import { EmployeeLayout } from "./layouts/EmployeeLayout"
import ConfirmingEmployeePage from "./pages/ConfirmingEmployeePage"
import { EmployeePayheadPage } from "./pages/EmployeePayheadsPage"
import PayrollPage from "./pages/PayrollPage"
import SalarySlipPage from "./pages/SalarySlipPage"
import ViewEmployee from "./pages/ViewEmployee"
import RequireAuth from "./context/RequireAuth"



export default function Routes(){
    
    return(
        <Router>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
             
            <Route element={<RequireAuth allowedRoles={'HR'} />}>
                {/* HR Routes */}
                <Route path="/admin" element={<NormalLayout/>}>
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
            
                <Route path ="/" element={<RequireAuth allowedRoles={'Marketing'} />}>
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


            <Route path="*" element={<NoPage/>}/>
        </Router>
    )
}
