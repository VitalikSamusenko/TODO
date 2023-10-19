import React, { ChangeEvent } from 'react';
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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
      <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/> <button onClick={removeTodoList}>x</button></h3>
      <AddItemForm addItem={addTask}/>
      <ul>
        {
          props.tasks.map(el => {
            const onRemoveHandler = () => props.removeTask(el.id, props.id)
            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => { props.changeTaskStatus(el.id, e.target.checked, props.id) }
            const onChangeTitleHandler = (newValue: string) => { 
              // props.changeTaskStatus(el.id, e.target.checked, props.id) 
              props.changeTaskTitle(el.id, newValue, props.id)
            }

            return <li key={el.id} className={el.isDone ? "is-done" : ""}><input type="checkbox"
              onChange={onChangeStatusHandler}
              checked={el.isDone} />
              <EditableSpan title={el.title} onChange={onChangeTitleHandler}/>
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

