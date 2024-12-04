import { useTasks } from "../context/Task.context"


const TaskCard = ({ task }) => {
    const { deleteTask, updateTask } = useTasks()

    const eliminar = () => {
        deleteTask(task.id)
    }

    const agregar = ()=> {
        updateTask(task.id, {comprados: !task.comprados})
    }
    return (
        <div className="p-4 bg-gray-100 rounded shadow">
          <h1 className="text-2xl font-bold mb-2">{task.nombre}</h1>
          <p className="text-gray-700 mb-4">{task.comprados ? "confirmados✔️": "ingresado✏️"}</p>
          <div className="space-x-4">
            <button
              onClick={() => eliminar()}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Eliminar
            </button>
            <button
              onClick={() => agregar()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Comfirmar
            </button>
          </div>
        </div>
      );
      
}

export default TaskCard