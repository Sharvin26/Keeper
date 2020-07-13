import moment from "moment";
import {
    fetchCard,
    insertCard,
    modifyCard,
    removeCard,
} from "../../database/cardDb";

export const GET_CARDS = "GET_CARDS";
export const ADD_CARD = "ADD_CARD";
export const UPDATE_CARD = "UPDATE_CARD";
export const DELETE_CARD = "DELETE_CARD";
export const SEARCH_CARD = "SEARCH_CARD";

export const getCards = () => {
    return async (dispatch) => {
        try {
            const dbResult = await fetchCard();
            dispatch({
                type: GET_CARDS,
                cards: dbResult.rows._array,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const addCard = (cardName, cardNumber, cardExpiry, cardCvv, date) => {
    return async (dispatch) => {
        try {
            const newDate = moment(date).format("MMMM Do YYYY, hh:mm");
            const dbResult = await insertCard(
                cardName,
                cardNumber,
                cardExpiry,
                cardCvv,
                newDate
            );
            dispatch({
                type: ADD_CARD,
                card: {
                    id: dbResult.insertId,
                    cardName,
                    cardNumber,
                    cardExpiry,
                    cardCvv,
                    date: newDate,
                },
            });
        } catch (error) {
            throw error;
        }
    };
};

export const updateCard = (
    id,
    cardName,
    cardNumber,
    cardExpiry,
    cardCvv,
    date
) => {
    return async (dispatch) => {
        try {
            const newDate = moment(date).format("MMMM Do YYYY, hh:mm");
            await modifyCard(
                id,
                cardName,
                cardNumber,
                cardExpiry,
                cardCvv,
                newDate
            );
            dispatch({
                type: UPDATE_CARD,
                card: {
                    id,
                    cardName,
                    cardNumber,
                    cardExpiry,
                    cardCvv,
                    date: newDate,
                },
            });
        } catch (error) {
            throw error;
        }
    };
};

export const deleteCard = (id) => {
    return async (dispatch) => {
        try {
            await removeCard(id);
            dispatch({
                type: DELETE_CARD,
                id,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const searchCards = (value) => {
    return async (dispatch) => dispatch({ type: SEARCH_CARD, value });
};
