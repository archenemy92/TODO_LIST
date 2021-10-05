import React, {ChangeEvent, useState} from "react"
import {TextField} from "@mui/material"

export type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {

    const [isEditeMode, setIsEditeMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activateEditeMode = () => {
        setIsEditeMode(true)
        setTitle(props.title)
    }
    const deactivateEditeMode = () => {
        setIsEditeMode(false)
        props.onChange(title)
    }

    return (
        isEditeMode
            ? <TextField
                variant={"standard"}
                value={title}
                onChange={onChangeTitleHandler}
                onBlur={deactivateEditeMode}
                autoFocus/>
            : <span onDoubleClick={activateEditeMode}>{props.title}</span>
    )
}