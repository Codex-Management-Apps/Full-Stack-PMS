import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NoPage from './pages/NoPage';
import EmployeePage from './pages/EmployeePage';
import ViewEmployee from './pages/ViewEmployee';

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
          {/* Page Not Found */}
          <Route path="*" element={<NoPage/>}/>
        </Routes>
    </BrowserRouter>
  );
}
