import {v1} from "uuid"
import {TasksType} from "../../App"
import {changeTaskStatus, changeTaskTitle, removeTask, tasksReducer} from "./tasks-reducer"

let todoListId1 = v1()
let todoListId2 = v1()

const startState: TasksType = {
    [todoListId1]: [
        {title: "React", id: v1(), isDone: false},
        {title: "Redux", id: v1(), isDone: false},
        {title: "CSS", id: v1(), isDone: false}
    ],
    [todoListId2]: [
        {title: "Milk", id: v1(), isDone: false},
        {title: "Bread", id: v1(), isDone: false},
        {title: "Salt", id: v1(), isDone: false}
    ]
}

test("Correct task should be removed", () => {

    const endState = tasksReducer(startState, removeTask(startState[todoListId1][0].id, todoListId1))

    expect(endState[todoListId1].length).toBe(2)
    expect(endState[todoListId2].length).toBe(3)

})

test("Correct task title should be changed", () => {

    let taskTitle = "New Title"

    const endState = tasksReducer(startState,
        changeTaskTitle(taskTitle, startState[todoListId2][0].id, todoListId2))

    expect(endState[todoListId1][0].title).toBe("React")
    expect(endState[todoListId2][0].title).toBe(taskTitle)
})

test("Correct task status should be changed", () => {

    let taskStatus = true

    const endState = tasksReducer(startState,
        changeTaskStatus(taskStatus, startState[todoListId2][1].id, todoListId2))

    expect(endState[todoListId1][1].isDone).toBeFalsy()
    expect(endState[todoListId2][1].isDone).toBeTruthy()
    expect(endState[todoListId2][1].title).toBe("Bread")
})
