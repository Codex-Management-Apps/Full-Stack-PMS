import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NoPage from './pages/NoPage';
import EmployeePage from './pages/EmployeePage';
import ViewEmployee from './pages/ViewEmployee';
import EmployeePortal from './pages/EmployeePortal';

export default function Home() {
  return (
    <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard/>} />
          {/* Dashboard */}
          <Route path="/" element={<Dashboard/>}/> 
          {/* View Page */}
          <Route path="/employee" element={<EmployeePage/>} />
          {/* View Department */}
          <Route path="/employee/:id" element={<ViewEmployee/>} />
          {/* Employee Portal Manager */}
          <Route path="/auth/employee/:id" element={<EmployeePortal/>} />
          {/* Page Not Found */}
          <Route path="*" element={<NoPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}
