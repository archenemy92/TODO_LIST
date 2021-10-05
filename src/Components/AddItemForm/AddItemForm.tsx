import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {IconButton, TextField} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    placeholder: string
}

export const AddItemForm: React.FC<AddItemFormPropsType> = ({addItem, placeholder}) => {
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
            <TextField
                placeholder={placeholder}
                variant={"standard"}
                color={"primary"}
                value={taskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addItemHandler}>
                <AddIcon/>
            </IconButton>
        </div>
    )
}