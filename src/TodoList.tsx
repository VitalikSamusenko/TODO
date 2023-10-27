import React, { ChangeEvent } from 'react';
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@mui/material";
import { Clear, Delete } from "@mui/icons-material";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodolistTitle: (todoListId: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
    const removeTodoList = () => props.removeTodoList(props.id)
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    return (
        <div>
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle} /> <IconButton onClick={removeTodoList}><Delete /></IconButton></h3>
            <AddItemForm addItem={addTask} />
            <div>
                {
                    props.tasks.map(el => {
                        const onRemoveHandler = () => props.removeTask(el.id, props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => { props.changeTaskStatus(el.id, e.target.checked, props.id) }
                        const onChangeTitleHandler = (newValue: string) => {
                            props.changeTaskTitle(el.id, newValue, props.id)
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

