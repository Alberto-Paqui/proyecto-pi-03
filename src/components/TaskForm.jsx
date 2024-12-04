import { useState } from "react"
import { useTasks } from "../context/Task.context"


function TaskForm() {
    const [taskName, setTaskName] = useState("");
    const { createTask, adding } = useTasks();
    

    const onChange = ({target})=>{
        setTaskName(target.value)
    }
    
    const onSubmit = async (event) => {
        event.preventDefault();
        //console.log(adding);
        createTask( taskName );
        setTaskName("");
    };
    
    return (
        <div className="flex items-center justify-center bg-gray-100 p-4">
            <form 
                action="" 
                onSubmit={onSubmit} 
                className="bg-white p-4 rounded-md shadow-md w-full max-w-md"
            >
                <div className="mb-3">
                    <input 
                        type="text" 
                        name="taskName" 
                        onChange={onChange} 
                        placeholder="Cursos..." 
                        value={taskName}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                    />
                </div>
                <button 
                    disabled={adding} 
                    className={`w-full py-2 text-white font-semibold rounded-md transition ${
                        adding 
                            ? "bg-gray-400 cursor-not-allowed" 
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                >
                    {adding ? "Añadiendo..." : "Añadir"}
                </button>
            </form>
        </div>
    );
    
}

export default TaskForm