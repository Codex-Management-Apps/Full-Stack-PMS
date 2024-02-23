import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './pages/Main';
import NoPage from './pages/NoPage';
import EmployeePage from './pages/EmployeePage';

export default function Home() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Main/>} />
          {/* Dashboard */}
          <Route path="/" element={<Main/>}/> 
          {/* View Page */}
          <Route path="/employee" element={<EmployeePage/>} />
          {/* View Department */}
          <Route path="/employee/:id" element={<EmployeePage/>} />
          {/* Page Not Found */}
          <Route path="*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
