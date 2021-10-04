import React, {ChangeEvent, MouseEvent} from "react"
import {FilterValueType, TaskType, TodoListType} from "../../App"
import {AddItemForm} from "../AddItemForm/AddItemForm"
import {EditableSpan} from "../EditableSpan/EditableSpan"

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
        <div>
            <h3><EditableSpan title={tl.title} onChange={changeTodoTitleHandler}/>
                <button onClick={removeTodoListHandler}>x</button>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
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
                            <li key={t.id} className={t.isDone ? "isDone" : ""}>
                                <input type={"checkbox"} checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan title={t.title} onChange={changeTaskTitleHandler}/>
                                <button onClick={removeTaskHandler}>X</button>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <button className={tl.filter === "all" ? "active_filter" : ""}
                        onClick={filterTaskHandler}
                >
                    All
                </button>
                <button className={tl.filter === "active" ? "active_filter" : ""}
                        onClick={filterTaskHandler}
                >
                    Active
                </button>
                <button className={tl.filter === "complete" ? "active_filter" : ""}
                        onClick={filterTaskHandler}
                >
                    Complete
                </button>
            </div>
        </div>
    )
}