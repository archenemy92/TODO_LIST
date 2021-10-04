import React, {ChangeEvent, KeyboardEvent, useState} from "react"

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem}) => {
    const [taskTitle, setTaskTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (taskTitle.trim() !== "") {
            addItem(taskTitle.trim())
            setTaskTitle("")
        } else {
            setError("title is require")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addItemHandler()
        }
    }

    return (
        <div>
            <input
                value={taskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addItemHandler}>+</button>
            {error && <div className={error ? "error_message" : ""}>{error}</div>}
        </div>
    )
}