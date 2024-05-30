import React from "react";

function Footer({
    task,
    setTask,
    taskData,
    setTaskData,
    filteredTasks,
    filter,
    setFilter,
    clearCompleted,
}) {
    const handleAllClick = () => setFilter("all"); //Tüm görevleri göstermek için filter state'ini "all" olarak ayarlar
    const handleActiveClick = () => setFilter("active"); //Sadece tamamlanmamış görevleri göstermek için filter state'ini "active" olarak ayarlar
    const handleCompletedClick = () => setFilter("completed"); //Sadece tamamlanmış görevleri göstermek için filter state'ini "completed" olarak ayarlar

    const hasCompletedTasks = filteredTasks.some((task) => task.isDone);
    //filteredTasks dizisinde herhangi bir tamamlanmış görev olup olmadığını kontrol edilir. some metodu dizideki en az bir öğenin isDone özelliğinin true olup olmadığını kontrol eder ve tamamlanmış görevlerin olup olmadığını belirler

    return ( //footer bileşenin jsx yapısı döndürülüyor
        //todo-count sınıfına sahip <span> etiketi içinde kalan görevlerin sayısını gösterilir ve bu filteredTasks.length ile hesaplanır ve görevlerin sayısı kalın (<strong>) etiketi içinde gösterilir
        <footer className="footer">
            <span className="todo-count">
                <strong>{filteredTasks.length} </strong>
                items left
            </span>

            <ul className="filters">
                <li>
                    <a
                        href="#/"
                        onClick={handleAllClick}
                        className={filter === "all" ? "selected" : ""}
                    >
                        All
                    </a>
                </li>
                <li>
                    <a
                        href="#/"
                        onClick={handleActiveClick}
                        className={filter === "active" ? "selected" : ""}
                    >
                        Active
                    </a>
                </li>
                <li>
                    <a
                        href="#/"
                        onClick={handleCompletedClick}
                        className={filter === "completed" ? "selected" : ""}
                    >
                        Completed
                    </a>
                </li>
            </ul>

            {hasCompletedTasks && ( //tamamlanmış görevler varsa clear completed butonu gösterilir, buton clearCompleted fonksiyonu çağrılarak tamamlanmış görevleri temizler
                <button className="clear-completed" onClick={clearCompleted}>
                    {"Clear completed"}
                </button>
            )}
        </footer>
    );
}

export default Footer;
