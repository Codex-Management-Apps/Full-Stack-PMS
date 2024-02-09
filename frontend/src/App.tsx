import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './pages/Main';
import NoPage from './pages/NoPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

export default function Home() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Main/>} />
          <Route path="/" element={<Main/>}/>
          <Route path="/create" element={<CreatePage/>} />
          <Route path="/edit" element={<EditPage/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}