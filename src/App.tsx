import React, {useState} from "react"
import {v1} from "uuid"
import "./App.css"
import {TodoList} from "./Components/TodoList/TodoList"
import {AddItemForm} from "./Components/AddItemForm/AddItemForm"
import {Header} from "./Components/Header/Header"
import {Card, Container, Paper} from "@mui/material"

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

    let [todoLists, setTodoLists] = useState<TodoListType[]>([
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
    const removeTask = (taskId: string, todoID: string) => {
        setTasks(tasks => {
            return {
                ...tasks,
                [todoID]: tasks[todoID].filter(t => t.id !== taskId)
            }
        })
    }
    const filterTask = (value: FilterValueType, todoID: string) => {
        let tl = todoLists.find(tl => tl.id === todoID)
        if (tl) {
            tl.filter = value
            setTodoLists([...todoLists])
        }
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoID: string) => {
        let task = tasks[todoID].find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    const changeTaskTitle = (taskId: string, title: string, todoID: string) => {
        let task = tasks[todoID].find(t => t.id === taskId)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    const addTodoList = (title: string) => {
        const todoList: TodoListType = {
            id: v1(),
            title,
            filter: "all"
        }
        setTodoLists([todoList, ...todoLists])
        setTasks({...tasks, [todoList.id]: []})
    }

    const removeTodoList = (todoID: string) => {
        setTodoLists(todoLists => todoLists.filter(tl => tl.id !== todoID))
        delete tasks[todoID]
    }

    const changeTodoTitle = (todoID: string, title: string) => {
        setTodoLists(todoLists => todoLists.map(tl => {
            if (tl.id === todoID) {
                return {
                    ...tl,
                    title
                }
            }
            return tl
        }))
    }

    return (


        <Container>
            <Header addItem={addTodoList}/>
            {/*<div>create new todo</div>*/}
            {/*  <AddItemForm addItem={addTodoList}/>*/}
            <div className={"App"}>

                {
                    todoLists.map(tl => {

                        let filteredTasks = tasks[tl.id]
                        if (tl.filter === "complete") {
                            filteredTasks = filteredTasks.filter(t => t.isDone)
                        }
                        if (tl.filter === "active") {
                            filteredTasks = filteredTasks.filter(t => !t.isDone)
                        }

                        return <Paper style={{margin:"10px"}} elevation={5}>
                            <TodoList
                                key={tl.id}
                                tl={tl}
                                tasks={filteredTasks}
                                removeTask={removeTask}
                                filterTasks={filterTask}
                                addTask={addTask}
                                changeTaskTitle={changeTaskTitle}
                                changeTaskStatus={changeTaskStatus}
                                removeTodoList={removeTodoList}
                                changeTodoTitle={changeTodoTitle}
                            />
                        </Paper>


                    })
                }
            </div>

        </Container>


    )
}

