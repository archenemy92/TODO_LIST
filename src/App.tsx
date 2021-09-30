import React from "react"
import { v1 } from "uuid"
import "./App.css"
import {TodoList} from "./Components/TodoList/TodoList"

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const App: React.FC = () => {

    let tasks1 = [
        {id:v1(), title: "CSS", isDone: true},
        {id:v1(), title: "React", isDone: false},
        {id:v1(), title: "JS", isDone: false},
    ]

    let tasks2 = [
        {id:v1(), title: "Milk", isDone: true},
        {id:v1(), title: "Bread", isDone: false},
        {id:v1(), title: "Juice", isDone: false},
    ]


    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={tasks1}/>
            <TodoList title={"What to buy"} tasks={tasks2}/>
        </div>
    )
}

