import { dbTemplate } from "./db";

export const initMoments = async () =>
    await dbTemplate(
        "CREATE TABLE IF NOT EXISTS Moments(id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL,image TEXT NOT NULL ,date TEXT NOT NULL, description TEXT NOT NULL);"
    );

export const fetchMoments = async () =>
    await dbTemplate("SELECT * FROM Moments;");

export const insertMoment = async (title, image, date, description) =>
    await dbTemplate(
        "INSERT INTO Moments(title, image, date, description) VALUES (?, ?, ?, ?);",
        [title, image, date, description]
    );

export const modifyMoment = async (id, title, image, date, description) =>
    await dbTemplate(
        "UPDATE Moments SET title=?, image=?, date=?, description=? where id=?",
        [title, image, date, description, id]
    );

export const removeMoment = async (id) =>
    await dbTemplate("DELETE FROM Moments WHERE id=?", [id]);
