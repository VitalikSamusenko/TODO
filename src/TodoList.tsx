import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from "./App";

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
  filter: FilterValuesType
  removeTodoList: (todoListId: string) => void
}

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState<null | string>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value)
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      addTask()
      setNewTaskTitle("")
    }
  }
  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      setError("Title is required");
    } else {
      props.addTask(newTaskTitle, props.id)
      setNewTaskTitle("")
    }
    
  }
  const onAllClickHandler = () => props.changeFilter("all", props.id)
  const onActiveClickHandler = () => props.changeFilter("active", props.id)
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id)
  const removeTodoList = () => props.removeTodoList(props.id)
  
  return (
    <div>
      <h3>{props.title} <button onClick={removeTodoList}>x</button></h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyDown={onKeyDownHandler} 
          className={error ? "error" : ""}/>
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">field is required</div>}
      </div>
      <ul>
        {
          props.tasks.map(el => {
            const onRemoveHandler = () => props.removeTask(el.id, props.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { props.changeTaskStatus(el.id, e.target.checked, props.id) }

            return <li key={el.id} className={el.isDone ? "is-done" : ""}><input type="checkbox"
              onChange={onChangeHandler}
              checked={el.isDone} />
              <span>{el.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          })
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler} className={props.filter === "all" ? "active-filter" : ""}>All</button>
        <button onClick={onActiveClickHandler} className={props.filter === "active" ? "active-filter" : ""}>Active</button>
        <button onClick={onCompletedClickHandler} className={props.filter === "completed" ? "active-filter" : ""}>Completed</button>
      </div>
    </div>
  );
}
