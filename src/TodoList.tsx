import React, { useState } from 'react';
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
}

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("")

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              props.addTask(newTaskTitle)
              setNewTaskTitle("")
            }
          }}
        />
        <button onClick={() => {
          props.addTask(newTaskTitle)
          setNewTaskTitle("")
        }}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(el => <li key={el.id}><input type="checkbox" checked={el.isDone} />
            <span>{el.title}</span>
            <button onClick={() => { props.removeTask(el.id) }}>x</button>
          </li>)
        }
      </ul>
      <div>
        <button onClick={() => { props.changeFilter("all") }}>All</button>
        <button onClick={() => { props.changeFilter("active") }}>Active</button>
        <button onClick={() => { props.changeFilter("completed") }}>Completed</button>
      </div>
    </div>
  );
}
