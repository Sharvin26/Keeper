import { dbTemplate } from "./db";

export const initBarcodeDocuments = async () =>
    await dbTemplate(
        "CREATE TABLE IF NOT EXISTS BarcodeDocument(id INTEGER PRIMARY KEY NOT NULL, result TEXT NOT NULL, type TEXT NOT NULL, date TEXT NOT NULL);"
    );

export const fetchBarcodeDocument = async () =>
    await dbTemplate("SELECT * FROM BarcodeDocument");

export const insertBarcodeDocument = async (result, type, date) =>
    await dbTemplate(
        "INSERT INTO BarcodeDocument(result, type, date) VALUES (?, ?, ?)",
        [result, type, date]
    );

export const removeBarcodeDocument = async (id) =>
    await dbTemplate("DELETE FROM BarcodeDocument where id=?", [id]);
