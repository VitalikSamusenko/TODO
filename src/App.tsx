import React, { useState } from 'react';
import './App.css';
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "completed" | "active"
type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
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
      setTasks({...tasksObj})
    }
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todoList = todoLists.find(tl => tl.id === todoListId)
    if (todoList) {
      todoList.filter = value
      setTodoList([...todoLists])
    }
  }

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoList] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "What to learn", filter: "active" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ])

  let [tasksObj, setTasks] = useState({
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

  return (
    <div className="App">
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
            filter={tl.filter}
          />
        })
      }

    </div>
  );
}

export default App;
