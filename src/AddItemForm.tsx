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
      <input
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={onKeyDownHandler}
        className={error ? "error" : ""} />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">field is required</div>}
    </div>
  );
}
