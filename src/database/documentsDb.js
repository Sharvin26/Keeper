import { dbTemplate } from "./db";

export const initDocuments = async () =>
    await dbTemplate(
        "CREATE TABLE IF NOT EXISTS Documents(id INTEGER PRIMARY KEY NOT NULL, label TEXT NOT NULL, pdfUri TEXT NOT NULL, date TEXT NOT NULL);"
    );

export const fetchDocument = async () =>
    await dbTemplate("SELECT * from Documents");

export const insertDocument = async (label, pdfUri, date) =>
    await dbTemplate(
        "INSERT INTO Documents(label, pdfUri, date) VALUES (?, ?, ?)",
        [label, pdfUri, date]
    );

export const removeDocument = async (id) =>
    await dbTemplate("DELETE FROM Documents WHERE id=?", [id]);
