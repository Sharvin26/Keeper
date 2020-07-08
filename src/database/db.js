import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabase("Keepers.db");

export const dbTemplate = (sqlStatement, sqlArgs = []) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                sqlStatement,
                sqlArgs,
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
