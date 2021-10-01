import React, {ChangeEvent, KeyboardEvent, MouseEvent, useState} from "react"
import {FilterValueType, TaskType} from "../../App"

type TodoListPropsType = {
    todoTitle: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    filterTasks: (value: FilterValueType) => void
    addTask: (title: string) => void
}

export const TodoList: React.FC<TodoListPropsType> = (props) => {

    const [taskTitle, setTaskTitle] = useState<string>("")

    let {
        todoTitle, tasks,
        removeTask, filterTasks,
        addTask
    } = props

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "ENTER") {
            addTask(taskTitle)
        }
    }

    const addTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle("")
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
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {tasks.map(t => {

                        const removeTaskHandler = () => {
                            removeTask(t.id)
                        }

                        return (
                            <li key={t.id}>
                                <input type={"checkbox"} checked={t.isDone} onChange={()=>{}}/>
                                <span>{t.title}</span>
                                <button onClick={removeTaskHandler}>X</button>
                            </li>
                        )
                    }
                )}
            </ul>
            <div>
                <button onClick={filterTaskHandler}>All</button>
                <button onClick={filterTaskHandler}>Active</button>
                <button onClick={filterTaskHandler}>Complete</button>
            </div>
        </div>
    )
}