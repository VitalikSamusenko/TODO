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
}

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.target.value)
  }
  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.addTask(newTaskTitle)
      setNewTaskTitle("")
    }
  }
  const addTask = () => {
    props.addTask(newTaskTitle)
    setNewTaskTitle("")
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
          onKeyDown={onKeyDownHandler} />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(el => {
            const onRemoveHandler = () => props.removeTask(el.id)
            const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => { props.changeTaskStatus(el.id, e.target.checked) }

            return <li key={el.id}><input type="checkbox"
              onChange={onChangeHandler}
              checked={el.isDone} />
              <span>{el.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          })
        }
      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
}
