import React, { useReducer } from 'react';
import './App.css';
import { TaskType, TodoList } from "./TodoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./state/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "./state/tasks-reducer";

export type FilterValuesType = "all" | "completed" | "active"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchToTodolistReducer] = useReducer(todolistsReducer, [
        { id: todoListId1, title: "What to learn", filter: "all" },
        { id: todoListId2, title: "What to buy", filter: "all" },
    ])

    let [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
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
    
    function removeTask(id: string, todoListId: string) {
        const action = removeTaskAC(id, todoListId)
        dispatchToTasksReducer(action)
    }

    function addTask(title: string, todoListId: string) {
        const action = addTaskAC(title, todoListId)
        dispatchToTasksReducer(action)
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        const action = changeTaskStatusAC(taskId, isDone, todoListId)
        dispatchToTasksReducer(action)
    }
    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        const action = changeTaskTitleAC(taskId, newTitle, todoListId)
        dispatchToTasksReducer(action)
    }

    function changeFilter(todoListId: string, value: FilterValuesType) {
        const action = changeTodolistFilterAC(todoListId, value)
        dispatchToTodolistReducer(action)
    }

    function removeTodoList(todoListId: string) {
        const action = removeTodolistAC(todoListId)
        dispatchToTasksReducer(action)
        dispatchToTodolistReducer(action)
    }

    function changeTodolistTitle(id: string, newTitle: string) {
        const action = changeTodolistTitleAC(id, newTitle)
        dispatchToTodolistReducer(action)
    }

    function addTodoList(title: string) {
        const action = addTodolistAC(title)
        dispatchToTasksReducer(action)
        dispatchToTodolistReducer(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "20px 0" }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map((tl) => {
                            let tasksForTodoList = tasksObj[tl.id]
                            if (tl.filter === "completed") {
                                tasksForTodoList = tasksForTodoList.filter(t => t.isDone)
                            }
                            if (tl.filter === "active") {
                                tasksForTodoList = tasksForTodoList.filter(t => !t.isDone)
                            }
                            return <Grid item>
                                <Paper style={{ padding: "10px 20px" }}>
                                    <TodoList
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
                                </Paper>

                            </Grid>

                        })
                    }
                </Grid>

            </Container>


        </div>
    );
}

export default AppWithReducers;
