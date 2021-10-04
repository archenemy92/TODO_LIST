import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react"
import {FilterValueType, TaskType, TodoListType} from "../../App"

type TodoListPropsType = {
    tl: TodoListType
    tasks: TaskType[]
    removeTask: (taskId: string, todoID: string) => void
    filterTasks: (value: FilterValueType, todoID: string) => void
    addTask: (title: string, todoID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoID: string) => void
    removeTodoList: (todoId: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {

    const [taskTitle, setTaskTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const {
        tasks, tl,
        removeTask, filterTasks,
        addTask, changeTaskStatus,
        removeTodoList

    } = props

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTaskHandler()
        }
    }

    const addTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            addTask(taskTitle.trim(), tl.id)
            setTaskTitle("")
        } else {
            setError("title is require")
        }
    }

    const filterTaskHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.textContent) {
            filterTasks(e.currentTarget.textContent.toLowerCase() as FilterValueType, tl.id)
            setTaskTitle("")
        }
    }

    const removeTodoListHandler = () => {
        removeTodoList(tl.id)
    }
    return (
        <div>
            <h3>{tl.title}
                <button onClick={removeTodoListHandler}>x</button>
            </h3>
            <div>
                <input
                    value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className={error ? "error_message" : ""}>{error}</div>}
            </div>
            <ul>
                {tasks.map(t => {

                        const removeTaskHandler = () => {
                            removeTask(t.id, tl.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked, tl.id)
                        }

                        return (
                            <li key={t.id} className={t.isDone ? "isDone" : ""}>
                                <input type={"checkbox"} checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{t.title}</span>
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