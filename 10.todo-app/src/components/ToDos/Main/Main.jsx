import React, { useState } from "react";

function Main({ taskData, setTaskData, filter, filteredTasks }) {
    const [editingTaskId, setEditingTaskId] = useState(null); //Şu anda düzenlenen görevin id'si saklanır, başlangıç değeri null
    const [editingTaskName, setEditingTaskName] = useState(""); //Şu anda düzenlenen görevin adı saklanır, başlangıç değeri boş string

    const handleChange = (taskId) => { //bir görevin tamamlanma durumunu (isDone) değiştirir. taskId ile hangi görevin değiştirileceği belirlenir.
        const updatedTaskData = taskData.map((task) => { //taskData dizisi üzerinde map fonksiyonu kullanılarak, ilgili görevin isDone değeri tersine çevrilir
            if (task.id === taskId) {
                return { ...task, isDone: !task.isDone };
            }
            return task;
        });
        setTaskData(updatedTaskData); //setTaskData ile güncellenir.
    };

    const handleClick = (taskId, taskName) => { // bir görevi düzenleme moduna geçiriri ve düzenlenecek görevin id ve adı state değişkenlerine atanır
        setEditingTaskId(taskId);
        setEditingTaskName(taskName);
    };

    const handleEditChange = (e) => { // düzenleme nodundayken görev ismi değişikliklerini alır ve setEditingTaskName'i günceller, e ise inputtan gelen olay
        setEditingTaskName(e.target.value);
    };

    const handleEditSubmit = (e, taskId) => { //düzenleme formunun gönderilmesini işler görev ismi güncellenir, taskId ile güncellenecek görev belirlenir
        e.preventDefault();
        const updatedTaskData = taskData.map((task) => {
            if (task.id === taskId) {
                return { ...task, taskName: editingTaskName }; // görev adı editingTaskName stateinden alınır ve
            }
            return task;
        });
        setTaskData(updatedTaskData); // setTaskData ile güncellenir
        setEditingTaskId(null); //Düzenleme nodu kapatılır
    };

    const handleEditBlur = (taskId) => { // Input alanı kaybedildiğinde blur olayı görev adını günceller
        const updatedTaskData = taskData.map((task) => {
            if (task.id === taskId) {
                return { ...task, taskName: editingTaskName };
            }
            return task;
        });
        setTaskData(updatedTaskData);
        setEditingTaskId(null);
    };

    const handleToggleAll = () => { // Tüm görevlerin tamamlanma durumunu kontrol eder
        const allTasksCompleted = taskData.every((task) => task.isDone);
        // allTasksCompleted tüm görevlerin tamamlanmış olup olmadığını belirler
        const updatedTaskData = taskData.map((task) => ({
            ...task,
            // taskData dizisi üzerinde map metodu kullanılarak yeni bir dizi oluşturulur
            isDone: !allTasksCompleted,
        }));
        setTaskData(updatedTaskData); // TaskData state'ini bu yeni dizi ile günceller ve tüm görevlerin tamamlanma durumu arayüzde güncellenir

        //kullanıcı bir butona tıklayarak tüm görevleri tamamlanmış veya tamamlanmamış hale getirebilir
    };

    const handleDelete = (taskId) => { // Belirli bir görev silinir
        const updatedTaskData = taskData.filter((task) => task.id !== taskId);
        // filter ile taskData'dan ilgili görev çıkartılır
        setTaskData(updatedTaskData); // ve güncellenir
    };

    // liItems, filteredTasks dizisindeki görevleri render eden JSX elemanlarının bir listesidir
    const liItems = filteredTasks.map((task) => (
        <li className={task.isDone ? "completed" : ""} key={task.id}>
            <div className="view">
                <input //görevin tamamlanma durumunu gösterir
                    className="toggle"
                    type="checkbox"
                    checked={task.isDone}
                    name="isDone"
                    onChange={() => handleChange(task.id)} // değişiklikler handleChange'le işlenir
                    id={`toggle-${task.id}`}
                />
                {editingTaskId === task.id ? ( // editingTaskId ile görevin düzenlenme modunda olup olmadıpı kontrol edilir
                    <input //Düzenleme modundaysa input gösterilir
                        className="edit"
                        value={editingTaskName}
                        onChange={handleEditChange}
                        onBlur={() => handleEditBlur(task.id)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleEditSubmit(e, task.id);
                            }
                        }}
                        autoFocus
                        id={`edit-${task.id}`}
                    />
                ) : (
                    <label // Düzenleme modunda değilse label gösterilir ve çift tıklama ile düzenleme moduna geçilir
                        onDoubleClick={() => handleClick(task.id, task.taskName)}
                        htmlFor={`toggle-${task.id}`}
                    >
                        {task.taskName}
                    </label>
                )}

                <button // görev silmek için
                    className="destroy" onClick={() => handleDelete(task.id)}>
                </button>
            </div>
        </li>
    ));

    return (
        <section className="main">
            <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                onChange={handleToggleAll}
            />
            <label htmlFor="toggle-all"></label>
            <ul className="todo-list">{liItems}</ul>
        </section>
    );
}

export default Main;
