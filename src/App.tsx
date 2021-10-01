import React, {useState} from "react"
import {v1} from "uuid"
import "./App.css"
import {TodoList} from "./Components/TodoList/TodoList"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterValueType = "all" | "active" | "complete"

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

    const addTask = (title: string) => {
        const task: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks([task, ...tasks])
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(state => state.map(t => {
            if (t.id === id) {
                return {
                    ...t,
                    isDone
                }
            }
            return t
        }))
    }

    let filteredTasks = tasks
    if (filter === "complete") {
        filteredTasks = tasks.filter(t => t.isDone)
    }
    if (filter === "active") {
        filteredTasks = tasks.filter(t => !t.isDone)
    }
    return (
        <div className="App">
            <TodoList
                todoTitle={"What to learn"}
                filter={filter}
                tasks={filteredTasks}
                removeTask={removeTask}
                filterTasks={filterTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
        </div>
    )
}

