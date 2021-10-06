import {FilterValueType, TodoListType} from "../../App"
import {v1} from "uuid"

export const todoListReducer = (state: TodoListType[], action: TodoListActionsType) => {
    switch (action.type) {
        case "TODO_LIST/REMOVE_TODO-LIST":
            return state.filter(tl => tl.id !== action.todoID)
        case "TODO_LIST/ADD_TODO-LIST" :
            return [{id: v1(), title: action.title, filter: "all"}, ...state]
        case "TODO_LIST/CHANGE_TODO-LIST_TITLE":
            return state.map(tl => {
                if (tl.id === action.todoID) {
                    return {
                        ...tl,
                        title: action.title
                    }
                }
                return tl
            })
        case "TODO_LIST/CHANGE_TODO-LIST_FILTER":
            return state.map(tl => {
                if (tl.id === action.todoID) {
                    return {
                        ...tl,
                        filter: action.filter
                    }
                }
                return tl
            })
        default:
            return state
    }
}

export const removeTodoList = (todoID: string) => {
    return {
        type: "TODO_LIST/REMOVE_TODO-LIST",
        todoID
    } as const
}

export const addTodoList = (title: string) => {
    return {
        type: "TODO_LIST/ADD_TODO-LIST",
        title
    } as const
}

export const changeTodoListTitle = (title: string, todoID: string) => {
    return {
        type: "TODO_LIST/CHANGE_TODO-LIST_TITLE",
        title,
        todoID
    } as const
}

export const changeTodoListFilter = (filter: FilterValueType, todoID: string) => {
    return {
        type: "TODO_LIST/CHANGE_TODO-LIST_FILTER",
        filter,
        todoID
    } as const
}

export type RemoveTodoListActionType = ReturnType<typeof removeTodoList>
export type AddTodoListActionType = ReturnType<typeof addTodoList>
export type ChangeTodoListTitleActionType = ReturnType<typeof changeTodoListTitle>
export type ChangeTodoListFilterActionType = ReturnType<typeof changeTodoListFilter>

export type TodoListActionsType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListTitleActionType
    | ChangeTodoListFilterActionType
