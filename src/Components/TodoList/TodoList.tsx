import React, {ChangeEvent, MouseEvent} from "react"
import {FilterValueType, TaskType, TodoListType} from "../../App"
import {AddItemForm} from "../AddItemForm/AddItemForm"
import {EditableSpan} from "../EditableSpan/EditableSpan"
import {Button, Checkbox, IconButton} from "@mui/material"
import {Delete} from "@mui/icons-material"

type TodoListPropsType = {
    tl: TodoListType
    tasks: TaskType[]
    removeTask: (taskId: string, todoID: string) => void
    filterTasks: (value: FilterValueType, todoID: string) => void
    addTask: (title: string, todoID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoID: string) => void
    removeTodoList: (todoId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoID: string) => void
    changeTodoTitle: (todoID: string, title: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {

    const {
        tasks, tl,
        removeTask, filterTasks,
        addTask, changeTaskStatus,
        removeTodoList, changeTaskTitle,
        changeTodoTitle
    } = props

    const addTaskHandler = (title: string) => {
        addTask(title.trim(), tl.id)
    }


    const filterTaskHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.textContent) {
            filterTasks(e.currentTarget.textContent.toLowerCase() as FilterValueType, tl.id)
        }
    }

    const removeTodoListHandler = () => {
        removeTodoList(tl.id)
    }

    const changeTodoTitleHandler = (title: string) => {
        changeTodoTitle(tl.id, title)
    }

    return (
        <div style={{margin:"10px"}}>
            <h3><EditableSpan title={tl.title} onChange={changeTodoTitleHandler}/>
                <IconButton onClick={removeTodoListHandler}>
                    <Delete color={"error"}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler} placeholder={"add new task"}/>
            <ul>
                {tasks.map(t => {

                        const removeTaskHandler = () => {
                            removeTask(t.id, tl.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked, tl.id)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(t.id, title, tl.id)
                        }
                        return (
                            <li key={t.id} className={t.isDone ? "isDone" : ""} style={{fontWeight: "bolder"}}>
                                <Checkbox checked={t.isDone} color={"success"} onChange={changeTaskStatusHandler}/>
                                <EditableSpan title={t.title} onChange={changeTaskTitleHandler}/>
                                <IconButton onClick={removeTaskHandler}>
                                    <Delete color={"error"}/>
                                </IconButton>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <Button
                    color={tl.filter === "all" ? "success" : "secondary"}
                    variant={"contained"}
                    onClick={filterTaskHandler}
                >
                    All
                </Button>
                <Button color={tl.filter === "active" ? "success" : "secondary"}
                        onClick={filterTaskHandler}
                        variant={"contained"}
                >
                    Active
                </Button>
                <Button color={tl.filter === "complete" ? "success" : "secondary"}
                        onClick={filterTaskHandler}
                        variant={"contained"}
                >
                    Complete
                </Button>
            </div>
        </div>
    )
}