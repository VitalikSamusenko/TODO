import { v1 } from "uuid"
import { TasksStateType } from '../App'

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    todoListId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todoListId: string
}


export type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType

export const tasksReducer = (
    state: TasksStateType,
    action: ActionsType
): TasksStateType=> {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            const filteredTasks = tasks.filter(t=> t.id !== action.taskId)
            stateCopy[action.todoListId] = filteredTasks
            return stateCopy
        }
        case 'ADD-TASK': {
            const newTask = { id: v1(), title: action.title, isDone: false }
            const stateCopy = {...state}
            const tasks = state[action.todoListId]
            const newTasks = [newTask ,...tasks]
            stateCopy[action.todoListId] = newTasks
            return stateCopy
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todoListId,  taskId}
}

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: 'ADD-TASK', title, todoListId}
}
