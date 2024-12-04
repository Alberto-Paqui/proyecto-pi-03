

import { createContext, useContext, useState } from "react";
import { supabase } from "../Supabase/client";

// Crear el contexto
export const TaskContext = createContext();

// Hook personalizado para usar el contexto
export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTasks debe ser usado dentro de un TaskContextProvider");
    }
    return context;
};

// Proveedor del contexto
export const TaskContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [adding, setAdding] = useState(false)
    const [loading, setLoading] = useState(false)

    const getTasks = async (comprados = false)=> {
        setLoading(true)
        // Obtén la sesión actual
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            
        if (sessionError) throw new Error("Error al obtener la sesión: " + sessionError.message);

        const userId = session?.user?.id; // Obtén el id del usuario actual

        if (!userId) throw new Error("No se encontró un usuario autenticado");

        const { data, error } = await supabase
            .from('cursos')
            .select()
            .eq("userId", userId)
            .eq("comprados", comprados)
            .order("id", { ascending: true })
        
        if (error) throw error;
        
        setTasks(data)
        setLoading(false)
    }

    const createTask = async (taskName) => {
        setAdding(true);
        try {
            // Obtén la sesión actual
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            
            if (sessionError) throw new Error("Error al obtener la sesión: " + sessionError.message);
    
            const userId = session?.user?.id; // Obtén el id del usuario actual
    
            if (!userId) throw new Error("No se encontró un usuario autenticado");
    
            // Inserta los datos en la tabla "curos"
            const { data, error } = await supabase
                .from("cursos")
                .insert({ nombre: taskName, userId })
                .select(); // Asegúrate de usar `.select()` para devolver los datos insertados
    
            if (error) throw error;
            setTasks([...tasks, ...data])
        } catch (error) {
            console.error("Error al insertar datos a la tabla:", error.message);
        } finally {
            setAdding(false); // Garantiza que se ejecute siempre, incluso si ocurre un error
        }
    }

    const deleteTask = async (id) => {
        try {
            // Obtener la sesión actual
            const {
                data: { session },
                error: sessionError,
            } = await supabase.auth.getSession();
    
            if (sessionError) throw new Error("Error al obtener la sesión: " + sessionError.message);
    
            const userId = session?.user?.id; // Obtener el ID del usuario actual
    
            if (!userId) throw new Error("No se encontró un usuario autenticado");
    
            // Realizar la eliminación de la tarea
            const { data, error } = await supabase
                .from("cursos")
                .delete()
                .eq("userId", userId)
                .eq("id", id) // Filtrar por el ID de la tarea
                .select();
    
            if (error) throw error;
            
            setTasks(tasks.filter((task) => task.id != id))
            //console.log("Tarea eliminada:", data);
        } catch (error) {
            console.error("Error al eliminar la tarea:", error.message);
        }
    };

    const updateTask = async (id, updateFields) => {
        //console.log(id, updateFields);

        const { data: {session}, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) throw new Error("Error al obtener la sesión: " + sessionError.message);
    
        const userId = session?.user?.id; // Obtener el ID del usuario actual
    
        if (!userId) throw new Error("No se encontró un usuario autenticado");

        const { data, error } = await supabase
            .from('cursos')
            .update(updateFields)
            .eq('userId', userId)
            .eq('id', id)
            .select()
        
        if(error) throw error;
        console.log(data);

        setTasks(tasks.filter(task => task.id != id))
    };

    
    

    return (
        <TaskContext.Provider value={{ 
            tasks, 
            getTasks, 
            createTask, 
            adding, 
            loading, 
            deleteTask, 
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    );
};

