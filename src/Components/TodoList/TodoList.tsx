import React from "react"
import {FilterValueType, TaskType} from "../../App"

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    filterTasks: (value: FilterValueType) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {
    let {
        title,
        tasks,
        removeTask,
        filterTasks
    } = props

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasks.map(t =>
                    <li key={t.id}>
                        <input type={"checkbox"} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => removeTask(t.id)}>X</button>
                    </li>
                )}
            </ul>
            <div>
                <button onClick={() => filterTasks("all")}>All</button>
                <button onClick={() => filterTasks("active")}>Active</button>
                <button onClick={() => filterTasks("completed")}>Complete</button>
            </div>
        </div>
    )
}