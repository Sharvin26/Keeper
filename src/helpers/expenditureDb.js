import { db } from "./db";

export const initExpenditure = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Expenditures(id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, amount REAL NOT NULL, type TEXT NOT NULL, date TEXT NOT NULL, isCompleted INTEGER NOT NULL);",
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

export const fetchExpenditure = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "SELECT * from Expenditures",
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

export const insertExpenditure = (name, amount, type, date, isCompleted) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO Expenditures(name, amount, type, date, isCompleted) VALUES (?, ?, ?, ?, ?);",
                [name, amount, type, date, isCompleted],
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

export const modifyExpenditure = (
    id,
    name,
    amount,
    type,
    date,
    isCompleted
) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "UPDATE Expenditures SET name=?, amount=?, type=?, date=?, isCompleted=? where id=?",
                [name, amount, type, date, isCompleted, id],
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

export const removeExpenditure = (id) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                "DELETE FROM EXPENDITURES WHERE id=?",
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
