import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

export type FilterValuesType = "all" | "completed" | "active"
type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId]
    let filteredTasks = tasks.filter(el => el.id !== id)
    tasksObj[todoListId] = filteredTasks
    setTasks({ ...tasksObj })
  }

  function addTask(title: string, todoListId: string) {
    let task = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todoListId]
    let newTasks = [task, ...tasks]
    tasksObj[todoListId] = newTasks
    setTasks({ ...tasksObj })
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
  let tasks = tasksObj[todoListId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({ ...tasksObj })
    }
  }
  function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
  let tasks = tasksObj[todoListId]
    let task = tasks.find(t => t.id === taskId)
    if (task) {
      task.title = newTitle
      setTasks({ ...tasksObj })
    }
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find(tl => tl.id === todoListId)
    if (todoList) {
      todoList.filter = value
      setTodoLists([...todoLists])
    }
  }

  function removeTodoList(todoListId: string) {
    let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId)
    setTodoLists(filteredTodoList)
    delete tasksObj[todoListId]
    setTasks({ ...tasksObj })
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const todoList = todoLists.find(tl => tl.id === id)
    if(todoList) {
      todoList.title = newTitle
      setTodoLists([...todoLists])
    }
  }

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ])

  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todoListId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Chocolate", isDone: false },
      { id: v1(), title: "Potatoes", isDone: true },
      { id: v1(), title: "Water", isDone: false },
    ]
  })

  function addTodoList(title: string) {
    let todoList: TodoListType = {
      id: v1(),
      title: title,
      filter: "all"
    }
    setTodoLists([todoList, ...todoLists])
    setTasks({ ...tasksObj, [todoList.id]: [] })
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodoList} />
      {
        todoLists.map((tl) => {
          let tasksForTodoList = tasksObj[tl.id]
          if (tl.filter === "completed") {
            tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
          }
          if (tl.filter === "active") {
            tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
          }
          return <TodoList
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            filter={tl.filter}
            removeTodoList={removeTodoList}
            changeTodolistTitle={changeTodolistTitle}
          />
        })
      }

    </div>
  );
}

export default App;
