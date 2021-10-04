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
export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
export type TasksType = {
    [key: string]: TaskType[]
}

export const App: React.FC = () => {

    let todoID1 = v1()
    let todoID2 = v1()

    let [todoList, setTodoList] = useState<TodoListType[]>([
        {id: todoID1, title: "What to learn", filter: "all"},
        {id: todoID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todoID1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todoID2]: [
            {id: v1(), title: "Book", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Baguette", isDone: false},
        ]
    })


    const removeTask = (taskId: string, todoID: string) => {
        setTasks(tasks => {
            return {
                ...tasks,
                [todoID]: tasks[todoID].filter(t => t.id !== taskId)
            }
        })
    }
    const filterTask = (value: FilterValueType, todoID: string) => {
        let tl = todoList.find(tl => tl.id === todoID)
        if (tl) {
            tl.filter = value
            setTodoList([...todoList])
        }
    }

    const addTask = (title: string, todoID: string) => {
        const task: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        setTasks(tasks => {
            return {
                ...tasks,
                [todoID]: [task, ...tasks[todoID]]
            }
        })
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoID: string) => {
        let task = tasks[todoID].find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    const removeTodoList = (todoID: string) => {
        setTodoList(todoLists => todoLists.filter(tl => tl.id !== todoID))
        delete tasks[todoID]
    }

    return (
        <div className="App">
            {
                todoList.map(tl => {

                    let filteredTasks = tasks[tl.id]
                    if (tl.filter === "complete") {
                        filteredTasks = filteredTasks.filter(t => t.isDone)
                    }
                    if (tl.filter === "active") {
                        filteredTasks = filteredTasks.filter(t => !t.isDone)
                    }

                    return <TodoList
                        tl={tl}
                        tasks={filteredTasks}
                        removeTask={removeTask}
                        filterTasks={filterTask}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodoList={removeTodoList}
                    />

                })
            }

        </div>
    )
}

