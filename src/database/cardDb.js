import { dbTemplate } from "./db";

export const initCards = async () =>
    await dbTemplate(
        "CREATE TABLE IF NOT EXISTS Cards(id INTEGER PRIMARY KEY NOT NULL, cardName TEXT NOT NULL, cardNumber TEXT NOT NULL, cardExpiry TEXT NOT NULL, cardCvv TEXT NOT NULL, date TEXT NOT NULL )"
    );

export const fetchCard = async () => await dbTemplate("SELECT * from Cards");

export const insertCard = async (
    cardName,
    cardNumber,
    cardExpiry,
    cardCvv,
    date
) =>
    await dbTemplate(
        "INSERT INTO Cards(cardName, cardNumber, cardExpiry, cardCvv, date) VALUES(?, ?, ?, ?, ?)",
        [cardName, cardNumber, cardExpiry, cardCvv, date]
    );

export const modifyCard = async (
    id,
    cardName,
    cardNumber,
    cardExpiry,
    cardCvv,
    date
) =>
    await dbTemplate(
        "UPDATE Cards SET cardName=?, cardNumber=?, cardExpiry=?, cardCvv=?, date=? where id=?",
        [cardName, cardNumber, cardExpiry, cardCvv, date, id]
    );

export const removeCard = async (id) =>
    await dbTemplate("DELETE FROM Cards where id=?", [id]);
