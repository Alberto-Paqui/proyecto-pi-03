
import { useEffect } from "react";
import { useTasks } from "../context/Task.context"
import TaskCard from "./TaskCard";


function TaskList({comprados = false}) {

    const { tasks, getTasks, loading} = useTasks()
    //console.log(tasks);

    useEffect(() => {
      getTasks(comprados)
    
    }, [comprados])

    function renderTasks() {
      if (loading) {
        return <p>cargando...</p>
      } else if (tasks.length === 0) {
          return <p>no hay cursos encontrados</p>
      } else {
          return (
            <div>
              {
                tasks.map(task => (
                  <TaskCard task = {task} key = {task.id}/>
                ))
              }
            </div>
          )
        } 
    }

    return <div>
      {renderTasks()}
    </div>
}

export default TaskList