import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { VideoLibraryHome } from './components/video-library-home';
import { AdminLogin } from './components/admin-login';
import { AdminDashBoard } from './components/admin-dashboard';
import { AdminError } from './components/admin-error';
import { AddVideo } from './components/admin-add-video';
import { EditVideo } from './components/admin-edit-video';
import { DeleteVideo } from './components/admin-delete-video';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { Signout } from './components/admin-signout';
import { UserRegister } from './components/user-register';
import { UserLogin } from './components/user-login';
import { UserError } from './components/user-error';
import { UserDashboard } from './components/user-dashboard';

function App() {

  const [cookies, setCookie, removeCookie] = useCookies('admin-id');

  useEffect(()=>{

  },[]);


  return (
    <div className="container-fluid bg-dark text-white" style={{height:'1000px'}}>
        
       <BrowserRouter>
          <header className='p-3 d-flex justify-content-between'>

            <span className='h2'> <Link to="/" className='text-decoration-none text-white'>Video Library</Link> </span>
            <div>
            <Link className='bi btn btn-warning me-2 bi-person-fill' to="/user-login"> User Login</Link>
            {
              (cookies['admin-id']==undefined)?<Link to="/admin-login" className='btn btn-danger bi bi-person'> Admin Login</Link>:<Signout/>
            }
            </div>
          </header>
          <section className='mt-4'>
          
          <Routes>
              <Route path='/' element={<VideoLibraryHome />} />
              <Route path='admin-login' element={<AdminLogin />} />
              <Route path='admin-dashboard' element={<AdminDashBoard />} />
              <Route path='admin-error' element={<AdminError />} />
              <Route path='add-video' element={<AddVideo />} />
              <Route path='edit-video/:id' element={<EditVideo />} />
              <Route path='delete-video/:id' element={<DeleteVideo />} />
              <Route path='register-user' element={<UserRegister />} />
              <Route path='user-login' element={<UserLogin />} />
              <Route path='user-error' element={<UserError />} />
              <Route path='user-dashboard' element={<UserDashboard />} />
          </Routes>
          </section>
       </BrowserRouter>
      
    </div>
  );
}

export default App;
