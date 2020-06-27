import moment from "moment";
import {
    fetchExpenditure,
    insertExpenditure,
    modifyExpenditure,
    removeExpenditure,
} from "../../helpers/expenditureDb";

export const FETCH_EXPENDITURE = "FETCH_EXPENDITURE";
export const ADD_EXPENDITURE = "ADD_EXPENDITURE";
export const UPDATE_EXPENDITURE = "UPDATE_EXPENDITURE";
export const DELETE_EXPENDITURE = "DELETE_EXPENDITURE";

export const GIVE_MONEY = "GIVE_MONEY";
export const BORROW_MONEY = "BORROW_MONEY";

export const getExpenditure = () => {
    return async (dispatch) => {
        try {
            const dbResult = await fetchExpenditure();
            dispatch({
                type: FETCH_EXPENDITURE,
                expenditures: dbResult.rows._array,
            });
        } catch (error) {
            throw error;
        }
    };
};

export const addExpenditure = (name, amount, oppType, date) => {
    return async (dispatch) => {
        try {
            let type;
            if (oppType === "GiveMoney") {
                type = GIVE_MONEY;
            } else if (oppType === "BorrowMoney") {
                type = BORROW_MONEY;
            }
            const newDate = moment(date).format("MMMM Do YYYY, hh:mm");
            const newAmount = parseFloat(amount);
            const dbResult = await insertExpenditure(
                name,
                newAmount,
                type,
                newDate
            );
            dispatch({
                type: ADD_EXPENDITURE,
                expenditureDocument: {
                    id: dbResult.insertId,
                    name,
                    amount: newAmount,
                    type,
                    date: newDate,
                },
            });
        } catch (error) {
            throw error;
        }
    };
};

export const updateExpenditure = (id, name, amount, oppType, date) => {
    return async (dispatch) => {
        try {
            let type;
            if (oppType === "GiveMoney") {
                type = GIVE_MONEY;
            } else if (oppType === "BorrowMoney") {
                type = BORROW_MONEY;
            }
            const newDate = moment(date).format("MMMM Do YYYY, hh:mm");
            const newAmount = parseFloat(amount);
            await modifyExpenditure(id, name, newAmount, type, newDate);
            dispatch({
                type: UPDATE_EXPENDITURE,
                expenditureDocument: {
                    id,
                    name,
                    amount: newAmount,
                    type,
                    date: newDate,
                },
            });
        } catch (error) {
            throw error;
        }
    };
};

export const deleteExpenditure = (id) => {
    return async (dispatch) => {
        try {
            await removeExpenditure(id);
            dispatch({
                type: DELETE_EXPENDITURE,
                id,
            });
        } catch (error) {
            throw error;
        }
    };
};
