import {TasksType, TaskType} from "../../App"
import {v1} from "uuid"

export const tasksReducer = (state: TasksType, action: TasksActionTypes): TasksType => {
    switch (action.type) {
        case "TASKS/REMOVE_TASK":
            return {
                ...state,
                [action.todoID]: state[action.todoID].filter(t => t.id !== action.taskID)
            }
        case "TASKS/ADD_TASK": {
            const newTask: TaskType = {
                title: action.title,
                id: v1(),
                isDone: false
            }
            return {
                ...state,
                [action.todoId]: [newTask, ...state[action.todoId]]
            }
        }
        case "TASKS/CHANGE_TASK_TITLE":
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(t => {
                    if (t.id === action.taskID) {
                        return {
                            ...t,
                            title: action.title
                        }
                    }
                    return t
                })
            }
        case "TASKS/CHANGE_TASK_STATUS":
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(t => {
                    if (t.id === action.taskID) {
                        return {
                            ...t,
                            isDone: action.status
                        }
                    }
                    return t
                })
            }
        default:
            return state
    }
}

export const removeTask = (taskID: string, todoID: string) => {
    return {
        type: "TASKS/REMOVE_TASK",
        taskID,
        todoID
    } as const
}

export const addTask = (title: string, todoId: string) => {
    return {
        type: "TASKS/ADD_TASK",
        title,
        todoId
    } as const
}

export const changeTaskTitle = (title: string, taskID: string, todoId: string) => {
    return {
        type: "TASKS/CHANGE_TASK_TITLE",
        title,
        taskID,
        todoId
    } as const
}
export const changeTaskStatus = (status: boolean, taskID: string, todoId: string) => {
    return {
        type: "TASKS/CHANGE_TASK_STATUS",
        status,
        taskID,
        todoId
    } as const
}

export type RemoveTaskActionType = ReturnType<typeof removeTask>
export type AddTaskActionType = ReturnType<typeof addTask>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitle>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatus>

export type TasksActionTypes =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType