import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react"
import {FilterValueType, TaskType} from "../../App"

type TodoListPropsType = {
    todoTitle: string
    filter: FilterValueType
    tasks: TaskType[]
    removeTask: (id: string) => void
    filterTasks: (value: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, isDone: boolean) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {

    const [taskTitle, setTaskTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    let {
        todoTitle, tasks,
        removeTask, filterTasks,
        addTask, changeTaskStatus,
        filter
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
            addTask(taskTitle)
            setTaskTitle("")
        } else {
            setError("title is require")
        }
    }

    const filterTaskHandler = (e: MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.textContent) {
            filterTasks(e.currentTarget.textContent.toLowerCase() as FilterValueType)
            setTaskTitle("")
        }
    }

    return (
        <div>
            <h3>{todoTitle}</h3>
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
                            removeTask(t.id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(t.id, e.currentTarget.checked)
                        }

                        return (
                            <li key={t.id}>
                                <input type={"checkbox"} checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{t.title}</span>
                                <button onClick={removeTaskHandler}>X</button>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <button className={filter === "all" ? "active_filter" : ""}
                        onClick={filterTaskHandler}
                >
                    All
                </button>
                <button className={filter === "active" ? "active_filter" : ""}
                        onClick={filterTaskHandler}
                >
                    Active
                </button>
                <button className={filter === "complete" ? "active_filter" : ""}
                        onClick={filterTaskHandler}
                >
                    Complete
                </button>
            </div>
        </div>
    )
}