import './App.css';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFount from './pages/NotFount';
import { useEffect } from 'react';
import { supabase } from './Supabase/client';
import { TaskContextProvider } from './context/Task.context';
import VideoCallRoom from './pages/VideoCallRoom';
import { FetchTeacher } from './pages/FetchTeacher';
import Videos from './pages/videos';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session && location.pathname !== "/login") {
        navigate("/login");
      } else if (session && location.pathname === "/login") {
        navigate("/");
      }
    });

    // Asegurar que se limpie la suscripción correctamente
    return () => {
      if (authListener && typeof authListener.unsubscribe === "function") {
        authListener.unsubscribe();
      }
    };
  }, [navigate, location.pathname]);

  return (
    <div className='App'>
      <TaskContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFount />} />
          <Route path="/video" element={<VideoCallRoom />}/>
          <Route path="/buscar" element={<FetchTeacher /> }/>
          <Route path='/videosDocentes' element={<Videos />}/>
        </Routes>
      </TaskContextProvider>
    </div>
  );
}

export default App;
