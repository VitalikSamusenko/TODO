import { TasksStateType, TodoListType } from "../AppWithRedux"
import { tasksReducer } from "./tasks-reducer"
import { addTodolistAC, todolistsReducer } from "./todolists-reducer"

test('ids should be equals', () => {
    const startTaskState: TasksStateType = {}
    const startTodolistState: Array<TodoListType> = []

    const action = addTodolistAC('new todolist')

    const endTaskState = tasksReducer(startTaskState, action)
    const endTodolistState = todolistsReducer(startTodolistState, action)

    const keys = Object.keys(endTaskState)
    const idFormTasks = keys[0]
    const idFormTodolists = endTodolistState[0].id
    
    expect(idFormTasks).toBe(action.todolistId)
    expect(idFormTodolists).toBe(action.todolistId)
})