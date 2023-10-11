import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from "./App";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter: FilterValuesType
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
      props.addTask(newTaskTitle)
      setNewTaskTitle("")
    }
    
  }
  const onAllClickHandler = () => props.changeFilter("all")
  const onActiveClickHandler = () => props.changeFilter("active")
  const onCompletedClickHandler = () => props.changeFilter("completed")

  return (
    <div>
      <h3>{props.title}</h3>
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
            const onRemoveHandler = () => props.removeTask(el.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { props.changeTaskStatus(el.id, e.target.checked) }

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
