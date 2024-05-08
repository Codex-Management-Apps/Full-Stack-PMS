import { useContext } from "react"
import { AuthContext } from "./contet/AuthProvider"
import { Navigate, Outlet, Route, Routes as Router } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage"
import { RegisterPage } from "./pages/RegisterPage"
import NoPage from "./pages/NoPage"
import EmployeePage from "./pages/EmployeePage"
import { NormalLayout } from "./layouts/NormalLayout"

const PrivateRoutes = () => {
    const { authenticated } = useContext(AuthContext)
  
    if(!authenticated) return <Navigate to='/login' replace />
  
    return <Outlet />
  }
  
export default function Routes(){
    
    return(
        <Router>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route element={<PrivateRoutes/>}>
            {/* Private Routes */}
            <Route path="/" element={<NormalLayout/>}>
                <Route index path="/p/admin/employee" element={<EmployeePage/>} />
            </Route>
           
            </Route>
            <Route path="*" element={<NoPage/>}/>
        </Router>
    )
}
// <Routes>
// {/* Public Routes */}

// {/* Register */}
// <Route path="/register" element={<RegisterPage/>}/>
// <Route path="/home" element={<LoginPage/>}/>

// {/* Role Protected Route */}
// {/* Admin */}
// <Route element= { }>

//   <Route index path="/p/admin/employee" element={<EmployeePage/>} />
//   {/* View Employee ID */}
//   <Route path="/p/admin/employee/:id" element={<ViewEmployee/>} />
//   {/* View Payroll */}
//   <Route path="/p/admin/employee/payroll/:id" element={<PayrollPage/>}/>
//   {/* View ENewhired */}
//   <Route path="/p/admin/employee/new" element={<ConfirmingEmployeePage/>} />
//   {/* Configure Payheads */}
//   <Route path="/p/admin/employee/:id/payheads" element={<EmployeePayheadPage/>} />
//   {/* View Salary Slips */}
//   <Route path="/p/admin/salaryslips" element={<SalarySlipPage/>} />
  
//   {/* View Leave Request */}
//   <Route path="/p/admin/leave" element={<LeaveRequestPage/>}/>

//   {/* View PayHeads */}
//   <Route path="/p/admin/payheads" element={<PayHeads/>}/>

//   {/* View Signatory */}
//   <Route path="/p/admin/signatory" element={<SignatoryPage/>}/>

// </Route>


// {/* Catch all */}

// {/* View EmployeePage */}


// {/* TODO: Implement A rolebase Access */}
// {/* Employee Portal Manager */}
// {/* <Route path="/p/employee/" element={<EmployeePortal/>} />}

// {/* View All Leave Request */}
// <Route path="/p/leave" element={<LeaveRequestPage/>} />


// {/* Page Not Found */}

// </Routes>