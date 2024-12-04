import { useEffect, useState } from "react";
import { supabase } from "../Supabase/client";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import { useTasks } from "../context/Task.context";
import TaskList from "../components/TaskList";

function Home() {
  const [showTaskDone, setShowTaskDone] = useState(false)
  const navigate = useNavigate();
  //const {tasks} = useTasks()
  //console.log(tasks)
   

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error obteniendo la sesión:", error);
        return;
      }

      if (!data.session) {
        // Si no hay sesión, redirigir al login
        navigate("/login");
      }
    };

    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error cerrando sesión:", error);
    } else {
      navigate("/login"); // Redirige al login después de cerrar sesión
    }
  };

  const irAvideo = ()=>{
    navigate("/video")
  }

  const irADocentes = ()=>{
    navigate("/videosDocentes")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-green-100">
      {/* Header */}
      <header className="w-full px-6 py-4 bg-blue-600 shadow-lg">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold text-white">Gestión de Cursos</h1>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleLogout}
              className="px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105"
            >
              Salir
            </button>
            <button
              onClick={irAvideo}
              className="px-5 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition-transform transform hover:scale-105"
            >
              Video
            </button>
            <button
              onClick={irADocentes}
              className="px-5 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-600 transition-transform transform hover:scale-105"
            >
              Docentes
            </button>
          </div>
        </div>
      </header>
  
      {/* Main Content */}
      <main className="w-full max-w-4xl px-6 py-8 bg-white rounded-lg shadow-md mt-6">
        {/* Task Form Section */}
        <section className="mb-8">
          <TaskForm />
        </section>
  
        {/* Toggle Button */}
        <div className="flex items-center justify-between px-6 py-4 bg-blue-100 rounded-lg shadow-md mb-6">
          <button
            onClick={() => setShowTaskDone(!showTaskDone)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition-transform transform hover:scale-105"
          >
            <span role="img" aria-label="Guardar">💾 Guardar</span>
          </button>
        </div>
  
        {/* Task List Section */}
        <section className="bg-gray-50 rounded-lg shadow-lg">
          <h2 className="px-4 py-4 text-2xl font-semibold text-gray-800 border-b">
            Lista de Cursos
          </h2>
          <TaskList comprados={showTaskDone} />
        </section>
      </main>
  
      {/* Footer */}
      <footer className="mt-6 py-4 w-full bg-blue-600 text-center text-white shadow-lg">
        <p className="text-sm">
          © {new Date().getFullYear()} Gestión de Cursos - Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
  
  
}

export default Home;
