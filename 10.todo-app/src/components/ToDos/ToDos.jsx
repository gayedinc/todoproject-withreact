import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import "./ToDos.css";

function ToDos() {
    const initialTasks = [ //Başlangıç görevleri
        { id: 1, taskName: "Learn React", isDone: false },
        { id: 2, taskName: "Learn Javascript", isDone: true },
        { id: 3, taskName: "Read Book", isDone: false },
        { id: 4, taskName: "Have a Life", isDone: false },
    ];

    const [task, setTask] = useState({ id: 0, taskName: "", isDone: false }); //kullanıcının eklediği yeni görevi tutar
    const [taskData, setTaskData] = useState(() => { //tüm görevleri ve durumlarını içeren ana görev dizisini tutar

        //Local Storage
        const storedTasks = localStorage.getItem("tasks");
        return storedTasks ? JSON.parse(storedTasks) : initialTasks;
    });

    const [filter, setFilter] = useState("all"); // görevleri filtrelemek için

    useEffect(() => {
        //taskData değiştiğinde localStorage'a görevleri kaydeder
        localStorage.setItem("tasks", JSON.stringify(taskData));
    }, [taskData]);

    const clearCompleted = () => {
        // tamamlanan görevleri taskData dizisinden kaldırır
        setTaskData(taskData.filter((task) => !task.isDone));
    };

    const getFilteredTasks = () => {
        //filter durumuna bağlı olarak görevleri filtreler ve filtrelenmiş görevleri döndürür
        switch (filter) {
            case "active":
                return taskData.filter((task) => !task.isDone); // tamamlanmamış görevler
            case "completed":
                return taskData.filter((task) => task.isDone); // tamamlanmış görevler
            default:
                return taskData; // doğrudan taskData dizisi döner, filtreleme yok
        }
    };

    const filteredTasks = getFilteredTasks(); //filtrelenmiş görevleri almak için getFilteredTasks fonksiyonunu çağrılır

    return (
        <div className="todoapp">
            <Header
                task={task}
                setTask={setTask}
                taskData={taskData}
                setTaskData={setTaskData}
            />
            <Main
                taskData={taskData}
                setTaskData={setTaskData}
                filter={filter}
                filteredTasks={filteredTasks}
            />
            <Footer
                task={task}
                setTask={setTask}
                taskData={taskData}
                setTaskData={setTaskData}
                filteredTasks={filteredTasks}
                filter={filter}
                setFilter={setFilter}
                clearCompleted={clearCompleted}
            />
        </div>
    );
}

export default ToDos;
