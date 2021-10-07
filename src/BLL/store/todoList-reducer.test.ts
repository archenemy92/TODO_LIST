import {v1} from "uuid"
import {FilterValueType, TodoListType} from "../../App"
import {
    addTodoList,
    changeTodoListFilter,
    changeTodoListTitle,
    removeTodoList,
    todoListReducer
} from "./todoList-reducer"

let todoListId1 = v1()
let todoListId2 = v1()

const startState: TodoListType[] = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
]

test("Correct todoList should be removed", () => {


    const endState = todoListReducer(startState, removeTodoList(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})
test("Correct todoList should be added", () => {

    let title = "New todo"

    const endState = todoListReducer(startState, addTodoList(title))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(title)
    expect(endState[0].filter).toBe("all")
})

test("Correct todoList title should be changed ", () => {

    let title = "New todo"

    const endState = todoListReducer(startState,
        changeTodoListTitle(title, todoListId1))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(title)
    expect(endState[0].filter).toBe("all")
})

test("Correct todoList filter should be changed ", () => {

    let filter: FilterValueType = "complete"
    const endState = todoListReducer(startState,
        changeTodoListFilter(filter, todoListId2))

    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(filter)
})

