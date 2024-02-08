import React, { ChangeEvent } from 'react';
import { FilterValuesType } from "./AppWithRedux";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Clear, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    changeFilter: (todoListId: string, value: FilterValuesType) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodolistTitle: (todoListId: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {
    
    const tasks = useSelector<AppRootState, Array<TaskType>>( state => state.tasks[props.id])
    const dispatch = useDispatch()
    

    const onAllClickHandler = () => props.changeFilter(props.id, "all")
    const onActiveClickHandler = () => props.changeFilter(props.id, "active")
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed")
    const removeTodoList = () => props.removeTodoList(props.id)

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    let tasksForTodoList = tasks
    if (props.filter === "completed") {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
    }
    if (props.filter === "active") {
        tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle} /> <IconButton onClick={removeTodoList}><Delete /></IconButton></h3>
            <AddItemForm addItem={(title, ) => {
                const action = addTaskAC(title, props.id)
                dispatch(action)
            }} />
            <div>
                {
                    tasksForTodoList.map(el => {
                        const onRemoveHandler = () => {
                            const action = removeTaskAC(el.id, props.id)
                            dispatch(action)
                        }
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => { 
                            const action = changeTaskStatusAC(el.id, e.target.checked, props.id)
                            dispatch(action)
                        }
                        const onChangeTitleHandler = (newValue: string) => {
                            const action = changeTaskTitleAC(el.id, newValue, props.id)
                            dispatch(action)
                        }

                        return <div key={el.id} className={el.isDone ? "is-done" : ""}>
                            <Checkbox
                                onChange={onChangeStatusHandler}
                                checked={el.isDone}
                                color={"primary"} />
                            <EditableSpan title={el.title} onChange={onChangeTitleHandler} />
                            <IconButton onClick={onRemoveHandler}><Clear /></IconButton>
                        </div>
                    })
                }
            </div>
            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"} color={"inherit"} onClick={onAllClickHandler} >All</Button>
                <Button variant={props.filter === "active" ? "contained" : "text"} color={"primary"} onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"} color={"secondary"} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
}

