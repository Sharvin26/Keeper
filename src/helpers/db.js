import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("Keepers.db");

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS keepers(id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL,image TEXT NOT NULL ,date TEXT NOT NULL, description TEXT NOT NULL);",
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

export const fetchDocuments = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM keepers;",
                [],
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

export const insertDocument = (title, image, date, description) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO keepers(title, image, date, description) VALUES (?, ?, ?, ?);",
                [title, image, date, description],
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

export const updateDocument = (id, title, image, date, description) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE keepers SET title=?, image=?, date=?, description=? where id=?",
                [title, image, date, description, id],
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

export const removeDocument = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM keepers WHERE id=?",
                [id],
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
