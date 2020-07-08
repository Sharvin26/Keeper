import { dbTemplate } from "./db";

export const initExpenditures = async () =>
    await dbTemplate(
        "CREATE TABLE IF NOT EXISTS Expenditures(id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, amount REAL NOT NULL, type TEXT NOT NULL, date TEXT NOT NULL, isCompleted INTEGER NOT NULL);"
    );

export const fetchExpenditure = async () =>
    await dbTemplate("SELECT * from Expenditures");

export const insertExpenditure = async (
    name,
    amount,
    type,
    date,
    isCompleted
) =>
    await dbTemplate(
        "INSERT INTO Expenditures(name, amount, type, date, isCompleted) VALUES (?, ?, ?, ?, ?);",
        [name, amount, type, date, isCompleted]
    );

export const modifyExpenditure = async (
    id,
    name,
    amount,
    type,
    date,
    isCompleted
) =>
    await dbTemplate(
        "UPDATE Expenditures SET name=?, amount=?, type=?, date=?, isCompleted=? where id=?",
        [name, amount, type, date, isCompleted, id]
    );

export const removeExpenditure = async (id) =>
    await dbTemplate("DELETE FROM EXPENDITURES WHERE id=?", [id]);
