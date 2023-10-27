import { AddBox } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

export type addItemFormPropsType = {
    addItem: (title: string) => void
}
export function AddItemForm(props: addItemFormPropsType) {
    let [newTaskTitle, setNewTaskTitle] = useState("");
    let [error, setError] = useState<null | string>(null);

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value);
    };
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask();
            setNewTaskTitle("");
        }
    };
    const addTask = () => {
        if (newTaskTitle.trim() === "") {
            setError("Title is required");
        } else {
            props.addItem(newTaskTitle);
            setNewTaskTitle("");
        }

    };
    return (
        <div>
            <TextField
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                variant={"outlined"}
                label={"Type value"}
                helperText={error} />
            <IconButton onClick={addTask} color={"primary"}><AddBox fontSize="large"/></IconButton>
        </div>
    );
}
