import { dbTemplate } from "./db";

export const initTodos = async () =>
    await dbTemplate(
        "CREATE TABLE IF NOT EXISTS todos(id INTEGER PRIMARY KEY NOT NULL, task TEXT NOT NULL, isCompleted INTEGER NOT NULL, date TEXT NOT NULL, reminder TEXT);"
    );

export const fetchTodo = async () => await dbTemplate("SELECT * FROM todos");

export const insertTodo = async (task, isCompleted, date) =>
    await dbTemplate(
        "INSERT INTO todos(task, isCompleted, date) VALUES (?, ?, ?);",
        [task, isCompleted, date]
    );

export const modifyTodo = async (id, task, isCompleted, date) =>
    await dbTemplate(
        "UPDATE todos SET task=?, isCompleted=?, date=? WHERE id=?",
        [task, isCompleted, date, id]
    );

export const removeTodo = async (id) =>
    await dbTemplate("DELETE FROM todos where id=?", [id]);
