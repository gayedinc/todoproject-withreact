import { useState, useEffect } from 'react'
import ToDos from "./components/ToDos/ToDos"

function App() {
  // localStorage'dan verileri yükle
  const [taskData, setTaskData] = useState(() => {
    //taskData state'inde, görevlerin listesi tutulur
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [task, setTask] = useState({
    //task state'inde, kullanıcının eklediği yeni görev tutulur
    id: 0,
    taskName: "",
    isDone: false,
  });

  //filter state'inde, görevleri filtrelemek için kullanılacak filtre türü tutulur
  const [filter, setFilter] = useState("all");

  // Verileri localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskData));
  }, [taskData]);

  const clearCompleted = () => {
    //Tamamlanmış görevler taskData dizisinden filtreleyerek kaldırılır
    const updatedTaskData = taskData.filter((task) => !task.isDone);
    setTaskData(updatedTaskData);
  };

  const filteredTasks = taskData.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.isDone;
    if (filter === "completed") return task.isDone;
  });

  return (
    // render fonksiyonunda, ToDos bileşenini çağrılır ve propslar iletilerek render edilir
    <>
      <ToDos
        task={task}
        setTask={setTask}
        taskData={taskData}
        setTaskData={setTaskData}
        filteredTasks={filteredTasks}
        filter={filter}
        setFilter={setFilter}
        clearCompleted={clearCompleted}
      />
    </>
  );
}

export default App
