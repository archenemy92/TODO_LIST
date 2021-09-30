import React, {useState} from "react"
import {v1} from "uuid"
import "./App.css"
import {TodoList} from "./Components/TodoList/TodoList"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "completed"

export const App: React.FC = () => {

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "JS", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterValueType>("all")

    const removeTask = (taskId: string) => {
        setTasks(tasks => tasks.filter(t => t.id !== taskId))
    }
    const filterTask = (value: FilterValueType) => {
        setFilter(value)
    }

    let filteredTasks = tasks
    if (filter === "completed") {
        filteredTasks = tasks.filter(t => t.isDone)
    }
    if (filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    return (
        <div className="App">
            <TodoList
                title={"What to learn"}
                tasks={filteredTasks}
                removeTask={removeTask}
                filterTasks={filterTask}
            />
        </div>
    )
}

