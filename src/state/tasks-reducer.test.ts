import { TasksStateType } from "../App"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./tasks-reducer"
import { addTodolistAC } from "./todolists-reducer"

test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            { id: '1', title: "CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "React", isDone: false }
        ],
        'todolistId2': [
            { id: '1', title: "Milk", isDone: true },
            { id: '2', title: "Chocolate", isDone: false },
            { id: '3', title: "Potatoes", isDone: true }
        ]
    }

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(2)
    expect(endState['todolistId2'].every(t => t.id !== '2')).toBeTruthy()
})

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            { id: '1', title: "CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "React", isDone: false }
        ],
        'todolistId2': [
            { id: '1', title: "Milk", isDone: true },
            { id: '2', title: "Chocolate", isDone: false },
            { id: '3', title: "Potatoes", isDone: true }
        ]
    }

    const action = addTaskAC('Juice', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('Juice')
    expect(endState['todolistId2'][0].isDone).toBeFalsy()
})

test('status of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            { id: '1', title: "CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "React", isDone: false }
        ],
        'todolistId2': [
            { id: '1', title: "Milk", isDone: true },
            { id: '2', title: "Chocolate", isDone: true },
            { id: '3', title: "Potatoes", isDone: true }
        ]
    }

    const action = changeTaskStatusAC('2', false, 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isDone).toBe(false)
    expect(endState['todolistId1'][1].isDone).toBe(true)
})

test('title of specified task should be changed', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            { id: '1', title: "CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "React", isDone: false }
        ],
        'todolistId2': [
            { id: '1', title: "Milk", isDone: true },
            { id: '2', title: "Chocolate", isDone: true },
            { id: '3', title: "Potatoes", isDone: true }
        ]
    }

    const action = changeTaskTitleAC('2', 'Cucumber', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('Cucumber')
    expect(endState['todolistId1'][1].title).toBe('JS')
})

test('new property with new array should be added when todolist is added', () => {
    const startState: TasksStateType = {
        'todolistId1': [
            { id: '1', title: "CSS", isDone: true },
            { id: '2', title: "JS", isDone: true },
            { id: '3', title: "React", isDone: false }
        ],
        'todolistId2': [
            { id: '1', title: "Milk", isDone: true },
            { id: '2', title: "Chocolate", isDone: true },
            { id: '3', title: "Potatoes", isDone: true }
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey){
        throw Error('new key should be added')
    }
    
    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})