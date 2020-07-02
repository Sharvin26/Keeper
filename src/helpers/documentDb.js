import { db } from "./db";

export const initDocument = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Documents(id INTEGER PRIMARY KEY NOT NULL, label TEXT NOT NULL, pdfUri TEXT NOT NULL, date TEXT NOT NULL);",
                [],
                () => {
                    resolve();
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};

export const fetchDocument = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * from Documents",
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => reject(error)
            );
        });
    });
    return promise;
};

export const insertDocument = (label, pdfUri, date) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO Documents(label, pdfUri, date) VALUES (?, ?, ?)",
                [label, pdfUri, date],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        });
    });
    return promise;
};
