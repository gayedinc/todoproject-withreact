import { React, useState, useEffect } from "react";

function Header({ task, setTask, taskData, setTaskData }) {

    const handleChange = (e) => {
        //Bu fonksiyon, input alanında herhangi bir değişiklik yapıldığında çağrılır ve task state'ini günceller
        setTask((prevTask) => ({
            ...prevTask,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => { //form gönderildiğinde çağrılır
        e.preventDefault();
        if (task.taskName === "") {
            return
        }

        setTaskData((prevTaskData) => { //yeni görevi taskData dizisine ekler
            task.id = taskData.length + 1;
            return [...prevTaskData, task];
        });

        setTask((prevTask) => ({ //input alanını temizler ve odaklanmayı kaldırır
            ...prevTask,
            id: 0,
            taskName: "",
            isDone: false,
        }));
    };

    return ( //bileşenin jsx yapısı döndürülür
        <header className="header">
            <h1>todos</h1>
            <form onSubmit={handleSubmit}>
                <input
                    value={task.taskName}
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    onChange={handleChange}
                    name="taskName"
                />
            </form>
        </header>
    );
}

export default Header;
