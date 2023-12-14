import { v1 } from "uuid"
import { TasksStateType } from '../App'
import { AddTodoListActionType } from "./todolists-reducer"

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

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todoListId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListId: string
}



export type ActionsType =
    | RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType

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
        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const task = tasks.find(t => t.id === action.taskId)
            if(task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId]
            const task = tasks.find(t => t.id === action.taskId)
            if(task) {
                task.title = action.title
            }
            return stateCopy
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] =[]
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

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS',taskId, isDone, todoListId}

}
export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE',taskId, title, todoListId}
}

