import { v1 } from 'uuid'
import { FilterValuesType, TodoListType } from '../App'

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionsType =
    | RemoveTodolistActionType
    | AddTodoListActionType
    | ChangeTodolistActionType
    | ChangeTodolistFilterActionType


export const todolistsReducer = (
    state: Array<TodoListType>,
    action: ActionsType
): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter((tl) => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [
                {
                    id: action.todolistId,
                    title: action.title,
                    filter: 'all',
                },
                ...state
            ]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find((tl) => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find((tl) => tl.id === action.id)
            if (todolist) {
                todolist.filter = action.filter
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this action type")
    }
}

export const removeTodolistAC = (todoListId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todoListId}
}

export const addTodolistAC = (title: string): AddTodoListActionType => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const changeTodolistTitleAC = (id:string, title: string): ChangeTodolistActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}

export const changeTodolistFilterAC = (id:string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}